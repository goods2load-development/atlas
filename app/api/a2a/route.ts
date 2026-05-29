/**
 * Atlas A2A Agent Endpoint
 * ========================
 * Implements Google's Agent-to-Agent (A2A) protocol.
 *
 * GET  /api/a2a?forwarder=ADSO          → returns leads routed to that forwarder
 * POST /api/a2a                          → accepts A2A tasks:
 *   type: "lead_notification"   → Forwarder Agent sends ACK to cargo owner
 *   type: "booking_notification"→ Forwarder Agent sends rate quote to cargo owner
 *   (default)                   → standard A2A freight-match task
 *
 * A2A2A Architecture:
 *   Atlas (Layer 1, router) → Forwarder Agent (Layer 2, this file) → Carrier Agents (Layer 3)
 *
 * Storage: Twilio message history is the source of truth.
 */
import { createLogger, newTraceId } from '@/lib/logger';

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export const revalidate = 0;

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_WHATSAPP_FROM ?? 'whatsapp:+14155238886';

// ── Parsers ────────────────────────────────────────────────────────────────────

function normalise(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function fuzzyMatch(forwarder: string, text: string): boolean {
  const f = normalise(forwarder);
  const t = normalise(text);
  // Full match or the forwarder name is contained in the text
  return t.includes(f) || f.includes(t.slice(0, Math.min(f.length, 8)));
}

function parseMatchedForwarders(text: string): string[] {
  const names: string[] = [];
  for (const line of text.split('\n')) {
    const m = line.match(/\d+\.\s+\*(.+?)\*/);
    if (m) names.push(m[1].trim());
  }
  return names;
}

function parseBookingForwarder(text: string): string | null {
  const m = text.match(/\*Forwarder:\*\s*(.+)/);
  return m ? m[1].trim() : null;
}

function parseBookingRef(text: string): string | null {
  const m = text.match(/\*Reference:\*\s*(G2L-[^\s\n]+)/);
  return m ? m[1].trim() : null;
}

function capitalise(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseRoute(text: string): { origin: string; destination: string } {
  const p = /from\s+([A-Za-z\s]+?)\s+to\s+([A-Za-z\s,]+?)(?:\s*[,.\n!?]|$)/i;
  const m = text.match(p);
  if (m)
    return {
      origin: capitalise(m[1].trim().slice(0, 25)),
      destination: capitalise(m[2].trim().slice(0, 25)),
    };
  return { origin: 'UAE', destination: 'Iraq' };
}

function guessMode(text: string): 'air' | 'sea' | 'road' {
  const t = text.toLowerCase();
  if (/\bair\b|flight|plane|urgent/.test(t)) return 'air';
  if (/sea|ocean|container|fcl|lcl/.test(t)) return 'sea';
  return 'road';
}

function formatRelativeTime(d: Date): string {
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Sustainability: GLEC v3.1 CO₂ estimator ───────────────────────────────────

/** Emission intensity factors (kg CO₂e per tonne-km) — GLEC Framework v3.1 */
const EMISSION_FACTORS = {
  road: 0.062, // TL diesel HGV
  sea: 0.015, // container / general cargo vessel
  air: 0.57, // weighted belly + full-freighter average
} as const;

/** Approximate distances (km) for UAE-origin corridors */
const CORRIDOR_KM: {
  orig: RegExp;
  dest: RegExp;
  road?: number;
  sea?: number;
  air: number;
}[] = [
  {
    orig: /dubai|dxb|uae/,
    dest: /iraq|baghdad|basra|bgw|mosul/,
    road: 1450,
    sea: 850,
    air: 2200,
  },
  { orig: /dubai|uae/, dest: /riyadh|jeddah|saudi|ksa/, road: 880, air: 1000 },
  { orig: /dubai|uae/, dest: /mumbai|india|bom/, sea: 1900, air: 2200 },
  {
    orig: /dubai|uae/,
    dest: /amman|jordan/,
    road: 2400,
    sea: 3100,
    air: 2600,
  },
  {
    orig: /dubai|uae/,
    dest: /beirut|lebanon/,
    road: 3200,
    sea: 2900,
    air: 3000,
  },
  {
    orig: /dubai|uae/,
    dest: /cairo|egypt/,
    road: 3600,
    sea: 3700,
    air: 3200,
  },
  {
    orig: /dubai|uae/,
    dest: /karachi|pakistan/,
    sea: 1500,
    air: 1800,
  },
];

function estimateCO2(
  origin: string,
  destination: string,
  mode: 'air' | 'sea' | 'road',
  weightKg = 1000,
  isColdChain = false,
): { co2Kg: number; altCo2Kg?: number; altMode?: 'air' | 'sea' | 'road' } {
  const orig = origin.toLowerCase();
  const dest = destination.toLowerCase();

  // Find corridor
  let roadKm: number | undefined;
  let seaKm: number | undefined;
  let airKm = 2500;
  for (const c of CORRIDOR_KM) {
    if (
      (c.orig.test(orig) || c.orig.test(dest)) &&
      (c.dest.test(dest) || c.dest.test(orig))
    ) {
      if (c.road !== undefined) roadKm = c.road;
      if (c.sea !== undefined) seaKm = c.sea;
      airKm = c.air;
      break;
    }
  }

  const distKm =
    mode === 'road'
      ? (roadKm ?? 2000)
      : mode === 'sea'
        ? (seaKm ?? 3000)
        : airKm;
  const wt = weightKg / 1000;
  let co2Kg = distKm * EMISSION_FACTORS[mode] * wt;
  if (isColdChain) co2Kg *= mode === 'road' ? 1.3 : mode === 'sea' ? 1.2 : 1.05;
  co2Kg = Math.round(co2Kg);

  // Best alternative for comparison
  let altCo2Kg: number | undefined;
  let altMode: 'air' | 'sea' | 'road' | undefined;
  if (mode === 'air') {
    const altDist = roadKm ?? seaKm;
    if (altDist) {
      altMode = roadKm ? 'road' : 'sea';
      let alt = altDist * EMISSION_FACTORS[altMode] * wt;
      if (isColdChain) alt *= altMode === 'road' ? 1.3 : 1.2;
      altCo2Kg = Math.round(alt);
    }
  } else {
    // Show what air would cost — makes road/sea look great
    let alt = airKm * EMISSION_FACTORS['air'] * wt;
    if (isColdChain) alt *= 1.05;
    altCo2Kg = Math.round(alt);
    altMode = 'air';
  }

  return { co2Kg, altCo2Kg, altMode };
}

// ── Layer 3: Maersk Carrier Agent ─────────────────────────────────────────────

/**
 * Fetches live schedule data from Maersk Point-to-Point Schedules API (Layer 3).
 * Requires MAERSK_API_KEY env var — request Premium access at:
 *   developer.maersk.com → Ocean Commercial Schedules [DCSA] → Request Access
 *
 * Track & Trace (free) also available once app is registered at developer.maersk.com.
 * Falls back to corridor-based estimates until the key is configured.
 */
async function fetchMaerskCarrierData(
  origin: string,
  destination: string,
  mode: 'air' | 'sea' | 'road',
): Promise<{
  transitDays: string;
  nextDeparture: string | null;
  carrier: string;
  source: 'maersk_api' | 'estimate';
}> {
  const apiKey = process.env.MAERSK_API_KEY;

  if (apiKey && mode === 'sea') {
    try {
      // Maersk Point-to-Point Schedules — DCSA standard
      const url = new URL('https://api.maersk.com/products/ocean-products');
      url.searchParams.set('portOfLoad', origin);
      url.searchParams.set('portOfDischarge', destination);
      const res = await fetch(url.toString(), {
        headers: { 'Consumer-Key': apiKey, Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        const data = (await res.json()) as Record<string, unknown>;
        const products = data?.oceanProducts as
          | Record<string, unknown>[]
          | undefined;
        const first = products?.[0];
        if (first) {
          const transitHours = (first.transitTime as number) ?? 240;
          const departure =
            (first.departureDateTime as string)?.slice(0, 10) ?? null;
          return {
            transitDays: `${Math.round(transitHours / 24)} days`,
            nextDeparture: departure,
            carrier: 'Maersk',
            source: 'maersk_api',
          };
        }
      }
    } catch (e) {
      console.warn('[MaerskAgent] API unavailable, using estimate:', e);
    }
  }

  // Fallback: corridor-based schedule estimate
  const both = `${origin} ${destination}`.toLowerCase();
  let transitDays =
    mode === 'sea' ? '7-12 days' : mode === 'air' ? '24-48 hours' : '4-6 days';
  if (both.match(/dubai|uae/) && both.match(/iraq|basra/)) {
    transitDays =
      mode === 'sea'
        ? '5-7 days (Umm Qasr)'
        : mode === 'road'
          ? '3-5 days'
          : '24-48 hours';
  } else if (both.match(/dubai|uae/) && both.match(/mumbai|india/)) {
    transitDays = mode === 'sea' ? '7-10 days' : '24-48 hours';
  } else if (both.match(/dubai|uae/) && both.match(/cairo|egypt/)) {
    transitDays = mode === 'sea' ? '8-12 days' : '3-4 days';
  }

  return {
    transitDays,
    nextDeparture: null,
    carrier: 'Maersk',
    source: 'estimate',
  };
}

// ── Forwarder Agent helpers ────────────────────────────────────────────────────

/**
 * Smart rate estimator — returns a realistic USD range for the route.
 * Will be replaced by live Maersk / carrier API calls once API access is granted.
 */
function estimateRate(
  cargo: string,
  origin: string,
  destination: string,
  mode: 'air' | 'sea' | 'road',
): { min: number; max: number; transit: string; isColdChain: boolean } {
  const lower = cargo.toLowerCase();
  const isColdChain = /cold|pharma|medical|2-8|vaccine|temperature|gdp/.test(
    lower,
  );
  const isHazmat = /hazmat|dangerous|adr|class\s*\d/.test(lower);

  // Base rates (USD) — road defaults, major corridors
  let min = 2000;
  let max = 2800;
  let transit = '4-6 days';

  const both = `${origin} ${destination}`.toLowerCase();
  if (both.match(/dubai|dxb|uae/) && both.match(/iraq|baghdad|basra|bgw/)) {
    min = 1600;
    max = 2200;
    transit = '3-5 days';
  } else if (both.match(/dubai|uae/) && both.match(/saudi|riyadh|jeddah/)) {
    min = 700;
    max = 1200;
    transit = '1-2 days';
  } else if (both.match(/dubai|uae/) && both.match(/mumbai|india|bom/)) {
    min = 1000;
    max = 1600;
    transit = '2-4 days';
  } else if (both.match(/dubai|uae/) && both.match(/amman|jordan/)) {
    min = 1400;
    max = 2000;
    transit = '2-4 days';
  } else if (both.match(/dubai|uae/) && both.match(/beirut|lebanon/)) {
    min = 1800;
    max = 2600;
    transit = '3-5 days';
  } else if (both.match(/dubai|uae/) && both.match(/cairo|egypt/)) {
    min = 1500;
    max = 2100;
    transit = '2-4 days';
  }

  if (mode === 'air') {
    min = Math.round(min * 2.8);
    max = Math.round(max * 3.2);
    transit = '24-48 hours';
  } else if (mode === 'sea') {
    min = Math.round(min * 0.65);
    max = Math.round(max * 0.75);
    transit = '7-12 days';
  }

  if (isColdChain) {
    min += 300;
    max += 550;
  }
  if (isHazmat) {
    min += 500;
    max += 800;
  }

  return {
    min: Math.round(min / 50) * 50,
    max: Math.round(max / 50) * 50,
    transit,
    isColdChain,
  };
}

/**
 * Forwarder Agent ACK — sent when Atlas routes a new lead to the forwarder.
 * Tells the cargo owner that their inquiry has been picked up.
 */
function buildForwarderACK(
  forwarder: string,
  cargo: string,
  route: { origin: string; destination: string },
): string {
  const lower = cargo.toLowerCase();
  const isColdChain = /cold|pharma|2-8|temperature|vaccine|gdp/.test(lower);
  const mode = guessMode(cargo);
  const modeLabel = mode === 'air' ? 'air' : mode === 'sea' ? 'sea' : 'road';

  return (
    `🚛 *${forwarder}* · via Goods2Load\n\n` +
    `Hi! We picked up your ${isColdChain ? 'cold-chain ' : ''}${modeLabel} freight inquiry for ` +
    `*${route.origin} → ${route.destination}*.\n\n` +
    `Our Atlas routing agent is already calculating the optimal solution. ` +
    `We'll send you a full rate quote in just a moment.\n\n` +
    `_Goods2Load Autonomous Freight Network_`
  );
}

/**
 * Forwarder Agent rate quote — sent after a cargo owner books with a specific forwarder.
 * Includes estimated rates (to be replaced with live Maersk/carrier data).
 */
function buildRateQuote(
  forwarder: string,
  reference: string,
  cargo: string,
): string {
  const route = parseRoute(cargo);
  const mode = guessMode(cargo);
  const { min, max, transit, isColdChain } = estimateRate(
    cargo,
    route.origin,
    route.destination,
    mode,
  );
  const { co2Kg, altCo2Kg, altMode } = estimateCO2(
    route.origin,
    route.destination,
    mode,
    1000,
    isColdChain,
  );

  const modeIcon = mode === 'air' ? '✈️' : mode === 'sea' ? '🚢' : '🚛';
  const coldLabel = isColdChain ? ' · Cold Chain 2–8°C' : '';

  // CO2 line with comparison hint
  let co2Line = `🌱 *CO₂e:* ~${co2Kg.toLocaleString()} kg`;
  if (altCo2Kg !== undefined && altMode) {
    const altIcon = altMode === 'air' ? '✈️' : altMode === 'sea' ? '🚢' : '🚛';
    if (altCo2Kg > co2Kg) {
      const times = (altCo2Kg / co2Kg).toFixed(1);
      co2Line += ` _(${altIcon} air: ~${altCo2Kg.toLocaleString()} kg · ${times}× more)_`;
    } else {
      const pct = Math.round((1 - altCo2Kg / co2Kg) * 100);
      co2Line += ` _(${altIcon} ${altMode}: ~${altCo2Kg.toLocaleString()} kg · ${pct}% less)_`;
    }
  }

  return (
    `📋 *Rate Quote — ${reference}*\n\n` +
    `${modeIcon} *${route.origin} → ${route.destination}*${coldLabel}\n` +
    `*Estimated Rate:* $${min.toLocaleString()}–$${max.toLocaleString()} USD\n` +
    `*Transit:* ${transit}\n` +
    `${co2Line}\n` +
    `*Forwarder:* ${forwarder}\n\n` +
    `Reply *YES* to confirm, or ask any questions — our agent is standing by.\n\n` +
    `_Atlas Autonomous Quote · Goods2Load_`
  );
}

async function sendWhatsApp(to: string, body: string): Promise<void> {
  if (!to || !ACCOUNT_SID || !AUTH_TOKEN) return;
  const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
  const dest = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
  await client.messages.create({ from: FROM, to: dest, body });
}

// ── GET — forwarder lead feed ──────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const traceId = newTraceId();
  const log = createLogger('a2a_get', traceId);
  const { searchParams } = new URL(req.url);
  const forwarder = searchParams.get('forwarder')?.trim() ?? '';

  log.info('request_received', { forwarder: forwarder || 'all' });

  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    log.warn('twilio_not_configured');
    return NextResponse.json({ leads: [], bookings: [] });
  }

  try {
    const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
    const t0 = Date.now();
    const all = await client.messages.list({ limit: 200 });
    log.step('twilio_fetch', Date.now() - t0, { total_msgs: all.length });
    all.sort(
      (a, b) =>
        new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime(),
    );

    // Group by external party
    type Msg = {
      direction: 'inbound' | 'outbound';
      body: string;
      dateCreated: Date;
    };
    const convMap = new Map<string, Msg[]>();
    for (const msg of all) {
      if (
        !msg.from?.startsWith('whatsapp:') &&
        !msg.to?.startsWith('whatsapp:')
      )
        continue;
      const isOut = msg.direction?.startsWith('outbound');
      const other = isOut ? msg.to : msg.from;
      if (!other) continue;
      if (!convMap.has(other)) convMap.set(other, []);
      convMap.get(other)!.push({
        direction: isOut ? 'outbound' : 'inbound',
        body: msg.body ?? '',
        dateCreated:
          msg.dateCreated instanceof Date
            ? msg.dateCreated
            : new Date(msg.dateCreated ?? Date.now()),
      });
    }

    const leads: Record<string, unknown>[] = [];
    const bookings: Record<string, unknown>[] = [];

    for (const [phone, messages] of convMap.entries()) {
      const inquiry = messages.find(
        (m) => m.direction === 'inbound' && m.body.length > 10,
      );
      if (!inquiry) continue;

      const displayPhone = phone.replace('whatsapp:', '');
      const shortPhone = displayPhone.slice(-7);

      // ── Bookings: confirmed forwarder selection ──
      const bookingMsgs = messages.filter(
        (m) =>
          m.direction === 'outbound' &&
          m.body.includes('Rate request submitted'),
      );
      for (const bm of bookingMsgs) {
        const fwd = parseBookingForwarder(bm.body);
        const ref = parseBookingRef(bm.body);
        // Match to requested forwarder (empty forwarder = return all)
        if (!fwd) continue;
        if (forwarder && !fuzzyMatch(forwarder, fwd)) continue;
        const route = parseRoute(inquiry.body);
        bookings.push({
          id: `booking-${ref ?? phone.slice(-6)}`,
          type: 'booking',
          forwarder: fwd,
          reference: ref,
          phone: displayPhone,
          shortPhone,
          cargo: inquiry.body.slice(0, 120),
          origin: route.origin,
          destination: route.destination,
          mode: guessMode(inquiry.body),
          bookedAt: formatRelativeTime(bm.dateCreated),
          bookedAtIso: bm.dateCreated.toISOString(),
          status: 'confirmed',
        });
      }

      // ── Leads: inquiries where this forwarder was in Atlas top-3 ──
      const atlasReply = messages.find(
        (m) => m.direction === 'outbound' && m.body.includes('Top matches'),
      );
      if (atlasReply) {
        const matched = parseMatchedForwarders(atlasReply.body);
        // If no forwarder filter, return all; else filter
        if (!forwarder || matched.some((f) => fuzzyMatch(forwarder, f))) {
          const route = parseRoute(inquiry.body);
          leads.push({
            id: `lead-${phone.slice(-6)}-${inquiry.dateCreated.getTime()}`,
            type: 'lead',
            channel: 'whatsapp',
            status: 'new',
            from: `WhatsApp ${shortPhone}`,
            phone: displayPhone,
            cargo: inquiry.body.slice(0, 120),
            origin: route.origin,
            destination: route.destination,
            mode: guessMode(inquiry.body),
            matchedForwarders: matched,
            atlasRank:
              matched.findIndex((f) => fuzzyMatch(forwarder, f)) + 1 || 1,
            receivedAt: formatRelativeTime(inquiry.dateCreated),
            receivedAtIso: inquiry.dateCreated.toISOString(),
            isLive: true,
            rawPhone: displayPhone,
            rawText: inquiry.body,
          });
        }
      }
    }

    // Sort bookings newest first
    bookings.sort(
      (a, b) =>
        new Date(b.bookedAtIso as string).getTime() -
        new Date(a.bookedAtIso as string).getTime(),
    );
    leads.sort(
      (a, b) =>
        new Date(b.receivedAtIso as string).getTime() -
        new Date(a.receivedAtIso as string).getTime(),
    );

    log.done({ leads: leads.length, bookings: bookings.length });
    return NextResponse.json({
      forwarder: forwarder || 'all',
      leads,
      bookings,
      total: leads.length + bookings.length,
    });
  } catch (err) {
    log.error('twilio_error', { err: String(err).slice(0, 200) });
    return NextResponse.json({ leads: [], bookings: [], error: String(err) });
  }
}

// ── POST — A2A task handler (A2A2A Forwarder Agent) ──────────────────────────

export async function POST(req: NextRequest) {
  const traceId = newTraceId();
  const log = createLogger('a2a', traceId);

  try {
    const body = await req.json();

    // A2A protocol: task with message parts
    const taskId = body?.id ?? `task-${Date.now()}`;
    const message = body?.message?.parts?.[0]?.text ?? body?.message ?? '';

    log.info('task_received', { task_id: taskId, type: body?.type ?? 'match' });

    // ── Layer 2: Forwarder Agent — lead ACK ───────────────────────────────
    // Triggered by Atlas (Layer 1) after it sends top-3 to cargo owner.
    // Forwarder Agent sends an acknowledgement back to the cargo owner.
    if (body?.type === 'lead_notification') {
      const { forwarders, cargo, clientPhone } = body as {
        forwarders: { name: string; rank: number; confidence: string }[];
        cargo: string;
        clientPhone: string;
      };
      const topForwarder = forwarders?.[0]?.name ?? 'Freight Forwarding Co.';
      const route = parseRoute(cargo ?? '');

      log.step('lead_ack_start', 0, {
        forwarder: topForwarder,
        forwarder_count: forwarders?.length ?? 0,
        phone: clientPhone ? clientPhone.slice(-4) : null, // last 4 digits only
        route: `${route.origin}→${route.destination}`,
      });

      try {
        const t0 = Date.now();
        await sendWhatsApp(
          clientPhone,
          buildForwarderACK(topForwarder, cargo ?? '', route),
        );
        log.step('whatsapp_ack_sent', Date.now() - t0, {
          forwarder: topForwarder,
        });
      } catch (e) {
        log.error('whatsapp_ack_failed', { err: String(e).slice(0, 200) });
      }

      log.done({ type: 'lead_notification', forwarder: topForwarder });
      return NextResponse.json({
        id: taskId,
        status: { state: 'completed' },
        type: 'lead_notification',
        agentAction: 'ack_sent',
        forwarder: topForwarder,
        clientPhone,
      });
    }

    // ── Layer 2: Forwarder Agent — rate quote ─────────────────────────────
    // Triggered by Atlas (Layer 1) when cargo owner books with a specific forwarder.
    // Forwarder Agent sends a rate estimate; will call Carrier Agents (Layer 3) for live rates.
    if (body?.type === 'booking_notification') {
      const { forwarder, reference, cargo, clientPhone } = body as {
        forwarder: string;
        reference: string;
        cargo: string;
        clientPhone: string;
      };

      log.step('booking_start', 0, {
        reference,
        forwarder,
        phone: clientPhone ? clientPhone.slice(-4) : null,
      });

      // ── Layer 3: Maersk Carrier Agent call ───────────────────────────────
      // Atlas (L1) → Forwarder Agent (L2) → Maersk Carrier Agent (L3)
      // NOTE: Atlas does NOT auto-send to cargo owner here. The forwarder
      // reviews in their dashboard and clicks "Send Introduction" / "Send Rate Quote".
      const route = parseRoute(cargo ?? '');
      const mode = guessMode(cargo ?? '');
      const rateData = estimateRate(
        cargo ?? '',
        route.origin,
        route.destination,
        mode,
      );
      const { co2Kg, altCo2Kg, altMode } = estimateCO2(
        route.origin,
        route.destination,
        mode,
        1000,
        rateData.isColdChain,
      );

      // Fire Layer 3 — non-blocking, falls back gracefully
      const t0 = Date.now();
      const maerskSchedule = await fetchMaerskCarrierData(
        route.origin,
        route.destination,
        mode,
      );
      log.step('maersk_l3', Date.now() - t0, {
        source: maerskSchedule.source,
        transit: maerskSchedule.transitDays,
        mode,
      });
      log.step('rate_calculated', 0, {
        rate_min: rateData.min,
        rate_max: rateData.max,
        co2_kg: co2Kg,
        cold_chain: rateData.isColdChain,
        reference,
      });
      log.done({
        type: 'booking_notification',
        reference,
        forwarder,
        co2_kg: co2Kg,
      });

      return NextResponse.json({
        id: taskId,
        status: { state: 'completed' },
        type: 'booking_notification',
        agentAction: 'booking_received',
        draftedMessages: {
          introduction: buildForwarderACK(forwarder, cargo ?? '', route),
          rateQuote: buildRateQuote(forwarder, reference, cargo ?? ''),
        },
        carrierData: {
          carrier: maerskSchedule.carrier,
          transitDays: maerskSchedule.transitDays,
          nextDeparture: maerskSchedule.nextDeparture,
          source: maerskSchedule.source,
          upgradeNote:
            maerskSchedule.source === 'estimate'
              ? 'Add MAERSK_API_KEY to Vercel env for live Maersk schedules'
              : null,
        },
        sustainability: {
          co2Kg,
          altCo2Kg,
          altMode,
          methodology: 'GLEC Framework v3.1',
          weightAssumption: '1,000 kg',
        },
        estimatedRate: {
          min: rateData.min,
          max: rateData.max,
          transit: maerskSchedule.transitDays,
          mode,
        },
        artifacts: [
          {
            type: 'text/plain',
            data: `Booking ${reference} routed to ${forwarder}. Maersk: ${maerskSchedule.transitDays} (${maerskSchedule.source}). CO₂e: ~${co2Kg} kg. Dashboard action required.`,
          },
        ],
        routing: {
          forwarder,
          dashboardUrl: `https://atlas.goods2load.com/dashboard/freightforwardingcompany`,
          reference,
        },
      });
    }

    // ── Standard A2A freight-match task ───────────────────────────────────
    if (message) {
      const atlasUrl = process.env.ATLAS_API_URL?.replace(/\/$/, '');
      if (!atlasUrl) {
        return NextResponse.json({
          id: taskId,
          status: { state: 'failed' },
          error: 'ATLAS_API_URL not set',
        });
      }
      const res = await fetch(`${atlasUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, session_id: `a2a-${taskId}` }),
        signal: AbortSignal.timeout(55_000),
      });
      const data = await res.json();
      return NextResponse.json({
        id: taskId,
        status: { state: 'completed' },
        artifacts: [{ type: 'application/json', data }],
      });
    }

    return NextResponse.json(
      { id: taskId, status: { state: 'failed' }, error: 'No message provided' },
      { status: 400 },
    );
  } catch (err) {
    console.error('[a2a POST]', err);
    return NextResponse.json(
      { status: { state: 'failed' }, error: String(err) },
      { status: 500 },
    );
  }
}
