'use client';

import { BOXMAN } from '../boxmanData';

import Map from '@/components/Dashboard/Map/Map';

const TRUST_SIGNALS = [
  { label: 'ISO 9001:2015 Quality Management', status: 'verified', icon: '✓' },
  { label: 'FIATA Member', status: 'verified', icon: '✓' },
  { label: 'NAFL Member', status: 'verified', icon: '✓' },
  { label: 'Trade License', status: 'verified', icon: '✓' },
  { label: 'VAT / Issuing Authority', status: 'verified', icon: '✓' },
  { label: 'Insurance Statement', status: 'missing', icon: '!' },
  { label: 'Google Business Profile', status: 'pending', icon: '⏳' },
];

const LANE_MARKERS = [
  {
    from: {
      name: 'Dubai (DXB)',
      coordinates: [55.2708, 25.2048] as [number, number],
    },
    to: {
      name: 'Frankfurt',
      coordinates: [8.6821, 50.1109] as [number, number],
    },
  },
  {
    from: {
      name: 'Jebel Ali',
      coordinates: [55.0272, 24.9857] as [number, number],
    },
    to: {
      name: 'Shanghai',
      coordinates: [121.4737, 31.2304] as [number, number],
    },
  },
  {
    from: {
      name: 'Dubai (DXB)',
      coordinates: [55.2708, 25.2048] as [number, number],
    },
    to: { name: 'Mumbai', coordinates: [72.8777, 19.076] as [number, number] },
  },
  {
    from: {
      name: 'Dubai',
      coordinates: [55.2708, 25.2048] as [number, number],
    },
    to: { name: 'Riyadh', coordinates: [46.7219, 24.6877] as [number, number] },
  },
];

function TrustScore({ score }: { score: number }) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg width="112" height="112" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="56"
            cy="56"
            r={r}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth="8"
          />
          <circle
            cx="56"
            cy="56"
            r={r}
            fill="none"
            stroke="#FF6720"
            strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-black">{score}</span>
          <span className="text-[10px] text-muted-foreground font-medium">
            / 100
          </span>
        </div>
      </div>
      <span className="text-[11px] font-bold text-primaryOrange mt-1">
        VERIFIED
      </span>
    </div>
  );
}

export default function ProfileSection() {
  const verifiedCount = TRUST_SIGNALS.filter(
    (s) => s.status === 'verified',
  ).length;
  const maxScore = TRUST_SIGNALS.length;

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-lg font-bold text-black">Profile & Trust</h2>
        <p className="text-[12px] text-muted-foreground">
          How Boxman appears to shippers — and how Atlas scores you
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile hero */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-start gap-6 flex-wrap">
            {/* Logo placeholder */}
            <div className="w-16 h-16 rounded-xl bg-[#1a1a2e] flex items-center justify-center text-white text-2xl font-black shrink-0">
              BG
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-black text-black">
                  {BOXMAN.companyName}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  ✓ APPROVED
                </span>
              </div>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {BOXMAN.city}, {BOXMAN.country} · {BOXMAN.address}
              </p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-[11px] text-muted-foreground">
                  ✉️ {BOXMAN.email}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  📞 {BOXMAN.phone}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {BOXMAN.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {cert}
                  </span>
                ))}
                <span className="text-[11px] text-amber-600 font-medium">
                  ⭐ 5.0 (21 reviews)*
                </span>
              </div>
            </div>
            <TrustScore score={BOXMAN.trustScore} />
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed mt-4 border-t border-border pt-4">
            {BOXMAN.description}
          </p>
          <p className="text-[10px] text-muted-foreground mt-2">
            * Google rating from website — pending sync to G2L (Sufian: run
            Google Places fetch for provider ID {BOXMAN.id.slice(0, 8)}…)
          </p>
        </div>

        {/* Trust signals */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[12px] font-bold text-black uppercase tracking-wide">
              Verification signals
            </h3>
            <span className="text-[11px] font-semibold text-primaryOrange">
              {verifiedCount}/{maxScore} complete
            </span>
          </div>
          <div className="space-y-2.5">
            {TRUST_SIGNALS.map((sig, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    sig.status === 'verified'
                      ? 'bg-green-100 text-green-700'
                      : sig.status === 'missing'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  {sig.icon}
                </div>
                <span
                  className={`text-[12px] flex-1 ${sig.status === 'verified' ? 'text-black' : 'text-muted-foreground'}`}
                >
                  {sig.label}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    sig.status === 'verified'
                      ? 'text-green-600'
                      : sig.status === 'missing'
                        ? 'text-red-500'
                        : 'text-amber-600'
                  }`}
                >
                  {sig.status === 'verified'
                    ? 'Verified'
                    : sig.status === 'missing'
                      ? 'Missing'
                      : 'Pending'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-[11px] text-muted-foreground">
              💡 Upload insurance statement to increase trust score from 84 →{' '}
              <span className="font-bold text-primaryOrange">89/100</span> and
              improve G2L ranking by ~2 positions
            </p>
          </div>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Transport',
              items: BOXMAN.transportSolutions,
              color: 'bg-blue-50 text-blue-700',
            },
            {
              title: 'Industries',
              items: BOXMAN.industrySolutions,
              color: 'bg-primaryOrange/10 text-primaryOrange',
            },
            {
              title: 'Services',
              items: BOXMAN.additionalServices,
              color: 'bg-green-50 text-green-700',
            },
          ].map(({ title, items, color }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-border p-4"
            >
              <h4 className="text-[11px] font-bold text-black uppercase tracking-wide mb-3">
                {title}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Notable clients */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-[12px] font-bold text-black uppercase tracking-wide mb-3">
            Notable clients
          </h3>
          <div className="flex items-center gap-4">
            {BOXMAN.notableClients.map((client) => (
              <div
                key={client}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-border"
              >
                <span className="text-[13px] font-bold text-black">
                  {client}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lane map */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-[12px] font-bold text-black uppercase tracking-wide mb-1">
            Active freight lanes
          </h3>
          <p className="text-[11px] text-muted-foreground mb-3">
            FRA · SHA · BOM · RUH — declared hubs with active shipments
          </p>
          {/* @ts-ignore */}
          <Map data={LANE_MARKERS} height={280} width={700} />
        </div>
      </div>
    </div>
  );
}
