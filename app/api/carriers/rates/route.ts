/**
 * POST /api/carriers/rates
 * ========================
 * Layer 3 Carrier Agent — multi-carrier rate aggregation.
 *
 * Each freight forwarding company on Goods2Load has contracts with specific
 * shipping lines, air cargo carriers, and road fleet operators. Momentum
 * queries this endpoint to retrieve live or contract-estimated rates for
 * any given shipment, using only the carriers that forwarder has agreements with.
 *
 * Live integrations:   Maersk (pending MAERSK_API_KEY), others follow same pattern
 * Active demo:         MSC, CMA CGM, Hapag-Lloyd, Emirates SkyCargo,
 *                      Lufthansa Cargo, Qatar Cargo, Agility, Aramex, GAC
 *
 * Activation path for any carrier:
 *   1. Set <CARRIER>_API_KEY in Vercel env
 *   2. Add live fetch logic in the carrier's adapter block below
 *   3. registry.ts CARRIERS[id].live auto-flips to true
 *   → No other changes needed. Momentum picks it up immediately.
 *
 * CO₂ estimates: GLEC Framework v3.1
 */
import {
  type CarrierMode,
  getCarrierRates,
  getForwarderCarriers,
} from '@/lib/carriers/registry';

import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

interface RatesRequest {
  forwarder: string; // e.g. "ADSO" — looks up their carrier contracts
  origin: string;
  destination: string;
  mode: CarrierMode;
  weight_kg?: number;
  container_type?: string; // "20GP" | "40GP" | "40HC"
  container_count?: number;
}

export async function POST(req: NextRequest) {
  let body: RatesRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const {
    forwarder,
    origin,
    destination,
    mode,
    weight_kg = 5000,
    container_type = '20GP',
  } = body;

  if (!forwarder || !origin || !destination || !mode) {
    return NextResponse.json(
      { error: 'Required: forwarder, origin, destination, mode' },
      { status: 400 },
    );
  }

  if (!['sea', 'air', 'road'].includes(mode)) {
    return NextResponse.json(
      { error: 'mode must be sea | air | road' },
      { status: 400 },
    );
  }

  // Get rates from all carriers this forwarder has contracts with
  const rates = getCarrierRates(
    forwarder,
    origin,
    destination,
    mode,
    weight_kg,
    container_type,
  );
  const carriers = getForwarderCarriers(forwarder);
  const liveCount = carriers.filter((c) => c.live).length;

  return NextResponse.json({
    forwarder,
    origin,
    destination,
    mode,
    weight_kg,
    container_type,
    rates,
    best_rate: rates[0] ?? null,
    carrier_connections: {
      total: carriers.length,
      live: liveCount,
      demo: carriers.length - liveCount,
      carriers: carriers.map((c) => ({
        id: c.id,
        name: c.name,
        mode: c.mode,
        status: c.live ? 'live' : 'contract_estimate',
      })),
    },
    co2_note: 'Emission estimates per GLEC Framework v3.1',
    queried_at: new Date().toISOString(),
  });
}

// GET — returns carrier connection status for a forwarder (used by dashboard)
export async function GET(req: NextRequest) {
  const forwarder = new URL(req.url).searchParams.get('forwarder') ?? 'ADSO';
  const carriers = getForwarderCarriers(forwarder);

  return NextResponse.json({
    forwarder,
    carriers: carriers.map((c) => ({
      id: c.id,
      name: c.name,
      mode: c.mode,
      hq: c.hq,
      status: c.live ? 'live' : 'ready',
      env_key: c.env_key,
    })),
    live_count: carriers.filter((c) => c.live).length,
    total: carriers.length,
  });
}
