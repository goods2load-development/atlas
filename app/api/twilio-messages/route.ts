/**
 * GET /api/twilio-messages
 * Returns real WhatsApp conversation history from Twilio, grouped by phone number.
 * Uses msg.direction (built-in Twilio field) — no number format comparison needed.
 */
import { NextResponse } from 'next/server';
import twilio from 'twilio';

export const revalidate = 0;

function parseMatchedForwarders(text: string): string[] {
  const names: string[] = [];
  for (const line of text.split('\n')) {
    const m = line.match(/\d+\.\s+\*(.+?)\*/);
    if (m) names.push(m[1].trim());
  }
  return names;
}

export async function GET() {
  const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    return NextResponse.json(
      { error: 'Twilio not configured', conversations: [] },
      { status: 500 },
    );
  }

  try {
    const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

    // Fetch ALL messages for this account — let Twilio handle auth, not us filter by number
    const all = await client.messages.list({ limit: 200 });

    // Sort oldest-first
    all.sort(
      (a, b) =>
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
    );

    // Group by the EXTERNAL party's phone number
    // Twilio direction field: 'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply'
    const convMap = new Map<
      string,
      Array<{
        sid: string;
        direction: 'inbound' | 'outbound';
        body: string;
        dateCreated: string;
        status: string;
      }>
    >();

    for (const msg of all) {
      // Skip non-WhatsApp messages
      if (
        !msg.from?.startsWith('whatsapp:') &&
        !msg.to?.startsWith('whatsapp:')
      )
        continue;

      const isOutbound = msg.direction?.startsWith('outbound');
      // External party = inbound sender OR outbound recipient
      const other = isOutbound ? msg.to : msg.from;
      if (!other) continue;

      if (!convMap.has(other)) convMap.set(other, []);
      convMap.get(other)!.push({
        sid: msg.sid,
        direction: isOutbound ? 'outbound' : 'inbound',
        body: msg.body ?? '',
        dateCreated:
          msg.dateCreated instanceof Date
            ? msg.dateCreated.toISOString()
            : String(msg.dateCreated ?? new Date().toISOString()),
        status: msg.status ?? '',
      });
    }

    const conversations = Array.from(convMap.entries())
      .map(([phone, messages]) => {
        const atlasReply = messages.find(
          (m) => m.direction === 'outbound' && m.body.includes('Top matches'),
        );
        const firstInbound = messages.find((m) => m.direction === 'inbound');
        return {
          phone,
          displayPhone: phone.replace('whatsapp:', ''),
          messages,
          lastActivity:
            messages[messages.length - 1]?.dateCreated ??
            new Date().toISOString(),
          inquiryText: firstInbound?.body ?? '',
          hasAtlasReply: !!atlasReply,
          matchedForwarders: atlasReply
            ? parseMatchedForwarders(atlasReply.body)
            : [],
        };
      })
      .sort(
        (a, b) =>
          new Date(b.lastActivity).getTime() -
          new Date(a.lastActivity).getTime(),
      );

    return NextResponse.json({ conversations, total: conversations.length });
  } catch (err) {
    console.error('[twilio-messages]', err);
    return NextResponse.json(
      { error: String(err), conversations: [] },
      { status: 500 },
    );
  }
}
