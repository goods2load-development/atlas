'use client';

import { useEffect, useState } from 'react';

// Each step mirrors a real Atlas pipeline stage so users understand
// what's happening behind the scenes instead of watching a blank spinner.
const STEPS = [
  { text: 'Reading your shipment request…', icon: '📋' },
  { text: 'Parsing origin, destination & cargo…', icon: '🗺️' },
  { text: 'Searching verified forwarder network…', icon: '🔍' },
  { text: 'Checking route & mode capabilities…', icon: '✈️' },
  { text: 'Scoring compliance & certifications…', icon: '🏅' },
  { text: 'Ranking top matches for you…', icon: '⚡' },
];

const STEP_DURATION = 1800; // ms per step

export default function TypingIndicator() {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStepIdx((i) => (i + 1) % STEPS.length);
    }, STEP_DURATION);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[stepIdx];

  return (
    <div
      className="flex items-center gap-2.5 px-1 py-1"
      aria-live="polite"
      aria-label="Atlas is thinking"
    >
      {/* Animated dots */}
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primaryOrange/70 animate-bounce"
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.9s',
            }}
          />
        ))}
      </div>

      {/* Step label — fades between steps */}
      <span
        key={stepIdx}
        className="text-xs text-muted-foreground animate-fade-in"
        style={{ animation: 'fadeIn 0.35s ease-in' }}
      >
        <span className="mr-1">{step.icon}</span>
        {step.text}
      </span>

      {/* Inline keyframe — avoids needing a new Tailwind plugin */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
