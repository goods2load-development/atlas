'use client';

import type { ChatMessage } from './types';
import { detectRoute, generateAds, getDefaultAds } from '@/lib/routeAdEngine';
import type { SponsoredAd } from '@/lib/routeAdEngine';

import { useMemo } from 'react';

import { ExternalLink } from 'lucide-react';

interface SponsoredPanelProps {
  messages: ChatMessage[];
}

export default function SponsoredPanel({ messages }: SponsoredPanelProps) {
  const { ads, routeLabel } = useMemo(() => {
    const userMessages = messages.filter((m) => m.role === 'user');
    if (!userMessages.length) {
      return { ads: getDefaultAds(), routeLabel: null };
    }

    // Combine last 3 user messages for context continuity
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
    <aside className="hidden lg:flex w-56 shrink-0 flex-col pt-8 pb-2 gap-3">
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
        <p className="text-[10px] text-muted-foreground -mt-1 truncate">
          Matched to{' '}
          <span className="font-semibold text-foreground">{routeLabel}</span>
        </p>
      )}

      {/* Ad cards — key on routeLabel so they re-mount smoothly when route changes */}
      <div key={routeLabel ?? 'default'} className="flex flex-col gap-2.5">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>

      <p className="mt-auto pt-3 text-center text-[9px] text-muted-foreground/30">
        Goods2Load partner services
      </p>
    </aside>
  );
}

// ── Single sponsored card ─────────────────────────────────────────────────────

function AdCard({ ad }: { ad: SponsoredAd }) {
  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:border-primaryOrange/40 hover:shadow-sm"
    >
      {/* Company row */}
      <div className="mb-2 flex items-start gap-2">
        <div
          className={`${ad.avatarColor} flex h-7 w-7 shrink-0 items-center justify-center rounded-lg`}
        >
          <span className="text-[11px] font-bold text-white">{ad.initial}</span>
        </div>
        <p className="line-clamp-2 flex-1 text-[11px] font-semibold leading-tight text-foreground transition-colors group-hover:text-primaryOrange">
          {ad.headline}
        </p>
      </div>

      {/* Description */}
      <p className="mb-2.5 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground">
        {ad.description}
      </p>

      {/* CTA */}
      <div className="flex items-center gap-1 text-[9px] font-semibold text-primaryOrange">
        {ad.cta}
        <ExternalLink size={8} className="shrink-0" />
      </div>
    </a>
  );
}
