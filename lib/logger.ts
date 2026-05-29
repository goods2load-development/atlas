/**
 * Atlas Structured Logger
 * =======================
 * Emits JSON log lines to stdout — captured by Vercel's log aggregator.
 *
 * Usage:
 *   const log = createLogger('agent', traceId);
 *   log.info('pipeline_start', { message_len: 42 });
 *   log.step('C1_intent', 120, { mode: 'air', urgency: true });
 *   log.error('atlas_timeout', { status: 408 });
 *   log.done(1850, { providers: 5, lang: 'Arabic' });
 *
 * Every line is a single JSON object. Fields:
 *   ts         — ISO 8601 timestamp
 *   trace_id   — 8-char hex, unique per request
 *   service    — route name (agent | a2a | hermes)
 *   level      — info | step | warn | error | done
 *   event      — short snake_case identifier
 *   elapsed_ms — ms since request start (when available)
 *   ...rest    — arbitrary context fields
 */

export type LogLevel = 'info' | 'step' | 'warn' | 'error' | 'done';

export interface LogEntry {
  ts: string;
  trace_id: string;
  service: string;
  level: LogLevel;
  event: string;
  elapsed_ms?: number;
  [key: string]: unknown;
}

/** Generate a short unique trace ID — 8 hex characters */
export function newTraceId(): string {
  return Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .padStart(8, '0');
}

/** Create a logger bound to a service name and trace ID */
export function createLogger(service: string, traceId: string) {
  const start = Date.now();

  function emit(
    level: LogLevel,
    event: string,
    context?: Record<string, unknown>,
    elapsedOverride?: number,
  ) {
    const entry: LogEntry = {
      ts: new Date().toISOString(),
      trace_id: traceId,
      service,
      level,
      event,
      elapsed_ms: elapsedOverride ?? Date.now() - start,
      ...context,
    };
    // Single JSON line — Vercel captures console.log as structured log
    console.log(JSON.stringify(entry));
  }

  return {
    /** General info event */
    info: (event: string, ctx?: Record<string, unknown>) =>
      emit('info', event, ctx),

    /** Pipeline step completed */
    step: (event: string, stepElapsed: number, ctx?: Record<string, unknown>) =>
      emit('step', event, { step_ms: stepElapsed, ...ctx }),

    /** Warning — degraded but not failed */
    warn: (event: string, ctx?: Record<string, unknown>) =>
      emit('warn', event, ctx),

    /** Error — request failed or upstream error */
    error: (event: string, ctx?: Record<string, unknown>) =>
      emit('error', event, ctx),

    /** Request completed — emitted at the very end with total elapsed */
    done: (ctx?: Record<string, unknown>) =>
      emit('done', 'request_complete', ctx),

    /** Returns total elapsed ms from logger creation */
    elapsed: () => Date.now() - start,

    traceId,
  };
}

export type AtlasLogger = ReturnType<typeof createLogger>;
