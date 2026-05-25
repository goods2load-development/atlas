'use client';

import ChatInput from './ChatInput';
import ChatMessageBubble from './ChatMessageBubble';
import TypingIndicator from './TypingIndicator';
import type { AgentResponse, ChatMessage } from './types';

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
    setLoading(true);

    try {
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

      // Persist Atlas session across turns
      if (data.session_id) setSessionId(data.session_id);

      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: 'assistant',
          content: data.reply,
          createdAt: Date.now(),
          data: data.data,
        },
      ]);
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
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <div className="mx-auto flex h-[calc(100vh-160px)] max-w-3xl flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <G2LCircleLogo />
          <div>
            <h1 className="text-lg font-semibold text-black">
              Freight Assistant
            </h1>
            <p className="text-xs text-muted-foreground">
              Describe your shipment — matched to verified forwarders by Atlas
            </p>
          </div>
        </div>
        {messages.length > 1 && (
          <button
            onClick={reset}
            className="text-xs text-muted-foreground hover:text-primaryOrange transition-colors"
          >
            New search
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="hide-scrollbar flex-1 space-y-4 overflow-y-auto py-6"
      >
        {messages.map((m) => (
          <ChatMessageBubble key={m.id} message={m} />
        ))}
        {loading && <TypingIndicator />}

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-2">
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
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-border pt-4">
        <ChatInput onSend={send} disabled={loading} />
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Goods2Load connects you with verified freight forwarders. No
          transaction fees.
        </p>
      </div>
    </div>
  );
}
