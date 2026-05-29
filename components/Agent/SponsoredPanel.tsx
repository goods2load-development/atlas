'use client';

import type { ChatMessage } from './types';
import { detectRoute, generateAds, getDefaultAds } from '@/lib/routeAdEngine';
import type { AdCategory, SponsoredAd } from '@/lib/routeAdEngine';

import { useMemo } from 'react';

// All CTAs point to Google Ads — no third-party company links
const GOOGLE_ADS_URL = 'https://ads.google.com';

// Themed visual per service category — gradient banner + emoji icon
const VISUAL: Record<
  AdCategory | string,
  { from: string; to: string; icon: string }
> = {
  warehousing: { from: 'from-blue-600', to: 'to-blue-900', icon: '📦' },
  customs: { from: 'from-amber-500', to: 'to-orange-700', icon: '⚓' },
  insurance: { from: 'from-emerald-500', to: 'to-teal-700', icon: '🛡️' },
  finance: { from: 'from-violet-600', to: 'to-purple-900', icon: '💳' },
  'cold-chain': { from: 'from-sky-400', to: 'to-blue-700', icon: '❄️' },
  'dg-handling': { from: 'from-red-500', to: 'to-rose-800', icon: '⚠️' },
  compliance: { from: 'from-slate-500', to: 'to-slate-800', icon: '📋' },
};

interface SponsoredPanelProps {
  messages: ChatMessage[];
}

export default function SponsoredPanel({ messages }: SponsoredPanelProps) {
  const { ads, routeLabel } = useMemo(() => {
    const userMessages = messages.filter((m) => m.role === 'user');
    if (!userMessages.length) return { ads: getDefaultAds(), routeLabel: null };

    const recentText = userMessages
      .slice(-3)
      .map((m) => m.content)
      .join(' ');
    const route = detectRoute(recentText);

    if (route.destination) {
      const destLabel = route.destination.city ?? route.destination.country;
      const originLabel = route.origin
        ? `${route.origin.city ?? route.origin.country} → `
        : '';
      return {
        ads: generateAds(route),
        routeLabel: `${originLabel}${destLabel} ${route.destination.flag}`,
      };
    }
    return { ads: getDefaultAds(), routeLabel: null };
  }, [messages]);

  return (
    <aside
      className="fixed right-4 top-[130px] z-40 hidden w-52 xl:flex flex-col gap-3"
      style={{ maxHeight: 'calc(100vh - 160px)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {routeLabel ? 'Route services' : 'Global services'}
        </span>
        <span className="rounded border border-border px-1 py-0.5 text-[8px] font-medium text-muted-foreground/50">
          Sponsored
        </span>
      </div>

      {routeLabel && (
        <p className="-mt-1 truncate text-[10px] text-muted-foreground">
          Matched to{' '}
          <span className="font-semibold text-foreground">{routeLabel}</span>
        </p>
      )}

      {/* Ad cards — key triggers smooth remount when route changes */}
      <div key={routeLabel ?? 'default'} className="flex flex-col gap-2.5">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>

      {/* Google Ads attribution */}
      <div className="mt-auto flex items-center justify-center gap-1 pt-3">
        <span className="text-[8px] text-muted-foreground/30">Ads by</span>
        <span className="text-[8px] font-bold tracking-tight text-muted-foreground/40">
          Google
        </span>
      </div>
    </aside>
  );
}

// ── Single ad card ────────────────────────────────────────────────────────────

function AdCard({ ad }: { ad: SponsoredAd }) {
  const v = VISUAL[ad.category] ?? VISUAL.compliance;

  return (
    <a
      href={GOOGLE_ADS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primaryOrange/40 hover:shadow-md"
    >
      {/* ── Mock photo banner ── */}
      <div
        className={`relative flex h-[72px] items-center justify-center overflow-hidden bg-gradient-to-br ${v.from} ${v.to}`}
      >
        {/* Grid overlay for depth */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 9px,rgba(255,255,255,0.5) 9px,rgba(255,255,255,0.5) 10px),' +
              'repeating-linear-gradient(90deg,transparent,transparent 9px,rgba(255,255,255,0.5) 9px,rgba(255,255,255,0.5) 10px)',
          }}
        />
        {/* Category icon */}
        <span className="relative text-[2rem] drop-shadow-lg">{v.icon}</span>
        {/* Company chip */}
        <div className="absolute bottom-1.5 left-2 rounded bg-black/40 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="text-[8px] font-semibold text-white/90">
            {ad.company}
          </span>
        </div>
        {/* Ad badge */}
        <div className="absolute right-1.5 top-1.5 rounded bg-white/20 px-1 py-0.5 backdrop-blur-sm">
          <span className="text-[7px] font-bold uppercase tracking-wider text-white/80">
            Ad
          </span>
        </div>
      </div>

      {/* ── Text content ── */}
      <div className="p-2.5">
        <p className="mb-1 line-clamp-2 text-[11px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primaryOrange">
          {ad.headline}
        </p>
        <p className="mb-2 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
          {ad.description}
        </p>
        <span className="text-[9px] font-semibold text-primaryOrange">
          {ad.cta} →
        </span>
      </div>
    </a>
  );
}
