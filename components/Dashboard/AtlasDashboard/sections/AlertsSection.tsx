'use client';

import { MARKET_RATES } from '../boxmanData';
import { usePriceAlertsStore } from '@/lib/store';

import { useEffect, useState } from 'react';

import {
  Minus,
  Plane,
  Ship,
  TrendingDown,
  TrendingUp,
  Truck,
} from 'lucide-react';

interface LaneSubscription {
  id: string;
  origin: string;
  destination: string;
  mode: 'air' | 'sea' | 'road';
  active: boolean;
  lastFired?: string;
  leadsGenerated: number;
}

const DEMO_SUBSCRIPTIONS: LaneSubscription[] = [
  {
    id: 's1',
    origin: 'Frankfurt (FRA)',
    destination: 'Dubai (DXB)',
    mode: 'air',
    active: true,
    lastFired: 'Today 09:14',
    leadsGenerated: 3,
  },
  {
    id: 's2',
    origin: 'Shenzhen / Shanghai',
    destination: 'Jebel Ali',
    mode: 'sea',
    active: true,
    lastFired: 'Yesterday',
    leadsGenerated: 2,
  },
  {
    id: 's3',
    origin: 'Mumbai (BOM)',
    destination: 'Dubai (DXB)',
    mode: 'air',
    active: true,
    lastFired: '2 days ago',
    leadsGenerated: 1,
  },
  {
    id: 's4',
    origin: 'Dubai',
    destination: 'GCC (all)',
    mode: 'road',
    active: false,
    lastFired: '5 days ago',
    leadsGenerated: 4,
  },
];

const MODE_ICON = { air: Plane, sea: Ship, road: Truck };
const MODE_LABEL = { air: 'Air', sea: 'Sea', road: 'Road' };
const MODE_COLOR = {
  air: 'bg-blue-50 text-blue-700 border-blue-200',
  sea: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  road: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function AlertsSection() {
  const { priceAlerts, isPriceAlertLoading, getPriceAlerts } =
    usePriceAlertsStore();
  const [subscriptions, setSubscriptions] =
    useState<LaneSubscription[]>(DEMO_SUBSCRIPTIONS);
  const [showForm, setShowForm] = useState(false);
  const [origin, setOrigin] = useState('');
  const [dest, setDest] = useState('');
  const [mode, setMode] = useState<'air' | 'sea' | 'road'>('air');

  useEffect(() => {
    getPriceAlerts({ page: 1, take: 10 });
  }, []);

  function toggle(id: string) {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  }

  function addSubscription() {
    if (!origin.trim() || !dest.trim()) return;
    setSubscriptions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        origin: origin.trim(),
        destination: dest.trim(),
        mode,
        active: true,
        leadsGenerated: 0,
      },
    ]);
    setOrigin('');
    setDest('');
    setShowForm(false);
  }

  const activeCount = subscriptions.filter((s) => s.active).length;

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-black">Lane Alerts</h2>
            <p className="text-[12px] text-muted-foreground">
              Hermes monitors these lanes 24/7 — pings you on WhatsApp the
              moment a new shipper appears
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[11px] font-semibold text-green-700">
              {activeCount} active
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider">
              Your lane subscriptions
            </h3>
            <button
              onClick={() => setShowForm(true)}
              className="text-[11px] font-semibold text-primaryOrange border border-primaryOrange/40 rounded-lg px-3 py-1 hover:bg-primaryOrange/5 transition-colors"
            >
              + Add lane
            </button>
          </div>

          <div className="space-y-2.5">
            {subscriptions.map((sub) => {
              const Icon = MODE_ICON[sub.mode];
              return (
                <div
                  key={sub.id}
                  className={`rounded-xl border p-4 transition-colors ${sub.active ? 'border-primaryOrange/25 bg-white' : 'border-border bg-gray-50/50'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${MODE_COLOR[sub.mode]}`}
                      >
                        <Icon size={10} strokeWidth={2} />
                        {MODE_LABEL[sub.mode]}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-semibold text-black truncate">
                          {sub.origin} → {sub.destination}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-2">
                          {sub.lastFired && (
                            <span>Last fired: {sub.lastFired}</span>
                          )}
                          <span className="text-primaryOrange font-medium">
                            {sub.leadsGenerated} lead
                            {sub.leadsGenerated !== 1 ? 's' : ''} generated
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggle(sub.id)}
                      className={`w-10 h-5 rounded-full transition-colors relative shrink-0 ${sub.active ? 'bg-primaryOrange' : 'bg-gray-200'}`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${sub.active ? 'translate-x-5' : 'translate-x-0.5'}`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {showForm && (
            <div className="mt-3 p-4 rounded-xl border border-border bg-gray-50 space-y-3">
              <div className="flex gap-2">
                <input
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Origin (e.g. Frankfurt FRA)"
                  className="flex-1 text-[12px] border border-border rounded-lg px-3 py-2 bg-white outline-none focus:border-primaryOrange"
                />
                <input
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder="Destination"
                  className="flex-1 text-[12px] border border-border rounded-lg px-3 py-2 bg-white outline-none focus:border-primaryOrange"
                />
              </div>
              <div className="flex gap-2">
                {(['air', 'sea', 'road'] as const).map((m) => {
                  const Icon = MODE_ICON[m];
                  return (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold rounded-lg py-1.5 border transition-colors ${mode === m ? 'bg-primaryOrange text-white border-primaryOrange' : 'bg-white text-muted-foreground border-border'}`}
                    >
                      <Icon size={12} strokeWidth={2} />
                      {MODE_LABEL[m]}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addSubscription}
                  className="flex-1 text-[12px] font-bold bg-primaryOrange text-white rounded-lg py-2 hover:opacity-90"
                >
                  Activate alert
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-[12px] text-muted-foreground border border-border rounded-lg px-4 py-2 hover:border-primaryOrange"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-3">
            Platform price alerts{' '}
            {isPriceAlertLoading && (
              <span className="text-[10px] font-normal text-muted-foreground ml-2">
                Loading…
              </span>
            )}
          </h3>
          {Array.isArray(priceAlerts) && priceAlerts.length > 0 ? (
            <div className="space-y-2">
              {priceAlerts.slice(0, 5).map((alert: any) => (
                <div
                  key={alert.id}
                  className="rounded-xl border border-border p-4 bg-white"
                >
                  <p className="text-[12px] font-semibold text-black">
                    {alert.message || 'Price alert'}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {alert.createdAt
                      ? new Date(alert.createdAt).toLocaleDateString()
                      : ''}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-6 text-center">
              <p className="text-[12px] text-muted-foreground">
                No platform price alerts yet
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Alerts appear here when shippers set price targets for your
                lanes
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-3">
            Live rate signals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MARKET_RATES.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-4 bg-white"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-black">
                    {r.lane}
                  </span>
                  <span
                    className={`flex items-center gap-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                      r.trend === 'up'
                        ? 'bg-red-50 text-red-600'
                        : r.trend === 'down'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {r.trend === 'up' ? (
                      <TrendingUp size={9} />
                    ) : r.trend === 'down' ? (
                      <TrendingDown size={9} />
                    ) : (
                      <Minus size={9} />
                    )}
                    {r.trend === 'up'
                      ? 'Rising'
                      : r.trend === 'down'
                        ? 'Falling'
                        : 'Stable'}
                  </span>
                </div>
                <p className="text-base font-bold text-black">{r.rate}</p>
                <p className="text-[10px] text-muted-foreground">{r.delta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
