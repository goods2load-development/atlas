'use client';

import { DEMO_LEADS, type DemoLead, MARKET_RATES } from '../boxmanData';

import { useEffect, useRef, useState } from 'react';

import {
  ChevronRight,
  Globe,
  Mail,
  MessageCircle,
  Minus,
  Plane,
  Radio,
  Ship,
  TrendingDown,
  TrendingUp,
  Truck,
  X,
} from 'lucide-react';

// ── Win probability gauge ─────────────────────────────────────────────────────

function WinGauge({ pct, size = 40 }: { pct: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 80 ? '#22c55e' : pct >= 60 ? '#FF6720' : '#ef4444';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] font-bold" style={{ color }}>
          {pct}%
        </span>
      </div>
    </div>
  );
}

// ── Channel & mode config ─────────────────────────────────────────────────────

const CHANNEL_CONFIG = {
  whatsapp: {
    Icon: MessageCircle,
    label: 'WhatsApp',
    cls: 'bg-[#e8f8ef] text-[#25D366] border-[#b8edcf]',
  },
  g2l: {
    Icon: Globe,
    label: 'G2L',
    cls: 'bg-primaryOrange/8 text-primaryOrange border-primaryOrange/20',
  },
  email: {
    Icon: Mail,
    label: 'Email',
    cls: 'bg-gray-100 text-gray-600 border-gray-200',
  },
};

const MODE_CONFIG = {
  air: { Icon: Plane, label: 'Air', cls: 'text-blue-600' },
  sea: { Icon: Ship, label: 'Sea', cls: 'text-cyan-600' },
  road: { Icon: Truck, label: 'Road', cls: 'text-amber-600' },
};

const STAGES = [
  { key: 'new', label: 'New', color: 'bg-primaryOrange' },
  { key: 'contacted', label: 'Contacted', color: 'bg-blue-500' },
  { key: 'quoting', label: 'Quoting', color: 'bg-purple-500' },
  { key: 'sent', label: 'Quote Sent', color: 'bg-amber-500' },
  { key: 'won', label: 'Won', color: 'bg-green-500' },
  { key: 'lost', label: 'Lost', color: 'bg-gray-400' },
] as const;

// ── Forwarder Agent draft messages ────────────────────────────────────────────
// Client-side equivalents of the server buildForwarderACK / buildRateQuote helpers.
// Used by the dashboard to pre-fill the reply box — forwarder clicks "Send" when ready.

function buildDraftIntro(lead: {
  bookingForwarder?: string;
  bookingRef?: string;
  cargo?: string;
  mode?: string;
  origin?: string;
  destination?: string;
}): string {
  const forwarder = lead.bookingForwarder ?? 'Freight Forwarding Co.';
  const mode =
    lead.mode === 'air' ? 'air' : lead.mode === 'sea' ? 'sea' : 'road';
  const cold = /cold|pharma|2-8|temperature|vaccine|gdp/i.test(
    lead.cargo ?? '',
  );
  return (
    `🚛 *${forwarder}* · via Goods2Load\n\n` +
    `Hi! We received your${cold ? ' cold-chain' : ''} ${mode} freight inquiry ` +
    `(Ref: ${lead.bookingRef ?? ''}) through the Atlas network.\n\n` +
    `We specialise in this lane and are preparing your rate quote right now. ` +
    `Could you confirm the cargo weight and any special handling requirements?\n\n` +
    `We'll send a full quote within the hour.\n\n` +
    `_${forwarder} · Goods2Load Partner_`
  );
}

function buildDraftRateQuote(lead: {
  bookingForwarder?: string;
  bookingRef?: string;
  cargo?: string;
  mode?: string;
  origin?: string;
  destination?: string;
}): string {
  const forwarder = lead.bookingForwarder ?? 'Freight Forwarding Co.';
  const ref = lead.bookingRef ?? '';
  const both = `${lead.origin ?? ''} ${lead.destination ?? ''}`.toLowerCase();

  let min = 2000,
    max = 2800,
    transit = '4-6 days';
  if (both.match(/uae|dubai|dxb/) && both.match(/iraq|baghdad|basra/)) {
    min = 1600;
    max = 2200;
    transit = '3-5 days';
  } else if (both.match(/uae|dubai/) && both.match(/saudi|riyadh|jeddah/)) {
    min = 700;
    max = 1200;
    transit = '1-2 days';
  } else if (both.match(/uae|dubai/) && both.match(/mumbai|india/)) {
    min = 1000;
    max = 1600;
    transit = '2-4 days';
  } else if (both.match(/uae|dubai/) && both.match(/amman|jordan/)) {
    min = 1400;
    max = 2000;
    transit = '2-4 days';
  }
  if (lead.mode === 'air') {
    min = Math.round(min * 2.8);
    max = Math.round(max * 3.2);
    transit = '24-48 hours';
  }
  if (lead.mode === 'sea') {
    min = Math.round(min * 0.65);
    max = Math.round(max * 0.75);
    transit = '7-12 days';
  }
  const cold = /cold|pharma|2-8/i.test(lead.cargo ?? '');
  if (cold) {
    min += 300;
    max += 550;
  }
  min = Math.round(min / 50) * 50;
  max = Math.round(max / 50) * 50;

  const modeIcon =
    lead.mode === 'air' ? '✈️' : lead.mode === 'sea' ? '🚢' : '🚛';
  const coldLabel = cold ? ' · Cold Chain 2–8°C' : '';
  const origin = lead.origin ?? 'Origin';
  const dest = lead.destination ?? 'Destination';

  return (
    `📋 *Rate Quote — ${ref}*\n\n` +
    `${modeIcon} *${origin} → ${dest}*${coldLabel}\n` +
    `*Estimated Rate:* $${min.toLocaleString()}–$${max.toLocaleString()} USD\n` +
    `*Transit:* ${transit}\n` +
    `*Forwarder:* ${forwarder}\n\n` +
    `Reply *YES* to confirm, or ask any questions — our team is standing by.\n\n` +
    `_Rate Quote · ${forwarder}_`
  );
}

// ── Lead detail panel ─────────────────────────────────────────────────────────

function LeadDetail({
  lead,
  onClose,
}: {
  lead: DemoLead & {
    rawPhone?: string;
    isLive?: boolean;
    isBooking?: boolean;
    bookingRef?: string;
    bookingForwarder?: string;
    cargo?: string;
    mode?: string;
    origin?: string;
    destination?: string;
  };
  onClose: () => void;
}) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  async function sendReply() {
    if (!replyText.trim() || !lead.rawPhone) return;
    setReplying(true);
    try {
      await fetch('/api/reply-wa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: lead.rawPhone, message: replyText }),
      });
      setReplySent(true);
      setReplyText('');
    } catch (e) {
      console.error(e);
    } finally {
      setReplying(false);
    }
  }

  const ch = CHANNEL_CONFIG[lead.channel];
  const md = MODE_CONFIG[lead.mode];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-border">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${ch.cls}`}
            >
              <ch.Icon size={10} strokeWidth={2} />
              {ch.label}
            </span>
            {lead.status === 'new' && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primaryOrange text-white uppercase tracking-wide">
                New
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-bold text-black leading-tight">
            {lead.from}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {lead.company} · <span>{lead.flag}</span> {lead.country}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100 text-muted-foreground transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Cargo details */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className={`flex items-center gap-1.5 mb-1.5 ${md.cls}`}>
                <md.Icon size={13} strokeWidth={2} />
                <span className="text-[10px] font-semibold uppercase tracking-wide">
                  {md.label}
                </span>
              </div>
              <p className="text-[12px] font-semibold text-black leading-snug">
                {lead.cargo}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {lead.origin} → {lead.destination}
                {lead.weight && <span className="ml-1.5">· {lead.weight}</span>}
              </p>
            </div>
            {lead.value && (
              <div className="text-right shrink-0">
                <p className="text-[10px] text-muted-foreground">Est. value</p>
                <p className="text-[14px] font-bold text-primaryOrange">
                  {lead.value}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Win probability + match */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <WinGauge pct={lead.winProbability} size={48} />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  Win probability
                </p>
                <p className="text-[11px] font-semibold text-black">
                  AI score: {lead.matchScore}/100
                </p>
              </div>
            </div>
            {lead.matchReasons.length > 0 && (
              <div className="flex-1 space-y-1">
                {lead.matchReasons.map((r) => (
                  <div key={r} className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                        <path
                          d="M1 3.5L3 5.5L6 1.5"
                          stroke="#16a34a"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] text-black">{r}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Market rate */}
        {lead.marketRate && (
          <div className="px-5 py-4 border-b border-border">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Market rate intel — {lead.origin.split(' ')[0]} →{' '}
              {lead.destination.split(' ')[0]}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-[18px] font-bold text-black">
                ${lead.marketRate.low}–{lead.marketRate.high}
                <span className="text-[12px] font-normal text-muted-foreground ml-1">
                  {lead.marketRate.unit}
                </span>
              </p>
              <span
                className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  lead.marketRate.trend === 'up'
                    ? 'bg-red-50 text-red-600'
                    : lead.marketRate.trend === 'down'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {lead.marketRate.trend === 'up' ? (
                  <TrendingUp size={10} />
                ) : lead.marketRate.trend === 'down' ? (
                  <TrendingDown size={10} />
                ) : (
                  <Minus size={10} />
                )}
                {lead.marketRate.trend === 'up'
                  ? 'Rising'
                  : lead.marketRate.trend === 'down'
                    ? 'Falling'
                    : 'Stable'}
              </span>
            </div>
          </div>
        )}

        {/* WhatsApp conversation */}
        {lead.momentumSent && (
          <div className="border-b border-border">
            <div className="px-5 py-3 bg-gray-50 border-b border-border">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Momentum Agent — responded in {lead.momentumTime}
              </p>
            </div>
            <div className="bg-[#e5ddd5] p-4 space-y-2.5">
              {/* Shipper message */}
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2.5 max-w-[85%] shadow-sm">
                  <p className="text-[11px] text-black leading-relaxed">
                    {lead.cargo.split('—')[0].trim()}. {lead.origin} →{' '}
                    {lead.destination}.
                    {lead.weight ? ` Approx ${lead.weight}.` : ''} How quickly
                    can you quote?
                  </p>
                  <p className="text-[9px] text-gray-400 text-right mt-1">
                    {lead.time}
                  </p>
                </div>
              </div>
              {/* Agent reply */}
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] rounded-xl rounded-tr-sm px-3 py-2.5 max-w-[85%] shadow-sm">
                  <p className="text-[9px] font-semibold text-green-800 mb-1">
                    Atlas · Boxman Global
                  </p>
                  <p className="text-[11px] text-black leading-relaxed">
                    {lead.momentumMessage}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <p className="text-[9px] text-gray-400">
                      {lead.momentumTime}
                    </p>
                    <span className="text-[#4FC3F7] text-[10px]">✓✓</span>
                  </div>
                </div>
              </div>
              {/* Shipper reply */}
              {lead.shipperReply && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2.5 max-w-[85%] shadow-sm">
                    <p className="text-[11px] text-black leading-relaxed">
                      {lead.shipperReply}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lost deal autopsy */}
        {lead.status === 'lost' && (
          <div className="px-5 py-4 border-b border-border bg-red-50/40">
            <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider mb-1">
              Deal autopsy
            </p>
            <p className="text-[11px] text-muted-foreground">
              Low match score (41%) — route outside core lanes, capability gap
              identified. Estimated time saved: 2.5 hours of quote generation.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-4 border-t border-border space-y-3">
        {/* Forwarder Agent pre-drafted messages — only for confirmed bookings */}
        {lead.isBooking && lead.rawPhone && (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Forwarder Agent — send to cargo owner
            </p>
            {/* Introduction card */}
            <button
              onClick={() => setReplyText(buildDraftIntro(lead))}
              className="w-full text-left p-3 rounded-lg border border-[#25D366]/40 bg-[#e8f8ef] hover:bg-[#d4f2e0] transition-colors group"
            >
              <p className="text-[10px] font-bold text-[#128C7E] mb-1 flex items-center gap-1.5">
                <MessageCircle size={10} strokeWidth={2.5} />
                Send Introduction
              </p>
              <p className="text-[10px] text-gray-600 line-clamp-2">
                Introduce {lead.bookingForwarder ?? 'your company'}, acknowledge
                the booking ref, ask for cargo details.
              </p>
            </button>
            {/* Rate Quote card */}
            <button
              onClick={() => setReplyText(buildDraftRateQuote(lead))}
              className="w-full text-left p-3 rounded-lg border border-primaryOrange/30 bg-orange-50 hover:bg-orange-100 transition-colors group"
            >
              <p className="text-[10px] font-bold text-primaryOrange mb-1 flex items-center gap-1.5">
                <span className="text-[10px]">📋</span>
                Send Rate Quote
              </p>
              <p className="text-[10px] text-gray-600 line-clamp-2">
                Pre-computed rate estimate for {lead.origin} →{' '}
                {lead.destination} · {lead.mode}. Click to review, then send.
              </p>
            </button>
          </div>
        )}

        {/* Reply box for live WhatsApp leads (bookings + regular) */}
        {lead.isLive && lead.rawPhone && (
          <div className="space-y-2">
            {replySent && (
              <p className="text-[10px] text-green-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Reply sent via WhatsApp
              </p>
            )}
            <div className="flex gap-2">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  e.shiftKey === false &&
                  (e.preventDefault(), sendReply())
                }
                placeholder={
                  lead.isBooking
                    ? 'Click a card above to pre-fill, then review and send…'
                    : 'Type reply to cargo owner…'
                }
                rows={replyText.length > 80 ? 4 : 2}
                className="flex-1 text-[11px] px-3 py-2 rounded-lg border border-[#25D366]/50 focus:outline-none focus:ring-1 focus:ring-[#25D366] bg-gray-50 resize-none"
              />
              <button
                onClick={sendReply}
                disabled={replying || !replyText.trim()}
                className="flex items-center gap-1.5 border border-[#25D366] bg-[#25D366] text-white text-[11px] font-semibold px-3 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 self-end"
              >
                <MessageCircle size={12} strokeWidth={2} />
                {replying ? '…' : 'Send'}
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button className="flex-1 bg-primaryOrange text-white text-[12px] font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            Generate proforma
          </button>
          {!lead.isLive && (
            <button className="flex items-center gap-1.5 border border-[#25D366] text-[#25D366] text-[12px] font-semibold px-4 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
              <MessageCircle size={13} strokeWidth={2} />
              Reply via WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Lead card ─────────────────────────────────────────────────────────────────

function LeadCard({
  lead,
  onClick,
  active,
}: {
  lead: LiveLead;
  onClick: () => void;
  active: boolean;
}) {
  const ch = CHANNEL_CONFIG[lead.channel];
  const md = MODE_CONFIG[lead.mode];
  const isNew = lead.status === 'new';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-3.5 transition-all hover:shadow-sm ${
        lead.isBooking
          ? 'border-green-400 shadow-sm shadow-green-100 bg-green-50'
          : lead.isLive
            ? 'border-[#25D366]/60 shadow-sm shadow-green-100 bg-green-50/30'
            : active
              ? 'border-primaryOrange shadow-sm shadow-primaryOrange/10 bg-primaryOrange/3'
              : isNew
                ? 'border-primaryOrange/30 bg-white'
                : 'border-border bg-white'
      } ${lead.status === 'lost' ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-full border shrink-0 ${ch.cls}`}
          >
            <ch.Icon size={9} strokeWidth={2} />
            {ch.label}
          </span>
          {lead.isBooking && (
            <span className="flex items-center gap-0.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-green-500 text-white">
              ✅ BOOKED
            </span>
          )}
          {lead.isLive && !lead.isBooking && (
            <span className="flex items-center gap-0.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#25D366] text-white animate-pulse">
              <Radio size={7} strokeWidth={2.5} />
              LIVE
            </span>
          )}
          {isNew && !lead.isLive && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primaryOrange text-white">
              New
            </span>
          )}
        </div>
        <span className="text-[9px] text-muted-foreground shrink-0">
          {lead.time}
        </span>
      </div>

      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">{lead.flag}</span>
        <span className="text-[12px] font-semibold text-black truncate">
          {lead.from}
        </span>
        <span className="text-[10px] text-muted-foreground truncate">
          · {lead.company}
        </span>
      </div>

      <div className="flex items-center gap-1 mb-2">
        <md.Icon size={11} strokeWidth={2} className={md.cls} />
        <p className="text-[10px] text-muted-foreground line-clamp-1">
          {lead.cargo}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[9px] text-muted-foreground">
          {lead.origin.split(' ')[0]} → {lead.destination.split(' ')[0]}
        </span>
        <div className="flex items-center gap-2">
          {lead.value && (
            <span className="text-[10px] font-semibold text-primaryOrange">
              {lead.value}
            </span>
          )}
          <WinGauge pct={lead.winProbability} size={32} />
        </div>
      </div>

      {lead.momentumSent && (
        <div className="mt-2.5 pt-2.5 border-t border-border flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
          <span className="text-[9px] text-green-600 font-medium">
            Momentum replied in {lead.momentumTime}
          </span>
        </div>
      )}
    </button>
  );
}

// ── Stage column ──────────────────────────────────────────────────────────────

function StageColumn({
  stage,
  leads,
  activeLead,
  onSelect,
}: {
  stage: (typeof STAGES)[number];
  leads: LiveLead[];
  activeLead: string | null;
  onSelect: (lead: LiveLead) => void;
}) {
  return (
    <div className="flex flex-col min-w-[220px] max-w-[220px]">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${stage.color}`} />
        <span className="text-[10px] font-semibold text-black uppercase tracking-wider">
          {stage.label}
        </span>
        {leads.length > 0 && (
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white ${stage.color}`}
          >
            {leads.length}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {leads.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-4 text-center">
            <p className="text-[10px] text-muted-foreground">No leads</p>
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onClick={() => onSelect(lead)}
              active={activeLead === lead.id}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const TREND_ICON = { up: TrendingUp, down: TrendingDown, flat: Minus };

type LiveLead = DemoLead & {
  isLive?: boolean;
  rawPhone?: string;
  rawText?: string;
  isBooking?: boolean;
  bookingRef?: string;
  bookingForwarder?: string;
};

export default function LeadsSection({
  forwarder = '',
}: {
  forwarder?: string;
}) {
  const [activeLead, setActiveLead] = useState<LiveLead | null>(DEMO_LEADS[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'air' | 'sea' | 'road'>(
    'all',
  );
  const [liveLeads, setLiveLeads] = useState<LiveLead[]>([]);
  const [bookingCount, setBookingCount] = useState(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Poll /api/a2a?forwarder=X every 20s
  useEffect(() => {
    async function fetchLive() {
      try {
        const param = forwarder
          ? `?forwarder=${encodeURIComponent(forwarder)}`
          : '';
        const res = await fetch(`/api/a2a${param}`);
        if (!res.ok) return;
        const data = await res.json();

        const leads: LiveLead[] = (data.leads ?? []).map(
          (l: Record<string, unknown>) => ({
            id: l.id as string,
            channel: 'whatsapp' as const,
            status: 'new' as const,
            from: l.from as string,
            company: (l.company as string) ?? '',
            country: 'UAE',
            flag: '🌍',
            cargo: l.cargo as string,
            mode: (l.mode as 'air' | 'sea' | 'road') ?? 'road',
            origin: l.origin as string,
            destination: l.destination as string,
            time: l.receivedAt as string,
            matchScore: 82,
            winProbability: 70,
            matchReasons: [
              `Atlas rank #${l.atlasRank ?? 1} match`,
              `Route: ${l.origin} → ${l.destination}`,
            ],
            momentumSent: true,
            momentumTime: l.receivedAt as string,
            momentumMessage: `Atlas routed this inquiry to you as rank #${l.atlasRank ?? 1} match.`,
            isLive: true,
            rawPhone: l.rawPhone as string,
            rawText: l.rawText as string,
          }),
        );

        const bookings: LiveLead[] = (data.bookings ?? []).map(
          (b: Record<string, unknown>) => ({
            id: b.id as string,
            channel: 'whatsapp' as const,
            status: 'new' as const,
            from: `WhatsApp ${(b.phone as string)?.slice(-7)}`,
            company: `✅ CONFIRMED — Ref: ${b.reference ?? ''}`,
            country: 'UAE',
            flag: '✅',
            cargo: b.cargo as string,
            mode: (b.mode as 'air' | 'sea' | 'road') ?? 'road',
            origin: b.origin as string,
            destination: b.destination as string,
            time: b.bookedAt as string,
            matchScore: 95,
            winProbability: 95,
            matchReasons: [
              'Cargo owner confirmed booking',
              `Reference: ${b.reference ?? ''}`,
              'Action required: send proforma',
            ],
            momentumSent: false,
            isLive: true,
            isBooking: true,
            bookingRef: b.reference as string,
            bookingForwarder: b.forwarder as string,
            rawPhone: b.phone as string,
          }),
        );

        setLiveLeads([...bookings, ...leads]);
        setBookingCount(bookings.length);
      } catch {
        // silent fallback
      }
    }
    fetchLive();
    pollRef.current = setInterval(fetchLive, 20_000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [forwarder]);

  const allLeads: LiveLead[] = [...liveLeads, ...DEMO_LEADS];

  const filtered =
    filterMode === 'all'
      ? allLeads
      : allLeads.filter((l) => l.mode === filterMode);
  const byStage = Object.fromEntries(
    STAGES.map((s) => [s.key, filtered.filter((l) => l.status === s.key)]),
  );
  const pipelineValue = allLeads
    .filter((l) => l.status !== 'lost' && l.value)
    .reduce(
      (sum, l) => sum + parseFloat((l.value || '0').replace(/[^0-9.]/g, '')),
      0,
    );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-black">Lead Pipeline</h2>
            <p className="text-[12px] text-muted-foreground flex items-center gap-1.5 flex-wrap">
              {bookingCount > 0 && (
                <span className="inline-flex items-center gap-1 text-green-600 font-semibold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full text-[10px]">
                  ✅ {bookingCount} confirmed booking
                  {bookingCount > 1 ? 's' : ''}
                </span>
              )}
              {liveLeads.filter((l) => !l.isBooking).length > 0 && (
                <span className="inline-flex items-center gap-1 text-[#25D366] font-semibold text-[10px]">
                  <Radio size={9} strokeWidth={2.5} className="animate-pulse" />
                  {liveLeads.filter((l) => !l.isBooking).length} live WhatsApp
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">
                Pipeline value
              </p>
              <p className="text-[15px] font-bold text-primaryOrange">
                ~${pipelineValue.toLocaleString()}
              </p>
            </div>
            {/* Mode filter */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(['all', 'air', 'sea', 'road'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMode(m)}
                  className={`px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                    filterMode === m
                      ? 'bg-primaryOrange text-white'
                      : 'text-muted-foreground hover:bg-gray-50'
                  }`}
                >
                  {m === 'all'
                    ? 'All'
                    : m === 'air'
                      ? 'Air'
                      : m === 'sea'
                        ? 'Sea'
                        : 'Road'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live rate ticker */}
      <div className="bg-[#0d0d1a] px-5 py-2.5 overflow-hidden">
        <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
          <span className="text-[9px] font-semibold text-white/40 uppercase tracking-widest shrink-0">
            Live rates
          </span>
          {MARKET_RATES.map((r, i) => {
            const TrendIcon = TREND_ICON[r.trend as keyof typeof TREND_ICON];
            return (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-white/60">{r.lane}</span>
                <span className="text-[11px] font-bold text-white">
                  {r.rate}
                </span>
                <span
                  className={`flex items-center gap-0.5 text-[9px] font-semibold ${
                    r.trend === 'up'
                      ? 'text-red-400'
                      : r.trend === 'down'
                        ? 'text-green-400'
                        : 'text-white/40'
                  }`}
                >
                  <TrendIcon size={9} />
                  {r.delta}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Kanban */}
        <div className="flex-1 min-w-0 overflow-x-auto overflow-y-auto p-5">
          <div className="flex gap-4 h-full min-w-max">
            {STAGES.map((stage) => (
              <StageColumn
                key={stage.key}
                stage={stage}
                leads={byStage[stage.key] || []}
                activeLead={activeLead?.id ?? null}
                onSelect={setActiveLead}
              />
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {activeLead && (
          <div className="w-[380px] border-l border-border shrink-0 overflow-hidden">
            <LeadDetail lead={activeLead} onClose={() => setActiveLead(null)} />
          </div>
        )}
      </div>
    </div>
  );
}
