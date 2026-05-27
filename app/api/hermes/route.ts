/**
 * Hermes Gateway — WhatsApp → Atlas → WhatsApp
 * =============================================
 * Receives inbound WhatsApp messages from Twilio, immediately acknowledges,
 * then runs the Atlas matching pipeline in the background and sends the
 * full result back to the user via Twilio REST API.
 *
 * Twilio sandbox: +1 415 523 8886 / join alive-look
 * Webhook URL:    https://atlas.goods2load.com/api/hermes
 */
import { waitUntil } from '@vercel/functions';

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export const maxDuration = 60;

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const FROM = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886';
const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');

// ── Twilio client (lazy) ──────────────────────────────────────────────────────
function getClient() {
  return twilio(ACCOUNT_SID, AUTH_TOKEN);
}

// ── Send outbound WhatsApp message ────────────────────────────────────────────
async function send(to: string, body: string) {
  await getClient().messages.create({ from: FROM, to, body });
}

// ── Format Atlas response for WhatsApp ───────────────────────────────────────
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

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const params = new URLSearchParams(raw);

  const from = params.get('From') ?? '';
  const message = params.get('Body')?.trim() ?? '';

  // Ignore empty or non-WhatsApp messages
  if (!from.startsWith('whatsapp:') || !message) {
    return new NextResponse('<?xml version="1.0"?><Response></Response>', {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // ── Immediate TwiML acknowledgment (must reply within 15 s) ──────────────
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>🔍 Atlas is searching the Goods2Load network for verified forwarders… I'll reply in a moment.</Message>
</Response>`;

  // ── Run Atlas pipeline in background after responding ─────────────────────
  waitUntil(
    (async () => {
      if (!ATLAS_URL) {
        await send(from, '⚠️ Atlas matching engine is not connected yet.');
        return;
      }

      try {
        const res = await fetch(`${ATLAS_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, session_id: null }),
          signal: AbortSignal.timeout(55_000),
        });

        if (!res.ok) throw new Error(`Atlas ${res.status}`);

        const data = (await res.json()) as Record<string, unknown>;
        await send(from, formatReply(data));
      } catch (err) {
        console.error('[Hermes] pipeline error', err);
        await send(
          from,
          '⚠️ Sorry — Atlas had trouble with that request. Please try again in a moment.',
        );
      }
    })(),
  );

  return new NextResponse(twiml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
