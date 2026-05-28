/**
 * POST /api/external/leads
 * ========================
 * Aradus × Goods2Load integration endpoint.
 *
 * Aradus sends a structured freight request from their platform.
 * Atlas runs the matching pipeline and returns matched forwarders.
 * The top forwarder is notified via the A2A lead_notification event
 * so the lead appears in their dashboard automatically.
 *
 * Auth: Bearer token — set ARADUS_API_KEY in Vercel env.
 * Full API contract: 05 Partnerships/Aradus Integration.md
 */
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');

// ── Types ─────────────────────────────────────────────────────────────────────

interface AradusContact {
  company_name: string;
  contact_name?: string;
  email: string;
  phone?: string;
  preferred_channel?: 'email' | 'phone' | 'whatsapp';
}

interface AradusContainer {
  type: string; // "20GP" | "40GP" | "40HC" | "40RF" | "LCL" | "other"
  count: number;
}

interface AradusShipment {
  origin: string;
  destination: string;
  transport_mode?: string;
  commodity?: string;
  hs_code?: string;
  weight_kg?: number;
  volume_cbm?: number;
  containers?: AradusContainer[];
  // legacy flat fields — accepted but deprecated
  container_type?: string;
  container_count?: number;
  ready_date?: string;
  incoterm?: string;
  special_handling?: string[];
}

interface AradusLeadPayload {
  partner_reference_id: string;
  contact: AradusContact;
  shipment: AradusShipment;
  source?: string;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

function authenticate(req: NextRequest): boolean {
  const apiKey = process.env.ARADUS_API_KEY;
  if (!apiKey) return false; // key not configured — reject all
  const header = req.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  return token === apiKey;
}

// ── Query builder ─────────────────────────────────────────────────────────────
// Converts the structured Aradus payload into a natural language string
// that Atlas's intent parser understands.

function buildAtlasQuery(payload: AradusLeadPayload): string {
  const { shipment, contact } = payload;

  const mode =
    shipment.transport_mode && shipment.transport_mode !== 'unspecified'
      ? shipment.transport_mode
      : '';

  const parts: string[] = [];

  // Mode + commodity + route
  const modeStr = mode ? `${mode} freight` : 'freight';
  const commodityStr = shipment.commodity ? ` ${shipment.commodity}` : '';
  parts.push(
    `${modeStr}${commodityStr} from ${shipment.origin} to ${shipment.destination}`,
  );

  // Weight / volume
  if (shipment.weight_kg) parts.push(`${shipment.weight_kg} kg`);
  if (shipment.volume_cbm) parts.push(`${shipment.volume_cbm} CBM`);

  // Containers — array format (new) or flat (legacy)
  if (shipment.containers && shipment.containers.length > 0) {
    const containerStr = shipment.containers
      .map((c) => `${c.type} x${c.count}`)
      .join(', ');
    parts.push(containerStr);
  } else if (shipment.container_type) {
    const count = shipment.container_count ?? 1;
    parts.push(`${shipment.container_type} x${count}`);
  }

  // Special handling
  const handling = shipment.special_handling ?? [];
  if (handling.includes('cold_chain'))
    parts.push('cold chain temperature controlled');
  if (handling.includes('dg')) parts.push('dangerous goods');
  if (handling.includes('project_cargo')) parts.push('project cargo');

  // Incoterm + ready date
  if (shipment.incoterm) parts.push(`${shipment.incoterm} incoterm`);
  if (shipment.ready_date) parts.push(`ready ${shipment.ready_date}`);

  // Cargo owner company context
  if (contact.company_name) parts.push(`for ${contact.company_name}`);

  return parts.join(', ');
}

// ── A2A lead notification (fire and forget) ───────────────────────────────────
// Notifies the top matched forwarder so the lead appears in their dashboard.

async function notifyForwarder(
  forwarderName: string,
  payload: AradusLeadPayload,
  leadId: string,
): Promise<void> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ?? 'https://atlas.goods2load.com';
    await fetch(`${baseUrl}/api/a2a`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'lead_notification',
        forwarder: forwarderName,
        reference: leadId,
        cargo: buildAtlasQuery(payload),
        clientPhone: payload.contact.phone ?? '',
        clientEmail: payload.contact.email,
        source: 'aradus',
        partner_reference_id: payload.partner_reference_id,
      }),
      signal: AbortSignal.timeout(8_000),
    });
  } catch (e) {
    // Fire-and-forget — never block the response
    console.warn('[ExternalLeads] A2A notification failed:', e);
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Auth
  if (!authenticate(req)) {
    return NextResponse.json(
      {
        status: 'error',
        error_code: 'AUTH_FAILED',
        message: 'Invalid or missing Bearer token.',
        retry_after_seconds: 0,
      },
      { status: 401 },
    );
  }

  // 2. Parse body
  let payload: AradusLeadPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        error_code: 'INVALID_PAYLOAD',
        message: 'Request body must be valid JSON.',
        retry_after_seconds: 0,
      },
      { status: 400 },
    );
  }

  // 3. Validate required fields
  if (
    !payload.partner_reference_id ||
    !payload.contact?.email ||
    !payload.contact?.company_name ||
    !payload.shipment?.origin ||
    !payload.shipment?.destination
  ) {
    return NextResponse.json(
      {
        status: 'error',
        error_code: 'INVALID_PAYLOAD',
        message:
          'Required fields missing: partner_reference_id, contact.email, contact.company_name, shipment.origin, shipment.destination.',
        retry_after_seconds: 0,
      },
      { status: 400 },
    );
  }

  // 4. Build Atlas query
  const query = buildAtlasQuery(payload);
  const leadId = `G2L-ARADUS-${Date.now()}-${randomUUID().slice(0, 8).toUpperCase()}`;

  // 5. Call Atlas pipeline
  if (!ATLAS_URL) {
    // No backend configured — return a sandbox response for testing
    return NextResponse.json({
      status: 'received',
      lead_id: leadId,
      received_at: new Date().toISOString(),
      matched_forwarders_count: 0,
      matched_forwarders_preview: [],
      expected_response_time: '1 working day',
      message:
        'Lead received. Atlas backend not yet configured — sandbox mode.',
      _debug: { query, note: 'Set ATLAS_API_URL to activate live matching' },
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 50_000);

    const atlasRes = await fetch(`${ATLAS_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: query,
        session_id: null,
        response_language: 'English',
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!atlasRes.ok) {
      console.error('[ExternalLeads] Atlas error', atlasRes.status);
      return NextResponse.json(
        {
          status: 'error',
          error_code: 'INTERNAL_ERROR',
          message: 'Matching engine error — please retry.',
          retry_after_seconds: 60,
        },
        { status: 500 },
      );
    }

    const atlas = await atlasRes.json();
    const candidates: { name?: string }[] = atlas.shortlist?.candidates ?? [];

    // Top 2 names for preview
    const preview = candidates
      .slice(0, 2)
      .map((c) => c.name ?? 'Unknown')
      .filter(Boolean);

    const totalMatched = candidates.length;

    // 6. Notify top forwarder via A2A (fire and forget)
    if (preview[0]) {
      void notifyForwarder(preview[0], payload, leadId);
    }

    // 7. Respond to Aradus
    return NextResponse.json({
      status: 'received',
      lead_id: leadId,
      received_at: new Date().toISOString(),
      matched_forwarders_count: totalMatched,
      matched_forwarders_preview: preview,
      expected_response_time: '1 working day',
      message: `Your request has been received. ${totalMatched} verified freight forwarder${totalMatched !== 1 ? 's' : ''} in our network will contact you within 1 working day using your preferred channel.`,
    });
  } catch (err) {
    console.error('[ExternalLeads] Pipeline error:', err);
    return NextResponse.json(
      {
        status: 'error',
        error_code: 'INTERNAL_ERROR',
        message: 'Internal error — please retry in 60 seconds.',
        retry_after_seconds: 60,
      },
      { status: 500 },
    );
  }
}
