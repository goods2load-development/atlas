'use client';

import { DEMO_LEADS, type DemoLead, MARKET_RATES } from '../boxmanData';

import { useState } from 'react';

// ── Helpers ───────────────────────────────────────────────────────────────────

const STAGES: { key: DemoLead['status']; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-primaryOrange' },
  { key: 'contacted', label: 'Contacted', color: 'bg-blue-500' },
  { key: 'quoting', label: 'Quoting', color: 'bg-purple-500' },
  { key: 'sent', label: 'Quote Sent', color: 'bg-amber-500' },
  { key: 'won', label: 'Won', color: 'bg-green-500' },
  { key: 'lost', label: 'Lost', color: 'bg-gray-400' },
];

const CHANNEL_STYLE = {
  whatsapp: {
    bg: 'bg-[#25D366]/10',
    text: 'text-[#25D366]',
    icon: '💬',
    label: 'WhatsApp',
  },
  email: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    icon: '✉️',
    label: 'Email',
  },
  g2l: {
    bg: 'bg-primaryOrange/10',
    text: 'text-primaryOrange',
    icon: '🔍',
    label: 'G2L Search',
  },
};

const MODE_ICON = { air: '✈️', sea: '🚢', road: '🚛' };

function WinGauge({ pct, size = 52 }: { pct: number; size?: number }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f97316' : '#ef4444';
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="4"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[11px] font-bold" style={{ color }}>
        {pct}%
      </span>
    </div>
  );
}

// ── Lead detail panel ─────────────────────────────────────────────────────────

function LeadDetail({
  lead,
  onClose,
}: {
  lead: DemoLead;
  onClose: () => void;
}) {
  const ch = CHANNEL_STYLE[lead.channel];

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ch.bg} ${ch.text}`}
            >
              {ch.icon} {ch.label}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                lead.status === 'new'
                  ? 'bg-primaryOrange/10 text-primaryOrange'
                  : lead.status === 'lost'
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-blue-50 text-blue-600'
              }`}
            >
              {STAGES.find((s) => s.key === lead.status)?.label}
            </span>
          </div>
          <h3 className="text-base font-bold text-black">{lead.from}</h3>
          <p className="text-[12px] text-muted-foreground">
            {lead.company} · {lead.flag} {lead.country}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-black text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="flex-1 p-5 space-y-4">
        {/* Cargo summary */}
        <div className="bg-gray-50 rounded-xl border border-border p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">{MODE_ICON[lead.mode]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-black leading-snug">
                {lead.cargo}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {lead.origin} → {lead.destination}
                {lead.weight && (
                  <>
                    {' '}
                    · <span className="font-medium">{lead.weight}</span>
                  </>
                )}
              </p>
            </div>
            {lead.value && (
              <div className="text-right shrink-0">
                <div className="text-[11px] text-muted-foreground">
                  Est. value
                </div>
                <div className="text-sm font-bold text-primaryOrange">
                  {lead.value}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2">
              <WinGauge pct={lead.winProbability} size={44} />
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  Win probability
                </div>
                <div className="text-[11px] font-semibold text-black">
                  AI score: {lead.matchScore}/100
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              {lead.matchReasons.map((r, i) => (
                <div
                  key={i}
                  className={`text-[10px] font-medium ${r.includes('✗') ? 'text-red-500' : 'text-green-600'}`}
                >
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market rate intel */}
        {lead.marketRate && (
          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">📊</span>
              <span className="text-[11px] font-bold text-black uppercase tracking-wide">
                Market Rate Intel — {lead.origin.split(' ')[0]} →{' '}
                {lead.destination.split(' ')[0]}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-black">
                  ${lead.marketRate.low}–{lead.marketRate.high}
                </span>
                <span className="text-[11px] text-muted-foreground ml-1">
                  {lead.marketRate.unit}
                </span>
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  lead.marketRate.trend === 'up'
                    ? 'bg-red-50 text-red-600'
                    : lead.marketRate.trend === 'down'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {lead.marketRate.trend === 'up'
                  ? '↑ Rising'
                  : lead.marketRate.trend === 'down'
                    ? '↓ Falling'
                    : '→ Stable'}
              </span>
            </div>
          </div>
        )}

        {/* Momentum agent activity */}
        {lead.momentumSent && (
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a2e]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-white/80">
                Momentum Agent — responded in {lead.momentumTime}
              </span>
            </div>

            {/* WhatsApp-style conversation */}
            <div className="bg-[#e5ddd5] p-3 space-y-2">
              {/* Shipper message */}
              <div className="flex justify-start">
                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm">
                  <p className="text-[11px] text-black leading-relaxed">
                    {lead.cargo.split('—')[0].trim()}. {lead.origin} →{' '}
                    {lead.destination}.
                    {lead.weight && ` Approx ${lead.weight}.`} How quickly can
                    you quote?
                  </p>
                  <p className="text-[9px] text-gray-400 text-right mt-0.5">
                    {lead.time}
                  </p>
                </div>
              </div>

              {/* Atlas/Boxman reply */}
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none px-3 py-2 max-w-[85%] shadow-sm">
                  <p className="text-[9px] font-semibold text-green-800 mb-1">
                    Atlas · Boxman Global
                  </p>
                  <p className="text-[11px] text-black leading-relaxed">
                    {lead.momentumMessage}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <p className="text-[9px] text-gray-400">
                      {lead.momentumTime}
                    </p>
                    <span className="text-[#4FC3F7] text-[10px]">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Shipper reply if exists */}
              {lead.shipperReply && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm">
                    <p className="text-[11px] text-black leading-relaxed">
                      {lead.shipperReply}
                    </p>
                    <p className="text-[9px] text-gray-400 text-right mt-0.5">
                      just now
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {lead.status === 'lost' && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-[11px] font-semibold text-red-700 mb-1">
              ⚠️ Why this lead was flagged
            </p>
            <p className="text-[11px] text-red-600">
              Low match score (41/100) — Nigeria is not a declared lane. Atlas
              flagged this before Boxman invested time in rate generation.
              Momentum Agent was not activated.
            </p>
            <p className="text-[11px] text-red-500 mt-1 font-medium">
              Estimated time saved: 2.5 hours of quote generation.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {lead.status !== 'lost' && lead.status !== 'won' && (
        <div className="p-4 border-t border-border flex gap-2">
          {lead.status === 'new' || lead.status === 'contacted' ? (
            <>
              <button className="flex-1 bg-primaryOrange text-white text-[12px] font-bold rounded-lg py-2.5 hover:opacity-90 transition-opacity">
                Generate proforma →
              </button>
              <button className="text-[12px] text-muted-foreground border border-border rounded-lg px-4 py-2.5 hover:border-primaryOrange transition-colors">
                Reply via WhatsApp
              </button>
            </>
          ) : lead.status === 'quoting' ? (
            <>
              <button className="flex-1 bg-primaryOrange text-white text-[12px] font-bold rounded-lg py-2.5 hover:opacity-90 transition-opacity">
                Approve & send quote →
              </button>
              <button className="text-[12px] text-muted-foreground border border-border rounded-lg px-4 py-2.5 hover:border-primaryOrange transition-colors">
                Edit rate
              </button>
            </>
          ) : (
            <button className="flex-1 bg-primaryOrange text-white text-[12px] font-bold rounded-lg py-2.5 hover:opacity-90 transition-opacity">
              Follow up →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Lead card (in pipeline) ───────────────────────────────────────────────────

function LeadCard({
  lead,
  onClick,
  active,
}: {
  lead: DemoLead;
  onClick: () => void;
  active: boolean;
}) {
  const ch = CHANNEL_STYLE[lead.channel];
  const isNew = lead.status === 'new';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border p-3 transition-all hover:shadow-md ${
        active
          ? 'border-primaryOrange shadow-sm shadow-primaryOrange/20'
          : isNew
            ? 'border-primaryOrange/40 bg-primaryOrange/3'
            : 'border-border bg-white'
      } ${lead.status === 'lost' ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${ch.bg} ${ch.text}`}
          >
            {ch.icon} {ch.label}
          </span>
          {isNew && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primaryOrange text-white animate-pulse shrink-0">
              NEW
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

      <p className="text-[11px] text-muted-foreground line-clamp-1 mb-2">
        {MODE_ICON[lead.mode]} {lead.cargo}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="text-[9px] text-muted-foreground">
            {lead.origin.split(' ')[0]} → {lead.destination.split(' ')[0]}
          </div>
        </div>
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
        <div className="mt-2 pt-2 border-t border-border flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
          <span className="text-[9px] text-green-600 font-medium">
            Momentum Agent replied in {lead.momentumTime}
          </span>
        </div>
      )}
    </button>
  );
}

// ── Pipeline stage column ─────────────────────────────────────────────────────

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
        <span className="text-[11px] font-bold text-black uppercase tracking-wide">
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

export default function LeadsSection() {
  const [activeLead, setActiveLead] = useState<DemoLead | null>(DEMO_LEADS[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'air' | 'sea' | 'road'>(
    'all',
  );

  const filtered =
    filterMode === 'all'
      ? DEMO_LEADS
      : DEMO_LEADS.filter((l) => l.mode === filterMode);

  const byStage = STAGES.reduce(
    (acc, s) => {
      acc[s.key] = filtered.filter((l) => l.status === s.key);
      return acc;
    },
    {} as Record<string, DemoLead[]>,
  );

  const newCount = DEMO_LEADS.filter((l) => l.status === 'new').length;
  const totalPipeline = DEMO_LEADS.filter(
    (l) => !['lost', 'won'].includes(l.status),
  ).reduce(
    (sum, l) =>
      sum + parseFloat((l.value || '$0').replace(/[^0-9]/g, '')) / 1000,
    0,
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-black">Lead Pipeline</h2>
          <p className="text-[12px] text-muted-foreground">
            Momentum Agent has contacted{' '}
            {DEMO_LEADS.filter((l) => l.momentumSent).length} of{' '}
            {DEMO_LEADS.length} leads automatically
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Pipeline value */}
          <div className="bg-primaryOrange/10 rounded-lg px-3 py-1.5 text-center">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Pipeline value
            </div>
            <div className="text-sm font-bold text-primaryOrange">
              ~${Math.round(totalPipeline * 1000).toLocaleString()}
            </div>
          </div>
          {/* Filter */}
          <div className="flex rounded-lg border border-border overflow-hidden text-[11px] font-medium">
            {(['all', 'air', 'sea', 'road'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setFilterMode(m)}
                className={`px-2.5 py-1.5 transition-colors ${filterMode === m ? 'bg-primaryOrange text-white' : 'bg-white text-muted-foreground hover:bg-gray-50'}`}
              >
                {m === 'all'
                  ? 'All'
                  : m === 'air'
                    ? '✈️ Air'
                    : m === 'sea'
                      ? '🚢 Sea'
                      : '🚛 Road'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Market rate ticker */}
      <div className="flex items-center gap-0 border-b border-border bg-[#1a1a2e] px-4 py-2 overflow-x-auto hide-scrollbar">
        <span className="text-[10px] text-white/50 font-semibold uppercase tracking-widest mr-4 shrink-0">
          Live rates
        </span>
        {MARKET_RATES.map((r, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0 mr-6">
            <span className="text-[10px] text-white/70">{r.lane}</span>
            <span className="text-[10px] font-bold text-white">{r.rate}</span>
            <span
              className={`text-[9px] font-semibold ${
                r.trend === 'up'
                  ? 'text-red-400'
                  : r.trend === 'down'
                    ? 'text-green-400'
                    : 'text-white/40'
              }`}
            >
              {r.trend === 'up' ? '↑' : r.trend === 'down' ? '↓' : '→'}{' '}
              {r.delta}
            </span>
          </div>
        ))}
      </div>

      {/* Body: pipeline + detail */}
      <div className="flex flex-1 overflow-hidden">
        {/* Kanban board */}
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

        {/* Lead detail panel */}
        {activeLead && (
          <div className="w-[380px] border-l border-border shrink-0 overflow-hidden">
            <LeadDetail lead={activeLead} onClose={() => setActiveLead(null)} />
          </div>
        )}
      </div>
    </div>
  );
}
