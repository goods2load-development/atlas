'use client';

import type {
  CollectedFields,
  GeoFocusEntry,
  OnboardingCard,
  ServiceMix,
} from './types';

import { useRef, useState } from 'react';

// ── Shared helpers ────────────────────────────────────────────────────────────

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-xl border border-border bg-white overflow-hidden shadow-sm">
      {children}
    </div>
  );
}

// ── File Upload Card ──────────────────────────────────────────────────────────

export function FileUploadCard({
  card,
  onUploaded,
}: {
  card: Extract<OnboardingCard, { type: 'file_upload' }>;
  onUploaded: (field: string, file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploaded(file.name);
    onUploaded(card.field, file);
  }

  return (
    <CardShell>
      <div className="px-4 py-3 space-y-2">
        <p className="text-xs font-semibold text-black">{card.label}</p>
        {card.hint && (
          <p className="text-[11px] text-muted-foreground">{card.hint}</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={card.accept}
          className="hidden"
          onChange={handleFile}
        />
        {uploaded ? (
          <div className="flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-2">
            <span className="text-green-600 text-sm">✓</span>
            <span className="text-xs text-green-700 font-medium truncate">
              {uploaded}
            </span>
            <button
              onClick={() => {
                setUploaded(null);
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="ml-auto text-[10px] text-muted-foreground hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 w-full rounded-lg border-2 border-dashed border-primaryOrange/30 bg-lightOrange/30 px-4 py-3 text-xs text-primaryOrange hover:bg-lightOrange transition-colors"
          >
            <UploadIcon />
            Click to upload {card.accept.includes('pdf') ? 'PDF' : 'image'}
          </button>
        )}
      </div>
    </CardShell>
  );
}

// ── Multi-select Card ─────────────────────────────────────────────────────────

export function MultiSelectCard({
  card,
  onConfirm,
}: {
  card: Extract<OnboardingCard, { type: 'multi_select' }>;
  onConfirm: (field: string, selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  function toggle(code: string) {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  function confirm() {
    setConfirmed(true);
    onConfirm(card.field, selected);
  }

  return (
    <CardShell>
      <div className="px-4 py-3 space-y-3">
        <p className="text-xs font-semibold text-black">{card.label}</p>
        {confirmed ? (
          <p className="text-xs text-green-700 font-medium">
            ✓ {selected.length > 0 ? selected.join(', ') : 'None selected'}
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
              {card.options.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => toggle(opt.code)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium border transition-colors ${
                    selected.includes(opt.code)
                      ? 'bg-primaryOrange text-white border-primaryOrange'
                      : 'bg-white text-black border-border hover:border-primaryOrange/50'
                  }`}
                  title={opt.name}
                >
                  {opt.code}
                </button>
              ))}
            </div>
            <button
              onClick={confirm}
              className="w-full rounded-lg bg-primaryOrange text-white text-xs font-semibold py-2 hover:opacity-90 transition-opacity"
            >
              Confirm selection
            </button>
          </>
        )}
      </div>
    </CardShell>
  );
}

// ── Service Mix Card ──────────────────────────────────────────────────────────

export function ServiceMixCard({
  onConfirm,
}: {
  onConfirm: (mix: ServiceMix) => void;
}) {
  const [mix, setMix] = useState<ServiceMix>({
    air: 0,
    sea: 0,
    road: 0,
    other: 0,
  });
  const [confirmed, setConfirmed] = useState(false);
  const total = mix.air + mix.sea + mix.road + mix.other;
  const valid = total === 100;

  function update(key: keyof ServiceMix, val: string) {
    const n = Math.min(100, Math.max(0, parseInt(val) || 0));
    setMix((prev) => ({ ...prev, [key]: n }));
  }

  function confirm() {
    if (!valid) return;
    setConfirmed(true);
    onConfirm(mix);
  }

  if (confirmed) {
    return (
      <CardShell>
        <div className="px-4 py-3">
          <p className="text-xs text-green-700 font-medium">
            ✓ Air {mix.air}% · Sea {mix.sea}% · Road {mix.road}%
            {mix.other > 0 ? ` · Other ${mix.other}%` : ''}
          </p>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell>
      <div className="px-4 py-3 space-y-3">
        <p className="text-xs font-semibold text-black">
          Service split — must total 100%
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(['air', 'sea', 'road', 'other'] as const).map((mode) => (
            <div key={mode}>
              <label className="text-[11px] text-muted-foreground capitalize">
                {mode} freight
              </label>
              <div className="flex items-center gap-1.5 mt-0.5">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={mix[mode]}
                  onChange={(e) => update(mode, e.target.value)}
                  className="flex-1 accent-primaryOrange"
                />
                <span className="text-xs font-semibold w-8 text-right">
                  {mix[mode]}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`text-center text-xs font-semibold ${valid ? 'text-green-600' : 'text-red-500'}`}
        >
          Total: {total}%{' '}
          {valid
            ? '✓'
            : `— need ${100 - total > 0 ? `${100 - total}% more` : `${total - 100}% less`}`}
        </div>
        <button
          onClick={confirm}
          disabled={!valid}
          className="w-full rounded-lg bg-primaryOrange text-white text-xs font-semibold py-2 hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Confirm
        </button>
      </div>
    </CardShell>
  );
}

// ── Geo Focus Card ────────────────────────────────────────────────────────────

export function GeoFocusCard({
  onConfirm,
}: {
  onConfirm: (entries: GeoFocusEntry[]) => void;
}) {
  const [entries, setEntries] = useState<GeoFocusEntry[]>([
    { country: '', pct: 0 },
  ]);
  const [confirmed, setConfirmed] = useState(false);
  const total = entries.reduce((s, e) => s + e.pct, 0);
  const valid = total === 100 && entries.every((e) => e.country.trim());

  function updateEntry(i: number, key: keyof GeoFocusEntry, val: string) {
    setEntries((prev) => {
      const next = [...prev];
      next[i] = {
        ...next[i],
        [key]:
          key === 'pct' ? Math.min(100, Math.max(0, parseInt(val) || 0)) : val,
      };
      return next;
    });
  }

  function addRow() {
    if (entries.length >= 10) return;
    setEntries((prev) => [...prev, { country: '', pct: 0 }]);
  }

  function removeRow(i: number) {
    setEntries((prev) => prev.filter((_, idx) => idx !== i));
  }

  function confirm() {
    if (!valid) return;
    setConfirmed(true);
    onConfirm(entries.filter((e) => e.country.trim() && e.pct > 0));
  }

  if (confirmed) {
    return (
      <CardShell>
        <div className="px-4 py-3">
          <p className="text-xs text-green-700 font-medium">
            ✓ {entries.map((e) => `${e.country} ${e.pct}%`).join(' · ')}
          </p>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell>
      <div className="px-4 py-3 space-y-3">
        <p className="text-xs font-semibold text-black">
          Top markets — must total 100%
        </p>
        <div className="space-y-2">
          {entries.map((entry, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={entry.country}
                onChange={(e) => updateEntry(i, 'country', e.target.value)}
                placeholder="Country"
                className="flex-1 rounded-md border border-border bg-gray-50 px-2 py-1.5 text-xs outline-none focus:border-primaryOrange"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={entry.pct || ''}
                onChange={(e) => updateEntry(i, 'pct', e.target.value)}
                placeholder="%"
                className="w-14 rounded-md border border-border bg-gray-50 px-2 py-1.5 text-xs outline-none focus:border-primaryOrange text-center"
              />
              {entries.length > 1 && (
                <button
                  onClick={() => removeRow(i)}
                  className="text-muted-foreground hover:text-red-500 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          {entries.length < 10 && (
            <button
              onClick={addRow}
              className="text-xs text-primaryOrange hover:underline"
            >
              + Add country
            </button>
          )}
          <span
            className={`text-xs font-semibold ml-auto ${valid ? 'text-green-600' : total > 0 ? 'text-red-500' : 'text-muted-foreground'}`}
          >
            Total: {total}%
          </span>
        </div>
        <button
          onClick={confirm}
          disabled={!valid}
          className="w-full rounded-lg bg-primaryOrange text-white text-xs font-semibold py-2 hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Confirm
        </button>
      </div>
    </CardShell>
  );
}

// ── Summary Card ──────────────────────────────────────────────────────────────

export function SummaryCard({ fields }: { fields: CollectedFields }) {
  const rows: [string, string][] = [
    ['Company', fields.companyName ?? '—'],
    ['Email', fields.email ?? '—'],
    ['Phone', `${fields.countryCode ?? ''}${fields.phoneNumber ?? ''}`],
    [
      'Location',
      [fields.city, fields.country].filter(Boolean).join(', ') || '—',
    ],
    ['Google Profile', fields.googleBusinessProfile ? '✓ Provided' : '—'],
    ['Certifications', fields.industryRecognitions?.join(', ') || 'None'],
    ['Sectors', fields.industries?.join(', ') || '—'],
    [
      'Air freight',
      fields.providesAirFreight
        ? `✓ (${fields.airports?.length ?? 0} airports)`
        : '—',
    ],
    [
      'Sea freight',
      fields.providesSeaFreight
        ? `✓ (${fields.seaports?.length ?? 0} ports)`
        : '—',
    ],
    ['Road freight', fields.providesRoadFreight ? '✓' : '—'],
    [
      'Service mix',
      fields.serviceMix
        ? `Air ${fields.serviceMix.air}% · Sea ${fields.serviceMix.sea}% · Road ${fields.serviceMix.road}%`
        : '—',
    ],
    [
      'Top markets',
      fields.geoFocus?.map((g) => `${g.country} ${g.pct}%`).join(', ') || '—',
    ],
  ];

  return (
    <CardShell>
      <div className="bg-primaryOrange/10 px-4 py-2.5 border-b border-border">
        <p className="text-xs font-bold text-primaryOrange uppercase tracking-wide">
          Your Profile Summary
        </p>
      </div>
      <div className="px-4 py-3 divide-y divide-border">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-4 py-1.5"
          >
            <span className="text-[11px] text-muted-foreground shrink-0">
              {label}
            </span>
            <span className="text-[11px] text-black font-medium text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function UploadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
