import { NextRequest } from 'next/server';

/**
 * POST /api/agent/stream
 * ---------------------------------------------------------------------------
 * SSE proxy to the Atlas /chat/stream endpoint.
 *
 * Returns a text/event-stream response. Each event is a JSON PipelineEvent:
 *
 *   data: {"type":"step_start","step":"C1","label":"Reading your shipment","elapsed_ms":0}
 *   data: {"type":"step_done", "step":"C1","elapsed_ms":312}
 *   ...
 *   data: {"type":"complete","data":{ reply, session_id, data }}
 *
 * If ATLAS_API_URL is not set, or if Atlas doesn't yet support /chat/stream,
 * this route returns 503 — ChatAgent falls back to the regular POST /api/agent.
 *
 * Sufian: to enable streaming, implement POST /chat/stream on the FastAPI side
 * and emit SSE events as each agent (C1→C5) starts, progresses, and completes.
 * The final event must be type "complete" with the full chat response in "data".
 * ---------------------------------------------------------------------------
 */

const ATLAS_URL = process.env.ATLAS_API_URL?.replace(/\/$/, '');

function detectLanguage(text: string): string | null {
  if (/[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/.test(text)) return 'Arabic';
  if (/[一-鿿㐀-䶿]/.test(text)) return 'Chinese';
  if (/[぀-ゟ゠-ヿ]/.test(text)) return 'Japanese';
  if (/[가-힯ᄀ-ᇿ]/.test(text)) return 'Korean';
  if (/[ऀ-ॿ]/.test(text)) return 'Hindi';
  if (/[Ѐ-ӿ]/.test(text)) return 'Russian';
  if (/[֐-׿יִ-ﭏ]/.test(text)) return 'Hebrew';
  if (/[฀-๿]/.test(text)) return 'Thai';
  return null;
}

function withLanguageDirective(message: string, lang: string): string {
  return (
    `SYSTEM INSTRUCTION — LANGUAGE: The user wrote in ${lang}. ` +
    `You MUST respond ENTIRELY in ${lang}. ` +
    `Every word of your reply — greetings, questions, provider names, explanations, labels — MUST be in ${lang}. ` +
    `Do NOT use English anywhere in your response.\n\n` +
    `USER MESSAGE:\n${message}`
  );
}

export async function POST(req: NextRequest) {
  if (!ATLAS_URL) {
    return new Response('Atlas URL not configured', { status: 503 });
  }

  let body: { message: string; session_id?: string };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const detectedLang = detectLanguage(body.message);
  const messageToSend = detectedLang
    ? withLanguageDirective(body.message, detectedLang)
    : body.message;

  // Forward to Atlas streaming endpoint
  let upstream: Response;
  try {
    upstream = await fetch(`${ATLAS_URL}/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messageToSend,
        session_id: body.session_id ?? null,
      }),
    });
  } catch {
    return new Response('Atlas unreachable', { status: 503 });
  }

  if (!upstream.ok || !upstream.body) {
    // Atlas doesn't support streaming yet — ChatAgent will fall back to POST /api/agent
    return new Response('Streaming not supported by Atlas', { status: 503 });
  }

  // Pipe SSE straight through — no buffering, no transformation
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no', // disable Nginx buffering if behind a proxy
    },
  });
}
