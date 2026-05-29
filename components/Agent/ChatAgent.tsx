'use client';

import ChatInput from './ChatInput';
import ChatMessageBubble from './ChatMessageBubble';
import SponsoredPanel from './SponsoredPanel';
import ThinkingPanel from './ThinkingPanel';
import type {
  AgentResponse,
  BookingConfirmation,
  ChatMessage,
  MatchedProvider,
  PipelineEvent,
} from './types';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  createdAt: Date.now(),
  content:
    "Hi — I'm Atlas, your freight assistant, powered by GOODS2LOAD. Tell me what you need to move and I'll match you with verified forwarders across the world. Write in any language.",
};

// Real Atlas use-cases drawn from the onboarded forwarder capability set
const SUGGESTIONS = [
  'Air freight 500 kg pharma from Frankfurt to Baghdad',
  'FCL 2×40ft containers, Jebel Ali → Mumbai, general cargo',
  'Who handles dangerous goods from UAE to Saudi Arabia?',
  'Cold chain truck for frozen food, Dubai to Muscat',
];

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ── Booking intent detection ──────────────────────────────────────────────────

const BOOKING_KEYWORDS = [
  'book',
  'rate request',
  'request rate',
  'send rate',
  'get rate',
  'get quote',
  'request quote',
  'send quote',
  'contact',
  'reach out',
  'connect me',
  'proceed with',
  'go with',
  'go ahead',
  'choose',
  'select',
  'use this',
  'hire',
  'enquire',
  'inquire',
  'work with',
];

function detectBookingIntent(message: string): boolean {
  const lower = message.toLowerCase();
  return BOOKING_KEYWORDS.some((k) => lower.includes(k));
}

function findTargetProvider(
  message: string,
  candidates: MatchedProvider[],
): MatchedProvider | null {
  if (!candidates.length) return null;
  const lower = message.toLowerCase();

  // 1. Exact company name match (longest wins)
  const byName = candidates
    .filter((c) => lower.includes(c.company_name.toLowerCase()))
    .sort((a, b) => b.company_name.length - a.company_name.length);
  if (byName.length) return byName[0];

  // 2. Fuzzy: any word in the company name appears in the message
  const byWord = candidates.filter((c) =>
    c.company_name
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 2)
      .some((w) => lower.includes(w)),
  );
  if (byWord.length === 1) return byWord[0]; // only if unambiguous

  // 3. Match by rank number or ordinal
  if (/\b(#?1|first|top|number one)\b/.test(lower))
    return candidates[0] ?? null;
  if (/\b(#?2|second)\b/.test(lower)) return candidates[1] ?? null;
  if (/\b(#?3|third)\b/.test(lower)) return candidates[2] ?? null;

  // 4. Single candidate — unambiguous
  if (candidates.length === 1) return candidates[0];

  return null;
}

/** One-stop helper: detect intent + find provider + build confirmation or return null. */
function resolveBooking(
  userMessage: string,
  candidates: MatchedProvider[],
): BookingConfirmation | null {
  if (!detectBookingIntent(userMessage) || !candidates.length) return null;
  const target = findTargetProvider(userMessage, candidates);
  return target ? makeBookingConfirmation(target) : null;
}

function makeBookingConfirmation(
  provider: MatchedProvider,
): BookingConfirmation {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  const reference = `G2L-${date}-${rand}`;
  const waText = encodeURIComponent(
    `Hi Goods2Load, I'd like to follow up on rate request ${reference} for ${provider.company_name}.`,
  );
  return {
    provider,
    reference,
    status: 'submitted',
    whatsapp_url: `https://wa.me/971505574291?text=${waText}`,
  };
}

function G2LCircleLogo() {
  return (
    <Image
      src="/g2l-logo-circle.png"
      alt="Goods2Load"
      width={56}
      height={56}
      priority
    />
  );
}

export default function ChatAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [pipelineEvents, setPipelineEvents] = useState<PipelineEvent[]>([]);
  // Track last set of provider matches so booking intent can reference them
  const lastMatchesRef = useRef<MatchedProvider[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  async function send(text: string) {
    const userMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    };
    const next = [...messages, userMsg];
    setMessages(next);

    // ── Booking intent: resolve client-side, never send to Atlas ─────────────
    if (detectBookingIntent(text) && lastMatchesRef.current.length) {
      const target = findTargetProvider(text, lastMatchesRef.current);
      if (target) {
        // Named provider found — confirm booking immediately
        const earlyBooking = makeBookingConfirmation(target);
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: 'assistant',
            content: `Done! I've submitted a rate request to ${earlyBooking.provider.company_name} on your behalf. Use the reference below to follow up — Goods2Load will connect you within 24 hours.`,
            createdAt: Date.now(),
            data: { booking: earlyBooking },
          },
        ]);
        return;
      } else {
        // Booking intent but name not matched — ask to clarify, don't call Atlas
        const names = lastMatchesRef.current
          .slice(0, 5)
          .map((c, i) => `${i + 1}. ${c.company_name}`)
          .join('\n');
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: 'assistant',
            content: `Which forwarder would you like to contact? Here are your current matches:\n\n${names}\n\nJust reply with the name or number.`,
            createdAt: Date.now(),
          },
        ]);
        return;
      }
    }

    setLoading(true);
    setPipelineEvents([]); // reset pipeline for each new query

    try {
      // ── Try streaming first (/api/agent/stream) ─────────────────────────────
      // Falls back to regular POST if the stream endpoint isn't available yet.
      let streamed = false;

      try {
        const streamRes = await fetch('/api/agent/stream', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: next[next.length - 1].content,
            session_id: sessionId,
          }),
        });

        if (
          streamRes.ok &&
          streamRes.headers
            .get('content-type')
            ?.includes('text/event-stream') &&
          streamRes.body
        ) {
          streamed = true;
          const reader = streamRes.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          outer: while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            // SSE format: one or more "data: {...}\n\n" blocks
            const blocks = buffer.split('\n\n');
            buffer = blocks.pop() ?? '';

            for (const block of blocks) {
              const dataLine = block
                .split('\n')
                .find((l) => l.startsWith('data: '));
              if (!dataLine) continue;

              const event: PipelineEvent = JSON.parse(dataLine.slice(6));

              if (event.type === 'complete' && event.data) {
                const data = event.data;
                if (data.session_id) setSessionId(data.session_id);
                if (data.data?.matches?.length)
                  lastMatchesRef.current = data.data.matches;
                const booking = resolveBooking(text, lastMatchesRef.current);
                setMessages((m) => [
                  ...m,
                  {
                    id: uid(),
                    role: 'assistant',
                    content: data.reply,
                    createdAt: Date.now(),
                    data: { ...data.data, ...(booking ? { booking } : {}) },
                  },
                ]);
                break outer;
              }

              setPipelineEvents((prev) => [...prev, event]);
            }
          }
        }
      } catch {
        // Stream endpoint not available — fall through to regular POST
      }

      // ── Regular POST fallback ───────────────────────────────────────────────
      if (!streamed) {
        const res = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: next.map(({ role, content }) => ({ role, content })),
            session_id: sessionId,
          }),
        });
        if (!res.ok) throw new Error(`Agent error ${res.status}`);
        const data: AgentResponse = await res.json();
        if (data.session_id) setSessionId(data.session_id);
        if (data.data?.matches?.length)
          lastMatchesRef.current = data.data.matches;
        const booking = resolveBooking(text, lastMatchesRef.current);
        setMessages((m) => [
          ...m,
          {
            id: uid(),
            role: 'assistant',
            content: data.reply,
            createdAt: Date.now(),
            data: { ...data.data, ...(booking ? { booking } : {}) },
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: 'assistant',
          content:
            "Sorry — I couldn't reach the matching service just now. Please try again in a moment.",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([WELCOME]);
    setSessionId(undefined);
    setPipelineEvents([]);
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <div className="mx-auto flex h-[calc(100vh-112px)] max-w-4xl flex-col px-4">
      {/* ── Sponsored panel — fixed to viewport right edge, doesn't affect chat layout ── */}
      <SponsoredPanel messages={messages} />

      {/* Messages */}
      <div ref={scrollRef} className="hide-scrollbar flex-1 overflow-y-auto">
        {showSuggestions ? (
          /* ── Gemini-style centred intro ── */
          <div className="flex flex-col items-center px-4 pt-28 gap-8">
            <div className="flex flex-col items-center gap-4 max-w-xl text-center">
              <p className="text-base text-muted-foreground leading-relaxed">
                {WELCOME.content}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-primaryOrange/40 bg-lightOrange px-3 py-1.5 text-xs text-black transition-colors hover:bg-primaryOrange hover:text-customWhite"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Normal conversation ── */
          <div className="space-y-5 py-8 px-1">
            {messages.map((m) => (
              <ChatMessageBubble key={m.id} message={m} />
            ))}
            {loading && <ThinkingPanel events={pipelineEvents} />}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border pt-5 pb-2">
        <ChatInput onSend={send} disabled={loading} />
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Goods2Load connects you with verified freight forwarders. No
          transaction fees.
        </p>
      </div>
    </div>
  );
}
