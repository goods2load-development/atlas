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

// ── Brevo email notification ──────────────────────────────────────────────────
// During sandbox phase: every Aradus lead emails jpanigari@goods2load.com
// so the Goods2Load team can manually route to the right forwarder.

async function emailLeadToOps(
  payload: AradusLeadPayload,
  leadId: string,
  matchedForwarders: string[],
  totalMatched: number,
  query: string,
): Promise<void> {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_SENDER = process.env.BREVO_SENDER_EMAIL ?? 'atlas@goods2load.com';
  if (!BREVO_API_KEY) return;

  const { contact, shipment } = payload;
  const containers =
    shipment.containers?.map((c) => `${c.type} × ${c.count}`).join(', ') ??
    (shipment.container_type
      ? `${shipment.container_type} × ${shipment.container_count ?? 1}`
      : '—');

  const handling = (shipment.special_handling ?? []).join(', ') || '—';
  const forwarderList =
    matchedForwarders.length > 0
      ? matchedForwarders
          .map((f, i) => `<li><strong>#${i + 1}:</strong> ${f}</li>`)
          .join('')
      : '<li>No matches found</li>';

  const html = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#111">
  <div style="background:#FF6B00;padding:20px 24px;border-radius:8px 8px 0 0">
    <h2 style="color:#fff;margin:0">🚛 New Aradus Lead</h2>
    <p style="color:#ffe0c0;margin:4px 0 0">Ref: ${leadId} · Aradus ref: ${payload.partner_reference_id}</p>
  </div>
  <div style="background:#f9f9f9;padding:24px;border-radius:0 0 8px 8px;border:1px solid #eee">

    <h3 style="margin-top:0;color:#FF6B00">Cargo Owner</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:4px 0;color:#555;width:140px">Company</td><td><strong>${contact.company_name}</strong></td></tr>
      <tr><td style="padding:4px 0;color:#555">Contact</td><td>${contact.contact_name ?? '—'}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Email</td><td><a href="mailto:${contact.email}">${contact.email}</a></td></tr>
      <tr><td style="padding:4px 0;color:#555">Phone</td><td>${contact.phone ?? '—'}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Preferred channel</td><td>${contact.preferred_channel ?? '—'}</td></tr>
    </table>

    <h3 style="color:#FF6B00">Shipment Details</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:4px 0;color:#555;width:140px">Route</td><td><strong>${shipment.origin} → ${shipment.destination}</strong></td></tr>
      <tr><td style="padding:4px 0;color:#555">Mode</td><td>${shipment.transport_mode ?? '—'}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Commodity</td><td>${shipment.commodity ?? '—'}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Containers</td><td>${containers}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Weight</td><td>${shipment.weight_kg ? shipment.weight_kg + ' kg' : '—'}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Special handling</td><td>${handling}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Ready date</td><td>${shipment.ready_date ?? '—'}</td></tr>
      <tr><td style="padding:4px 0;color:#555">Incoterm</td><td>${shipment.incoterm ?? '—'}</td></tr>
    </table>

    <h3 style="color:#FF6B00">Atlas Matched Forwarders (${totalMatched} total)</h3>
    <ol style="font-size:14px;padding-left:20px">${forwarderList}</ol>

    <div style="background:#fff3e0;border-left:4px solid #FF6B00;padding:12px 16px;border-radius:4px;margin-top:16px;font-size:13px">
      <strong>Action required:</strong> Contact the cargo owner via their preferred channel (${contact.preferred_channel ?? 'email'}) and route to the top matched forwarder, or handle directly during sandbox phase.
    </div>

    <p style="font-size:12px;color:#999;margin-top:24px">
      Atlas query sent: <em>${query}</em><br>
      Source: Aradus · Lead ID: ${leadId}
    </p>
  </div>
</div>`;

  try {
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Atlas · Goods2Load', email: BREVO_SENDER },
        to: [{ email: 'jpanigari@goods2load.com' }],
        subject: `🚛 Aradus Lead: ${shipment.origin} → ${shipment.destination} · ${contact.company_name} [${payload.partner_reference_id}]`,
        htmlContent: html,
      }),
      signal: AbortSignal.timeout(8_000),
    });
  } catch (e) {
    console.warn('[ExternalLeads] Brevo notification failed:', e);
  }
}

// ── A2A lead notification (fire and forget) ───────────────────────────────────
// Notifies the top matched forwarder so the lead appears in the Atlas dashboard.

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

    // 6. Notify top forwarder via A2A dashboard + email ops team (both fire and forget)
    if (preview[0]) {
      void notifyForwarder(preview[0], payload, leadId);
    }
    void emailLeadToOps(payload, leadId, preview, totalMatched, query);

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
