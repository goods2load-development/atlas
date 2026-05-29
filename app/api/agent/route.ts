import { createLogger, newTraceId } from '@/lib/logger';

import { NextRequest, NextResponse } from 'next/server';

import type {
  AgentRequest,
  AgentResponse,
  MatchedProvider,
} from '@/components/Agent/types';

// Allow up to 60 s — Atlas pipeline needs ~15-30 s on a warm instance
export const maxDuration = 60;

/**
 * POST /api/agent
 * Proxies to the Atlas multi-agent matching engine (Python FastAPI).
 * Set ATLAS_API_URL in .env.local. Falls back to preview mode when unset.
 */

const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');

// ── Language detection ────────────────────────────────────────────────────────
// Japanese kana checked BEFORE CJK so Kanji-containing Japanese text isn't
// misidentified as Chinese.
function detectLanguage(text: string): string | null {
  if (/[぀-ゟ゠-ヿ]/.test(text)) return 'Japanese';
  if (/[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/.test(text)) return 'Arabic';
  if (/[一-鿿㐀-䶿]/.test(text)) return 'Chinese';
  if (/[가-힯ᄀ-ᇿ]/.test(text)) return 'Korean';
  if (/[ऀ-ॿ]/.test(text)) return 'Hindi';
  if (/[Ѐ-ӿ]/.test(text)) return 'Russian';
  if (/[֐-׿]/.test(text)) return 'Hebrew';
  if (/[฀-๿]/.test(text)) return 'Thai';
  return null;
}

const LANG_CODES: Record<string, string> = {
  Arabic: 'ar',
  Chinese: 'zh-CN',
  Japanese: 'ja',
  Korean: 'ko',
  Hindi: 'hi',
  Russian: 'ru',
  Hebrew: 'he',
  Thai: 'th',
};

// ── Translation — one call, reply text only, hard timeout, silent fallback ────
async function translate(text: string, lang: string): Promise<string> {
  const code = LANG_CODES[lang];
  if (!code || !text.trim()) return text;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${code}&dt=t&q=${encodeURIComponent(text)}`,
      { signal: controller.signal },
    );
    clearTimeout(timer);
    if (!res.ok) return text;
    const data = await res.json();
    return (data[0] as [string][]).map(([c]) => c).join('') || text;
  } catch {
    return text; // always return something — never throw
  }
}

// ── Provider card mapping ─────────────────────────────────────────────────────
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

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const traceId = newTraceId();
  const log = createLogger('agent', traceId);

  let body: AgentRequest;
  try {
    body = await req.json();
  } catch {
    log.error('parse_error', { reason: 'invalid_json' });
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    log.error('parse_error', { reason: 'messages_empty' });
    return NextResponse.json({ error: 'messages[] required' }, { status: 400 });
  }

  const latestMessage = body.messages[body.messages.length - 1].content;
  const detectedLang = detectLanguage(latestMessage);

  log.info('request_received', {
    msg_len: latestMessage.length,
    turn: body.messages.length,
    lang: detectedLang ?? 'English',
    session_id: body.session_id ?? null,
  });

  // Preview mode
  if (!ATLAS_URL) {
    log.warn('preview_mode', { atlas_url_set: false });
    return NextResponse.json<AgentResponse>({
      reply:
        "I'm running in preview mode — the Atlas matching engine isn't connected yet.",
    });
  }

  try {
    const t0 = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55_000); // 55 s — just under maxDuration
    const res = await fetch(`${ATLAS_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: latestMessage,
        session_id: body.session_id ?? null,
        response_language: detectedLang ?? 'English',
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const atlasMs = Date.now() - t0;

    if (!res.ok) {
      const detail = await res.text();
      log.error('atlas_error', {
        status: res.status,
        detail: detail.slice(0, 200),
        atlas_ms: atlasMs,
      });
      return NextResponse.json(
        { error: 'Matching engine error' },
        { status: 502 },
      );
    }

    const atlas = await res.json();
    log.step('atlas_pipeline', atlasMs, {
      session_id: atlas.session_id,
      candidates: atlas.shortlist?.candidates?.length ?? 0,
      rag_hints: atlas.debug?.rag_forwarder_hints?.length ?? 0,
    });

    const candidates: MatchedProvider[] = (
      atlas.shortlist?.candidates ?? []
    ).map((c: Record<string, unknown>, i: number) => mapCandidate(c, i));

    const rawReply: string =
      atlas.text ?? "I couldn't process that — please try again.";
    const rawReco: string = atlas.shortlist?.recommendation_summary ?? '';

    // Translate reply + recommendation only — two small, independent calls.
    // Provider card text stays in English. Falls back silently on any error.
    const t1 = Date.now();
    const [reply, recommendation] = detectedLang
      ? await Promise.all([
          translate(rawReply, detectedLang),
          rawReco ? translate(rawReco, detectedLang) : Promise.resolve(''),
        ])
      : [rawReply, rawReco];

    if (detectedLang) {
      log.step('translate', Date.now() - t1, { lang: detectedLang });
    }

    log.done({
      providers: candidates.length,
      lang: detectedLang ?? 'English',
      reply_len: reply.length,
    });

    return NextResponse.json<AgentResponse>({
      reply,
      session_id: atlas.session_id,
      data: {
        matches: candidates,
        recommendation,
        rag_hints: atlas.debug?.rag_forwarder_hints ?? [],
      },
    });
  } catch (err) {
    const isTimeout = (err as Error)?.name === 'AbortError';
    log.error(isTimeout ? 'atlas_timeout' : 'internal_error', {
      err: (err as Error)?.message?.slice(0, 200),
    });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
