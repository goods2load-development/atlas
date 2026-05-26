'use client';

import { BOXMAN, DEMO_LEADS } from './boxmanData';
import AlertsSection from './sections/AlertsSection';
import IntelligenceSection from './sections/IntelligenceSection';
import LeadsSection from './sections/LeadsSection';
import OverviewSection from './sections/OverviewSection';
import ProfileSection from './sections/ProfileSection';

import { useState } from 'react';

import { BarChart3, Bell, Brain, Inbox, ShieldCheck } from 'lucide-react';

type Section = 'overview' | 'leads' | 'alerts' | 'intelligence' | 'profile';

const NAV: {
  id: Section;
  label: string;
  Icon: React.ElementType;
  badge?: number;
}[] = [
  { id: 'overview', label: 'Overview', Icon: BarChart3 },
  {
    id: 'leads',
    label: 'Leads',
    Icon: Inbox,
    badge: DEMO_LEADS.filter((l) => l.status === 'new').length,
  },
  { id: 'alerts', label: 'Lane Alerts', Icon: Bell, badge: 3 },
  { id: 'intelligence', label: 'Intelligence', Icon: Brain },
  { id: 'profile', label: 'Profile & Trust', Icon: ShieldCheck },
];

export default function AtlasDashboard() {
  const [section, setSection] = useState<Section>('leads');

  return (
    <div className="flex h-screen bg-[#f5f4f3] overflow-hidden font-poppins">
      {/* ── Internal sidebar ── */}
      <div className="hidden md:flex flex-col w-[220px] shrink-0 bg-white border-r border-border h-full">
        {/* Company header */}
        <div className="px-4 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0d0d1a] flex items-center justify-center shrink-0 overflow-hidden p-1">
              <img
                src="/boxman-logo.png"
                alt="Boxman Global"
                className="w-full h-full object-contain"
              />
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
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primaryOrange"
                  style={{ width: `${BOXMAN.trustScore}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-primaryOrange shrink-0">
                {BOXMAN.trustScore}
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5 uppercase tracking-wide">
              Trust score
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {NAV.map(({ id, label, Icon, badge }) => {
            const active = section === id;
            return (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  active
                    ? 'bg-primaryOrange/8 text-primaryOrange'
                    : 'text-muted-foreground hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Icon
                  size={15}
                  strokeWidth={active ? 2 : 1.75}
                  className="shrink-0"
                />
                <span className="text-[12px] font-medium flex-1">{label}</span>
                {badge != null && badge > 0 && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center bg-primaryOrange text-white">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Status footer */}
        <div className="px-4 py-4 border-t border-border space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
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

      {/* ── Mobile nav ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-border flex">
        {NAV.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            onClick={() => setSection(id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 relative ${section === id ? 'text-primaryOrange' : 'text-muted-foreground'}`}
          >
            <Icon size={18} strokeWidth={1.75} />
            <span className="text-[9px] font-medium">
              {label.split(' ')[0]}
            </span>
            {badge != null && badge > 0 && (
              <span className="absolute top-1 right-1/4 w-3.5 h-3.5 rounded-full bg-primaryOrange text-white text-[8px] font-bold flex items-center justify-center">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Section content ── */}
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
        {section === 'overview' && <OverviewSection />}
        {section === 'leads' && <LeadsSection />}
        {section === 'alerts' && <AlertsSection />}
        {section === 'intelligence' && <IntelligenceSection />}
        {section === 'profile' && <ProfileSection />}
      </div>
    </div>
  );
}
