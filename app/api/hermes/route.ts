/**
 * Hermes Gateway — WhatsApp → Atlas → WhatsApp
 * =============================================
 * Twilio sandbox: +1 415 523 8886 / join alive-look
 * Webhook URL:    https://atlas.goods2load.com/api/hermes
 */
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export const maxDuration = 60;

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886';
const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');

const EMPTY_TWIML =
  '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

async function send(to: string, body: string): Promise<string> {
  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    throw new Error('Twilio credentials not configured');
  }
  const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
  const msg = await client.messages.create({ from: FROM, to, body });
  return msg.sid;
}

// Returns [summaryMessage, shortlistMessage] — sent as two WhatsApp messages
function formatReply(data: Record<string, unknown>): [string, string | null] {
  const fullText =
    (data.text as string) ?? "I couldn't find a match. Please try again.";
  const shortlist = data.shortlist as Record<string, unknown> | null;
  const candidates = (shortlist?.candidates as Record<string, unknown>[]) ?? [];

  // Trim Atlas text to first 2 sentences to keep it concise
  const sentences = fullText.match(/[^.!?]+[.!?]+/g) ?? [fullText];
  const summary = sentences.slice(0, 2).join(' ').trim().slice(0, 600);

  if (!candidates.length) return [summary, null];

  const lines = candidates.slice(0, 3).map((c, i) => {
    const name = c.name as string;
    const conf = c.confidence_tier as string;
    const summary = (c.enrichment_summary as string).slice(0, 120);
    return `${i + 1}. *${name}* — ${conf}\n   ${summary}`;
  });

  const shortlistMsg =
    `*Top matches from the Goods2Load network:*\n\n` +
    lines.join('\n\n') +
    `\n\n_Reply with a name or number to request a rate quote._`;

  return [summary, shortlistMsg];
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const params = new URLSearchParams(raw);

  const from = params.get('From') ?? '';
  const message = params.get('Body')?.trim() ?? '';

  console.log('[Hermes] incoming', { from, message: message.slice(0, 50) });
  console.log('[Hermes] config', {
    hasSid: !!ACCOUNT_SID,
    hasToken: !!AUTH_TOKEN,
    from: FROM,
    atlasUrl: ATLAS_URL,
  });

  if (!from.startsWith('whatsapp:') || !message) {
    return new NextResponse(EMPTY_TWIML, {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // Step 1 — send "searching" immediately
  try {
    const sid = await send(
      from,
      "🔍 Atlas is searching the Goods2Load network… I'll reply in a moment.",
    );
    console.log('[Hermes] ack sent', sid);
  } catch (err) {
    console.error('[Hermes] ack send failed:', err);
    // Return error in TwiML so we can debug via Twilio logs
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Hermes error: ${String(err)}</Message></Response>`,
      { headers: { 'Content-Type': 'text/xml' } },
    );
  }

  // Step 2 — run Atlas pipeline
  try {
    if (!ATLAS_URL) throw new Error('ATLAS_API_URL not set');

    const res = await fetch(`${ATLAS_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Use phone number as session key so follow-up messages have context
      body: JSON.stringify({
        message,
        session_id: from.replace('whatsapp:', ''),
      }),
      signal: AbortSignal.timeout(55_000),
    });

    if (!res.ok) throw new Error(`Atlas ${res.status}`);
    const data = (await res.json()) as Record<string, unknown>;
    console.log('[Hermes] atlas ok, sending results');

    const [summary, shortlist] = formatReply(data);
    await send(from, summary);
    if (shortlist) await send(from, shortlist);
  } catch (err) {
    console.error('[Hermes] pipeline error:', err);
    await send(from, `⚠️ Sorry — Atlas had trouble: ${String(err)}`).catch(
      () => {},
    );
  }

  return new NextResponse(EMPTY_TWIML, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
