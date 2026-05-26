'use client';

import {
  FileUploadCard,
  GeoFocusCard,
  MultiSelectCard,
  ServiceMixCard,
  SummaryCard,
} from './OnboardingCards';
import { ONBOARDING_STEPS, TOTAL_STEPS } from './types';
import type { OnboardingCard } from './types';
import { useOnboardingState } from './useOnboardingState';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// ── Progress bar ──────────────────────────────────────────────────────────────

function ProgressBar({
  stepNumber,
  label,
}: {
  stepNumber: number;
  label: string;
}) {
  const pct = Math.round((stepNumber / TOTAL_STEPS) * 100);
  return (
    <div className="px-6 py-3 border-b border-border bg-white">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-semibold text-primaryOrange uppercase tracking-wide">
          {label}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {stepNumber} / {TOTAL_STEPS}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primaryOrange transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────

function MessageBubble({
  message,
  onFileUploaded,
  onMultiSelectConfirm,
  onServiceMixConfirm,
  onGeoFocusConfirm,
}: {
  message: ReturnType<typeof useOnboardingState>['messages'][number];
  onFileUploaded: (field: string, file: File) => void;
  onMultiSelectConfirm: (field: string, selected: string[]) => void;
  onServiceMixConfirm: (mix: any) => void;
  onGeoFocusConfirm: (entries: any[]) => void;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-primaryOrange text-white rounded-br-sm'
            : 'bg-gray-50 text-black rounded-bl-sm border border-border'
        }`}
      >
        {message.content}

        {/* Inline cards */}
        {message.card && !isUser && (
          <>
            {message.card.type === 'file_upload' && (
              <FileUploadCard card={message.card} onUploaded={onFileUploaded} />
            )}
            {message.card.type === 'multi_select' && (
              <MultiSelectCard
                card={message.card}
                onConfirm={onMultiSelectConfirm}
              />
            )}
            {message.card.type === 'service_mix' && (
              <ServiceMixCard onConfirm={onServiceMixConfirm} />
            )}
            {message.card.type === 'geo_focus' && (
              <GeoFocusCard onConfirm={onGeoFocusConfirm} />
            )}
            {message.card.type === 'summary' && (
              <SummaryCard fields={message.card.fields} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Thinking indicator ────────────────────────────────────────────────────────

function Thinking() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-50 border border-border rounded-xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-primaryOrange/60 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Input bar ─────────────────────────────────────────────────────────────────

function InputBar({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function submit() {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function onInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }

  return (
    <div className="flex items-end gap-3 rounded-2xl border border-border bg-gray-50 px-4 py-3 shadow-sm">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={onInput}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder="Type your answer…"
        className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground leading-relaxed"
      />
      <button
        onClick={submit}
        disabled={disabled || !value.trim()}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primaryOrange text-white hover:opacity-90 transition-opacity disabled:opacity-30 shrink-0"
        aria-label="Send"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function OnboardingAgent() {
  const {
    messages,
    step,
    stepNumber,
    collected,
    loading,
    scrollRef,
    sendMessage,
    updateCollected,
    advanceStep,
  } = useOnboardingState();

  const currentStepMeta = ONBOARDING_STEPS.find((s) => s.id === step);
  const started = useRef(false);

  // Kick off the welcome message once on mount
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    sendMessage('');
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  function handleFileUploaded(field: string, file: File) {
    updateCollected({ [field]: file } as any);
    // Send confirmation back to agent
    sendMessage(`[FILE_UPLOADED:${field}:${file.name}]`);
  }

  function handleMultiSelectConfirm(field: string, selected: string[]) {
    updateCollected({ [field]: selected } as any);
    const label = selected.length > 0 ? selected.join(', ') : 'none';
    sendMessage(`Selected: ${label}`);
  }

  function handleServiceMixConfirm(mix: any) {
    updateCollected({ serviceMix: mix });
    sendMessage(
      `Air ${mix.air}%, Sea ${mix.sea}%, Road ${mix.road}%${mix.other > 0 ? `, Other ${mix.other}%` : ''}`,
    );
  }

  function handleGeoFocusConfirm(entries: any[]) {
    updateCollected({ geoFocus: entries });
    sendMessage(entries.map((e: any) => `${e.country} ${e.pct}%`).join(', '));
  }

  const isComplete = step === 'complete';

  return (
    <div className="mx-auto flex h-[calc(100vh-112px)] max-w-3xl flex-col">
      {/* Progress */}
      {step !== 'welcome' && !isComplete && (
        <ProgressBar
          stepNumber={stepNumber}
          label={currentStepMeta?.label ?? ''}
        />
      )}

      {/* Messages */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex-1 overflow-y-auto px-2 py-6 space-y-4"
      >
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
            <Image
              src="/g2l-logo-circle.png"
              alt="Goods2Load"
              width={56}
              height={56}
              priority
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              I&apos;ll guide you through joining Goods2Load as a verified
              freight forwarder — just answer my questions and I&apos;ll handle
              the rest.
            </p>
          </div>
        )}

        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            message={m}
            onFileUploaded={handleFileUploaded}
            onMultiSelectConfirm={handleMultiSelectConfirm}
            onServiceMixConfirm={handleServiceMixConfirm}
            onGeoFocusConfirm={handleGeoFocusConfirm}
          />
        ))}

        {loading && <Thinking />}

        {isComplete && (
          <div className="flex flex-col items-center gap-4 pt-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-lg font-bold text-black">
              You&apos;re on Goods2Load!
            </h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your profile is live. Shippers matching your lanes will reach you
              within 24 hours.
            </p>
            <Link
              href="/sign-in"
              className="rounded-full bg-primaryOrange text-white text-sm font-semibold px-6 py-2.5 hover:opacity-90 transition-opacity"
            >
              Go to my dashboard →
            </Link>
          </div>
        )}
      </div>

      {/* Input */}
      {!isComplete && (
        <div className="border-t border-border pt-4 pb-2 px-2">
          <InputBar onSend={sendMessage} disabled={loading} />
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Your data is encrypted and only shared with matched shippers.
          </p>
        </div>
      )}
    </div>
  );
}
