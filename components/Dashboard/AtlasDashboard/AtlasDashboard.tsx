'use client';

import { BOXMAN, BOXMAN_STATS, DEMO_LEADS } from './boxmanData';
import AlertsSection from './sections/AlertsSection';
import IntelligenceSection from './sections/IntelligenceSection';
import LeadsSection from './sections/LeadsSection';
import OverviewSection from './sections/OverviewSection';
import ProfileSection from './sections/ProfileSection';

import { useState } from 'react';

// ── Sidebar nav ───────────────────────────────────────────────────────────────

type Section = 'overview' | 'leads' | 'alerts' | 'intelligence' | 'profile';

const NAV: { id: Section; label: string; icon: string; badge?: number }[] = [
  { id: 'overview', label: 'Overview', icon: '⚡' },
  {
    id: 'leads',
    label: 'Leads',
    icon: '📱',
    badge: DEMO_LEADS.filter((l) => l.status === 'new').length,
  },
  { id: 'alerts', label: 'Lane Alerts', icon: '🔔', badge: 3 },
  { id: 'intelligence', label: 'Intelligence', icon: '🧠' },
  { id: 'profile', label: 'Profile & Trust', icon: '🏅' },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function AtlasDashboard() {
  const [section, setSection] = useState<Section>('leads');

  return (
    <div className="flex h-[calc(100vh-0px)] bg-[#f5f4f3] overflow-hidden font-poppins sm:ml-0">
      {/* ── Atlas internal sidebar ── */}
      <div className="hidden md:flex flex-col w-[220px] shrink-0 bg-white border-r border-border h-full">
        {/* Company header */}
        <div className="px-4 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1a1a2e] flex items-center justify-center text-white text-[12px] font-black shrink-0">
              BG
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-black leading-tight truncate">
                Boxman Global
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                Dubai, UAE
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-primaryOrange"
                style={{ width: `${BOXMAN.trustScore}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-primaryOrange shrink-0">
              {BOXMAN.trustScore}/100
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">Trust score</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                section === item.id
                  ? 'bg-primaryOrange/10 text-primaryOrange'
                  : 'text-muted-foreground hover:bg-gray-50 hover:text-black'
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span className="text-[12px] font-semibold flex-1">
                {item.label}
              </span>
              {item.badge != null && item.badge > 0 && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center ${
                    section === item.id
                      ? 'bg-primaryOrange text-white'
                      : 'bg-primaryOrange text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom status */}
        <div className="px-4 py-4 border-t border-border space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-muted-foreground">
              Atlas Pipeline active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            <span className="text-[10px] text-muted-foreground">
              Hermes Gateway connected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] text-muted-foreground">
              Momentum Agent on
            </span>
          </div>
        </div>
      </div>

      {/* ── Mobile nav bar ── */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-20 bg-white border-t border-border flex">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 relative ${
              section === item.id
                ? 'text-primaryOrange'
                : 'text-muted-foreground'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-[9px] font-medium">
              {item.label.split(' ')[0]}
            </span>
            {item.badge != null && item.badge > 0 && (
              <span className="absolute top-1 right-1/4 w-3.5 h-3.5 rounded-full bg-primaryOrange text-white text-[8px] font-bold flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Section content ── */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {section === 'overview' && <OverviewSection />}
        {section === 'leads' && <LeadsSection />}
        {section === 'alerts' && <AlertsSection />}
        {section === 'intelligence' && <IntelligenceSection />}
        {section === 'profile' && <ProfileSection />}
      </div>
    </div>
  );
}
