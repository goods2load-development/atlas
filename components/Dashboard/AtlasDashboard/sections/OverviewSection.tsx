'use client';

import { BOXMAN, BOXMAN_STATS, DEMO_LEADS, MARKET_RATES } from '../boxmanData';

import { useEffect, useState } from 'react';

const MODE_ICON = { air: '✈️', sea: '🚢', road: '🚛' };

function StatCard({
  icon,
  label,
  value,
  sub,
  trend,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'flat';
}) {
  return (
    <div className="bg-white rounded-xl border border-border px-5 py-4 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-primaryOrange/10 flex items-center justify-center text-xl shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-black leading-none">
            {value}
          </span>
          {trend === 'up' && (
            <span className="text-[11px] text-green-600 font-semibold">↑</span>
          )}
          {trend === 'down' && (
            <span className="text-[11px] text-red-500 font-semibold">↓</span>
          )}
        </div>
        <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-wide mt-0.5">
          {label}
        </div>
        {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
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
  }, []);
  return (
    <div className="bg-[#1a1a2e] rounded-xl px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-white/60 uppercase tracking-widest">
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
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-500 ${
                  i < active
                    ? 'bg-primaryOrange text-white'
                    : i === active
                      ? 'bg-primaryOrange text-white scale-110 shadow-lg shadow-primaryOrange/40 ring-2 ring-primaryOrange/40'
                      : 'bg-white/10 text-white/30'
                }`}
              >
                {i < active ? '✓' : step.id}
              </div>
              <span
                className={`text-[9px] mt-1 font-medium uppercase tracking-wide ${i <= active ? 'text-white/80' : 'text-white/25'}`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 mx-1 transition-all duration-500 ${i < active ? 'bg-primaryOrange' : 'bg-white/15'}`}
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
        <h3 className="text-[12px] font-bold text-black uppercase tracking-wide">
          Win Rate
        </h3>
        <span className="text-[11px] text-muted-foreground">
          Atlas target:{' '}
          <span className="font-bold text-primaryOrange">{target}%</span>
        </span>
      </div>
      <div className="relative h-3 rounded-full bg-gray-100 overflow-visible">
        <div
          className="h-full rounded-full bg-primaryOrange transition-all duration-1000"
          style={{ width: `${current}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-primaryOrange shadow"
          style={{ left: `${target}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[11px] font-bold text-black">
          {current}% current
        </span>
        <span className="text-[11px] text-muted-foreground">
          {target - current}% gap to target
        </span>
      </div>
    </div>
  );
}

export default function OverviewSection() {
  const newLeads = DEMO_LEADS.filter((l) => l.status === 'new');

  const activity = [
    {
      icon: '💬',
      label: 'Momentum Agent',
      text: `Contacted Wolfgang Müller (Frankfurt) in 38 seconds — automotive DG lead`,
      time: '2 min ago',
      color: 'text-[#25D366]',
    },
    {
      icon: '⚡',
      label: 'Alert Engine',
      text: 'FRA→DXB alert fired — new automotive shipper on your lane',
      time: '2 min ago',
      color: 'text-amber-600',
    },
    {
      icon: '🎯',
      label: 'C2 Match',
      text: 'Boxman ranked #1 for pharma cold chain BOM→DXB request',
      time: '1 hr ago',
      color: 'text-primaryOrange',
    },
    {
      icon: '🧠',
      label: 'C3 Trust',
      text: 'Trust score stable at 84/100 — ISO 9001 verified ✓',
      time: '3 hr ago',
      color: 'text-purple-600',
    },
    {
      icon: '📊',
      label: 'Market Intel',
      text: 'FRA→DXB air rates up 8% this week — now $4.2–4.8/kg',
      time: '6 hr ago',
      color: 'text-blue-600',
    },
    {
      icon: '🗺️',
      label: 'C4 Enrich',
      text: 'Boxman profile enriched with Aston Martin client signal',
      time: '1 day ago',
      color: 'text-blue-600',
    },
  ];

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
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            icon="📦"
            label="Active leads"
            value={String(BOXMAN_STATS.activeLeads)}
            sub={`${BOXMAN_STATS.newToday} new today`}
            trend="up"
          />
          <StatCard
            icon="⚡"
            label="Avg response"
            value={BOXMAN_STATS.avgResponseTime}
            sub="by Momentum Agent"
            trend="up"
          />
          <StatCard
            icon="💰"
            label="This month"
            value={BOXMAN_STATS.revenueThisMonth}
            sub={`${BOXMAN_STATS.dealsThisMonth} deals closed`}
          />
          <StatCard
            icon="🏆"
            label="Platform rank"
            value={`#${BOXMAN_STATS.rankOnPlatform}`}
            sub={`of ${BOXMAN_STATS.totalForwarders} forwarders`}
          />
        </div>

        {/* Pipeline */}
        <PipelineBar />

        {/* Win rate + mode mix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <WinRateBar />

          {/* Mode mix */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-[12px] font-bold text-black uppercase tracking-wide mb-3">
              Declared service mix
            </h3>
            <div className="space-y-2.5">
              {[
                { mode: 'air', pct: BOXMAN.modeMix.air, color: 'bg-blue-500' },
                { mode: 'sea', pct: BOXMAN.modeMix.sea, color: 'bg-cyan-500' },
                {
                  mode: 'road',
                  pct: BOXMAN.modeMix.road,
                  color: 'bg-amber-500',
                },
              ].map(({ mode, pct, color }) => (
                <div key={mode} className="flex items-center gap-3">
                  <span className="text-sm w-5">
                    {MODE_ICON[mode as 'air' | 'sea' | 'road']}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[12px] font-bold text-black w-8 text-right">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* New leads alert */}
        {newLeads.length > 0 && (
          <div className="rounded-xl border border-primaryOrange/40 bg-primaryOrange/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primaryOrange animate-pulse" />
              <span className="text-[12px] font-bold text-primaryOrange">
                {newLeads.length} new lead{newLeads.length > 1 ? 's' : ''}{' '}
                waiting
              </span>
            </div>
            {newLeads.map((l) => (
              <p key={l.id} className="text-[11px] text-black">
                💬 <strong>{l.from}</strong> · {l.cargo.split('—')[0].trim()} ·{' '}
                {l.origin} → {l.destination}
              </p>
            ))}
          </div>
        )}

        {/* Activity feed */}
        <div className="bg-white rounded-xl border border-border">
          <div className="px-5 py-3 border-b border-border">
            <h3 className="text-[12px] font-bold text-black">
              Agent activity today
            </h3>
          </div>
          <div className="divide-y divide-border">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide ${item.color}`}
                  >
                    {item.label}
                  </span>
                  <p className="text-[11px] text-black leading-snug mt-0.5">
                    {item.text}
                  </p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">
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
