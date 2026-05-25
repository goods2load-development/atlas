'use client';

import type { ChatMessage, MatchedProvider } from './types';
import { cn } from '@/lib/utils';

// A single chat turn. User turns are brand-orange and right-aligned;
// assistant turns use the soft grey fill (#F5F5F5 -> bg-gray-2) and left-align,
// matching the borderless input style used across the site.

export default function ChatMessageBubble({
  message,
}: {
  message: ChatMessage;
}) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-md px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap',
          isUser
            ? 'bg-primaryOrange text-customWhite rounded-br-sm'
            : 'bg-gray-2 text-black rounded-bl-sm',
        )}
      >
        {message.content}

        {/* Atlas recommendation summary */}
        {message.data?.recommendation && (
          <p className="mt-3 rounded-md border-l-4 border-primaryOrange bg-lightOrange px-3 py-2 text-xs text-black leading-relaxed">
            {message.data.recommendation}
          </p>
        )}

        {/* Provider match cards */}
        {message.data?.matches && message.data.matches.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.data.matches.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tier badge helpers ────────────────────────────────────────────────────────

const VERIFICATION_COLORS: Record<string, string> = {
  VERIFIED: 'bg-green-100 text-green-700',
  PARTIAL: 'bg-yellow-100 text-yellow-700',
  SELF_DECLARED: 'bg-gray-100 text-gray-500',
};

const CONFIDENCE_COLORS: Record<string, string> = {
  HIGH: 'bg-green-100 text-green-700',
  MEDIUM: 'bg-orange-100 text-orange-600',
  LOW: 'bg-red-100 text-red-500',
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-[10px] font-medium',
        className,
      )}
    >
      {label}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="text-[11px] text-yellow-500">
      {'★'.repeat(full)}
      {'☆'.repeat(5 - full)}
      <span className="ml-1 text-muted-foreground text-[10px]">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

// ─── ProviderCard ─────────────────────────────────────────────────────────────

function ProviderCard({ provider }: { provider: MatchedProvider }) {
  const modesArr = provider.modes
    ? provider.modes.split(/[,\s]+/).filter(Boolean)
    : [];

  return (
    <div className="rounded-md border border-border bg-customWhite p-3 text-black">
      {/* Row 1 — name + rank badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[13px]">
            {provider.company_name}
          </span>
          {typeof provider.rank === 'number' && (
            <span className="rounded-full bg-primaryOrange/10 px-2 py-0.5 text-[10px] font-semibold text-primaryOrange">
              #{provider.rank}
            </span>
          )}
        </div>
        {typeof provider.score === 'number' && (
          <span className="shrink-0 rounded-full bg-lightOrange px-2 py-0.5 text-xs text-primaryOrange font-medium">
            {provider.score}/100
          </span>
        )}
      </div>

      {/* Row 2 — location */}
      {(provider.city || provider.country) && (
        <p className="mt-0.5 text-xs text-muted-foreground">
          📍 {[provider.city, provider.country].filter(Boolean).join(', ')}
        </p>
      )}

      {/* Row 3 — tier badges + Google rating */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {provider.verification_tier && (
          <Badge
            label={provider.verification_tier.replace('_', ' ')}
            className={
              VERIFICATION_COLORS[provider.verification_tier] ??
              'bg-gray-100 text-gray-500'
            }
          />
        )}
        {provider.confidence_tier && (
          <Badge
            label={`${provider.confidence_tier} confidence`}
            className={
              CONFIDENCE_COLORS[provider.confidence_tier] ??
              'bg-gray-100 text-gray-500'
            }
          />
        )}
        {typeof provider.google_rating === 'number' &&
          provider.google_rating > 0 && (
            <StarRating rating={provider.google_rating} />
          )}
        {typeof provider.google_review_count === 'number' &&
          provider.google_review_count > 0 && (
            <span className="text-[10px] text-muted-foreground">
              ({provider.google_review_count} reviews)
            </span>
          )}
      </div>

      {/* Row 4 — mode pills */}
      {modesArr.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {modesArr.map((m) => (
            <span
              key={m}
              className="rounded-sm bg-gray-2 px-2 py-0.5 text-[11px] text-black"
            >
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Row 5 — enrichment summary / match rationale */}
      {provider.enrichment_summary && (
        <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">
          {provider.enrichment_summary}
        </p>
      )}
      {!provider.enrichment_summary && provider.match_rationale && (
        <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed italic">
          {provider.match_rationale}
        </p>
      )}

      {/* Row 6 — strengths */}
      {provider.strengths && provider.strengths.length > 0 && (
        <div className="mt-2">
          <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wide mb-1">
            Strengths
          </p>
          <ul className="space-y-0.5">
            {provider.strengths.map((s, i) => (
              <li key={i} className="text-[11px] text-black flex gap-1">
                <span className="text-green-500 shrink-0">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Row 7 — watch outs */}
      {provider.watch_outs && provider.watch_outs.length > 0 && (
        <div className="mt-2">
          <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wide mb-1">
            Watch out
          </p>
          <ul className="space-y-0.5">
            {provider.watch_outs.map((w, i) => (
              <li key={i} className="text-[11px] text-black flex gap-1">
                <span className="text-orange-400 shrink-0">⚠</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
