'use client';

import { DEMO_LEADS, type DemoLead, MARKET_RATES } from '../boxmanData';

import { useState } from 'react';

import {
  ChevronRight,
  Globe,
  Mail,
  MessageCircle,
  Minus,
  Plane,
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

// ── Lead detail panel ─────────────────────────────────────────────────────────

function LeadDetail({
  lead,
  onClose,
}: {
  lead: DemoLead;
  onClose: () => void;
}) {
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
      <div className="px-5 py-4 border-t border-border flex gap-2">
        <button className="flex-1 bg-primaryOrange text-white text-[12px] font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity">
          Generate proforma
        </button>
        <button className="flex items-center gap-1.5 border border-[#25D366] text-[#25D366] text-[12px] font-semibold px-4 py-2.5 rounded-lg hover:bg-green-50 transition-colors">
          <MessageCircle size={13} strokeWidth={2} />
          Reply via WhatsApp
        </button>
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
  lead: DemoLead;
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
        active
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
          {isNew && (
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
  leads: DemoLead[];
  activeLead: string | null;
  onSelect: (lead: DemoLead) => void;
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

export default function LeadsSection() {
  const [activeLead, setActiveLead] = useState<DemoLead | null>(DEMO_LEADS[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'air' | 'sea' | 'road'>(
    'all',
  );

  const filtered =
    filterMode === 'all'
      ? DEMO_LEADS
      : DEMO_LEADS.filter((l) => l.mode === filterMode);
  const byStage = Object.fromEntries(
    STAGES.map((s) => [s.key, filtered.filter((l) => l.status === s.key)]),
  );
  const pipelineValue = DEMO_LEADS.filter(
    (l) => l.status !== 'lost' && l.value,
  ).reduce(
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
            <p className="text-[12px] text-muted-foreground">
              Momentum Agent has contacted{' '}
              {DEMO_LEADS.filter((l) => l.momentumSent).length} of{' '}
              {DEMO_LEADS.length} leads automatically
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
