'use client';

import { BOXMAN_STATS, DEMO_LEADS } from '../boxmanData';

import { useEffect, useState } from 'react';

import {
  DollarSign,
  Package,
  Plane,
  Ship,
  Timer,
  TrendingUp,
  Trophy,
  Truck,
} from 'lucide-react';

function StatCard({
  Icon,
  label,
  value,
  sub,
  trend,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'flat';
}) {
  return (
    <div className="bg-white rounded-xl border border-border px-5 py-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-gray-50 border border-border flex items-center justify-center shrink-0">
        <Icon size={18} strokeWidth={1.75} className="text-primaryOrange" />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-black leading-none">
            {value}
          </span>
          {trend === 'up' && (
            <TrendingUp size={12} className="text-green-500 mb-0.5" />
          )}
        </div>
        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">
          {label}
        </div>
        {sub && (
          <div className="text-[10px] text-muted-foreground mt-0.5">{sub}</div>
        )}
      </div>
    </div>
  );
}

function PipelineBar() {
  const steps = [
    { id: 'C1', label: 'Intent' },
    { id: 'C1.5', label: 'RAG' },
    { id: 'C2', label: 'Match' },
    { id: 'C3', label: 'Trust' },
    { id: 'C4', label: 'Enrich' },
    { id: 'C5', label: 'Rank' },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 1400);
    return () => clearInterval(t);
  }, [steps.length]);

  return (
    <div className="bg-[#0d0d1a] rounded-xl px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
          Atlas Pipeline
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Processing for Boxman
        </span>
      </div>
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold transition-all duration-500 ${
                  i < active
                    ? 'bg-primaryOrange text-white'
                    : i === active
                      ? 'bg-primaryOrange text-white scale-110 shadow-lg shadow-primaryOrange/30 ring-2 ring-primaryOrange/20'
                      : 'bg-white/5 text-white/25'
                }`}
              >
                {i < active ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.5 5L4 7.5L8.5 2.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-[9px] mt-1 font-medium uppercase tracking-wide ${i <= active ? 'text-white/70' : 'text-white/20'}`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 mx-1 transition-all duration-500 ${i < active ? 'bg-primaryOrange' : 'bg-white/10'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WinRateBar() {
  const current = BOXMAN_STATS.winRate;
  const target = BOXMAN_STATS.atlasTarget;
  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider">
          Win Rate
        </h3>
        <span className="text-[11px] text-muted-foreground">
          Target:{' '}
          <span className="font-semibold text-primaryOrange">{target}%</span>
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-gray-100 overflow-visible">
        <div
          className="h-full rounded-full bg-primaryOrange transition-all duration-1000"
          style={{ width: `${current}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-primaryOrange shadow-sm"
          style={{ left: `${target}%` }}
        />
      </div>
      <div className="flex justify-between mt-2.5">
        <span className="text-[12px] font-semibold text-black">{current}%</span>
        <span className="text-[11px] text-muted-foreground">
          {target - current}% gap to target
        </span>
      </div>
    </div>
  );
}

const MODE_ICON = { air: Plane, sea: Ship, road: Truck };
const MODE_COLOR = {
  air: 'bg-blue-500',
  sea: 'bg-cyan-500',
  road: 'bg-amber-500',
};

const ACTIVITY = [
  {
    dot: 'bg-[#25D366]',
    label: 'Momentum Agent',
    text: 'Contacted Wolfgang Müller (Frankfurt) in 38 seconds — automotive DG lead',
    time: '2 min ago',
  },
  {
    dot: 'bg-amber-500',
    label: 'Alert Engine',
    text: 'FRA→DXB alert fired — new automotive shipper on your lane',
    time: '2 min ago',
  },
  {
    dot: 'bg-primaryOrange',
    label: 'C2 Match',
    text: 'Boxman ranked #1 for pharma cold chain BOM→DXB request',
    time: '1 hr ago',
  },
  {
    dot: 'bg-purple-500',
    label: 'C3 Trust',
    text: 'Trust score stable at 84/100 — ISO 9001 verified',
    time: '3 hr ago',
  },
  {
    dot: 'bg-blue-500',
    label: 'Market Intel',
    text: 'FRA→DXB air rates up 8% this week — now $4.2–4.8/kg',
    time: '6 hr ago',
  },
  {
    dot: 'bg-blue-400',
    label: 'C4 Enrich',
    text: 'Boxman profile enriched with Aston Martin client signal',
    time: '1 day ago',
  },
];

export default function OverviewSection() {
  const newLeads = DEMO_LEADS.filter((l) => l.status === 'new');

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-lg font-bold text-black">Overview</h2>
        <p className="text-[12px] text-muted-foreground">
          Boxman Global Logistics · Dubai ·{' '}
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
      </div>
      <div className="flex-1 p-6 space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            Icon={Package}
            label="Active leads"
            value={String(BOXMAN_STATS.activeLeads)}
            sub={`${BOXMAN_STATS.newToday} new today`}
            trend="up"
          />
          <StatCard
            Icon={Timer}
            label="Avg response"
            value={BOXMAN_STATS.avgResponseTime}
            sub="by Momentum Agent"
            trend="up"
          />
          <StatCard
            Icon={DollarSign}
            label="This month"
            value={BOXMAN_STATS.revenueThisMonth}
            sub={`${BOXMAN_STATS.dealsThisMonth} deals closed`}
          />
          <StatCard
            Icon={Trophy}
            label="Platform rank"
            value={`#${BOXMAN_STATS.rankOnPlatform}`}
            sub={`of ${BOXMAN_STATS.totalForwarders} forwarders`}
          />
        </div>
        <PipelineBar />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <WinRateBar />
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-4">
              Service mix
            </h3>
            <div className="space-y-3">
              {(['air', 'sea', 'road'] as const).map((mode) => {
                const Icon = MODE_ICON[mode];
                const pct = mode === 'air' ? 50 : mode === 'sea' ? 30 : 20;
                return (
                  <div key={mode} className="flex items-center gap-3">
                    <Icon
                      size={14}
                      strokeWidth={1.75}
                      className="text-muted-foreground shrink-0"
                    />
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${MODE_COLOR[mode]}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[12px] font-semibold text-black w-8 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {newLeads.length > 0 && (
          <div className="rounded-xl border border-primaryOrange/30 bg-primaryOrange/5 px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primaryOrange animate-pulse" />
              <span className="text-[12px] font-semibold text-primaryOrange">
                {newLeads.length} new lead{newLeads.length > 1 ? 's' : ''}{' '}
                waiting
              </span>
            </div>
            {newLeads.map((l) => (
              <p key={l.id} className="text-[11px] text-black mt-1">
                <span className="font-semibold">{l.from}</span>
                {' · '}
                {l.cargo.split('—')[0].trim()}
                {' · '}
                {l.origin} → {l.destination}
              </p>
            ))}
          </div>
        )}
        <div className="bg-white rounded-xl border border-border">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider">
              Agent activity today
            </h3>
          </div>
          <div className="divide-y divide-border">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${item.dot} mt-1.5 shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </span>
                  <p className="text-[12px] text-black leading-snug mt-0.5">
                    {item.text}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
