'use client';

import {
  type ClientStatus,
  type InteractionType,
  PORTFOLIO_CLIENTS,
  type PortfolioClient,
} from '@/lib/clientPortfolio';

import { useState } from 'react';

import {
  BookOpen,
  Calendar,
  FileText,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Plane,
  Search,
  Ship,
  Truck,
  Users,
  Zap,
} from 'lucide-react';

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  ClientStatus,
  { label: string; dot: string; badge: string }
> = {
  active: {
    label: 'Active',
    dot: 'bg-green-500',
    badge: 'bg-green-50 text-green-700 border-green-200',
  },
  warm: {
    label: 'Warm',
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  dormant: {
    label: 'Dormant',
    dot: 'bg-gray-300',
    badge: 'bg-gray-50 text-gray-500 border-gray-200',
  },
};

const INTERACTION_CONFIG: Record<
  InteractionType,
  { Icon: React.ElementType; color: string; bg: string; label: string }
> = {
  whatsapp: {
    Icon: MessageCircle,
    color: 'text-[#25D366]',
    bg: 'bg-[#25D366]/10',
    label: 'WhatsApp',
  },
  email: {
    Icon: Mail,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    label: 'Email',
  },
  call: {
    Icon: Phone,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
    label: 'Call',
  },
  booking: {
    Icon: Package,
    color: 'text-primaryOrange',
    bg: 'bg-primaryOrange/8',
    label: 'Booking',
  },
  document: {
    Icon: FileText,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    label: 'Document',
  },
};

const MODE_ICON = { air: Plane, sea: Ship, road: Truck };
const MODE_COLOR = {
  air: 'text-blue-500',
  sea: 'text-cyan-500',
  road: 'text-amber-500',
};

// ── Client list item ──────────────────────────────────────────────────────────

function ClientListItem({
  client,
  active,
  onClick,
}: {
  client: PortfolioClient;
  active: boolean;
  onClick: () => void;
}) {
  const st = STATUS_CONFIG[client.status];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 transition-colors hover:bg-gray-50 ${
        active ? 'bg-primaryOrange/5 border-l-2 border-primaryOrange' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primaryOrange/15 flex items-center justify-center shrink-0 relative">
          <span className="text-[11px] font-bold text-primaryOrange">
            {client.company[0]}
          </span>
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${st.dot}`}
          />
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-black truncate">
              {client.company}
            </span>
            <span className="text-sm shrink-0">{client.flag}</span>
          </div>
          <p className="text-[10px] text-muted-foreground truncate">
            {client.name} · {client.assignedSeat}
          </p>
        </div>
        {/* Revenue + shipments */}
        <div className="text-right shrink-0">
          <p className="text-[10px] font-semibold text-primaryOrange">
            {client.totalRevenue}
          </p>
          <p className="text-[9px] text-muted-foreground">
            {client.shipments} ships
          </p>
        </div>
      </div>
      {/* Last contact */}
      <p className="text-[9px] text-muted-foreground mt-1.5 ml-11">
        Last contact: {client.lastContact}
      </p>
    </button>
  );
}

// ── Overview tab ──────────────────────────────────────────────────────────────

function OverviewTab({ client }: { client: PortfolioClient }) {
  return (
    <div className="space-y-4">
      {/* Lanes */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Active lanes
        </p>
        <div className="space-y-2">
          {client.lanes.map((lane, i) => {
            const Icon = MODE_ICON[lane.mode];
            return (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-3 border border-border"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon
                    size={12}
                    strokeWidth={2}
                    className={MODE_COLOR[lane.mode]}
                  />
                  <span className="text-[11px] font-semibold text-black">
                    {lane.origin} → {lane.destination}
                  </span>
                  {lane.totalShipments === 0 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-semibold">
                      Prospect
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span>
                    <span className="font-medium text-black">
                      {lane.frequency}
                    </span>{' '}
                    · {lane.totalShipments} shipments
                  </span>
                  <span>Avg {lane.avgValue}</span>
                  <span>Last: {lane.lastShipment}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preferred carriers */}
      {client.preferredCarriers.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Preferred carriers
          </p>
          <div className="flex flex-wrap gap-2">
            {client.preferredCarriers.map((c) => (
              <span
                key={c}
                className="text-[10px] font-medium bg-white border border-border text-black px-2.5 py-1 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Tags
        </p>
        <div className="flex flex-wrap gap-1.5">
          {client.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-primaryOrange/8 text-primaryOrange border border-primaryOrange/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Notes */}
      {client.notes && (
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Account notes
          </p>
          <p className="text-[11px] text-black leading-relaxed bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
            {client.notes}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Timeline tab ──────────────────────────────────────────────────────────────

function TimelineTab({ client }: { client: PortfolioClient }) {
  return (
    <div className="space-y-1">
      {client.interactions.map((item, i) => {
        const cfg = INTERACTION_CONFIG[item.type];
        return (
          <div
            key={item.id}
            className="flex items-start gap-3 py-3 border-b border-border last:border-0"
          >
            {/* Icon */}
            <div
              className={`w-7 h-7 rounded-full ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}
            >
              <cfg.Icon size={12} className={cfg.color} strokeWidth={2} />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className={`text-[9px] font-bold uppercase tracking-wide ${cfg.color}`}
                >
                  {cfg.label}
                </span>
                <span className="text-[9px] text-muted-foreground">
                  {item.date}
                </span>
                {item.value && (
                  <span className="text-[9px] font-semibold text-primaryOrange ml-auto">
                    {item.value}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-black leading-snug">
                {item.summary}
              </p>
              {item.ref && (
                <p className="text-[9px] text-muted-foreground mt-0.5 font-mono">
                  {item.ref}
                </p>
              )}
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Handled by{' '}
                <span className="font-semibold text-black">{item.seat}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Documents tab ─────────────────────────────────────────────────────────────

function DocumentsTab({ client }: { client: PortfolioClient }) {
  const docInteractions = client.interactions.filter(
    (i) => i.type === 'document',
  );
  return (
    <div className="space-y-4">
      {/* Connect CTA */}
      <div className="bg-[#0d0d1a] rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primaryOrange/15 flex items-center justify-center shrink-0">
          <FileText size={14} className="text-primaryOrange" />
        </div>
        <div className="flex-1">
          <p className="text-[12px] font-semibold text-white">
            Momentum reads documents automatically
          </p>
          <p className="text-[10px] text-white/50 mt-0.5 leading-relaxed">
            When {client.name} sends an invoice, packing list, or CMR via
            WhatsApp or email — Momentum extracts cargo details, HS codes,
            weight, and shipper info and pre-fills the booking form.
          </p>
        </div>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 shrink-0">
          BETA
        </span>
      </div>

      {docInteractions.length > 0 ? (
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Documents received
          </p>
          {docInteractions.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 bg-white rounded-lg border border-border mb-2"
            >
              <div className="w-8 h-8 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                <FileText size={14} className="text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-black">
                  {item.summary}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] text-muted-foreground">
                    {item.date}
                  </span>
                  {item.ref && (
                    <span className="text-[9px] font-mono text-muted-foreground">
                      · {item.ref}
                    </span>
                  )}
                  <span className="ml-auto text-[9px] font-semibold text-green-600 flex items-center gap-0.5">
                    ✓ Parsed by Momentum
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-muted-foreground text-center py-6">
          No documents received yet from {client.company}
        </p>
      )}

      {/* Accepted types */}
      <div className="bg-gray-50 rounded-lg p-3 border border-border">
        <p className="text-[10px] font-semibold text-black mb-2">
          Momentum can parse
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            'Commercial invoice (PDF/photo)',
            'Packing list',
            'Bill of lading / AWB',
            'CMR / road consignment',
            'DG declaration (MSDS)',
            'Certificate of origin',
          ].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <span className="text-green-500 text-[10px]">✓</span>
              <span className="text-[10px] text-muted-foreground">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ClientPortfolioSection() {
  const [selected, setSelected] = useState<string>('c1');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all');
  const [tab, setTab] = useState<'overview' | 'timeline' | 'documents'>(
    'overview',
  );

  const client = PORTFOLIO_CLIENTS.find((c) => c.id === selected)!;
  const st = STATUS_CONFIG[client.status];

  const filtered = PORTFOLIO_CLIENTS.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.company.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.assignedSeat.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const activeCount = PORTFOLIO_CLIENTS.filter(
    (c) => c.status === 'active',
  ).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-bold text-black">Clients</h2>
          <p className="text-[12px] text-muted-foreground">
            Momentum remembers every client — history, preferences, and which
            seat owns the relationship
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            {activeCount} active
          </span>
          <span className="text-[10px] text-muted-foreground">
            {PORTFOLIO_CLIENTS.length} total
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: client list ── */}
        <div className="w-[280px] shrink-0 border-r border-border flex flex-col overflow-hidden">
          {/* Search */}
          <div className="px-3 py-2.5 border-b border-border">
            <div className="flex items-center gap-2 bg-gray-50 border border-border rounded-lg px-2.5 py-1.5">
              <Search size={11} className="text-muted-foreground shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients…"
                className="flex-1 text-[11px] bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-border overflow-x-auto hide-scrollbar">
            {(['all', 'active', 'warm', 'dormant'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border capitalize shrink-0 transition-colors ${
                  statusFilter === f
                    ? 'bg-primaryOrange text-white border-primaryOrange'
                    : 'text-muted-foreground border-border hover:border-primaryOrange/40'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.length === 0 ? (
              <p className="text-[11px] text-muted-foreground text-center py-8">
                No clients found
              </p>
            ) : (
              filtered.map((c) => (
                <ClientListItem
                  key={c.id}
                  client={c}
                  active={selected === c.id}
                  onClick={() => {
                    setSelected(c.id);
                    setTab('overview');
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Right: client detail ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Client header */}
          <div className="px-6 py-5 border-b border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primaryOrange/15 flex items-center justify-center shrink-0">
                <span className="text-[16px] font-bold text-primaryOrange">
                  {client.company[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-[15px] font-bold text-black">
                    {client.company}
                  </h3>
                  <span className="text-lg">{client.flag}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${st.badge}`}
                  >
                    {st.label}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {client.name} · {client.role}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  {client.email && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Mail size={9} />
                      {client.email}
                    </span>
                  )}
                  {client.phone && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Phone size={9} />
                      {client.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[
                {
                  label: 'Revenue',
                  value: client.totalRevenue,
                  highlight: true,
                },
                {
                  label: 'Shipments',
                  value: String(client.shipments),
                  highlight: false,
                },
                {
                  label: 'Last contact',
                  value: client.lastContact,
                  highlight: false,
                },
                {
                  label: 'Account owner',
                  value: client.assignedSeat.split(' ')[0],
                  highlight: false,
                },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className="bg-gray-50 rounded-lg px-3 py-2.5 border border-border"
                >
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-medium">
                    {label}
                  </p>
                  <p
                    className={`text-[13px] font-bold mt-0.5 ${highlight ? 'text-primaryOrange' : 'text-black'}`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Momentum memory banner */}
          <div className="mx-6 mt-4 rounded-xl bg-[#0d0d1a] p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-primaryOrange flex items-center justify-center shrink-0">
                <span className="text-[8px] font-bold text-white">M</span>
              </div>
              <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wide">
                Momentum memory
              </p>
              <Zap size={10} className="text-primaryOrange ml-auto" />
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              {client.momentumMemory}
            </p>
            <div className="mt-2.5 flex items-center gap-1.5">
              <Users size={9} className="text-primaryOrange" />
              <p className="text-[9px] text-white/40">
                Seat owner:{' '}
                <span className="text-primaryOrange font-semibold">
                  {client.assignedSeat}
                </span>{' '}
                · Momentum injects this context into every interaction
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-0 px-6 mt-4 border-b border-border">
            {(
              [
                { id: 'overview', label: 'Overview', Icon: BookOpen },
                { id: 'timeline', label: 'Timeline', Icon: Calendar },
                { id: 'documents', label: 'Documents', Icon: FileText },
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-semibold border-b-2 transition-colors ${
                  tab === id
                    ? 'border-primaryOrange text-primaryOrange'
                    : 'border-transparent text-muted-foreground hover:text-black'
                }`}
              >
                <Icon size={11} strokeWidth={2} />
                {label}
                {id === 'timeline' && (
                  <span className="text-[9px] bg-gray-100 text-muted-foreground px-1.5 py-0.5 rounded-full">
                    {client.interactions.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="px-6 py-5">
            {tab === 'overview' && <OverviewTab client={client} />}
            {tab === 'timeline' && <TimelineTab client={client} />}
            {tab === 'documents' && <DocumentsTab client={client} />}
          </div>
        </div>
      </div>
    </div>
  );
}
