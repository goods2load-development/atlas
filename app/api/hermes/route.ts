/**
 * Hermes Gateway — WhatsApp → Atlas → WhatsApp
 * =============================================
 * 1. Sends "searching" message immediately via Twilio REST API
 * 2. Calls Atlas pipeline (~25s)
 * 3. Sends full results via Twilio REST API
 * 4. Returns empty TwiML
 *
 * Twilio sandbox: +1 415 523 8886 / join alive-look
 * Webhook URL:    https://atlas.goods2load.com/api/hermes
 */
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export const maxDuration = 60;

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const FROM = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886';
const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');

const EMPTY_TWIML =
  '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

function getClient() {
  return twilio(ACCOUNT_SID, AUTH_TOKEN);
}

async function send(to: string, body: string) {
  await getClient().messages.create({ from: FROM, to, body });
}

function formatReply(data: Record<string, unknown>): string {
  const text =
    (data.text as string) ?? "I couldn't find a match. Please try again.";
  const shortlist = data.shortlist as Record<string, unknown> | null;
  const candidates = (shortlist?.candidates as Record<string, unknown>[]) ?? [];

  if (!candidates.length) return text;

  const lines = candidates.slice(0, 3).map((c, i) => {
    const name = c.name as string;
    const conf = c.confidence_tier as string;
    const summary = c.enrichment_summary as string;
    return `${i + 1}. *${name}* — ${conf}\n   ${summary}`;
  });

  return (
    `${text}\n\n` +
    `*Top matches from the Goods2Load network:*\n\n` +
    lines.join('\n\n') +
    `\n\n_Reply with a name or number to request a rate quote._`
  );
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const params = new URLSearchParams(raw);

  const from = params.get('From') ?? '';
  const message = params.get('Body')?.trim() ?? '';

  if (!from.startsWith('whatsapp:') || !message) {
    return new NextResponse(EMPTY_TWIML, {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // Step 1 — send "searching" immediately via Twilio REST (not TwiML)
  await send(
    from,
    "\u{1F50D} Atlas is searching the Goods2Load network… I'll reply in a moment.",
  );

  // Step 2 — run Atlas pipeline
  try {
    if (!ATLAS_URL) {
      await send(from, '⚠️ Atlas matching engine is not connected yet.');
      return new NextResponse(EMPTY_TWIML, {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    const res = await fetch(`${ATLAS_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, session_id: null }),
      signal: AbortSignal.timeout(55_000),
    });

    if (!res.ok) throw new Error(`Atlas ${res.status}`);

    const data = (await res.json()) as Record<string, unknown>;

    // Step 3 — send full results
    await send(from, formatReply(data));
  } catch (err) {
    console.error('[Hermes] pipeline error', err);
    await send(
      from,
      '⚠️ Sorry — Atlas had trouble with that request. Please try again.',
    );
  }

  return new NextResponse(EMPTY_TWIML, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
