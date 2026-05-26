'use client';

// @ts-nocheck — react-simple-maps uses React 19-incompatible JSX types (same as Map.tsx)
import { useEffect, useRef, useState } from 'react';

import Map from '@/components/Dashboard/Map/Map';

// ── Types ─────────────────────────────────────────────────────────────────────

interface LaneAlert {
  id: string;
  origin: string;
  destination: string;
  mode: 'air' | 'sea' | 'road';
  active: boolean;
  lastTriggered?: string;
}

interface LeadItem {
  id: string;
  channel: 'whatsapp' | 'web' | 'email';
  from: string;
  country: string;
  message: string;
  time: string;
  status: 'new' | 'replied' | 'booked';
}

interface ActivityItem {
  id: string;
  agent: string;
  action: string;
  time: string;
  type: 'match' | 'alert' | 'learn' | 'route' | 'hermes';
}

interface FeedbackItem {
  id: string;
  shipperQuery: string;
  matchedForwarder: string;
  score: number;
  rated?: 'up' | 'down';
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_LANES = [
  {
    from: {
      name: 'Dubai, UAE',
      coordinates: [55.2708, 25.2048] as [number, number],
    },
    to: {
      name: 'Frankfurt, Germany',
      coordinates: [8.6821, 50.1109] as [number, number],
    },
  },
  {
    from: {
      name: 'Jebel Ali Port',
      coordinates: [55.0272, 24.9857] as [number, number],
    },
    to: {
      name: 'Rotterdam',
      coordinates: [4.4777, 51.9244] as [number, number],
    },
  },
  {
    from: {
      name: 'Dubai, UAE',
      coordinates: [55.2708, 25.2048] as [number, number],
    },
    to: { name: 'Mumbai', coordinates: [72.8777, 19.076] as [number, number] },
  },
  {
    from: {
      name: 'Riyadh',
      coordinates: [46.7219, 24.6877] as [number, number],
    },
    to: {
      name: 'Dubai, UAE',
      coordinates: [55.2708, 25.2048] as [number, number],
    },
  },
];

const MOCK_LEADS: LeadItem[] = [
  {
    id: '1',
    channel: 'whatsapp',
    from: 'Ahmed Al-Rashid',
    country: 'Saudi Arabia',
    message: 'Need air freight for 200kg pharma from DXB to RUH urgently',
    time: '2 min ago',
    status: 'new',
  },
  {
    id: '2',
    channel: 'web',
    from: 'Marco Rossi',
    country: 'Italy',
    message: 'FCL container Jebel Ali → Genoa, machinery parts',
    time: '18 min ago',
    status: 'replied',
  },
  {
    id: '3',
    channel: 'whatsapp',
    from: 'Priya Sharma',
    country: 'India',
    message: 'Cold chain truck Dubai to Muscat, frozen seafood 4 tons',
    time: '1 hr ago',
    status: 'booked',
  },
  {
    id: '4',
    channel: 'email',
    from: 'Wang Wei',
    country: 'China',
    message: 'DG cargo class 3 from Shanghai to Dubai, air freight',
    time: '3 hr ago',
    status: 'replied',
  },
];

const MOCK_ALERTS: LaneAlert[] = [
  {
    id: '1',
    origin: 'Dubai (DXB)',
    destination: 'London (LHR)',
    mode: 'air',
    active: true,
    lastTriggered: 'Today 09:14',
  },
  {
    id: '2',
    origin: 'Jebel Ali',
    destination: 'Hamburg',
    mode: 'sea',
    active: true,
    lastTriggered: 'Yesterday',
  },
  {
    id: '3',
    origin: 'Dubai',
    destination: 'Riyadh',
    mode: 'road',
    active: false,
    lastTriggered: '3 days ago',
  },
];

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: '1',
    agent: 'C2 Match',
    action: 'Found 4 new shippers matching your air freight lanes',
    time: '5 min ago',
    type: 'match',
  },
  {
    id: '2',
    agent: 'Hermes',
    action: 'WhatsApp lead received — Ahmed Al-Rashid (SA)',
    time: '2 min ago',
    type: 'hermes',
  },
  {
    id: '3',
    agent: 'C3 Trust',
    action: 'Trust score updated: 91/100 after FIATA cert verification',
    time: '1 hr ago',
    type: 'match',
  },
  {
    id: '4',
    agent: 'Alert Engine',
    action: 'DXB→LHR alert fired — new shipper needs 500kg air cargo',
    time: '3 hr ago',
    type: 'alert',
  },
  {
    id: '5',
    agent: 'C5 Rank',
    action: 'Your ranking improved +3 positions on UAE–Europe lanes',
    time: '6 hr ago',
    type: 'learn',
  },
  {
    id: '6',
    agent: 'C4 Enrich',
    action: 'Google Business profile enriched — 4.8★ (312 reviews)',
    time: '1 day ago',
    type: 'route',
  },
];

const MOCK_FEEDBACK: FeedbackItem[] = [
  {
    id: '1',
    shipperQuery: 'Air freight pharma DXB → FRA, 300kg',
    matchedForwarder: 'Your company — ranked #1',
    score: 94,
  },
  {
    id: '2',
    shipperQuery: 'FCL container Jebel Ali → Rotterdam',
    matchedForwarder: 'Your company — ranked #2',
    score: 88,
  },
  {
    id: '3',
    shipperQuery: 'Cold chain truck Dubai to Muscat',
    matchedForwarder: 'Your company — ranked #1',
    score: 96,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  icon,
  trend,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: string;
  trend?: 'up' | 'down' | 'flat';
}) {
  return (
    <div className="bg-white rounded-xl border border-border px-5 py-4 flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primaryOrange/10 text-xl shrink-0">
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
        <div className="text-[11px] text-muted-foreground mt-0.5 font-medium uppercase tracking-wide">
          {label}
        </div>
        {sub && (
          <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>
        )}
      </div>
    </div>
  );
}

function AgentPipelineBar() {
  const steps = [
    { id: 'C1', label: 'Intent', desc: 'Extract cargo intent' },
    { id: 'C1.5', label: 'RAG', desc: 'Historical hints' },
    { id: 'C2', label: 'Match', desc: 'Capacity lookup' },
    { id: 'C3', label: 'Trust', desc: 'Score verification' },
    { id: 'C4', label: 'Enrich', desc: 'Profile enrichment' },
    { id: 'C5', label: 'Rank', desc: 'Final ranking' },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#1a1a2e] rounded-xl px-5 py-4 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
          Atlas Pipeline — Live
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
          Processing queries
        </span>
      </div>
      <div className="flex items-center gap-0">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  i < active
                    ? 'bg-primaryOrange text-white scale-100'
                    : i === active
                      ? 'bg-primaryOrange text-white scale-110 shadow-lg shadow-primaryOrange/40 ring-2 ring-primaryOrange/40'
                      : 'bg-white/10 text-white/40'
                }`}
              >
                {i < active ? '✓' : step.id}
              </div>
              <span
                className={`text-[9px] mt-1 font-medium uppercase tracking-wide ${
                  i <= active ? 'text-white/80' : 'text-white/30'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-px flex-1 mx-1 transition-all duration-500 ${
                  i < active ? 'bg-primaryOrange' : 'bg-white/15'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Skill card wrapper ────────────────────────────────────────────────────────

function SkillCard({
  icon,
  title,
  agent,
  status,
  children,
}: {
  icon: string;
  title: string;
  agent: string;
  status: 'active' | 'connected' | 'standby';
  children: React.ReactNode;
}) {
  const statusColor =
    status === 'active'
      ? 'text-green-600 bg-green-50'
      : status === 'connected'
        ? 'text-blue-600 bg-blue-50'
        : 'text-amber-600 bg-amber-50';
  const statusLabel =
    status === 'active'
      ? 'Active'
      : status === 'connected'
        ? 'Connected'
        : 'Standby';

  return (
    <div className="bg-white rounded-xl border border-border flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gray-50/60">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <div>
            <div className="text-sm font-bold text-black leading-tight">
              {title}
            </div>
            <div className="text-[10px] text-muted-foreground">{agent}</div>
          </div>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// ── Skill 1: Route Map ────────────────────────────────────────────────────────

function RouteMapSkill() {
  return (
    <SkillCard
      icon="🗺️"
      title="Route Map"
      agent="Hermes maps skill · C2 Match"
      status="active"
    >
      <div className="px-3 pt-2 pb-0">
        <p className="text-[11px] text-muted-foreground mb-1">
          Your active freight lanes — updated by Atlas after every match cycle
        </p>
        <div
          className="rounded-lg overflow-hidden border border-border bg-gray-50"
          style={{ height: 240 }}
        >
          <Map data={MOCK_LANES} height={240} width={600} />
        </div>
        <div className="flex gap-2 mt-2 mb-3">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primaryOrange inline-block" />
            Air lanes
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
            Sea lanes
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" />
            Road lanes
          </div>
        </div>
      </div>
    </SkillCard>
  );
}

// ── Skill 2: Hermes WhatsApp Gateway ─────────────────────────────────────────

function HermesGatewaySkill() {
  return (
    <SkillCard
      icon="📱"
      title="Hermes Gateway"
      agent="WhatsApp · Telegram · Web leads"
      status="connected"
    >
      <div className="divide-y divide-border">
        {MOCK_LEADS.map((lead) => (
          <div key={lead.id} className="px-4 py-3 flex items-start gap-3">
            <div
              className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                lead.channel === 'whatsapp'
                  ? 'bg-green-100 text-green-700'
                  : lead.channel === 'email'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
              }`}
            >
              {lead.channel === 'whatsapp'
                ? '💬'
                : lead.channel === 'email'
                  ? '✉️'
                  : '🌐'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-black truncate">
                  {lead.from}
                </span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0">
                  {lead.time}
                </span>
              </div>
              <div className="text-[11px] text-muted-foreground leading-snug mt-0.5 line-clamp-1">
                {lead.message}
              </div>
              <span
                className={`mt-1 inline-block text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${
                  lead.status === 'new'
                    ? 'bg-primaryOrange/15 text-primaryOrange'
                    : lead.status === 'booked'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                {lead.status}
              </span>
            </div>
          </div>
        ))}
        <div className="px-4 py-2.5">
          <button className="w-full text-[11px] text-primaryOrange font-semibold hover:underline text-center">
            View all leads →
          </button>
        </div>
      </div>
    </SkillCard>
  );
}

// ── Skill 3: Lane Alerts ──────────────────────────────────────────────────────

function LaneAlertsSkill() {
  const [alerts, setAlerts] = useState<LaneAlert[]>(MOCK_ALERTS);
  const [showForm, setShowForm] = useState(false);
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [mode, setMode] = useState<'air' | 'sea' | 'road'>('air');

  function toggleAlert(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
  }

  function addAlert() {
    if (!origin.trim() || !dest.trim()) return;
    setAlerts((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        origin: origin.trim(),
        destination: dest.trim(),
        mode,
        active: true,
      },
    ]);
    setOrigin('');
    setDest('');
    setShowForm(false);
  }

  const modeIcon = { air: '✈️', sea: '🚢', road: '🚛' };

  return (
    <SkillCard
      icon="⚡"
      title="Lane Alerts"
      agent="Hermes webhook skill · proactive"
      status="active"
    >
      <div className="px-4 py-3 flex flex-col gap-2">
        <p className="text-[11px] text-muted-foreground">
          Atlas monitors these lanes and pings you via WhatsApp when new
          shippers appear.
        </p>

        <div className="flex flex-col gap-2 mt-1">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 transition-colors ${
                alert.active
                  ? 'border-primaryOrange/30 bg-primaryOrange/5'
                  : 'border-border bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm">{modeIcon[alert.mode]}</span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-black truncate">
                    {alert.origin} → {alert.destination}
                  </div>
                  {alert.lastTriggered && (
                    <div className="text-[10px] text-muted-foreground">
                      Last fired: {alert.lastTriggered}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => toggleAlert(alert.id)}
                className={`ml-2 w-8 h-4 rounded-full transition-colors relative shrink-0 ${
                  alert.active ? 'bg-primaryOrange' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
                    alert.active ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {showForm ? (
          <div className="mt-2 flex flex-col gap-2 p-3 rounded-lg border border-border bg-gray-50">
            <div className="flex gap-2">
              <input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Origin (e.g. DXB)"
                className="flex-1 text-xs border border-border rounded-lg px-2.5 py-1.5 bg-white outline-none focus:border-primaryOrange"
              />
              <input
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                placeholder="Destination"
                className="flex-1 text-xs border border-border rounded-lg px-2.5 py-1.5 bg-white outline-none focus:border-primaryOrange"
              />
            </div>
            <div className="flex gap-1.5">
              {(['air', 'sea', 'road'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 text-[11px] font-semibold rounded-lg py-1.5 border transition-colors ${
                    mode === m
                      ? 'bg-primaryOrange text-white border-primaryOrange'
                      : 'bg-white text-muted-foreground border-border hover:border-primaryOrange'
                  }`}
                >
                  {modeIcon[m]} {m}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={addAlert}
                className="flex-1 text-xs font-bold bg-primaryOrange text-white rounded-lg py-1.5 hover:opacity-90"
              >
                Set alert
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-xs text-muted-foreground px-3 py-1.5 rounded-lg border border-border hover:border-primaryOrange"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="mt-1 w-full text-[11px] font-semibold text-primaryOrange border border-primaryOrange/40 rounded-lg py-2 hover:bg-primaryOrange/5 transition-colors"
          >
            + Add lane alert
          </button>
        )}
      </div>
    </SkillCard>
  );
}

// ── Skill 4: Atlas Intelligence mini-chat ─────────────────────────────────────

function AtlasIntelligenceSkill() {
  const SUGGESTIONS = [
    'Which lanes have most demand this week?',
    'How does my trust score compare to competitors?',
    'Draft a cold email for a new shipper in Germany',
    'What cargo types should I target for Q3?',
  ];

  const [messages, setMessages] = useState<
    { role: 'user' | 'atlas'; text: string }[]
  >([
    {
      role: 'atlas',
      text: "Hi — I'm Atlas. Ask me anything about your freight business, your lanes, or market opportunities.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user' as const, text: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `[FORWARDER DASHBOARD — business intelligence query]\n${text.trim()}`,
            },
          ],
        }),
      });
      const json = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: 'atlas',
          text: json.reply ?? 'Sorry, could not get a response right now.',
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'atlas', text: 'Connection error — please try again shortly.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SkillCard
      icon="🧠"
      title="Atlas Intelligence"
      agent="Business AI · Hermes brain skill"
      status="active"
    >
      <div className="flex flex-col h-[320px]">
        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-3 py-2 space-y-2 hide-scrollbar"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-primaryOrange text-white rounded-br-sm'
                    : 'bg-gray-50 text-black border border-border rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-border rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1 h-1 rounded-full bg-primaryOrange/60 animate-bounce block"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="px-3 pb-1 flex flex-wrap gap-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[10px] text-primaryOrange border border-primaryOrange/30 rounded-full px-2 py-0.5 hover:bg-primaryOrange/5 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border px-3 py-2 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            disabled={loading}
            placeholder="Ask Atlas anything…"
            className="flex-1 text-[12px] bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="w-6 h-6 rounded-full bg-primaryOrange text-white flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-opacity shrink-0"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </SkillCard>
  );
}

// ── Activity feed ─────────────────────────────────────────────────────────────

function ActivityFeed() {
  const typeColor = {
    match: 'bg-primaryOrange/10 text-primaryOrange',
    alert: 'bg-amber-50 text-amber-600',
    learn: 'bg-purple-50 text-purple-600',
    route: 'bg-blue-50 text-blue-600',
    hermes: 'bg-green-50 text-green-600',
  };
  const typeIcon = {
    match: '🎯',
    alert: '⚡',
    learn: '🧠',
    route: '🗺️',
    hermes: '📱',
  };

  return (
    <div className="bg-white rounded-xl border border-border">
      <div className="px-4 py-3 border-b border-border bg-gray-50/60">
        <h3 className="text-sm font-bold text-black">Agent Activity</h3>
        <p className="text-[10px] text-muted-foreground">
          What Atlas did for you today
        </p>
      </div>
      <div className="divide-y divide-border">
        {MOCK_ACTIVITY.map((item) => (
          <div key={item.id} className="flex items-start gap-3 px-4 py-3">
            <span className="text-sm shrink-0 mt-0.5">
              {typeIcon[item.type]}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${typeColor[item.type]}`}
                >
                  {item.agent}
                </span>
              </div>
              <p className="text-[11px] text-black leading-snug">
                {item.action}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Feedback panel ────────────────────────────────────────────────────────────

function FeedbackPanel() {
  const [items, setItems] = useState<FeedbackItem[]>(MOCK_FEEDBACK);

  function rate(id: string, vote: 'up' | 'down') {
    setItems((prev) =>
      prev.map((f) => (f.id === id ? { ...f, rated: vote } : f)),
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border">
      <div className="px-4 py-3 border-b border-border bg-gray-50/60">
        <h3 className="text-sm font-bold text-black">Match Feedback</h3>
        <p className="text-[10px] text-muted-foreground">
          Rate recent Atlas matches — feeds the C5 self-learning loop
        </p>
      </div>
      <div className="divide-y divide-border">
        {items.map((f) => (
          <div key={f.id} className="px-4 py-3">
            <p className="text-[11px] font-semibold text-black line-clamp-1">
              {f.shipperQuery}
            </p>
            <div className="flex items-center justify-between mt-1.5">
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primaryOrange"
                    style={{ width: `${f.score}%` }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {f.score}/100
                </span>
              </div>
              {f.rated ? (
                <span className="text-[11px] text-muted-foreground">
                  {f.rated === 'up' ? '👍 Rated' : '👎 Rated'}
                </span>
              ) : (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => rate(f.id, 'up')}
                    className="text-base hover:scale-110 transition-transform"
                    title="Good match"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => rate(f.id, 'down')}
                    className="text-base hover:scale-110 transition-transform"
                    title="Poor match"
                  >
                    👎
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="px-4 py-2.5">
          <p className="text-[10px] text-muted-foreground text-center">
            Your feedback trains Atlas C5 via DSPy — better scores = better
            ranking
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function AtlasDashboard() {
  return (
    <div className="min-h-screen bg-[#f5f4f3] p-4 lg:p-8 font-poppins pb-24 sm:pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-[22px] font-[400] text-[#263238] leading-tight">
              Atlas Command Centre
            </h1>
            <p className="text-primaryOrange text-[15px] mt-0.5">
              Hermes Agent Skills — Live
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5 bg-white border border-border rounded-full px-3 py-1.5 text-[11px] font-semibold text-black">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
              4 skills active
            </div>
            <div className="bg-white border border-border rounded-full px-3 py-1.5 text-[11px] text-muted-foreground">
              Trust score:{' '}
              <span className="font-bold text-primaryOrange">91/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard
          icon="📦"
          label="Active leads"
          value="12"
          sub="4 new today"
          trend="up"
        />
        <StatCard
          icon="🛣️"
          label="Lanes covered"
          value="8"
          sub="3 air · 3 sea · 2 road"
        />
        <StatCard
          icon="💬"
          label="Response rate"
          value="94%"
          sub="avg 8 min"
          trend="up"
        />
        <StatCard
          icon="⭐"
          label="Trust score"
          value="91"
          sub="FIATA · IATA verified"
          trend="up"
        />
      </div>

      {/* Agent pipeline bar */}
      <div className="mb-5">
        <AgentPipelineBar />
      </div>

      {/* Main grid: skills (left) + side panels (right) */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">
        {/* Skills 2×2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RouteMapSkill />
          <HermesGatewaySkill />
          <LaneAlertsSkill />
          <AtlasIntelligenceSkill />
        </div>

        {/* Right column: activity + feedback */}
        <div className="flex flex-col gap-5">
          <ActivityFeed />
          <FeedbackPanel />
        </div>
      </div>
    </div>
  );
}
