'use client';

import { useEffect, useRef, useState } from 'react';

import { Send } from 'lucide-react';

const SUGGESTIONS = [
  'Which of my lanes has the most demand right now?',
  'How does my trust score of 84 compare to competitors?',
  'Draft a cold email for a Frankfurt automotive shipper',
  'Why am I losing deals on the China sea route?',
  'What cargo types should I target to reach 78% win rate?',
  'How do I rank higher for pharma freight on G2L?',
];

function buildSystemContext(company: string) {
  return `You are Atlas, the AI freight intelligence assistant for ${company} — a freight forwarder on the Goods2Load network.

Answer all questions specifically for ${company}'s situation. Be concise, actionable, and use real freight industry knowledge. If you don't have specific data for ${company}, give relevant general freight industry advice for a forwarder with their profile.`;
}

interface Message {
  role: 'user' | 'atlas';
  text: string;
}

export default function IntelligenceSection({
  company = 'your company',
}: {
  company?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'atlas',
      text: `Good morning. I'm Atlas — your freight intelligence layer. I know ${company}'s lanes, capabilities, and the current market rates on your top corridors.\n\nWhat do you want to work on today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: 'user', text: text.trim() }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `${buildSystemContext(company)}\n\n${company} forwarder asks: ${text.trim()}`,
            },
          ],
        }),
      });
      const json = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: 'atlas',
          text: json.reply ?? 'Connection error — please try again.',
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'atlas',
          text: 'Could not reach Atlas — check your backend connection.',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-black">Atlas Intelligence</h2>
          <p className="text-[12px] text-muted-foreground">
            Knows your lanes, your win rate, live market rates — ask anything
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-green-700">Live</span>
        </div>
      </div>

      {/* Context chips */}
      <div className="flex items-center gap-2 px-6 py-2.5 border-b border-border bg-gray-50/60 overflow-x-auto hide-scrollbar">
        <span className="text-[10px] text-muted-foreground shrink-0 uppercase tracking-wide font-medium">
          Context
        </span>
        {[
          'Air 50%',
          'Sea 30%',
          'Road 20%',
          'Trust 84/100',
          'Win rate 61%',
          'DXB · FRA · SHA · BOM',
        ].map((chip) => (
          <span
            key={chip}
            className="text-[10px] font-semibold bg-primaryOrange/8 text-primaryOrange px-2 py-0.5 rounded-full border border-primaryOrange/20 shrink-0"
          >
            {chip}
          </span>
        ))}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-4 hide-scrollbar"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'atlas' && (
              <div className="w-6 h-6 rounded-full bg-[#0d0d1a] flex items-center justify-center text-[9px] text-white font-bold shrink-0 mt-1 mr-2">
                A
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-primaryOrange text-white rounded-br-sm'
                  : 'bg-white text-black border border-border rounded-bl-sm shadow-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0d0d1a] flex items-center justify-center text-[9px] text-white font-bold shrink-0">
              A
            </div>
            <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primaryOrange/60 animate-bounce block"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] text-primaryOrange border border-primaryOrange/25 rounded-full px-3 py-1.5 hover:bg-primaryOrange/5 transition-colors text-left"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border px-6 py-4">
        <div className="flex items-center gap-3 bg-gray-50 border border-border rounded-2xl px-4 py-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            disabled={loading}
            placeholder="Ask Atlas about your business, lanes, or market…"
            className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="w-8 h-8 rounded-full bg-primaryOrange text-white flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-opacity shrink-0"
          >
            <Send size={12} strokeWidth={2} />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Atlas knows {company}&apos;s profile, market rates, and G2L platform
          data
        </p>
      </div>
    </div>
  );
}
