'use client';

import { useEffect, useRef, useState } from 'react';

// ── Pipeline stages — mirrors the real Atlas C1→C5 agents ────────────────────
const PIPELINE = [
  {
    id: 'C1',
    label: 'Reading your shipment',
    fakeMs: 700,
    maxCount: 0,
    countLabel: '',
  },
  {
    id: 'C1.5',
    label: 'Searching freight conversations',
    fakeMs: 2600,
    maxCount: 6_000_000,
    countLabel: 'messages scanned',
  },
  {
    id: 'C2',
    label: 'Finding verified capacity',
    fakeMs: 1900,
    maxCount: 11_243,
    countLabel: 'forwarders checked',
  },
  {
    id: 'C3',
    label: 'Scoring trust & compliance',
    fakeMs: 1400,
    maxCount: 11_243,
    countLabel: 'profiles scored',
  },
  {
    id: 'C4',
    label: 'Enriching provider profiles',
    fakeMs: 1200,
    maxCount: 847,
    countLabel: 'data points added',
  },
  {
    id: 'C5',
    label: 'Ranking your matches',
    fakeMs: 700,
    maxCount: 0,
    countLabel: '',
  },
] as const;

type PipelineId = (typeof PIPELINE)[number]['id'];

// Precompute cumulative start times for fake mode — no setState loops needed
const FAKE_SCHEDULE = PIPELINE.reduce<
  { id: PipelineId; start: number; end: number }[]
>((acc, step) => {
  const prev = acc.at(-1);
  const start = prev?.end ?? 0;
  return [
    ...acc,
    { id: step.id as PipelineId, start, end: start + step.fakeMs },
  ];
}, []);

// ── Public types (re-exported so ChatAgent can pass real events later) ────────
export interface PipelineEvent {
  type: 'step_start' | 'step_done' | 'step_progress' | 'complete';
  step: string;
  label?: string;
  elapsed_ms: number;
  meta?: { records?: number; records_checked?: number };
}

interface ThinkingPanelProps {
  /** Real SSE events from Atlas backend. Omit to use built-in fake timing. */
  events?: PipelineEvent[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtMs(ms: number) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function fmtClock(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

// ── ThinkingPanel ─────────────────────────────────────────────────────────────
export default function ThinkingPanel({ events }: ThinkingPanelProps) {
  const mountedAt = useRef(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Live clock — ticks every 100 ms
  useEffect(() => {
    mountedAt.current = Date.now();
    const id = setInterval(
      () => setElapsed(Date.now() - mountedAt.current),
      100,
    );
    return () => clearInterval(id);
  }, []);

  // Derive step states from elapsed time (fake) or from real SSE events
  const stepStates = PIPELINE.map((step, i) => {
    if (events && events.length > 0) {
      // ── Real events mode ────────────────────────────────────────────────────
      const startEvt = events.find(
        (e) => e.type === 'step_start' && e.step === step.id,
      );
      const doneEvt = events.find(
        (e) => e.type === 'step_done' && e.step === step.id,
      );
      const progEvt = [...events]
        .reverse()
        .find((e) => e.type === 'step_progress' && e.step === step.id);

      if (doneEvt)
        return {
          ...step,
          status: 'done' as const,
          durationMs: doneEvt.elapsed_ms - (startEvt?.elapsed_ms ?? 0),
          count: progEvt?.meta?.records_checked ?? step.maxCount,
        };
      if (startEvt)
        return {
          ...step,
          status: 'active' as const,
          durationMs: null,
          count: progEvt?.meta?.records_checked ?? 0,
        };
      return {
        ...step,
        status: 'pending' as const,
        durationMs: null,
        count: 0,
      };
    } else {
      // ── Fake timing mode — driven purely by elapsed ms ──────────────────────
      const sched = FAKE_SCHEDULE[i];
      if (elapsed >= sched.end) {
        return {
          ...step,
          status: 'done' as const,
          durationMs: step.fakeMs,
          count: step.maxCount,
        };
      }
      if (elapsed >= sched.start) {
        const progress = Math.min(1, (elapsed - sched.start) / step.fakeMs);
        // Ease-in curve so the counter accelerates
        const easedProgress = progress * progress;
        return {
          ...step,
          status: 'active' as const,
          durationMs: null,
          count: Math.floor(easedProgress * step.maxCount),
        };
      }
      return {
        ...step,
        status: 'pending' as const,
        durationMs: null,
        count: 0,
      };
    }
  });

  const doneSteps = stepStates.filter((s) => s.status === 'done');
  const activeStep = stepStates.find((s) => s.status === 'active');

  return (
    <div
      className="space-y-2 px-1 py-2"
      aria-live="polite"
      aria-label="Atlas is building your match"
    >
      {/* Header — title + live clock */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primaryOrange">
            ⚡ Atlas is building
          </span>
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-primaryOrange animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s',
                }}
              />
            ))}
          </div>
        </div>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {fmtClock(elapsed)}
        </span>
      </div>

      {/* Completed steps — stack up as each agent finishes */}
      {doneSteps.map((step) => (
        <div
          key={step.id}
          className="flex items-center gap-2 text-xs text-muted-foreground"
          style={{ animation: 'panelFadeIn 0.25s ease-out' }}
        >
          <span className="w-3 shrink-0 text-green-500">✓</span>
          <span>{step.label}</span>
          {step.durationMs != null && (
            <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
              {fmtMs(step.durationMs)}
            </span>
          )}
        </div>
      ))}

      {/* Active step — highlighted card with progress bar */}
      {activeStep && (
        <div
          className="rounded-md border border-primaryOrange/20 bg-lightOrange/40 px-3 py-2 space-y-1.5"
          style={{ animation: 'panelFadeIn 0.25s ease-out' }}
        >
          <div className="flex items-center gap-2 text-xs">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primaryOrange animate-pulse" />
            <span className="font-medium text-black">{activeStep.label}…</span>
          </div>

          {activeStep.maxCount > 0 && (
            <div className="space-y-1">
              {/* Progress bar */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-primaryOrange/15">
                <div
                  className="h-full rounded-full bg-primaryOrange/50 transition-all duration-200 ease-out"
                  style={{
                    width: `${Math.min(
                      98,
                      (activeStep.count / activeStep.maxCount) * 100,
                    )}%`,
                  }}
                />
              </div>
              {/* Live counter */}
              <p className="text-[10px] tabular-nums text-muted-foreground">
                {activeStep.count.toLocaleString()} {activeStep.countLabel}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Keyframe — scoped inline so no Tailwind plugin needed */}
      <style>{`
        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
