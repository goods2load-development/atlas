'use client';

import { BOXMAN, DEMO_LEADS } from './boxmanData';
import AlertsSection from './sections/AlertsSection';
import CalendarSection from './sections/CalendarSection';
import IntelligenceSection from './sections/IntelligenceSection';
import LeadsSection from './sections/LeadsSection';
import OverviewSection from './sections/OverviewSection';
import ProfileSection from './sections/ProfileSection';
import WhatsAppForwarderSection from './sections/WhatsAppForwarderSection';
import GoogleIcon from '@/assets/icons/google-icon.svg';

import { useEffect, useState } from 'react';

import {
  BarChart3,
  Bell,
  Brain,
  Calendar,
  CheckCircle,
  Inbox,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

// ── Demo sign-up gate ─────────────────────────────────────────────────────────
// Used internally for live API data — never shown in UI
const DEMO_COMPANY = 'ADSO';
// Generic display name shown in UI
const DEMO_DISPLAY = 'Freight Forwarding Co.';

function DemoSignUp({ onSuccess }: { onSuccess: (name: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      const displayName = name.trim() || email.split('@')[0];
      setTimeout(() => onSuccess(displayName), 1400);
    }, 1200);
  }

  function handleGoogleSignIn() {
    signIn('google', { callbackUrl: '/dashboard/freightforwardingcompany' });
  }

  return (
    <div className="min-h-screen bg-[#f5f4f3] flex items-center justify-center p-4 font-poppins">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <Image
              src="/g2l-logo-circle.png"
              alt="Goods2Load"
              width={72}
              height={72}
              priority
              className="mix-blend-multiply"
            />
          </div>
          <h1 className="text-2xl font-bold text-black">Join Goods2Load</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access your Atlas-powered freight dashboard
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle className="text-green-500 w-12 h-12" />
              <p className="font-semibold text-black text-lg">
                Account created!
              </p>
              <p className="text-sm text-muted-foreground">
                Taking you to your dashboard…
              </p>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[#e5630a] text-sm font-semibold text-black hover:bg-orange-50 transition-colors mb-4"
              >
                <Image src={GoogleIcon} width={20} height={20} alt="Google" />
                Sign in with Google
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">
                  or sign up with email
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-black uppercase tracking-wide">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primaryOrange/40 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-black uppercase tracking-wide">
                    Work email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primaryOrange/40 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-black uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Any password works"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1.5 w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primaryOrange/40 bg-gray-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-primaryOrange text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Creating
                      account…
                    </>
                  ) : (
                    'Access my dashboard'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 Demo environment · No real data stored · Powered by Atlas
        </p>
      </div>
    </div>
  );
}

type Section =
  | 'overview'
  | 'leads'
  | 'alerts'
  | 'intelligence'
  | 'profile'
  | 'calendar'
  | 'whatsapp';

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
  { id: 'calendar', label: 'Calendar', Icon: Calendar },
  { id: 'whatsapp', label: 'WhatsApp', Icon: MessageCircle },
  { id: 'profile', label: 'Profile & Trust', Icon: ShieldCheck },
];

export default function AtlasDashboard() {
  const [section, setSection] = useState<Section>('leads');
  const [user, setUser] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Read from sessionStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    const saved = sessionStorage.getItem('atlas_demo_user');
    if (saved) setUser(saved);
    setHydrated(true);
  }, []);

  function handleSignUp(name: string) {
    sessionStorage.setItem('atlas_demo_user', name);
    setUser(name);
  }

  // Show nothing until hydrated (avoids flash)
  if (!hydrated) return null;

  // Show sign-up gate if not authenticated
  if (!user) return <DemoSignUp onSuccess={handleSignUp} />;

  return (
    <div className="flex h-screen bg-[#f5f4f3] overflow-hidden font-poppins">
      {/* ── Internal sidebar ── */}
      <div className="hidden md:flex flex-col w-[220px] shrink-0 bg-white border-r border-border h-full">
        {/* Company header */}
        <div className="px-4 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primaryOrange flex items-center justify-center shrink-0">
              <Truck size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-black leading-tight truncate">
                Freight Dashboard
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                Powered by Atlas
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
        {/* Welcome banner */}
        <div className="shrink-0 px-6 py-2.5 bg-primaryOrange/8 border-b border-primaryOrange/15 flex items-center justify-between">
          <p className="text-xs text-primaryOrange font-medium">
            👋 Welcome, <span className="font-bold">{user}</span> — Atlas is
            active and routing leads to your dashboard.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('atlas_demo_user');
              setUser(null);
            }}
            className="text-[10px] text-muted-foreground hover:text-black transition-colors"
          >
            Sign out
          </button>
        </div>
        {section === 'overview' && <OverviewSection />}
        {section === 'leads' && <LeadsSection forwarder={DEMO_COMPANY} />}
        {section === 'alerts' && <AlertsSection />}
        {section === 'intelligence' && (
          <IntelligenceSection company={DEMO_DISPLAY} />
        )}
        {section === 'calendar' && <CalendarSection />}
        {section === 'whatsapp' && <WhatsAppForwarderSection />}
        {section === 'profile' && <ProfileSection />}
      </div>
    </div>
  );
}
