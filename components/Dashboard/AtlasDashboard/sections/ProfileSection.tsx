'use client';

import { BOXMAN } from '../boxmanData';
import AtlasLaneMap from './AtlasLaneMap';

import { AlertCircle, CheckCircle, Clock, Truck } from 'lucide-react';

const TRUST_SIGNALS = [
  { label: 'ISO 9001:2015 Quality Management', status: 'verified' },
  { label: 'FIATA Member', status: 'verified' },
  { label: 'NAFL Member', status: 'verified' },
  { label: 'Trade License', status: 'verified' },
  { label: 'VAT / Issuing Authority', status: 'verified' },
  { label: 'Insurance Statement', status: 'missing' },
  { label: 'Google Business Profile', status: 'pending' },
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
            strokeWidth="7"
          />
          <circle
            cx="56"
            cy="56"
            r={r}
            fill="none"
            stroke="#FF6720"
            strokeWidth="7"
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
      <span className="text-[10px] font-bold text-primaryOrange mt-1 tracking-widest uppercase">
        Verified
      </span>
    </div>
  );
}

export default function ProfileSection() {
  const verifiedCount = TRUST_SIGNALS.filter(
    (s) => s.status === 'verified',
  ).length;

  return (
    <div className="flex flex-col h-full overflow-y-auto hide-scrollbar">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-lg font-bold text-black">Profile & Trust</h2>
        <p className="text-[12px] text-muted-foreground">
          How your company appears to shippers — and how Atlas scores you
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile hero */}
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="flex items-start gap-6 flex-wrap">
            <div className="w-16 h-16 rounded-xl bg-primaryOrange flex items-center justify-center shrink-0">
              <Truck size={28} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-black text-black">
                  Freight Forwarding Co.
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                  Approved
                </span>
              </div>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Dubai, United Arab Emirates · Business Bay
              </p>
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
                  5.0 · 21 reviews
                </span>
              </div>
            </div>
            <TrustScore score={BOXMAN.trustScore} />
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed mt-4 border-t border-border pt-4">
            Dubai-based freight forwarder specialising in air, sea, and road
            logistics across the Middle East, Asia, and Europe. ISO 9001:2015
            certified with a strong track record in pharma, cold chain, and
            dangerous goods handling.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[11px] text-amber-600 font-medium">
              ★ 4.8
            </span>
            <span className="text-[11px] text-muted-foreground">
              Google reviews · Dubai, UAE
            </span>
          </div>
        </div>

        {/* Trust signals */}
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider">
              Verification signals
            </h3>
            <span className="text-[11px] font-semibold text-primaryOrange">
              {verifiedCount}/{TRUST_SIGNALS.length} complete
            </span>
          </div>
          <div className="space-y-2.5">
            {TRUST_SIGNALS.map((sig, i) => (
              <div key={i} className="flex items-center gap-3">
                {sig.status === 'verified' && (
                  <CheckCircle
                    size={16}
                    strokeWidth={2}
                    className="text-green-500 shrink-0"
                  />
                )}
                {sig.status === 'missing' && (
                  <AlertCircle
                    size={16}
                    strokeWidth={2}
                    className="text-red-500 shrink-0"
                  />
                )}
                {sig.status === 'pending' && (
                  <Clock
                    size={16}
                    strokeWidth={2}
                    className="text-amber-500 shrink-0"
                  />
                )}
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
              Upload insurance statement to increase trust score from 84 →{' '}
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
              color: 'bg-blue-50 text-blue-700 border border-blue-100',
            },
            {
              title: 'Industries',
              items: BOXMAN.industrySolutions,
              color:
                'bg-primaryOrange/8 text-primaryOrange border border-primaryOrange/15',
            },
            {
              title: 'Services',
              items: BOXMAN.additionalServices,
              color: 'bg-green-50 text-green-700 border border-green-100',
            },
          ].map(({ title, items, color }) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-border p-4"
            >
              <h4 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-3">
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
          <h3 className="text-[11px] font-semibold text-black uppercase tracking-wider mb-3">
            Notable clients
          </h3>
          <div className="flex items-center gap-3 flex-wrap">
            {['Global Pharma Group', 'AeroTrade LLC', 'MedSupply MENA'].map(
              (client) => (
                <div
                  key={client}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-border"
                >
                  <span className="text-[13px] font-bold text-black">
                    {client}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Lane map */}
        <div className="bg-[#0d111c] rounded-xl border border-[#1a2235] overflow-hidden">
          <div className="px-5 pt-4 pb-1 flex items-center justify-between">
            <div>
              <h3 className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                Active freight lanes
              </h3>
              <p className="text-[11px] text-white/40 mt-0.5">
                DXB · JEA · FRA · SHA · BOM · RUH
              </p>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              Live
            </span>
          </div>
          <AtlasLaneMap />
        </div>
      </div>
    </div>
  );
}
