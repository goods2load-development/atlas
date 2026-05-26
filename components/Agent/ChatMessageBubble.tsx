'use client';

import type {
  BookingConfirmation,
  ChatMessage,
  MatchedProvider,
} from './types';
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

        {/* Booking confirmation card */}
        {message.data?.booking && (
          <BookingCard booking={message.data.booking} />
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

// ─── BookingCard ──────────────────────────────────────────────────────────────

function BookingCard({ booking }: { booking: BookingConfirmation }) {
  const { provider, reference, whatsapp_url } = booking;

  return (
    <div className="mt-3 rounded-xl border-2 border-green-200 bg-green-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 bg-green-100 px-4 py-2.5">
        <span className="text-green-600 text-base">✅</span>
        <span className="text-sm font-semibold text-green-800">
          Rate Request Submitted
        </span>
      </div>

      {/* Provider info */}
      <div className="px-4 py-3 space-y-2">
        <div>
          <p className="text-[13px] font-bold text-black">
            {provider.company_name}
          </p>
          {(provider.city || provider.country) && (
            <p className="text-xs text-muted-foreground mt-0.5">
              📍 {[provider.city, provider.country].filter(Boolean).join(', ')}
            </p>
          )}
        </div>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-1.5">
          {provider.verification_tier === 'VERIFIED' && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
              ✓ VERIFIED
            </span>
          )}
          {provider.modes && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
              {provider.modes}
            </span>
          )}
          {typeof provider.google_rating === 'number' &&
            provider.google_rating > 0 && (
              <span className="text-[11px] text-yellow-500">
                {'★'.repeat(Math.round(provider.google_rating))}
                <span className="ml-1 text-muted-foreground text-[10px]">
                  {provider.google_rating.toFixed(1)}
                </span>
              </span>
            )}
        </div>

        {/* Reference + timeline */}
        <div className="rounded-lg bg-white border border-green-100 px-3 py-2 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-mono font-semibold text-black">
              {reference}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Expected response</span>
            <span className="text-black font-medium">Within 24 hours</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={whatsapp_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] transition-colors px-4 py-2 text-white text-xs font-semibold"
        >
          <WhatsAppIcon />
          Follow up on WhatsApp
        </a>

        <p className="text-center text-[10px] text-muted-foreground">
          Goods2Load will connect you with {provider.company_name} using your
          reference.
        </p>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
