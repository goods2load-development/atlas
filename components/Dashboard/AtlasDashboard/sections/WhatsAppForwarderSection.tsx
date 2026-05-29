'use client';

import { DEMO_LEADS, type DemoLead } from '../boxmanData';

import { useState } from 'react';

import { Check, FileText, Mail, MessageCircle, Send } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type Thread = DemoLead & { unread?: number };

// ── Helpers ───────────────────────────────────────────────────────────────────

const CHANNEL_ICON: Record<string, React.ElementType> = {
  whatsapp: MessageCircle,
  email: Mail,
  g2l: MessageCircle,
};

const CHANNEL_COLOR: Record<string, string> = {
  whatsapp: '#25D366',
  email: '#3b82f6',
  g2l: '#FF6720',
};

function avatar(name: string, isAuto?: boolean) {
  if (isAuto) return { text: 'M', bg: 'bg-[#0d0d1a]' };
  const colors = [
    'bg-primaryOrange',
    'bg-blue-500',
    'bg-violet-500',
    'bg-teal-500',
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return { text: name[0].toUpperCase(), bg: colors[idx] };
}

function timeAgo(t: string) {
  return t;
}

// ── Proforma generator ────────────────────────────────────────────────────────

function buildProforma(lead: DemoLead): string {
  const date = new Date().toISOString().slice(0, 10);
  const rand = Math.floor(Math.random() * 9000) + 1000;
  const ref = `G2L-PF-${date.replace(/-/g, '')}-${rand}`;
  const rate = lead.marketRate
    ? `$${lead.marketRate.low.toLocaleString()}–${lead.marketRate.high.toLocaleString()} ${lead.marketRate.unit}`
    : 'To be confirmed';
  const mode =
    lead.mode === 'air' ? '✈️ Air' : lead.mode === 'sea' ? '🚢 Sea' : '🚛 Road';
  return [
    `📋 PROFORMA — ${ref}`,
    ``,
    `Route:      ${lead.origin} → ${lead.destination}`,
    `Mode:       ${mode}`,
    `Commodity:  ${lead.cargo}`,
    `Weight:     ${lead.weight ?? 'TBC'}`,
    `Est. Rate:  ${rate}`,
    ``,
    `Terms: EXW · Payment net 30 · Subject to final confirmation`,
    `Valid: 48 hours from issue`,
    ``,
    `Freight Forwarding Co. · via Goods2Load`,
  ].join('\n');
}

// ── Thread list item ──────────────────────────────────────────────────────────

function ThreadItem({
  thread,
  active,
  onClick,
}: {
  thread: Thread;
  active: boolean;
  onClick: () => void;
}) {
  const av = avatar(thread.from);
  const Icon = CHANNEL_ICON[thread.channel] ?? MessageCircle;
  const color = CHANNEL_COLOR[thread.channel] ?? '#FF6720';
  const lastMsg = thread.shipperReply ?? thread.momentumMessage ?? thread.cargo;
  const unread = thread.unread ?? (thread.shipperReply ? 1 : 0);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-start gap-3 px-4 py-3.5 border-b border-border transition-colors ${
        active
          ? 'bg-primaryOrange/5 border-l-2 border-l-primaryOrange'
          : 'hover:bg-gray-50/60'
      }`}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white shrink-0 ${av.bg}`}
      >
        {av.text}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-[12px] font-semibold text-black truncate">
            {thread.from}
          </p>
          <p className="text-[10px] text-muted-foreground shrink-0">
            {timeAgo(thread.time)}
          </p>
        </div>
        <p className="text-[10px] text-muted-foreground truncate mb-1">
          {thread.company}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {lastMsg?.slice(0, 60)}…
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <Icon size={9} style={{ color }} strokeWidth={2} />
          <span
            className="text-[9px] font-semibold capitalize"
            style={{ color }}
          >
            {thread.channel === 'g2l' ? 'G2L' : thread.channel}
          </span>
          {thread.momentumSent && (
            <span className="text-[9px] font-semibold text-green-600 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded-full">
              Momentum replied
            </span>
          )}
        </div>
      </div>
      {unread > 0 && (
        <span className="w-4 h-4 rounded-full bg-[#25D366] text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-1">
          {unread}
        </span>
      )}
    </button>
  );
}

// ── Conversation view ─────────────────────────────────────────────────────────

function ConversationView({ thread }: { thread: Thread }) {
  const [reply, setReply] = useState('');
  const [sent, setSent] = useState(false);
  const [showProforma, setShowProforma] = useState(false);
  const [proformaCopied, setProformaCopied] = useState(false);

  const proformaText = buildProforma(thread);

  function handleSend() {
    if (!reply.trim()) return;
    setSent(true);
    setReply('');
    setTimeout(() => setSent(false), 3000);
  }

  function handleCopyProforma() {
    navigator.clipboard.writeText(proformaText);
    setProformaCopied(true);
    setTimeout(() => setProformaCopied(false), 2000);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white ${avatar(thread.from).bg}`}
          >
            {avatar(thread.from).text}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-black leading-tight">
              {thread.from}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {thread.company}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowProforma((v) => !v)}
          className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
            showProforma
              ? 'bg-primaryOrange text-white border-primaryOrange'
              : 'border-primaryOrange/40 text-primaryOrange hover:bg-primaryOrange/5'
          }`}
        >
          <FileText size={11} strokeWidth={2} />
          Build Proforma
        </button>
      </div>

      {/* Proforma panel */}
      {showProforma && (
        <div className="border-b border-border bg-orange-50/60 px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold text-primaryOrange uppercase tracking-wider">
              Auto-generated proforma
            </p>
            <button
              onClick={handleCopyProforma}
              className="flex items-center gap-1 text-[10px] font-semibold text-primaryOrange border border-primaryOrange/30 rounded-full px-2.5 py-0.5 hover:bg-primaryOrange/10 transition-colors"
            >
              {proformaCopied ? (
                <>
                  <Check size={9} /> Copied
                </>
              ) : (
                'Copy to clipboard'
              )}
            </button>
          </div>
          <pre className="text-[10px] leading-relaxed text-black font-mono whitespace-pre-wrap bg-white border border-border rounded-lg p-3">
            {proformaText}
          </pre>
          <p className="text-[9px] text-muted-foreground mt-2">
            Copy and paste into WhatsApp, email, or your quoting system.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#e5ddd5] p-4 space-y-2.5">
        {/* Shipper opening message */}
        <div className="flex justify-start">
          <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2.5 max-w-[80%] shadow-sm">
            <p className="text-[9px] font-semibold text-gray-500 mb-1">
              {thread.from} · {thread.company}
            </p>
            <p className="text-[11px] text-black leading-relaxed">
              {thread.cargo}. {thread.origin} → {thread.destination}.
              {thread.weight ? ` Approx ${thread.weight}.` : ''} How quickly can
              you quote?
            </p>
            <p className="text-[9px] text-gray-400 text-right mt-1">
              {thread.time}
            </p>
          </div>
        </div>

        {/* Momentum auto-reply */}
        {thread.momentumSent && thread.momentumMessage && (
          <div className="flex justify-end">
            <div className="bg-[#dcf8c6] rounded-xl rounded-tr-sm px-3 py-2.5 max-w-[80%] shadow-sm">
              <p className="text-[9px] font-semibold text-green-800 mb-1">
                Momentum · auto · {thread.momentumTime}
              </p>
              <p className="text-[11px] text-black leading-relaxed">
                {thread.momentumMessage}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[#4FC3F7] text-[11px]">✓✓</span>
              </div>
            </div>
          </div>
        )}

        {/* Shipper follow-up */}
        {thread.shipperReply && (
          <div className="flex justify-start">
            <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2.5 max-w-[80%] shadow-sm">
              <p className="text-[11px] text-black leading-relaxed">
                {thread.shipperReply}
              </p>
              <p className="text-[9px] text-gray-400 text-right mt-1">
                just now
              </p>
            </div>
          </div>
        )}

        {/* Sent confirmation */}
        {sent && (
          <div className="flex justify-end">
            <div className="bg-[#dcf8c6] rounded-xl rounded-tr-sm px-3 py-2.5 max-w-[80%] shadow-sm">
              <p className="text-[11px] text-black leading-relaxed">
                {reply || '…'}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <p className="text-[9px] text-gray-400">just now</p>
                <span className="text-[#4FC3F7] text-[11px]">✓✓</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reply composer */}
      <div className="border-t border-border bg-white px-4 py-3">
        {sent && (
          <p className="text-[10px] text-green-600 font-semibold mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            Message sent
          </p>
        )}
        <div className="flex gap-2">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a reply… (Enter to send)"
            rows={2}
            className="flex-1 text-[11px] px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-[#25D366] bg-gray-50 resize-none"
          />
          <button
            onClick={handleSend}
            disabled={!reply.trim()}
            className="flex items-center gap-1.5 bg-[#25D366] text-white text-[11px] font-semibold px-3 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 self-end"
          >
            <Send size={12} strokeWidth={2} />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const THREADS: Thread[] = DEMO_LEADS.filter((l) => l.momentumSent).map(
  (l, i) => ({ ...l, unread: i < 2 && l.shipperReply ? 1 : 0 }),
);

export default function WhatsAppForwarderSection() {
  const [activeId, setActiveId] = useState<string>(THREADS[0]?.id ?? '');
  const activeThread = THREADS.find((t) => t.id === activeId) ?? THREADS[0];

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left — thread list */}
      <div className="w-[260px] shrink-0 border-r border-border flex flex-col bg-white">
        {/* Header */}
        <div className="px-4 pt-5 pb-3 border-b border-border">
          <h2 className="text-[15px] font-bold text-black">WhatsApp</h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {THREADS.length} conversations · routed by Momentum
          </p>
        </div>

        {/* Thread list */}
        <div className="flex-1 overflow-y-auto">
          {THREADS.map((t) => (
            <ThreadItem
              key={t.id}
              thread={t}
              active={t.id === activeId}
              onClick={() => setActiveId(t.id)}
            />
          ))}
        </div>

        {/* Connect CTA */}
        <div className="p-3 border-t border-border bg-gray-50/60">
          <button className="w-full flex items-center justify-center gap-1.5 text-[10px] font-semibold text-[#25D366] border border-[#25D366]/30 rounded-full py-1.5 hover:bg-[#25D366]/10 transition-colors">
            <MessageCircle size={10} />
            Connect live WhatsApp
          </button>
        </div>
      </div>

      {/* Right — conversation */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {activeThread ? (
          <ConversationView key={activeThread.id} thread={activeThread} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-[12px]">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
