/**
 * POST /api/reply-wa
 * Sends a WhatsApp reply to a cargo owner from the forwarder dashboard.
 * Body: { to: string (whatsapp:+...), message: string }
 */
import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID!;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const FROM = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886';

export async function POST(req: NextRequest) {
  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    return NextResponse.json(
      { error: 'Twilio not configured' },
      { status: 500 },
    );
  }

  const { to, message } = await req.json();
  if (!to || !message) {
    return NextResponse.json(
      { error: 'Missing to or message' },
      { status: 400 },
    );
  }

  try {
    const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
    const toNumber = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    const msg = await client.messages.create({
      from: FROM,
      to: toNumber,
      body: message,
    });
    return NextResponse.json({ sid: msg.sid, status: msg.status });
  } catch (err) {
    console.error('[reply-wa]', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
