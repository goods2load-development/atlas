/**
 * Hermes Email Gateway — Email → Atlas → Email
 * =============================================
 * Google Apps Script polls atlas@goods2load.com for new emails
 * and POSTs them here. Atlas processes the freight request and
 * replies to the sender via Brevo transactional email API.
 *
 * Env vars needed:
 *   BREVO_API_KEY         Brevo API key (app.brevo.com → SMTP & API → API Keys)
 *   BREVO_SENDER_EMAIL    atlas@goods2load.com (verified sender in Brevo)
 *   HERMES_EMAIL_SECRET   shared secret to verify Apps Script requests
 */
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER = process.env.BREVO_SENDER_EMAIL ?? 'atlas@goods2load.com';
const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');
const WEBHOOK_SECRET = process.env.HERMES_EMAIL_SECRET;

// ── Brevo sender ──────────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string) {
  if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not set');

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Atlas · Goods2Load', email: BREVO_SENDER },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo ${res.status}: ${err}`);
  }
}

// ── Email formatter ───────────────────────────────────────────────────────────

function formatReply(
  data: Record<string, unknown>,
  originalSubject: string,
): string {
  const fullText =
    (data.text as string) ?? "I couldn't find a match. Please try again.";
  const shortlist = data.shortlist as Record<string, unknown> | null;
  const candidates = (shortlist?.candidates as Record<string, unknown>[]) ?? [];

  const sentences = fullText.match(/[^.!?]+[.!?]+/g) ?? [fullText];
  const summary = sentences.slice(0, 3).join(' ').trim();

  const matchRows = candidates
    .slice(0, 3)
    .map((c, i) => {
      const name = c.name as string;
      const conf = c.confidence_tier as string;
      const snippet = ((c.enrichment_summary as string) || '').slice(0, 160);
      const tier = c.verification_tier as string;
      const tierColor =
        tier === 'VERIFIED'
          ? '#16a34a'
          : tier === 'PARTIAL'
            ? '#d97706'
            : '#6b7280';

      return `
      <tr>
        <td style="padding:14px 16px; border-bottom:1px solid #f0f0f0;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <strong style="font-size:14px; color:#1a1a1a;">${i + 1}. ${name}</strong>
            <span style="font-size:11px; font-weight:600; color:${tierColor}; background:${tierColor}18;
              border:1px solid ${tierColor}40; border-radius:999px; padding:1px 8px;">${tier}</span>
          </div>
          <div style="font-size:12px; color:#666;">${conf} confidence · ${snippet}</div>
        </td>
      </tr>`;
    })
    .join('');

  const matchSection =
    candidates.length > 0
      ? `
    <h3 style="color:#1a1a1a; font-size:15px; margin:28px 0 12px;">
      Top matches from the Goods2Load network:
    </h3>
    <table style="width:100%; border-collapse:collapse; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
      ${matchRows}
    </table>
    <p style="color:#666; font-size:13px; margin-top:12px;">
      Reply to this email with a forwarder name to request a rate quote —
      we'll connect you within 24&nbsp;hours.
    </p>`
      : '';

  return `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f5f4f3; font-family:Arial,sans-serif;">
  <div style="max-width:600px; margin:32px auto; border-radius:12px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:#f97316; padding:20px 24px;">
      <img src="https://atlas.goods2load.com/g2l-logo-circle.png"
           alt="Goods2Load" width="40" height="40"
           style="vertical-align:middle; margin-right:12px; border-radius:50%;" />
      <span style="color:white; font-size:17px; font-weight:700; vertical-align:middle;">
        Atlas · Goods2Load
      </span>
    </div>

    <!-- Body -->
    <div style="background:white; padding:28px 24px;">
      <p style="color:#333; line-height:1.7; font-size:14px; margin-top:0;">${summary}</p>
      ${matchSection}
      <hr style="border:none; border-top:1px solid #f0f0f0; margin:28px 0;" />
      <p style="color:#999; font-size:12px; margin:0;">
        Powered by Atlas &nbsp;·&nbsp; Goods2Load &nbsp;·&nbsp;
        <a href="https://atlas.goods2load.com/agent" style="color:#f97316; text-decoration:none;">
          Try the web agent
        </a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Verify shared secret from Apps Script
  const secret = req.headers.get('x-webhook-secret');
  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const {
    from,
    subject,
    body: emailBody,
  } = body as {
    from: string;
    subject: string;
    body: string;
  };

  if (!from || !emailBody) {
    return NextResponse.json(
      { error: 'Missing from or body' },
      { status: 400 },
    );
  }

  console.log('[HermesEmail] incoming', {
    from,
    subject: subject?.slice(0, 60),
  });

  // Step 1 — send ack immediately via Brevo
  try {
    await sendEmail(
      from,
      `Re: ${subject || 'Your freight request'}`,
      `<div style="font-family:Arial,sans-serif;color:#333;padding:16px;">
        <p>🔍 <strong>Atlas is searching the Goods2Load network</strong> for the best forwarder matches.</p>
        <p>I'll reply with results in under a minute.</p>
        <p style="color:#999;font-size:12px;">Powered by Atlas · Goods2Load</p>
      </div>`,
    );
    console.log('[HermesEmail] ack sent via Brevo');
  } catch (err) {
    console.error('[HermesEmail] ack failed:', err);
  }

  // Step 2 — run Atlas pipeline and send results
  try {
    if (!ATLAS_URL) throw new Error('ATLAS_API_URL not set');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 55_000);
    const res = await fetch(`${ATLAS_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: emailBody.slice(0, 2000),
        session_id: from.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 64),
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) throw new Error(`Atlas ${res.status}`);
    const data = (await res.json()) as Record<string, unknown>;

    await sendEmail(
      from,
      `Re: ${subject || 'Your freight request'} — Atlas found matches`,
      formatReply(data, subject),
    );
    console.log('[HermesEmail] results sent via Brevo');
  } catch (err) {
    console.error('[HermesEmail] pipeline error:', err);
    await sendEmail(
      from,
      `Re: ${subject || 'Your freight request'}`,
      `<p style="font-family:Arial,sans-serif;">⚠️ Sorry — Atlas had trouble. Please visit <a href="https://atlas.goods2load.com/agent">atlas.goods2load.com/agent</a>.</p>`,
    ).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
