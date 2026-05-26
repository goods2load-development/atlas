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

// ── Cert Upload Card ──────────────────────────────────────────────────────────

export function CertUploadCard({
  certs,
  onConfirm,
  onSkip,
}: {
  certs: string[];
  onConfirm: (files: Record<string, string>) => void;
  onSkip: () => void;
}) {
  const [files, setFiles] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const uploadCount = Object.keys(files).length;

  function handleFile(cert: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [cert]: file.name }));
  }

  function confirm() {
    setConfirmed(true);
    onConfirm(files);
  }

  if (confirmed) {
    return (
      <CardShell>
        <div className="px-4 py-3">
          <p className="text-xs text-green-700 font-medium">
            ✓ {uploadCount} document{uploadCount !== 1 ? 's' : ''} uploaded
          </p>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell>
      <div className="px-4 py-3 space-y-3">
        <p className="text-xs font-semibold text-black">
          Upload certification proof documents
        </p>
        <p className="text-[11px] text-muted-foreground">
          Our legal team reviews these for due diligence. PDF only, max 5MB
          each.
        </p>
        <div className="space-y-2">
          {certs.map((cert) => (
            <div
              key={cert}
              className="flex items-center gap-2 rounded-lg border border-border p-2"
            >
              <span className="text-[11px] font-semibold text-black w-16 shrink-0">
                {cert}
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={(el) => {
                  inputRefs.current[cert] = el;
                }}
                onChange={(e) => handleFile(cert, e)}
              />
              {files[cert] ? (
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="text-green-600 text-xs">✓</span>
                  <span className="text-[11px] text-green-700 truncate">
                    {files[cert]}
                  </span>
                  <button
                    onClick={() => {
                      setFiles((prev) => {
                        const next = { ...prev };
                        delete next[cert];
                        return next;
                      });
                      if (inputRefs.current[cert])
                        inputRefs.current[cert]!.value = '';
                    }}
                    className="ml-auto text-[10px] text-muted-foreground hover:text-red-500 shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => inputRefs.current[cert]?.click()}
                  className="flex-1 rounded border border-dashed border-primaryOrange/30 bg-lightOrange/20 px-2 py-1 text-[11px] text-primaryOrange hover:bg-lightOrange/40 transition-colors text-left"
                >
                  + Upload PDF
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={confirm}
            disabled={uploadCount === 0}
            className="flex-1 rounded-lg bg-primaryOrange text-white text-xs font-semibold py-2 hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Submit {uploadCount > 0 ? `(${uploadCount}/${certs.length})` : ''}
          </button>
          <button
            onClick={onSkip}
            className="text-xs text-muted-foreground hover:text-black transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </CardShell>
  );
}

// ── Freight Lane Card ─────────────────────────────────────────────────────────

type Hub = { code: string; name: string };

const AIRPORTS_BY_REGION: { region: string; emoji: string; hubs: Hub[] }[] = [
  {
    region: 'Middle East',
    emoji: '🌍',
    hubs: [
      { code: 'DXB', name: 'Dubai' },
      { code: 'AUH', name: 'Abu Dhabi' },
      { code: 'DOH', name: 'Doha' },
      { code: 'RUH', name: 'Riyadh' },
      { code: 'JED', name: 'Jeddah' },
      { code: 'KWI', name: 'Kuwait' },
      { code: 'MCT', name: 'Muscat' },
      { code: 'BAH', name: 'Bahrain' },
      { code: 'AMM', name: 'Amman' },
      { code: 'BEY', name: 'Beirut' },
      { code: 'BGW', name: 'Baghdad' },
      { code: 'CAI', name: 'Cairo' },
    ],
  },
  {
    region: 'Asia',
    emoji: '🌏',
    hubs: [
      { code: 'HKG', name: 'Hong Kong' },
      { code: 'PVG', name: 'Shanghai' },
      { code: 'PEK', name: 'Beijing' },
      { code: 'ICN', name: 'Seoul' },
      { code: 'NRT', name: 'Tokyo' },
      { code: 'SIN', name: 'Singapore' },
      { code: 'BKK', name: 'Bangkok' },
      { code: 'KUL', name: 'Kuala Lumpur' },
      { code: 'DEL', name: 'Delhi' },
      { code: 'BOM', name: 'Mumbai' },
      { code: 'CGK', name: 'Jakarta' },
      { code: 'MNL', name: 'Manila' },
      { code: 'SGN', name: 'Ho Chi Minh City' },
      { code: 'CAN', name: 'Guangzhou' },
    ],
  },
  {
    region: 'Europe',
    emoji: '🌍',
    hubs: [
      { code: 'LHR', name: 'London' },
      { code: 'CDG', name: 'Paris' },
      { code: 'FRA', name: 'Frankfurt' },
      { code: 'AMS', name: 'Amsterdam' },
      { code: 'MXP', name: 'Milan' },
      { code: 'MAD', name: 'Madrid' },
      { code: 'IST', name: 'Istanbul' },
      { code: 'ZRH', name: 'Zurich' },
      { code: 'VIE', name: 'Vienna' },
      { code: 'ATH', name: 'Athens' },
      { code: 'BRU', name: 'Brussels' },
      { code: 'ARN', name: 'Stockholm' },
      { code: 'WAW', name: 'Warsaw' },
      { code: 'PRG', name: 'Prague' },
    ],
  },
  {
    region: 'Americas',
    emoji: '🌎',
    hubs: [
      { code: 'JFK', name: 'New York' },
      { code: 'LAX', name: 'Los Angeles' },
      { code: 'MIA', name: 'Miami' },
      { code: 'ORD', name: 'Chicago' },
      { code: 'IAH', name: 'Houston' },
      { code: 'YYZ', name: 'Toronto' },
      { code: 'GRU', name: 'São Paulo' },
      { code: 'BOG', name: 'Bogotá' },
      { code: 'MEX', name: 'Mexico City' },
      { code: 'EZE', name: 'Buenos Aires' },
      { code: 'LIM', name: 'Lima' },
      { code: 'SCL', name: 'Santiago' },
    ],
  },
  {
    region: 'Africa',
    emoji: '🌍',
    hubs: [
      { code: 'JNB', name: 'Johannesburg' },
      { code: 'NBO', name: 'Nairobi' },
      { code: 'CMN', name: 'Casablanca' },
      { code: 'CAI', name: 'Cairo' },
      { code: 'LOS', name: 'Lagos' },
      { code: 'ADD', name: 'Addis Ababa' },
      { code: 'ACC', name: 'Accra' },
      { code: 'DKR', name: 'Dakar' },
      { code: 'DAR', name: 'Dar es Salaam' },
      { code: 'MRU', name: 'Mauritius' },
    ],
  },
  {
    region: 'Oceania',
    emoji: '🌏',
    hubs: [
      { code: 'SYD', name: 'Sydney' },
      { code: 'MEL', name: 'Melbourne' },
      { code: 'BNE', name: 'Brisbane' },
      { code: 'PER', name: 'Perth' },
      { code: 'AKL', name: 'Auckland' },
    ],
  },
];

const SEAPORTS_BY_REGION: { region: string; emoji: string; hubs: Hub[] }[] = [
  {
    region: 'Middle East',
    emoji: '🌍',
    hubs: [
      { code: 'Jebel Ali', name: 'Jebel Ali (UAE)' },
      { code: 'Khalifa Port', name: 'Khalifa Port (UAE)' },
      { code: 'Hamad Port', name: 'Hamad Port (Qatar)' },
      { code: 'Salalah', name: 'Salalah (Oman)' },
      { code: 'Shuwaikh', name: 'Shuwaikh (Kuwait)' },
      { code: 'Khalifa Bin Salman', name: 'Khalifa Bin Salman (Bahrain)' },
      { code: 'King Abdulaziz', name: 'King Abdulaziz (Saudi)' },
      { code: 'Dammam', name: 'Dammam (Saudi)' },
      { code: 'Sohar', name: 'Sohar (Oman)' },
      { code: 'Aqaba', name: 'Aqaba (Jordan)' },
    ],
  },
  {
    region: 'Asia',
    emoji: '🌏',
    hubs: [
      { code: 'Shanghai', name: 'Shanghai (China)' },
      { code: 'Singapore', name: 'Singapore' },
      { code: 'Busan', name: 'Busan (South Korea)' },
      { code: 'Hong Kong', name: 'Hong Kong' },
      { code: 'Ningbo', name: 'Ningbo-Zhoushan (China)' },
      { code: 'Guangzhou', name: 'Guangzhou (China)' },
      { code: 'Tianjin', name: 'Tianjin (China)' },
      { code: 'Kaohsiung', name: 'Kaohsiung (Taiwan)' },
      { code: 'Port Klang', name: 'Port Klang (Malaysia)' },
      { code: 'Tanjung Pelepas', name: 'Tanjung Pelepas (Malaysia)' },
      { code: 'Nhava Sheva', name: 'Nhava Sheva (India)' },
      { code: 'Mundra', name: 'Mundra (India)' },
      { code: 'Laem Chabang', name: 'Laem Chabang (Thailand)' },
      { code: 'Tanjung Priok', name: 'Tanjung Priok (Indonesia)' },
    ],
  },
  {
    region: 'Europe',
    emoji: '🌍',
    hubs: [
      { code: 'Rotterdam', name: 'Rotterdam (Netherlands)' },
      { code: 'Antwerp', name: 'Antwerp (Belgium)' },
      { code: 'Hamburg', name: 'Hamburg (Germany)' },
      { code: 'Felixstowe', name: 'Felixstowe (UK)' },
      { code: 'Piraeus', name: 'Piraeus (Greece)' },
      { code: 'Valencia', name: 'Valencia (Spain)' },
      { code: 'Algeciras', name: 'Algeciras (Spain)' },
      { code: 'Genoa', name: 'Genoa (Italy)' },
      { code: 'Barcelona', name: 'Barcelona (Spain)' },
      { code: 'Bremerhaven', name: 'Bremerhaven (Germany)' },
      { code: 'Le Havre', name: 'Le Havre (France)' },
      { code: 'Istanbul', name: 'Istanbul (Turkey)' },
    ],
  },
  {
    region: 'Americas',
    emoji: '🌎',
    hubs: [
      { code: 'Los Angeles', name: 'Los Angeles (USA)' },
      { code: 'Long Beach', name: 'Long Beach (USA)' },
      { code: 'New York', name: 'New York / New Jersey (USA)' },
      { code: 'Houston', name: 'Houston (USA)' },
      { code: 'Miami', name: 'Miami (USA)' },
      { code: 'Savannah', name: 'Savannah (USA)' },
      { code: 'Santos', name: 'Santos (Brazil)' },
      { code: 'Cartagena', name: 'Cartagena (Colombia)' },
      { code: 'Manzanillo', name: 'Manzanillo (Mexico)' },
      { code: 'Colon', name: 'Colón (Panama)' },
      { code: 'Buenos Aires', name: 'Buenos Aires (Argentina)' },
      { code: 'Callao', name: 'Callao (Peru)' },
    ],
  },
  {
    region: 'Africa',
    emoji: '🌍',
    hubs: [
      { code: 'Tanger Med', name: 'Tanger Med (Morocco)' },
      { code: 'Port Said', name: 'Port Said (Egypt)' },
      { code: 'Alexandria', name: 'Alexandria (Egypt)' },
      { code: 'Durban', name: 'Durban (South Africa)' },
      { code: 'Mombasa', name: 'Mombasa (Kenya)' },
      { code: 'Apapa', name: 'Apapa (Nigeria)' },
      { code: 'Dar es Salaam', name: 'Dar es Salaam (Tanzania)' },
      { code: 'Djibouti', name: 'Djibouti' },
      { code: 'Abidjan', name: 'Abidjan (Ivory Coast)' },
      { code: 'Dakar', name: 'Dakar (Senegal)' },
    ],
  },
];

const ROAD_BY_REGION: { region: string; emoji: string; hubs: Hub[] }[] = [
  {
    region: 'GCC & Gulf',
    emoji: '🌍',
    hubs: [
      { code: 'UAE', name: 'UAE' },
      { code: 'Saudi Arabia', name: 'Saudi Arabia' },
      { code: 'Kuwait', name: 'Kuwait' },
      { code: 'Qatar', name: 'Qatar' },
      { code: 'Oman', name: 'Oman' },
      { code: 'Bahrain', name: 'Bahrain' },
      { code: 'Iraq', name: 'Iraq' },
      { code: 'Yemen', name: 'Yemen' },
    ],
  },
  {
    region: 'Levant & N. Africa',
    emoji: '🌍',
    hubs: [
      { code: 'Jordan', name: 'Jordan' },
      { code: 'Lebanon', name: 'Lebanon' },
      { code: 'Egypt', name: 'Egypt' },
      { code: 'Libya', name: 'Libya' },
      { code: 'Tunisia', name: 'Tunisia' },
      { code: 'Algeria', name: 'Algeria' },
      { code: 'Morocco', name: 'Morocco' },
    ],
  },
  {
    region: 'South & Central Asia',
    emoji: '🌏',
    hubs: [
      { code: 'India', name: 'India' },
      { code: 'Pakistan', name: 'Pakistan' },
      { code: 'Iran', name: 'Iran' },
      { code: 'Turkey', name: 'Turkey' },
      { code: 'Afghanistan', name: 'Afghanistan' },
      { code: 'Kazakhstan', name: 'Kazakhstan' },
      { code: 'Uzbekistan', name: 'Uzbekistan' },
      { code: 'Turkmenistan', name: 'Turkmenistan' },
    ],
  },
  {
    region: 'Europe',
    emoji: '🌍',
    hubs: [
      { code: 'Germany', name: 'Germany' },
      { code: 'UK', name: 'UK' },
      { code: 'France', name: 'France' },
      { code: 'Italy', name: 'Italy' },
      { code: 'Netherlands', name: 'Netherlands' },
      { code: 'Spain', name: 'Spain' },
      { code: 'Poland', name: 'Poland' },
      { code: 'Belgium', name: 'Belgium' },
      { code: 'Czech Republic', name: 'Czech Republic' },
      { code: 'Romania', name: 'Romania' },
      { code: 'Bulgaria', name: 'Bulgaria' },
      { code: 'Greece', name: 'Greece' },
      { code: 'Hungary', name: 'Hungary' },
      { code: 'Austria', name: 'Austria' },
    ],
  },
  {
    region: 'East & SE Asia',
    emoji: '🌏',
    hubs: [
      { code: 'China', name: 'China' },
      { code: 'Vietnam', name: 'Vietnam' },
      { code: 'Thailand', name: 'Thailand' },
      { code: 'Malaysia', name: 'Malaysia' },
      { code: 'Indonesia', name: 'Indonesia' },
      { code: 'Myanmar', name: 'Myanmar' },
      { code: 'Cambodia', name: 'Cambodia' },
    ],
  },
  {
    region: 'Sub-Saharan Africa',
    emoji: '🌍',
    hubs: [
      { code: 'South Africa', name: 'South Africa' },
      { code: 'Kenya', name: 'Kenya' },
      { code: 'Ethiopia', name: 'Ethiopia' },
      { code: 'Tanzania', name: 'Tanzania' },
      { code: 'Nigeria', name: 'Nigeria' },
      { code: 'Ghana', name: 'Ghana' },
      { code: 'Senegal', name: 'Senegal' },
      { code: 'Uganda', name: 'Uganda' },
    ],
  },
];

function getRegionData(mode: 'air' | 'sea' | 'road') {
  if (mode === 'air') return AIRPORTS_BY_REGION;
  if (mode === 'sea') return SEAPORTS_BY_REGION;
  return ROAD_BY_REGION;
}

function getModeLabel(mode: 'air' | 'sea' | 'road') {
  if (mode === 'air')
    return { icon: '✈', title: 'Air Freight Hubs', unit: 'airports' };
  if (mode === 'sea')
    return { icon: '🚢', title: 'Sea Freight Ports', unit: 'ports' };
  return { icon: '🚛', title: 'Road Freight Markets', unit: 'countries' };
}

export function FreightLaneCard({
  mode,
  onConfirm,
}: {
  mode: 'air' | 'sea' | 'road';
  onConfirm: (mode: 'air' | 'sea' | 'road', hubs: string[]) => void;
}) {
  const regions = getRegionData(mode);
  const { icon, title, unit } = getModeLabel(mode);
  const [activeRegion, setActiveRegion] = useState(regions[0].region);
  const [selected, setSelected] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const currentHubs =
    regions.find((r) => r.region === activeRegion)?.hubs ?? [];

  function toggle(code: string) {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }

  function confirm() {
    setConfirmed(true);
    onConfirm(mode, selected);
  }

  if (confirmed) {
    return (
      <CardShell>
        <div className="px-4 py-3">
          <p className="text-xs text-green-700 font-medium">
            ✓ {selected.length} {unit} selected:{' '}
            {selected.slice(0, 5).join(', ')}
            {selected.length > 5 ? ` +${selected.length - 5} more` : ''}
          </p>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell>
      <div className="px-4 pt-3 pb-1 border-b border-border bg-gray-50/50">
        <p className="text-xs font-semibold text-black">
          {icon} {title}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Select all that apply
        </p>
      </div>

      {/* Region tabs */}
      <div className="flex gap-1 px-3 py-2 overflow-x-auto hide-scrollbar border-b border-border">
        {regions.map((r) => {
          const regionSelected = r.hubs.filter((h) =>
            selected.includes(h.code),
          ).length;
          return (
            <button
              key={r.region}
              onClick={() => setActiveRegion(r.region)}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap transition-colors ${
                activeRegion === r.region
                  ? 'bg-primaryOrange text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {r.emoji} {r.region}
              {regionSelected > 0 && (
                <span
                  className={`ml-0.5 rounded-full text-[9px] px-1 ${
                    activeRegion === r.region
                      ? 'bg-white/30 text-white'
                      : 'bg-primaryOrange text-white'
                  }`}
                >
                  {regionSelected}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hub chips */}
      <div className="px-3 py-2.5 flex flex-wrap gap-1.5 min-h-[80px]">
        {currentHubs.map((hub) => (
          <button
            key={hub.code}
            onClick={() => toggle(hub.code)}
            title={hub.name}
            className={`rounded-md px-2 py-1 text-[11px] font-medium border transition-colors ${
              selected.includes(hub.code)
                ? 'bg-primaryOrange text-white border-primaryOrange'
                : 'bg-white text-black border-border hover:border-primaryOrange/40'
            }`}
          >
            <span className="font-bold">{hub.code}</span>
            <span className="ml-1 text-[10px] opacity-70">
              {hub.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Selected summary + confirm */}
      <div className="px-3 py-2 border-t border-border bg-gray-50/50 space-y-2">
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selected.map((code) => (
              <span
                key={code}
                className="flex items-center gap-1 rounded-full bg-primaryOrange/10 border border-primaryOrange/20 px-2 py-0.5 text-[10px] text-primaryOrange font-medium"
              >
                {code}
                <button
                  onClick={() => toggle(code)}
                  className="hover:opacity-60"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            No {unit} selected yet
          </p>
        )}
        <div className="flex gap-2">
          <button
            onClick={confirm}
            disabled={selected.length === 0}
            className="flex-1 rounded-lg bg-primaryOrange text-white text-xs font-semibold py-2 hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            Confirm{selected.length > 0 ? ` (${selected.length} ${unit})` : ''}
          </button>
          <button
            onClick={() => {
              setConfirmed(true);
              onConfirm(mode, []);
            }}
            className="text-xs text-muted-foreground hover:text-black px-2 transition-colors"
          >
            Skip
          </button>
        </div>
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

// ── Payment Card ──────────────────────────────────────────────────────────────

const FEATURES = [
  'Verified badge visible to 500+ active shippers',
  'AI-matched freight opportunities in your lanes',
  'Real-time analytics & market trends dashboard',
  'Priority support & dedicated onboarding call',
  'Included in Goods2Load shipper search results',
];

export function PaymentCard({
  onConfirm,
  onStandby,
}: {
  onConfirm: () => void;
  onStandby: () => void;
}) {
  const [status, setStatus] = useState<
    'idle' | 'processing' | 'success' | 'standby'
  >('idle');

  async function handlePay() {
    setStatus('processing');
    try {
      // Try to create a real Stripe Checkout Session
      // TODO (Sufian): Add STRIPE_SECRET_KEY to .env.local and NEXT_PUBLIC_APP_URL
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: 'freight_forwarder_annual' }),
      });
      const data = await res.json();
      if (data.url) {
        // Real Stripe checkout — open in same tab
        window.location.href = data.url;
        return;
      }
    } catch {
      // Stripe not configured — fall through to simulation
    }
    // Demo simulation: 1.5s processing animation
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setTimeout(() => onConfirm(), 800);
  }

  function handleStandby() {
    setStatus('standby');
    onStandby();
  }

  if (status === 'standby') {
    return (
      <CardShell>
        <div className="px-4 py-3 text-center space-y-1">
          <p className="text-xs font-semibold text-black">
            📋 Application saved
          </p>
          <p className="text-[11px] text-muted-foreground">
            We&apos;ll follow up to help you complete payment.
          </p>
        </div>
      </CardShell>
    );
  }

  if (status === 'success') {
    return (
      <CardShell>
        <div className="px-4 py-3 text-center space-y-1">
          <p className="text-2xl">🎉</p>
          <p className="text-xs font-semibold text-green-700">
            Payment confirmed!
          </p>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell>
      {/* Header */}
      <div className="bg-primaryOrange px-4 py-3 text-white text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
          Freight Forwarder Annual Membership
        </p>
        <p className="text-3xl font-bold mt-1">$699</p>
        <p className="text-[11px] opacity-80">per year · cancel anytime</p>
      </div>

      {/* Features */}
      <div className="px-4 py-3 space-y-2">
        {FEATURES.map((f) => (
          <div key={f} className="flex items-start gap-2">
            <span className="text-primaryOrange text-xs mt-0.5 shrink-0">
              ✓
            </span>
            <span className="text-[11px] text-black">{f}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="px-4 pb-4 space-y-2">
        <button
          onClick={handlePay}
          disabled={status === 'processing'}
          className="w-full rounded-lg bg-primaryOrange text-white text-sm font-bold py-3 hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status === 'processing' ? (
            <>
              <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full" />
              Processing…
            </>
          ) : (
            '💳  Pay now — activate my profile'
          )}
        </button>
        <button
          onClick={handleStandby}
          disabled={status === 'processing'}
          className="w-full text-xs text-muted-foreground hover:text-black transition-colors py-1"
        >
          Save application — complete payment later →
        </button>
        <p className="text-center text-[10px] text-muted-foreground">
          🔒 Secure payment · 30-day money-back guarantee
        </p>
      </div>
    </CardShell>
  );
}

// ── Summary Card ──────────────────────────────────────────────────────────────

export function SummaryCard({
  fields,
  confirmed,
  onConfirm,
  onEdit,
}: {
  fields: CollectedFields;
  confirmed?: boolean;
  onConfirm?: () => void;
  onEdit?: () => void;
}) {
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
        ? `✓ (${fields.airports?.length ?? 0} hubs)`
        : '—',
    ],
    [
      'Sea freight',
      fields.providesSeaFreight
        ? `✓ (${fields.seaports?.length ?? 0} ports)`
        : '—',
    ],
    [
      'Road freight',
      fields.providesRoadFreight
        ? `✓ (${fields.roadCountries?.length ?? 0} countries)`
        : '—',
    ],
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

      {/* Action buttons — only shown before final confirmation */}
      {!confirmed && (onConfirm || onEdit) && (
        <div className="px-4 pb-4 pt-2 flex gap-2 border-t border-border">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-primaryOrange text-white text-xs font-bold py-2.5 hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
          >
            <span>✓</span> Confirm — looks good
          </button>
          <button
            onClick={onEdit}
            className="rounded-lg border border-border text-xs text-muted-foreground px-4 py-2.5 hover:border-primaryOrange hover:text-black transition-colors"
          >
            ✎ Edit
          </button>
        </div>
      )}

      {confirmed && (
        <div className="px-4 pb-3 pt-2 border-t border-border">
          <p className="text-xs text-green-700 font-medium text-center">
            ✓ Profile confirmed — proceeding to payment
          </p>
        </div>
      )}
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
