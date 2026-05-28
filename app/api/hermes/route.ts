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

const WELCOME_MESSAGE =
  `Hey! This is Atlas 👋\n` +
  `What's your shipment requirement today?\n\n` +
  `Send your shipment details to get matched with the right logistics providers on Goods2Load.\n` +
  `More details = better matches.`;

// ── Greeting detection ────────────────────────────────────────────────────────
const GREETING_PATTERNS = [
  /^(hi|hey|hello|hola|howdy|greetings|sup|yo|salut|ciao|hiya|bonjour)[\s!.,?]*$/i,
  /^(good\s+(morning|afternoon|evening|day|night))[\s!.,?]*$/i,
  /^(how are you|how r u|what's up|whats up|wassup|wazzup)[\s!.,?]*$/i,
  /^(start|begin|help|menu|info|test|ping|ok|okay|k|sure|yes|no|maybe)[\s!.,?]*$/i,
  /^(who are you|what are you|what can you do|what do you do)[\s!.,?]*$/i,
  /^(thanks|thank you|thx|ty|cheers|noted|got it|great|nice|cool|awesome|perfect)[\s!.,?]*$/i,
];

function isGreeting(msg: string): boolean {
  const trimmed = msg.trim();
  // Short messages with no freight keywords are likely greetings
  if (
    trimmed.length < 15 &&
    !/\b(kg|ton|fcl|lcl|air|sea|road|freight|cargo|ship|from|to)\b/i.test(
      trimmed,
    )
  ) {
    return true;
  }
  return GREETING_PATTERNS.some((re) => re.test(trimmed));
}

// ── Compare intent detection ──────────────────────────────────────────────────
// Catches "compare X and Y", "X vs Y", "which is better X or Y", etc.
// Guard: must NOT contain freight keywords (avoids "air vs sea" being treated as compare)
function detectCompare(msg: string): { a: string; b: string } | null {
  const t = msg.trim();
  // Skip if it looks like a freight query
  if (
    /\b(kg|ton|fcl|lcl|air|sea|road|freight|cargo|ship|from|to|pharma|cold)\b/i.test(
      t,
    )
  )
    return null;

  const clean = (s: string) =>
    s
      .replace(/\s+(?:for|in|on|from|to|regarding|about)\b.*$/i, '')
      .replace(/\s+(?:please|thanks|thank you)[.!?,]*$/i, '')
      .replace(/[.!?,]$/, '')
      .trim();

  const patterns = [
    /^compare\s+(.+?)\s+(?:and|vs\.?|versus|with)\s+(.+)$/i,
    /^(.+?)\s+(?:vs\.?|versus)\s+(.+)$/i,
    /^which(?:\s+(?:is|one))?\s+(?:is\s+)?better[,:]?\s+(.+?)\s+(?:or|vs\.?)\s+(.+)$/i,
    /^(?:difference|diff)\s+between\s+(.+?)\s+and\s+(.+)$/i,
    /^(?:who|which)\s+(?:is|are)\s+better[,:]?\s+(.+?)\s+(?:or|vs\.?)\s+(.+)$/i,
  ];
  for (const re of patterns) {
    const m = t.match(re);
    if (m) {
      const a = clean(m[1]);
      const b = clean(m[2]);
      if (a.length >= 2 && b.length >= 2) return { a, b };
    }
  }
  return null;
}

// ── Two-provider booking detection ───────────────────────────────────────────
// Catches "book with Mateen and ADSO", "proceed with X and Y", etc.
function extractTwoProviders(msg: string): [string, string] | null {
  const clean = (s: string) =>
    s
      .replace(/\s+(?:please|thanks|thank you)[.!?,]*$/i, '')
      .replace(/[.!?,]$/, '')
      .trim();
  const m =
    msg.match(
      /(?:book|go|proceed|select|choose|use|hire)\s+with\s+(.+?)\s+and\s+(.+)/i,
    ) ?? msg.match(/(?:book|select|choose)\s+(.+?)\s+and\s+(.+)/i);
  if (!m) return null;
  const a = clean(m[1]);
  const b = clean(m[2]);
  // Sanity: both names plausible (not generic single words like "both", "all")
  if (
    a.length >= 2 &&
    b.length >= 2 &&
    !/^(both|all|them|these|those)$/i.test(a)
  )
    return [a, b];
  return null;
}

// ── Booking intent detection ──────────────────────────────────────────────────
const BOOKING_KEYWORDS = [
  'book',
  'rate request',
  'request rate',
  'send rate',
  'get rate',
  'get quote',
  'request quote',
  'send quote',
  'contact',
  'reach out',
  'connect me',
  'proceed with',
  'go with',
  'go ahead',
  'choose',
  'select',
  'use this',
  'hire',
  'enquire',
  'inquire',
  'work with',
];

function detectBookingIntent(msg: string): boolean {
  const lower = msg.toLowerCase();
  return BOOKING_KEYWORDS.some((k) => lower.includes(k));
}

// Extract provider name from natural-language booking phrases
function extractProviderName(msg: string): string | null {
  const patterns = [
    // "book / go / proceed / work / connect / partner with X"
    /(?:book|go|proceed|work|connect|partner)\s+with\s+(.+)/i,
    // "choose / select / hire / contact / use X"
    /(?:choose|select|hire|contact|use)\s+(.+)/i,
    // "send / get rate|quote to / for / from X"
    /(?:send|get)\s+(?:a\s+)?(?:rates?|quotes?)\s+(?:request\s+)?(?:to|for|from)\s+(.+)/i,
    // "request a rate / quote from / for / to X"
    /request\s+(?:a\s+)?(?:rates?|quotes?)\s+(?:request\s+)?(?:from|for|to)\s+(.+)/i,
    // "rate request / quote for / to X"
    /(?:rate\s+request|quote)\s+(?:for|to)\s+(.+)/i,
    // "reach out to X"
    /reach\s+out\s+(?:to\s+)?(.+)/i,
    // "connect me to / with X"
    /connect\s+me\s+(?:to|with)\s+(.+)/i,
    // "enquire / inquire with / about X"
    /(?:enquire|inquire)\s+(?:with|about)?\s*(.+)/i,
  ];
  for (const re of patterns) {
    const m = msg.match(re);
    if (m) {
      // Strip trailing filler words and punctuation
      return m[1]
        .replace(/\s+(?:please|thanks|thank you)[.!?,]*$/i, '')
        .replace(/[.!?,]$/, '')
        .trim();
    }
  }
  return null;
}

function makeBookingConfirmation(providerName: string): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  const ref = `G2L-${date}-${rand}`;
  return (
    `✅ *Rate request submitted!*\n\n` +
    `*Forwarder:* ${providerName}\n` +
    `*Reference:* ${ref}\n\n` +
    `Goods2Load will connect you within 24 hours.\n` +
    `For urgent follow-up, WhatsApp us: +971 50 557 4291`
  );
}

async function send(to: string, body: string): Promise<string> {
  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    throw new Error('Twilio credentials not configured');
  }
  const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
  const msg = await client.messages.create({ from: FROM, to, body });
  return msg.sid;
}

// GLEC v3.1 emission factors (kg CO₂e per tonne-km) — mirrors a2a/route.ts
const HERMES_EMISSION_FACTORS = { road: 0.062, sea: 0.015, air: 0.57 } as const;
const HERMES_CORRIDORS: {
  orig: RegExp;
  dest: RegExp;
  road?: number;
  sea?: number;
  air: number;
}[] = [
  {
    orig: /dubai|uae/,
    dest: /iraq|baghdad|basra/,
    road: 1450,
    sea: 850,
    air: 2200,
  },
  { orig: /dubai|uae/, dest: /riyadh|jeddah|saudi/, road: 880, air: 1000 },
  { orig: /dubai|uae/, dest: /mumbai|india/, sea: 1900, air: 2200 },
  { orig: /dubai|uae/, dest: /amman|jordan/, road: 2400, sea: 3100, air: 2600 },
  { orig: /dubai|uae/, dest: /cairo|egypt/, road: 3600, sea: 3700, air: 3200 },
];

function quickCO2Note(message: string): string | null {
  const routeMatch = message.match(
    /from\s+([A-Za-z\s]+?)\s+to\s+([A-Za-z\s,]+?)(?:\s*[,.\n!?]|$)/i,
  );
  if (!routeMatch) return null;
  const orig = routeMatch[1].trim().slice(0, 20).toLowerCase();
  const dest = routeMatch[2].trim().slice(0, 20).toLowerCase();
  const msg = message.toLowerCase();
  const mode: 'air' | 'sea' | 'road' = /\bair\b|flight|urgent/.test(msg)
    ? 'air'
    : /sea|ocean|fcl|lcl/.test(msg)
      ? 'sea'
      : 'road';
  const cold = /cold|pharma|2-8|temperature|vaccine/i.test(message);

  let distKm = mode === 'road' ? 2000 : mode === 'sea' ? 3000 : 2500;
  let altDistKm: number | undefined;
  const altMode: 'air' | 'sea' | 'road' = mode === 'air' ? 'road' : 'air';

  for (const c of HERMES_CORRIDORS) {
    if (
      (c.orig.test(orig) || c.orig.test(dest)) &&
      (c.dest.test(dest) || c.dest.test(orig))
    ) {
      const d = mode === 'road' ? c.road : mode === 'sea' ? c.sea : c.air;
      if (d) distKm = d;
      altDistKm = altMode === 'road' ? c.road : c.air;
      break;
    }
  }

  const wt = 1; // 1 tonne default
  let co2 = distKm * HERMES_EMISSION_FACTORS[mode] * wt;
  if (cold) co2 *= mode === 'road' ? 1.3 : mode === 'sea' ? 1.2 : 1.05;
  const co2Kg = Math.round(co2);

  const modeIcon = mode === 'air' ? '✈️' : mode === 'sea' ? '🚢' : '🚛';
  let note = `🌱 ${modeIcon} ~${co2Kg} kg CO₂e`;

  if (altDistKm) {
    let altCO2 = altDistKm * HERMES_EMISSION_FACTORS[altMode] * wt;
    if (cold) altCO2 *= altMode === 'road' ? 1.3 : 1.05;
    const altCo2Kg = Math.round(altCO2);
    const altIcon = altMode === 'air' ? '✈️' : '🚛';
    if (altCo2Kg > co2Kg) {
      const times = (altCo2Kg / co2Kg).toFixed(1);
      note += ` · ${altIcon} air: ~${altCo2Kg} kg (${times}× more)`;
    } else if (altCo2Kg < co2Kg) {
      const pct = Math.round((1 - altCo2Kg / co2Kg) * 100);
      note += ` · ${altIcon} ${altMode}: ~${altCo2Kg} kg (${pct}% less)`;
    }
  }

  return note;
}

// Returns [summaryMessage, shortlistMessage] — sent as two WhatsApp messages
function formatReply(
  data: Record<string, unknown>,
  originalMessage = '',
): [string, string | null] {
  const fullText =
    (data.text as string) ?? "I couldn't find a match. Please try again.";
  const shortlist = data.shortlist as Record<string, unknown> | null;
  const candidates = (shortlist?.candidates as Record<string, unknown>[]) ?? [];

  // Trim Atlas text to first 2 sentences to keep it concise
  const sentences = fullText.match(/[^.!?]+[.!?]+/g) ?? [fullText];
  const summary = sentences.slice(0, 2).join(' ').trim().slice(0, 600);

  if (!candidates.length) return [summary, null];

  // ── Consistency guard ─────────────────────────────────────────────────────
  // Atlas text and the candidates array can be ranked differently.
  // If the summary mentions a forwarder that sits outside the top-3 window,
  // move it to position 0 so the #1 recommendation is always visible.
  const summaryLower = summary.toLowerCase();
  const reranked = [...candidates];
  const prominentIdx = reranked.findIndex((c) => {
    // Match any word of the forwarder name that's >3 chars (avoids noise words)
    return (c.name as string)
      .toLowerCase()
      .split(/\s+/)
      .some((part) => part.length > 3 && summaryLower.includes(part));
  });
  if (prominentIdx > 0) {
    // Candidate is in the list but not at position 0 — promote it
    const [top] = reranked.splice(prominentIdx, 1);
    reranked.unshift(top);
  }

  const lines = reranked.slice(0, 3).map((c, i) => {
    const name = c.name as string;
    const conf = c.confidence_tier as string;
    const enrichment = (c.enrichment_summary as string).slice(0, 120);
    return `${i + 1}. *${name}* — ${conf}\n   ${enrichment}`;
  });

  const co2Note = originalMessage ? quickCO2Note(originalMessage) : null;

  const shortlistMsg =
    `*Top matches from the Goods2Load network:*\n\n` +
    lines.join('\n\n') +
    `\n\n_Reply with a name or number to request a rate quote._` +
    (co2Note ? `\n\n_${co2Note}_` : '');

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

  // ── Two-provider booking ("book with X and Y") ──────────────────────────
  // Must run BEFORE single-provider booking so "book with A and B" isn't
  // captured as a single provider named "A and B".
  const twoProv = extractTwoProviders(message);
  if (twoProv) {
    const [provA, provB] = twoProv;
    const baseUrl = process.env.NEXTAUTH_URL ?? 'https://atlas.goods2load.com';
    for (const prov of [provA, provB]) {
      const confirmation = makeBookingConfirmation(prov);
      await send(from, confirmation);
      const ref =
        confirmation.match(/\*Reference:\*\s*(G2L-[^\s\n]+)/)?.[1] ?? '';
      fetch(`${baseUrl}/api/a2a`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking_notification',
          forwarder: prov,
          reference: ref,
          cargo: message,
          clientPhone: from.replace('whatsapp:', ''),
        }),
      }).catch(() => {});
    }
    return new NextResponse(EMPTY_TWIML, {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // ── Single-provider booking intent ───────────────────────────────────────
  // (checked before greeting so "book with X" is never mistaken for a greeting)
  if (detectBookingIntent(message)) {
    const provider = extractProviderName(message);
    if (provider) {
      const confirmation = makeBookingConfirmation(provider);
      await send(from, confirmation);

      // ── A2A: notify forwarder agent dashboard ──────────────────────────
      const ref =
        confirmation.match(/\*Reference:\*\s*(G2L-[^\s\n]+)/)?.[1] ?? '';
      const baseUrl =
        process.env.NEXTAUTH_URL ?? 'https://atlas.goods2load.com';
      fetch(`${baseUrl}/api/a2a`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking_notification',
          forwarder: provider,
          reference: ref,
          cargo: message,
          clientPhone: from.replace('whatsapp:', ''),
        }),
      }).catch(() => {}); // fire-and-forget

      return new NextResponse(EMPTY_TWIML, {
        headers: { 'Content-Type': 'text/xml' },
      });
    }
    // Intent detected but no name found — ask to clarify
    await send(
      from,
      'Which forwarder would you like to book with? Reply with the name from your last search.',
    );
    return new NextResponse(EMPTY_TWIML, {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // ── Compare intent ────────────────────────────────────────────────────────
  // "compare Mateen and ADSO", "Mateen vs Avgo", "which is better X or Y"
  const comparison = detectCompare(message);
  if (comparison) {
    const { a, b } = comparison;
    console.log('[Hermes] compare intent', a, 'vs', b);

    // Send thinking ack
    await send(from, `🔍 Comparing *${a}* vs *${b}*…`).catch(() => {});

    // Ask Atlas for a comparison (session_id keeps cargo context)
    let comparisonText = '';
    try {
      if (!ATLAS_URL) throw new Error('no atlas url');
      const res = await fetch(`${ATLAS_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Compare ${a} vs ${b}: which is better suited for my shipment requirements? Summarise their key differences — specialisations, verified capabilities, and which you recommend.`,
          session_id: from.replace('whatsapp:', ''),
        }),
        signal: AbortSignal.timeout(30_000),
      });
      if (res.ok) {
        const data = (await res.json()) as Record<string, unknown>;
        const fullText = (data.text as string) ?? '';
        const sentences = fullText.match(/[^.!?]+[.!?]+/g) ?? [fullText];
        comparisonText = sentences.slice(0, 4).join(' ').trim().slice(0, 700);
      }
    } catch (e) {
      console.warn('[Hermes] compare Atlas call failed:', e);
    }

    // Fallback if Atlas returns nothing useful
    if (!comparisonText || comparisonText.length < 30) {
      comparisonText =
        `Both *${a}* and *${b}* are verified freight forwarders on the Goods2Load network. ` +
        `They have strong capability profiles for your route. ` +
        `Atlas has matched both based on your cargo requirements — ` +
        `${a} may have an edge on specialised handling, while ${b} offers competitive transit times. ` +
        `You can request a rate from either or both.`;
    }

    await send(from, comparisonText);

    // Booking prompt — clearly offer all options
    await send(
      from,
      `Which forwarder would you like a rate quote from?\n\n` +
        `→ Reply *${a}* — request from ${a} only\n` +
        `→ Reply *${b}* — request from ${b} only\n` +
        `→ Reply *book with ${a} and ${b}* — receive quotes from both\n\n` +
        `_Both are on the Goods2Load verified network._`,
    );

    return new NextResponse(EMPTY_TWIML, {
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  // ── Greeting: respond with welcome, don't run the pipeline ──────────────
  if (isGreeting(message)) {
    await send(from, WELCOME_MESSAGE);
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

    const [summary, shortlist] = formatReply(data, message);
    await send(from, summary);
    if (shortlist) await send(from, shortlist);
    // NOTE: Forwarder Agent (Layer 2) is NOT triggered here.
    // It only activates on explicit booking intent ("Book with X") below.
    // Sending an unsolicited ACK from a forwarder after the shortlist
    // is premature — the cargo owner needs space to ask questions first.
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
