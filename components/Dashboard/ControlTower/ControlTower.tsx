'use client';

import GoogleIcon from '@/assets/icons/google-icon.svg';

import { useEffect, useState } from 'react';

import {
  Activity,
  Bot,
  Building2,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Globe,
  Inbox,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Forwarder {
  forwarder_id: string;
  name: string;
  country_of_registration: string;
  city_hq: string;
  verification_tier: 'VERIFIED' | 'PARTIAL' | 'SELF_DECLARED';
  certifications: string | null;
  verticals: string | null;
  transport_solutions: string | null;
  services: string | null;
  modes: string | null;
  pct_air: number | null;
  pct_sea: number | null;
  pct_road: number | null;
  google_rating: number | null;
  google_review_count: number | null;
  about_description: string | null;
}

interface ForwarderStats {
  total: number;
  verified: number;
  partial: number;
  self_declared: number;
  countries: number;
  verified_pct: number;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const HERMES_MESSAGES = [
  {
    id: 'h1',
    from: '+971 55 265 5499',
    preview: 'Air freight 500 kg pharma from Frankfurt to Baghdad',
    time: '2 min ago',
    status: 'answered',
    matches: 3,
  },
  {
    id: 'h2',
    from: '+44 7700 900142',
    preview: 'FCL 2×40ft containers, Jebel Ali → Mumbai',
    time: '14 min ago',
    status: 'answered',
    matches: 4,
  },
  {
    id: 'h3',
    from: '+971 50 123 4567',
    preview: 'Cold chain truck for frozen food, Dubai to Muscat',
    time: '1 hr ago',
    status: 'booked',
    matches: 2,
  },
  {
    id: 'h4',
    from: '+49 160 9876 5432',
    preview: 'Who handles dangerous goods from UAE to Saudi Arabia?',
    time: '3 hr ago',
    status: 'answered',
    matches: 5,
  },
  {
    id: 'h5',
    from: '+971 52 987 6543',
    preview: 'LCL shipment, electronics, Dubai → Karachi',
    time: '5 hr ago',
    status: 'booked',
    matches: 3,
  },
];

const LIVE_REQUESTS = [
  {
    id: 'r1',
    label: 'Air • Frankfurt → Baghdad',
    stage: 'Enrichment',
    elapsed: '4s',
    active: true,
  },
  {
    id: 'r2',
    label: 'FCL • Jebel Ali → Mumbai',
    stage: 'Ranker',
    elapsed: '18s',
    active: true,
  },
  {
    id: 'r3',
    label: 'Cold chain • Dubai → Muscat',
    stage: 'Complete',
    elapsed: '22s',
    active: false,
  },
];

const ASSISTANCE_QUEUE = [
  {
    id: 'a1',
    forwarder: 'ADSO',
    request: 'Capability profile update — added IATA DGR',
    priority: 'high',
    age: '1d',
  },
  {
    id: 'a2',
    forwarder: 'Avgo Trans',
    request: 'Verification tier review request',
    priority: 'medium',
    age: '2d',
  },
  {
    id: 'a3',
    forwarder: 'Gulf Bridge',
    request: 'New lane coverage — added Turkey routes',
    priority: 'low',
    age: '4d',
  },
];

// ── Auth gate ─────────────────────────────────────────────────────────────────

function OpsLogin({ onSuccess }: { onSuccess: (name: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      const displayName = name.trim() || email.split('@')[0];
      setTimeout(() => onSuccess(displayName), 1400);
    }, 1200);
  }

  function handleGoogleSignIn() {
    signIn('google', { callbackUrl: '/dashboard/ops' });
  }

  return (
    <div className="min-h-screen bg-[#f5f4f3] flex items-center justify-center p-4 font-poppins">
      <div className="w-full max-w-md">
        {/* Logo — mix-blend-multiply removes the white circle background */}
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
          <h1 className="text-2xl font-bold text-black">Goods2Load Ops</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access the Atlas Control Tower
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
          {done ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle className="text-green-500 w-12 h-12" />
              <p className="font-semibold text-black text-lg">
                Access granted!
              </p>
              <p className="text-sm text-muted-foreground">
                Opening the Control Tower…
              </p>
            </div>
          ) : (
            <>
              {/* Google Sign-In */}
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
                  or continue with email
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
                    placeholder="e.g. Jessica Panigari"
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
                    placeholder="judge@google.com"
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
                      <Loader2 className="w-4 h-4 animate-spin" />{' '}
                      Authenticating…
                    </>
                  ) : (
                    'Enter Control Tower'
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          🔒 Internal ops environment · Goods2Load team & judges only · Powered
          by Atlas
        </p>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: string }) {
  if (tier === 'VERIFIED')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-[10px] font-semibold">
        <ShieldCheck size={9} /> Verified
      </span>
    );
  if (tier === 'PARTIAL')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold">
        <ShieldAlert size={9} /> Partial
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border border-gray-200 text-[10px] font-semibold">
      <ShieldQuestion size={9} /> Self-decl.
    </span>
  );
}

function KpiCard({
  label,
  value,
  sub,
  Icon,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  Icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-border px-5 py-4 flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${accent ?? 'bg-primaryOrange/8'}`}
      >
        <Icon
          size={18}
          strokeWidth={1.75}
          className={accent ? 'text-white' : 'text-primaryOrange'}
        />
      </div>
      <div>
        <div className="text-2xl font-bold text-black leading-none">
          {value}
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

// ── Sections ──────────────────────────────────────────────────────────────────

function RosterSection({
  forwarders,
  stats,
  loading,
  refresh,
}: {
  forwarders: Forwarder[];
  stats: ForwarderStats | null;
  loading: boolean;
  refresh: () => void;
}) {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('ALL');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = forwarders.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      f.name.toLowerCase().includes(q) ||
      (f.country_of_registration || '').toLowerCase().includes(q) ||
      (f.city_hq || '').toLowerCase().includes(q);
    const matchTier =
      tierFilter === 'ALL' || f.verification_tier === tierFilter;
    return matchSearch && matchTier;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* KPI row */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <KpiCard
            label="Total forwarders"
            value={stats.total}
            Icon={Building2}
          />
          <KpiCard
            label="Verified"
            value={stats.verified}
            sub={`${stats.verified_pct}% of network`}
            Icon={ShieldCheck}
            accent="bg-green-500"
          />
          <KpiCard
            label="Partial"
            value={stats.partial}
            Icon={ShieldAlert}
            accent="bg-amber-400"
          />
          <KpiCard
            label="Self-declared"
            value={stats.self_declared}
            Icon={ShieldQuestion}
          />
          <KpiCard label="Countries" value={stats.countries} Icon={Globe} />
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            placeholder="Search name, country, city…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg border border-border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primaryOrange/30"
          />
        </div>
        {(['ALL', 'VERIFIED', 'PARTIAL', 'SELF_DECLARED'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTierFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              tierFilter === t
                ? 'bg-primaryOrange text-white border-primaryOrange'
                : 'bg-white text-muted-foreground border-border hover:border-primaryOrange/40'
            }`}
          >
            {t === 'ALL'
              ? 'All'
              : t === 'SELF_DECLARED'
                ? 'Self-decl.'
                : t.charAt(0) + t.slice(1).toLowerCase()}
          </button>
        ))}
        <button
          onClick={refresh}
          disabled={loading}
          className="ml-auto p-2 rounded-lg border border-border bg-white hover:bg-gray-50 transition-colors"
        >
          <RefreshCw
            size={13}
            className={
              loading
                ? 'animate-spin text-primaryOrange'
                : 'text-muted-foreground'
            }
          />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50/60">
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Forwarder
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                  Modes
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                  Rating
                </th>
                <th className="px-4 py-3 w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading && forwarders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-sm text-muted-foreground"
                  >
                    <Loader2 className="animate-spin inline mr-2" size={14} />
                    Loading forwarder network…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-12 text-sm text-muted-foreground"
                  >
                    No forwarders match your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((f) => (
                  <>
                    <tr
                      key={f.forwarder_id}
                      className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                      onClick={() =>
                        setExpanded(
                          expanded === f.forwarder_id ? null : f.forwarder_id,
                        )
                      }
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-black text-[13px]">
                          {f.name}
                        </div>
                        {f.certifications && (
                          <div className="text-[10px] text-muted-foreground truncate max-w-[160px]">
                            {f.certifications}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-muted-foreground">
                        {f.city_hq ? `${f.city_hq}, ` : ''}
                        {f.country_of_registration}
                      </td>
                      <td className="px-4 py-3">
                        <TierBadge tier={f.verification_tier} />
                      </td>
                      <td className="px-4 py-3 text-[11px] text-muted-foreground hidden md:table-cell max-w-[120px] truncate">
                        {f.modes || '—'}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {f.google_rating ? (
                          <div className="flex items-center gap-1 text-[12px]">
                            <Star
                              size={10}
                              className="text-amber-400 fill-amber-400"
                            />
                            <span className="font-medium text-black">
                              {f.google_rating}
                            </span>
                            {f.google_review_count && (
                              <span className="text-muted-foreground">
                                ({f.google_review_count})
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-[11px]">
                            —
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {expanded === f.forwarder_id ? (
                          <ChevronDown size={13} />
                        ) : (
                          <ChevronRight size={13} />
                        )}
                      </td>
                    </tr>
                    {expanded === f.forwarder_id && (
                      <tr
                        key={`${f.forwarder_id}-exp`}
                        className="bg-gray-50/50"
                      >
                        <td colSpan={6} className="px-4 pb-4 pt-2">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {f.about_description && (
                              <div className="md:col-span-2">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                  About
                                </p>
                                <p className="text-[12px] text-black leading-relaxed">
                                  {f.about_description.slice(0, 280)}
                                  {f.about_description.length > 280 ? '…' : ''}
                                </p>
                              </div>
                            )}
                            <div className="space-y-2">
                              {f.verticals && (
                                <div>
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    Verticals
                                  </p>
                                  <p className="text-[11px] text-black">
                                    {f.verticals}
                                  </p>
                                </div>
                              )}
                              {f.services && (
                                <div>
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                                    Services
                                  </p>
                                  <p className="text-[11px] text-black">
                                    {f.services}
                                  </p>
                                </div>
                              )}
                              {f.pct_air || f.pct_sea || f.pct_road ? (
                                <div>
                                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                    Mode split
                                  </p>
                                  <div className="flex gap-3">
                                    {f.pct_air ? (
                                      <span className="text-[11px]">
                                        ✈ {f.pct_air}%
                                      </span>
                                    ) : null}
                                    {f.pct_sea ? (
                                      <span className="text-[11px]">
                                        🚢 {f.pct_sea}%
                                      </span>
                                    ) : null}
                                    {f.pct_road ? (
                                      <span className="text-[11px]">
                                        🚛 {f.pct_road}%
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length > 0 && (
          <div className="px-4 py-2.5 border-t border-border bg-gray-50/40 text-[11px] text-muted-foreground">
            Showing {filtered.length} of {forwarders.length} forwarders · Live
            from BigQuery
          </div>
        )}
      </div>
    </div>
  );
}

const EMAIL_MESSAGES = [
  {
    id: 'e1',
    from: 'logistics@techcorp.ae',
    subject: 'Urgent: Air freight 2 tons electronics Dubai → Frankfurt',
    time: '8 min ago',
    status: 'answered',
    matches: 4,
  },
  {
    id: 'e2',
    from: 'ops@tradelink.com',
    subject: 'FCL inquiry — Jebel Ali to Rotterdam, 3 × 40ft',
    time: '1 hr ago',
    status: 'booked',
    matches: 3,
  },
  {
    id: 'e3',
    from: 'procurement@gulf-foods.com',
    subject: 'Cold chain: frozen goods Dubai → Muscat, weekly',
    time: '3 hr ago',
    status: 'answered',
    matches: 2,
  },
];

function HermesSection() {
  return (
    <div className="flex flex-col gap-5">
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="Total today"
          value="19"
          sub="WhatsApp + Email"
          Icon={MessageSquare}
        />
        <KpiCard
          label="Active sessions"
          value="3"
          sub="Last 24h"
          Icon={Radio}
        />
        <KpiCard
          label="Bookings made"
          value="7"
          Icon={CheckCircle2}
          accent="bg-green-500"
        />
        <KpiCard
          label="Avg response"
          value="23s"
          sub="Atlas pipeline"
          Icon={Zap}
        />
      </div>

      {/* Channel status cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-border px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
            <MessageSquare size={16} className="text-[#25D366]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-black">
                WhatsApp
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{' '}
                Live
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              +1 415 523 8886 · join{' '}
              <span className="font-mono">alive-look</span>
            </p>
          </div>
          <span className="text-[12px] font-bold text-black shrink-0">
            14 msgs
          </span>
        </div>

        <div className="bg-white rounded-xl border border-border px-5 py-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
            <Mail size={16} className="text-blue-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-black">
                Email
              </span>
              <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{' '}
                Live
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-mono">
              ops@goods2load.com
            </p>
          </div>
          <span className="text-[12px] font-bold text-black shrink-0">
            5 msgs
          </span>
        </div>
      </div>

      {/* WhatsApp inbox */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <MessageSquare size={14} className="text-[#25D366]" />
          <h3 className="text-sm font-semibold text-black">WhatsApp Inbox</h3>
        </div>
        <div className="divide-y divide-border">
          {HERMES_MESSAGES.map((m) => (
            <div
              key={m.id}
              className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                <MessageSquare size={14} className="text-[#25D366]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-medium text-black font-mono">
                    {m.from}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {m.time}
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground truncate">
                  {m.preview}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${m.status === 'booked' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}
                  >
                    {m.status.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {m.matches} matches
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email inbox */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Mail size={14} className="text-blue-500" />
          <h3 className="text-sm font-semibold text-black">Email Inbox</h3>
          <span className="text-[11px] text-muted-foreground ml-1">
            Goods2Load Ops → Atlas pipeline
          </span>
        </div>
        <div className="divide-y divide-border">
          {EMAIL_MESSAGES.map((m) => (
            <div
              key={m.id}
              className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Mail size={14} className="text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-medium text-black">
                    {m.from}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {m.time}
                  </span>
                </div>
                <p className="text-[12px] text-muted-foreground truncate">
                  {m.subject}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${m.status === 'booked' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}
                  >
                    {m.status.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {m.matches} matches
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-2.5 border-t border-border bg-gray-50/40 text-[11px] text-muted-foreground">
          Powered by Google Apps Script + Nodemailer · auto-replies in ~25s
        </div>
      </div>
    </div>
  );
}

function PipelineSection() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  const AGENTS = [
    {
      id: 'C1',
      name: 'Intent Parser',
      desc: 'Extracts cargo type, lane, compliance flags',
      status: 'active',
    },
    {
      id: 'C1.5',
      name: 'RAG Retriever',
      desc: 'Augments intent with knowledge-base context',
      status: 'active',
    },
    {
      id: 'C2',
      name: 'Capability Retrieval',
      desc: 'BigQuery semantic match over 24 forwarders',
      status: 'active',
    },
    {
      id: 'C3',
      name: 'Verification Agent',
      desc: 'Scores mode match, certifications, compliance',
      status: 'active',
    },
    {
      id: 'C4',
      name: 'Enrichment Agent',
      desc: 'Parallel Gemini enrichment — 5 concurrent calls',
      status: 'active',
    },
    {
      id: 'C5',
      name: 'Ranker & Responder',
      desc: 'Composite scoring → ranked shortlist + reply',
      status: 'active',
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Live requests */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-black">
            Live Pipeline Activity
          </h3>
          <span className="text-[10px] text-muted-foreground">
            {tick % 2 === 0 ? '●' : '○'} Polling
          </span>
        </div>
        <div className="divide-y divide-border">
          {LIVE_REQUESTS.map((r) => (
            <div key={r.id} className="px-5 py-3 flex items-center gap-4">
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${r.active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-black">
                  {r.label}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Stage: {r.stage} · {r.elapsed}
                </div>
              </div>
              {r.active ? (
                <Loader2
                  size={12}
                  className="text-primaryOrange animate-spin shrink-0"
                />
              ) : (
                <CheckCircle2 size={12} className="text-green-500 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {AGENTS.map((a, i) => (
          <div
            key={a.id}
            className="bg-white rounded-xl border border-border px-4 py-4 flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-primaryOrange/8 flex items-center justify-center shrink-0">
              <Bot
                size={16}
                strokeWidth={1.75}
                className="text-primaryOrange"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground font-mono">
                  {a.id}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    (tick + i) % 4 === 0 ? 'bg-amber-400' : 'bg-green-500'
                  }`}
                />
              </div>
              <div className="text-[12px] font-semibold text-black">
                {a.name}
              </div>
              <div className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                {a.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Assistance queue */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-black">
            Forwarder Assistance Queue
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Profile updates and onboarding requests
          </p>
        </div>
        <div className="divide-y divide-border">
          {ASSISTANCE_QUEUE.map((a) => (
            <div key={a.id} className="px-5 py-3.5 flex items-center gap-4">
              <div
                className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${
                  a.priority === 'high'
                    ? 'bg-red-500'
                    : a.priority === 'medium'
                      ? 'bg-amber-400'
                      : 'bg-gray-300'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-black">
                  {a.forwarder}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {a.request}
                </div>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">
                {a.age}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Email section ─────────────────────────────────────────────────────────────

const HERMES_EMAILS = [
  {
    id: 'e1',
    from: 'geodis.ops@geodis.com',
    subject: 'Urgent: Pharma cold-chain transport 2–8°C to Iraq',
    preview:
      'We require GDP-certified cold-truck service for pharmaceutical cargo from Dubai to Baghdad. Delivery needed within 5 days.',
    time: '09:14',
    date: 'Today',
    matched: 'Mateen Express & Logistics Iraq',
  },
  {
    id: 'e2',
    from: 'logistics@amg-global.com',
    subject: 'Air freight inquiry — Frankfurt to Dubai, automotive parts',
    preview:
      'Looking for a reliable air cargo partner for 500kg automotive spare parts shipment, mid-June departure from Frankfurt.',
    time: '08:02',
    date: 'Today',
    matched: 'SOLITAIR CARGO EXPRESS DWC',
  },
  {
    id: 'e3',
    from: 'supply@retailgroup.ae',
    subject: 'FCL sea freight Ningbo to Jebel Ali — 2×40HC',
    preview:
      'We need a forwarding partner for two 40HC containers of retail display fixtures from Ningbo port.',
    time: '17:30',
    date: 'Yesterday',
    matched: 'SMLX Freight',
  },
  {
    id: 'e4',
    from: 'import@foodtrading.iq',
    subject: 'Foodstuff import Iraq via UAE — regular basis',
    preview:
      'Looking for a freight forwarder to handle monthly foodstuff shipments from Malaysia via Jebel Ali into Iraq.',
    time: '14:12',
    date: 'Yesterday',
    matched: 'Mateen Express & Logistics Iraq',
  },
  {
    id: 'e5',
    from: 'procurement@solarco.sa',
    subject: 'Solar equipment from China to Saudi Arabia — project cargo',
    preview:
      'Large-scale solar panel shipment from Shenzhen to Dammam, oversized. Need experienced project cargo handler.',
    time: '11:05',
    date: 'Yesterday',
    matched: 'ADSO',
  },
];

function EmailSection() {
  const [selected, setSelected] = useState<string | null>('e1');
  const selectedEmail = HERMES_EMAILS.find((e) => e.id === selected);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-xs text-muted-foreground">
            Goods2Load Ops Inbox · Hermes-processed freight enquiries
          </span>
        </div>
        <a
          href="https://mail.google.com/mail/u/0/?authuser=ahmed@goods2load.com#inbox"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-medium text-primaryOrange hover:underline"
        >
          <Mail size={11} /> Open inbox ↗
        </a>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Email list */}
        <div className="w-80 shrink-0 flex flex-col gap-1.5 overflow-y-auto">
          {HERMES_EMAILS.map((email) => (
            <button
              key={email.id}
              onClick={() => setSelected(email.id)}
              className={`w-full text-left p-3 rounded-xl border transition-colors ${selected === email.id ? 'bg-white border-primaryOrange/40 shadow-sm' : 'bg-white border-border hover:border-primaryOrange/20'}`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-[11px] font-semibold text-black truncate">
                  {email.from}
                </span>
                <span className="text-[9px] text-muted-foreground shrink-0">
                  {email.date}
                </span>
              </div>
              <p className="text-[11px] font-medium text-black truncate mb-1">
                {email.subject}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[9px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full">
                  ✓ Replied by Atlas
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Email detail */}
        {selectedEmail && (
          <div className="flex-1 bg-white rounded-xl border border-border overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-black mb-1">
                {selectedEmail.subject}
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>From: {selectedEmail.from}</span>
                <span>·</span>
                <span>
                  {selectedEmail.date} at {selectedEmail.time}
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Incoming enquiry
                </p>
                <p className="text-[12px] text-black leading-relaxed">
                  {selectedEmail.preview}
                </p>
              </div>
              <div className="bg-primaryOrange/5 border border-primaryOrange/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bot size={12} className="text-primaryOrange" />
                  <p className="text-[10px] font-semibold text-primaryOrange uppercase tracking-wider">
                    Atlas reply — sent automatically
                  </p>
                </div>
                <p className="text-[12px] text-black leading-relaxed mb-3">
                  Thank you for reaching out to Goods2Load. Based on your
                  requirements, here is our top match from the verified network:
                </p>
                <div className="flex items-center gap-2 text-[11px] bg-white rounded-lg px-3 py-2 border border-border">
                  <span className="w-5 h-5 rounded-full bg-primaryOrange text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    #1
                  </span>
                  <span className="font-semibold text-black">
                    {selectedEmail.matched}
                  </span>
                  <span className="ml-auto text-[9px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded-full">
                    Best match
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Calendar section ──────────────────────────────────────────────────────────

function CalendarSection() {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Goods2Load team calendar
        </p>
        <a
          href="https://calendar.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-medium text-primaryOrange hover:underline"
        >
          <Globe size={11} /> Open in Google Calendar ↗
        </a>
      </div>
      <div className="flex-1 rounded-xl overflow-hidden border border-border shadow-sm bg-white">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=ahmed%40goods2load.com&ctz=Asia%2FDubai&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&mode=WEEK"
          className="w-full h-full min-h-[600px]"
          title="Google Calendar"
          frameBorder="0"
          scrolling="no"
        />
      </div>
      <p className="text-[10px] text-muted-foreground mt-2 text-center">
        Calendar must be set to &ldquo;public&rdquo; in Google Calendar settings
        to display here.
      </p>
    </div>
  );
}

// ── WhatsApp section ──────────────────────────────────────────────────────────

const WA_MESSAGES = [
  {
    id: 'w1',
    from: '+971 55 265 5499',
    direction: 'in' as const,
    text: 'Hi, I need air freight for pharma from Frankfurt to Baghdad, 2–8°C, GDP certified. Urgent.',
    time: '09:12',
    matched: 'Mateen Express & Logistics Iraq',
  },
  {
    id: 'w2',
    from: '+971 55 265 5499',
    direction: 'out' as const,
    text: '👋 Hi! Atlas found 3 matches for your GDP cold-chain shipment to Baghdad:\n1. Mateen Express — Iraq specialist, CROSS_BORDER, COLD_CHAIN\n2. SOLITAIR CARGO EXPRESS — Air cargo airline, DWC hub\n3. ADSO — Verified, pharma experience',
    time: '09:13',
    matched: null,
  },
  {
    id: 'w3',
    from: '+44 7700 900142',
    direction: 'in' as const,
    text: 'FCL 2×40ft containers Jebel Ali to Mumbai, need rate and transit time',
    time: '14:05',
    matched: 'SMLX Freight',
  },
  {
    id: 'w4',
    from: '+44 7700 900142',
    direction: 'out' as const,
    text: '📦 Top matches for FCL Jebel Ali → Mumbai:\n1. SMLX Freight — Sea freight specialist, weekly service\n2. Avgo Logistics — Verified, India coverage\n3. gtf shipping services — LCL/FCL, Asia lanes',
    time: '14:05',
    matched: null,
  },
  {
    id: 'w5',
    from: '+966 50 123 4567',
    direction: 'in' as const,
    text: 'Need GCC trucking from Riyadh to Dubai, 3 pallets FMCG with border clearance',
    time: '16:40',
    matched: 'Me Freight',
  },
  {
    id: 'w6',
    from: '+966 50 123 4567',
    direction: 'out' as const,
    text: '🚛 Road freight matches for Riyadh → Dubai:\n1. Me Freight — GCC road specialist, CUSTOMS_CLEARANCE\n2. Gulfwaves Logistics — UAE-based, CROSS_BORDER\n3. Naqel Express — FMCG certified, GCC network',
    time: '16:41',
    matched: null,
  },
];

function WhatsAppSection() {
  const convos = Array.from(new Set(WA_MESSAGES.map((m) => m.from)));

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {/* Conversation list */}
      <div className="col-span-1 space-y-2">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Conversations
        </p>
        {convos.map((from) => {
          const last = WA_MESSAGES.filter((m) => m.from === from).at(-1);
          const inbound = WA_MESSAGES.filter(
            (m) => m.from === from && m.direction === 'in',
          ).length;
          return (
            <div
              key={from}
              className="p-3 rounded-xl bg-white border border-border hover:border-primaryOrange/40 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-[#25D366]/15 flex items-center justify-center shrink-0">
                  <MessageSquare size={12} className="text-[#25D366]" />
                </div>
                <span className="text-[11px] font-semibold text-black truncate">
                  {from}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">
                {last?.text.slice(0, 50)}…
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[9px] text-muted-foreground">
                  {last?.time}
                </span>
                <span className="text-[9px] bg-[#25D366]/10 text-[#25D366] px-1.5 py-0.5 rounded-full font-medium">
                  {inbound} msgs
                </span>
              </div>
            </div>
          );
        })}
        <div className="pt-2 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            Via Twilio WhatsApp Sandbox
          </p>
        </div>
      </div>

      {/* Message thread */}
      <div className="col-span-2 flex flex-col bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center">
            <MessageSquare size={12} className="text-white" />
          </div>
          <span className="text-[12px] font-semibold text-black">
            All conversations
          </span>
          <span className="ml-auto text-[9px] bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
            ● Live
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {WA_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.direction === 'out' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line ${
                  msg.direction === 'out'
                    ? 'bg-[#25D366]/15 text-black rounded-br-sm'
                    : 'bg-gray-100 text-black rounded-bl-sm'
                }`}
              >
                {msg.direction === 'in' && (
                  <p className="text-[9px] font-semibold text-muted-foreground mb-1">
                    {msg.from}
                  </p>
                )}
                {msg.text}
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[9px] text-muted-foreground">
                    {msg.time}
                  </span>
                  {msg.direction === 'out' && (
                    <CheckCircle2 size={9} className="text-[#25D366]" />
                  )}
                </div>
                {msg.matched && (
                  <span className="inline-block mt-1 text-[9px] bg-primaryOrange/10 text-primaryOrange px-1.5 py-0.5 rounded-full">
                    → {msg.matched}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

type Section =
  | 'roster'
  | 'hermes'
  | 'pipeline'
  | 'email'
  | 'calendar'
  | 'whatsapp';

const NAV: {
  id: Section;
  label: string;
  Icon: React.ElementType;
  badge?: number;
}[] = [
  { id: 'roster', label: 'Forwarder Roster', Icon: Building2 },
  { id: 'hermes', label: 'Hermes Inbox', Icon: Inbox, badge: 3 },
  { id: 'pipeline', label: 'Pipeline & Agents', Icon: Activity },
  { id: 'email', label: 'Ops Inbox', Icon: Mail },
  { id: 'calendar', label: 'Calendar', Icon: Globe },
  { id: 'whatsapp', label: 'WhatsApp', Icon: MessageSquare },
];

const ATLAS_URL =
  process.env.NEXT_PUBLIC_ATLAS_API_URL?.replace(/\/$/, '') ??
  'https://atlas-api-580788225919.us-central1.run.app';

export default function ControlTower() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [section, setSection] = useState<Section>('roster');
  const [forwarders, setForwarders] = useState<Forwarder[]>([]);
  const [stats, setStats] = useState<ForwarderStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem('ops_user');
    if (saved) {
      setAuthed(true);
      setUser(saved);
    }
    setHydrated(true);
  }, []);

  async function fetchForwarders() {
    setLoading(true);
    try {
      const res = await fetch(`${ATLAS_URL}/forwarders`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setForwarders(data.forwarders ?? []);
      setStats(data.stats ?? null);
    } catch (e) {
      console.error('Failed to fetch forwarders', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) fetchForwarders();
  }, [authed]);

  if (!hydrated) return null;

  if (!authed)
    return (
      <OpsLogin
        onSuccess={(name) => {
          sessionStorage.setItem('ops_user', name);
          setUser(name);
          setAuthed(true);
        }}
      />
    );

  return (
    <div className="flex h-screen bg-[#f5f4f3] overflow-hidden font-poppins">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-[220px] shrink-0 bg-[#0d0d1a] h-full">
        {/* Header */}
        <div className="px-4 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primaryOrange flex items-center justify-center shrink-0">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-white leading-tight">
                Control Tower
              </p>
              <p className="text-[10px] text-gray-500">Goods2Load Ops</p>
            </div>
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
                    ? 'bg-primaryOrange/15 text-primaryOrange'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
        <div className="px-4 py-4 border-t border-white/8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] text-gray-500">Atlas API online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            <span className="text-[10px] text-gray-500">WhatsApp live</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[10px] text-gray-500">Email live</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[10px] text-gray-500">BigQuery live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
        {/* Welcome banner */}
        <div className="shrink-0 px-6 py-2.5 bg-primaryOrange/8 border-b border-primaryOrange/15 flex items-center justify-between">
          <p className="text-xs text-primaryOrange font-medium">
            👋 Welcome, <span className="font-bold">{user}</span> — you&apos;re
            viewing the Goods2Load internal ops dashboard.
          </p>
          <button
            onClick={() => {
              sessionStorage.removeItem('ops_user');
              setUser(null);
              setAuthed(false);
            }}
            className="text-[10px] text-muted-foreground hover:text-black transition-colors"
          >
            Sign out
          </button>
        </div>

        {/* Top bar */}
        <div className="shrink-0 px-6 py-3 bg-white border-b border-border flex items-center justify-between">
          <div>
            <h1 className="text-sm font-bold text-black">
              {section === 'roster'
                ? 'Forwarder Roster'
                : section === 'hermes'
                  ? 'Hermes WhatsApp Gateway'
                  : section === 'pipeline'
                    ? 'Pipeline & Agent Status'
                    : section === 'email'
                      ? 'Goods2Load Ops Inbox'
                      : section === 'calendar'
                        ? 'Calendar — Goods2Load'
                        : 'WhatsApp — Hermes Gateway'}
            </h1>
            <p className="text-[11px] text-muted-foreground">
              {section === 'roster'
                ? `${stats?.total ?? '—'} forwarders across ${stats?.countries ?? '—'} countries · Live from BigQuery`
                : section === 'hermes'
                  ? 'Twilio sandbox · Real-time WhatsApp routing'
                  : section === 'pipeline'
                    ? 'C1–C5 multi-agent pipeline · Gemini 2.5 Flash'
                    : section === 'email'
                      ? 'Google Workspace inbox · Hermes-processed freight enquiries'
                      : section === 'calendar'
                        ? 'Google Calendar · Goods2Load team schedule'
                        : 'Live WhatsApp conversations via Twilio · Atlas-powered replies'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Atlas online
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
              <Users size={9} />
              Internal
            </span>
          </div>
        </div>

        {/* Section content */}
        <div className="flex-1 overflow-y-auto p-6">
          {section === 'roster' && (
            <RosterSection
              forwarders={forwarders}
              stats={stats}
              loading={loading}
              refresh={fetchForwarders}
            />
          )}
          {section === 'hermes' && <HermesSection />}
          {section === 'pipeline' && <PipelineSection />}
          {section === 'email' && <EmailSection />}
          {section === 'calendar' && <CalendarSection />}
          {section === 'whatsapp' && <WhatsAppSection />}
        </div>
      </div>
    </div>
  );
}
