import { NextRequest, NextResponse } from 'next/server';

import type {
  AgentRequest,
  AgentResponse,
  MatchedProvider,
} from '@/components/Agent/types';

/**
 * POST /api/agent
 * -----------------------------------------------------------------------------
 * Proxies to the Atlas multi-agent matching engine (Python FastAPI).
 * Set ATLAS_API_URL=https://your-atlas-service.run.app in .env.local.
 * Falls back to a "preview mode" message when the env var is not set.
 * -----------------------------------------------------------------------------
 */

const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');

function mapCandidate(
  c: Record<string, unknown>,
  idx: number,
): MatchedProvider {
  const raw = (c.raw ?? {}) as Record<string, unknown>;
  return {
    id: (c.forwarder_id as string) ?? `fwd-${idx}`,
    company_name: (c.name as string) ?? 'Unknown',
    country: (raw.country_of_registration as string) ?? null,
    city: (raw.city_hq as string) ?? null,
    rank: typeof c.rank === 'number' ? c.rank : idx + 1,
    score:
      typeof c.verification_score === 'number'
        ? c.verification_score
        : undefined,
    verification_tier:
      c.verification_tier as MatchedProvider['verification_tier'],
    confidence_tier: c.confidence_tier as MatchedProvider['confidence_tier'],
    modes: (raw.modes as string) ?? '',
    google_rating:
      typeof raw.google_rating === 'number' ? raw.google_rating : null,
    google_review_count:
      typeof raw.google_review_count === 'number'
        ? raw.google_review_count
        : null,
    enrichment_summary: (c.enrichment_summary as string) ?? '',
    match_rationale: (c.match_rationale as string) ?? '',
    strengths: Array.isArray(c.strengths) ? (c.strengths as string[]) : [],
    watch_outs: Array.isArray(c.watch_outs) ? (c.watch_outs as string[]) : [],
  };
}

export async function POST(req: NextRequest) {
  let body: AgentRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: 'messages[] required' }, { status: 400 });
  }

  // Preview mode — Atlas service not yet connected
  if (!ATLAS_URL) {
    return NextResponse.json<AgentResponse>({
      reply:
        "I'm running in preview mode — the Atlas matching engine isn't connected yet. Once ATLAS_API_URL is set, I'll parse your request and match you with verified freight forwarders across MENA and 30+ countries.",
    });
  }

  const latestMessage = body.messages[body.messages.length - 1].content;

  try {
    const res = await fetch(`${ATLAS_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: latestMessage,
        session_id: body.session_id ?? null,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('Atlas error', res.status, detail);
      return NextResponse.json(
        { error: 'Matching engine error' },
        { status: 502 },
      );
    }

    const atlas = await res.json();

    const candidates: MatchedProvider[] = (
      atlas.shortlist?.candidates ?? []
    ).map((c: Record<string, unknown>, i: number) => mapCandidate(c, i));

    return NextResponse.json<AgentResponse>({
      reply: atlas.text ?? "I couldn't process that — please try again.",
      session_id: atlas.session_id,
      data: {
        matches: candidates,
        recommendation: atlas.shortlist?.recommendation_summary ?? '',
        rag_hints: atlas.debug?.rag_forwarder_hints ?? [],
      },
    });
  } catch (err) {
    console.error('Agent route failure', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
