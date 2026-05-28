/**
 * GET /api/atlas-leads
 * Converts real WhatsApp conversations (from Twilio) into structured Atlas leads
 * for the forwarder dashboard Kanban board.
 * Uses msg.direction — no number format comparison needed.
 */
import { NextResponse } from 'next/server';
import twilio from 'twilio';

export const revalidate = 0;

// ── Parsers ───────────────────────────────────────────────────────────────────

function capitalise(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseRoute(text: string): { origin: string; destination: string } {
  const patterns = [
    /from\s+([A-Za-z\s]+?)\s+to\s+([A-Za-z\s,]+?)(?:\s*[,.\n!?]|$)/i,
    /([A-Za-z\s]+?)\s*(?:→|->|to)\s*([A-Za-z\s,]+?)(?:\s*[,.\n!?]|$)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const origin = m[1]
        .trim()
        .replace(/^(we need|i need|ship|shipping)\s+/i, '');
      return {
        origin: capitalise(origin.slice(0, 30)),
        destination: capitalise(m[2].trim().slice(0, 30)),
      };
    }
  }
  return { origin: 'UAE', destination: 'Iraq' };
}

function guessMode(text: string): 'air' | 'sea' | 'road' {
  const t = text.toLowerCase();
  if (/\bair\b|fly|flight|plane|urgent|express|next.day/.test(t)) return 'air';
  if (/\bsea\b|ocean|vessel|container|fcl|lcl|port/.test(t)) return 'sea';
  return 'road';
}

function guessCargo(text: string): string {
  const t = text.toLowerCase();
  if (/pharma|medicine|drug|medical|cold.?chain|2-?8|gdp/.test(t))
    return 'Pharmaceutical cargo — cold-chain 2–8°C';
  if (/electron|laptop|mobile|computer|device/.test(t))
    return 'Electronics / consumer goods';
  if (/auto|car|vehicle|spare part/.test(t)) return 'Automotive parts';
  if (/food|perishable|fmcg|beverage/.test(t)) return 'Food & beverages';
  if (/chemical|hazmat|dangerous|dg/.test(t)) return 'Chemical / hazmat';
  if (/machine|equipment|industrial|heavy/.test(t))
    return 'Industrial machinery';
  if (/textile|garment|cloth/.test(t)) return 'Textiles & garments';
  return 'General cargo';
}

function guessWeight(text: string): string | undefined {
  const m = text.match(/(\d+[\s,.]?\d*)\s*(kg|ton|tonne|mt|pallets?|ctns?)/i);
  if (m) return `${m[1]} ${m[2]}`;
  return undefined;
}

function getCountryInfo(text: string): { flag: string; country: string } {
  const map: [RegExp, { flag: string; country: string }][] = [
    [/dubai|abu dhabi|sharjah|\buae\b|emarat/i, { flag: '🇦🇪', country: 'UAE' }],
    [/saudi|riyadh|jeddah|ksa\b/i, { flag: '🇸🇦', country: 'Saudi Arabia' }],
    [/\biraq\b|baghdad|basra|erbil/i, { flag: '🇮🇶', country: 'Iraq' }],
    [/\bkuwait\b/i, { flag: '🇰🇼', country: 'Kuwait' }],
    [/pakistan|karachi|lahore|islamabad/i, { flag: '🇵🇰', country: 'Pakistan' }],
    [/\bindia\b|mumbai|delhi|chennai/i, { flag: '🇮🇳', country: 'India' }],
    [/frankfurt|germany|berlin/i, { flag: '🇩🇪', country: 'Germany' }],
    [/london|uk\b|england/i, { flag: '🇬🇧', country: 'UK' }],
    [/china|shanghai|beijing|shenzhen/i, { flag: '🇨🇳', country: 'China' }],
    [/turkey|istanbul|ankara/i, { flag: '🇹🇷', country: 'Turkey' }],
    [/jordan|amman/i, { flag: '🇯🇴', country: 'Jordan' }],
    [/oman|muscat/i, { flag: '🇴🇲', country: 'Oman' }],
  ];
  for (const [re, val] of map) {
    if (re.test(text)) return val;
  }
  return { flag: '🌍', country: 'International' };
}

function parseMatchedForwarders(atlasReply: string): string[] {
  const names: string[] = [];
  for (const line of atlasReply.split('\n')) {
    const m = line.match(/\d+\.\s+\*(.+?)\*/);
    if (m) names.push(m[1].trim());
  }
  return names;
}

function guessMatchScore(text: string): number {
  let score = 60;
  if (/\d/.test(text)) score += 8;
  if (guessWeight(text)) score += 5;
  if (guessCargo(text) !== 'General cargo') score += 10;
  if (/from|to|→/.test(text)) score += 7;
  return Math.min(score, 94);
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Main handler ──────────────────────────────────────────────────────────────

export async function GET() {
  const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
  const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    return NextResponse.json({ leads: [] });
  }

  try {
    const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

    // Fetch ALL messages — use direction field, not number comparison
    const all = await client.messages.list({ limit: 200 });

    all.sort(
      (a, b) =>
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
    );

    // Group by external party phone
    const convMap = new Map<
      string,
      Array<{
        direction: 'inbound' | 'outbound';
        body: string;
        dateCreated: Date;
      }>
    >();

    for (const msg of all) {
      if (
        !msg.from?.startsWith('whatsapp:') &&
        !msg.to?.startsWith('whatsapp:')
      )
        continue;

      const isOutbound = msg.direction?.startsWith('outbound');
      const other = isOutbound ? msg.to : msg.from;
      if (!other) continue;

      if (!convMap.has(other)) convMap.set(other, []);
      convMap.get(other)!.push({
        direction: isOutbound ? 'outbound' : 'inbound',
        body: msg.body ?? '',
        dateCreated:
          msg.dateCreated instanceof Date
            ? msg.dateCreated
            : new Date(msg.dateCreated ?? Date.now()),
      });
    }

    const leads = [];
    let idx = 0;

    for (const [phone, messages] of convMap.entries()) {
      const inquiry = messages.find(
        (m) => m.direction === 'inbound' && m.body.length > 10,
      );
      if (!inquiry) continue;

      const atlasReply = messages.find(
        (m) => m.direction === 'outbound' && m.body.includes('Top matches'),
      );

      const text = inquiry.body;
      const route = parseRoute(text);
      const mode = guessMode(text);
      const cargo = guessCargo(text);
      const weight = guessWeight(text);
      const country = getCountryInfo(text);
      const score = guessMatchScore(text);
      const matchedFwds = atlasReply
        ? parseMatchedForwarders(atlasReply.body)
        : [];
      const displayPhone = phone.replace('whatsapp:', '');
      const shortPhone = displayPhone.slice(-7);

      const momentumMsg = atlasReply
        ? atlasReply.body.slice(0, 200) +
          (atlasReply.body.length > 200 ? '…' : '')
        : undefined;

      leads.push({
        id: `wa-live-${idx++}`,
        channel: 'whatsapp' as const,
        status: 'new' as const,
        from: `WhatsApp ${shortPhone}`,
        company:
          matchedFwds.length > 0
            ? `Matched: ${matchedFwds.slice(0, 2).join(', ')}`
            : 'Unmatched inquiry',
        country: country.country,
        flag: country.flag,
        cargo,
        mode,
        weight,
        origin: route.origin,
        destination: route.destination,
        time: formatRelativeTime(inquiry.dateCreated.toISOString()),
        matchScore: score,
        winProbability: Math.round(score * 0.85),
        matchReasons: [
          ...(matchedFwds.length > 0
            ? [`Atlas matched: ${matchedFwds[0]}`]
            : []),
          `Route: ${route.origin} → ${route.destination}`,
          `Mode: ${mode.charAt(0).toUpperCase() + mode.slice(1)} freight`,
        ],
        momentumSent: !!atlasReply,
        momentumTime: atlasReply
          ? formatRelativeTime(inquiry.dateCreated.toISOString())
          : undefined,
        momentumMessage: momentumMsg,
        isLive: true,
        rawPhone: displayPhone,
        rawText: text,
      });
    }

    return NextResponse.json({ leads });
  } catch (err) {
    console.error('[atlas-leads]', err);
    return NextResponse.json({ leads: [], error: String(err) });
  }
}
