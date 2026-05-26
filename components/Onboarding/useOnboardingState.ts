'use client';

import type {
  CollectedFields,
  OnboardingMessage,
  OnboardingStep,
} from './types';
import { ONBOARDING_STEPS, TOTAL_STEPS } from './types';

import { useCallback, useRef, useState } from 'react';

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useOnboardingState() {
  const [messages, setMessages] = useState<OnboardingMessage[]>([]);
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [collected, setCollected] = useState<CollectedFields>({});
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentStepMeta = ONBOARDING_STEPS.find((s) => s.id === step);
  const stepNumber = currentStepMeta?.stepNumber ?? 0;
  const progress = Math.round((stepNumber / TOTAL_STEPS) * 100);

  const addMessage = useCallback(
    (msg: Omit<OnboardingMessage, 'id' | 'createdAt'>) => {
      setMessages((prev) => [
        ...prev,
        { ...msg, id: uid(), createdAt: Date.now() },
      ]);
    },
    [],
  );

  const updateCollected = useCallback((fields: Partial<CollectedFields>) => {
    setCollected((prev) => ({ ...prev, ...fields }));
  }, []);

  const advanceStep = useCallback((nextStep: OnboardingStep) => {
    setStep(nextStep);
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);
  }, []);

  async function sendMessage(
    text: string,
    collectedPatch?: Partial<CollectedFields>,
  ) {
    if (!text.trim() && step !== 'welcome') return;

    // Add user message
    if (text.trim()) {
      addMessage({ role: 'user', content: text });
    }

    setLoading(true);
    scrollToBottom();

    // Merge patch with current collected so callers that update state
    // right before calling sendMessage don't get stale data in the request
    const effectiveCollected = collectedPatch
      ? { ...collected, ...collectedPatch }
      : collected;

    try {
      const res = await fetch('/api/onboarding-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: sessionId,
          step,
          collected: effectiveCollected,
        }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();

      if (data.session_id) setSessionId(data.session_id);
      if (data.extracted) updateCollected(data.extracted);
      if (data.next_step) advanceStep(data.next_step);

      addMessage({
        role: 'assistant',
        content: data.reply,
        card: data.card,
      });
    } catch {
      addMessage({
        role: 'assistant',
        content:
          'Sorry, something went wrong. Let me try again — just repeat your last answer.',
      });
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }

  function reset() {
    setMessages([]);
    setStep('welcome');
    setCollected({});
    setSessionId(undefined);
    setLoading(false);
  }

  return {
    messages,
    step,
    collected,
    loading,
    stepNumber,
    progress,
    scrollRef,
    sendMessage,
    addMessage,
    updateCollected,
    advanceStep,
    reset,
    scrollToBottom,
  };
}
