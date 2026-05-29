/**
 * Client Portfolio — Momentum's memory layer per freight forwarder.
 *
 * Each PortfolioClient represents a cargo owner relationship. Momentum
 * injects this context into every interaction so it can personalise
 * greetings, recall history, and surface the right seat automatically.
 *
 * companyAliases: used for fuzzy cross-referencing against incoming leads.
 */

export type ClientStatus = 'active' | 'warm' | 'dormant';
export type InteractionType =
  | 'whatsapp'
  | 'email'
  | 'call'
  | 'booking'
  | 'document';
export type FreightMode = 'air' | 'sea' | 'road';

export interface ClientInteraction {
  id: string;
  date: string;
  type: InteractionType;
  seat: string;
  summary: string;
  ref?: string;
  value?: string;
}

export interface ClientLane {
  origin: string;
  destination: string;
  mode: FreightMode;
  frequency: string;
  lastShipment: string;
  avgValue: string;
  totalShipments: number;
}

export interface PortfolioClient {
  id: string;
  name: string; // primary contact person
  role: string;
  company: string;
  phone?: string;
  email?: string;
  flag: string;
  country: string;
  status: ClientStatus;
  totalRevenue: string;
  shipments: number;
  lanes: ClientLane[];
  preferredCarriers: string[];
  interactions: ClientInteraction[];
  momentumMemory: string; // what Momentum has learned — injected into system prompt
  notes: string;
  assignedSeat: string; // primary account owner on your team
  lastContact: string;
  tags: string[];
  companyAliases: string[]; // for cross-referencing against incoming leads
}

export const PORTFOLIO_CLIENTS: PortfolioClient[] = [
  {
    id: 'c1',
    name: 'Sarah Al Khatib',
    role: 'Procurement Manager',
    company: 'Global Pharma MENA',
    phone: '+971501234567',
    email: 'procurement@globalpharmamena.com',
    flag: '🇦🇪',
    country: 'UAE',
    status: 'active',
    totalRevenue: '$18,400',
    shipments: 8,
    assignedSeat: 'Ahmed Al Rashid',
    lastContact: '3 days ago',
    tags: ['Cold Chain', 'GDP Certified', 'Pharma', 'Priority'],
    companyAliases: ['Global Pharma', 'GlobalPharma', 'globalpharmamena'],
    lanes: [
      {
        origin: 'Dubai (DXB)',
        destination: 'Baghdad (BGW)',
        mode: 'road',
        frequency: 'Monthly',
        lastShipment: '12 May 2026',
        avgValue: '$2,100',
        totalShipments: 6,
      },
      {
        origin: 'Mumbai (BOM)',
        destination: 'Dubai (DXB)',
        mode: 'air',
        frequency: 'Quarterly',
        lastShipment: '3 Mar 2026',
        avgValue: '$3,200',
        totalShipments: 2,
      },
    ],
    preferredCarriers: ['Agility Logistics', 'Emirates SkyCargo'],
    momentumMemory:
      'Global Pharma MENA has shipped cold-chain cargo 8 times on the DXB→BGW corridor. Sarah always requests GDP certification and prefers all-in rates including customs clearance. She responds instantly on WhatsApp but prefers formal email for rate confirmations. Peak shipping months are April–June. They have never switched forwarder on this lane. Price-sensitive only on large volumes (>1,500 kg).',
    notes:
      'Strategic account. Sarah has mentioned expanding to Jordan (AMM) in Q3 2026. Ahmed to follow up post-June shipment.',
    interactions: [
      {
        id: 'i1-1',
        date: 'Today 08:14',
        type: 'email',
        seat: 'Ahmed Al Rashid',
        summary:
          'New cold-chain inquiry: 1,200 kg, DXB→BGW, GDP certified, ASAP rate request.',
        ref: 'EMAIL-20260529-001',
      },
      {
        id: 'i1-2',
        date: '12 May 2026',
        type: 'booking',
        seat: 'Ahmed Al Rashid',
        summary: 'Confirmed booking — 950 kg cold chain DXB→BGW.',
        ref: 'G2L-20260512-3198',
        value: '$2,050',
      },
      {
        id: 'i1-3',
        date: '28 Apr 2026',
        type: 'whatsapp',
        seat: 'Ahmed Al Rashid',
        summary:
          'Rate inquiry via WhatsApp — 800 kg pharma DXB→BGW. Momentum replied in 41 sec. Booking followed 2h later.',
        ref: 'WA-20260428',
        value: '$1,900',
      },
      {
        id: 'i1-4',
        date: '3 Mar 2026',
        type: 'booking',
        seat: 'Ahmed Al Rashid',
        summary:
          'Air freight booking BOM→DXB — 500 kg medical devices, Emirates SkyCargo.',
        ref: 'G2L-20260303-2841',
        value: '$3,200',
      },
      {
        id: 'i1-5',
        date: '14 Jan 2026',
        type: 'document',
        seat: 'Ahmed Al Rashid',
        summary:
          'Sarah sent packing list + commercial invoice via WhatsApp. Momentum parsed and pre-filled cargo details automatically.',
        ref: 'DOC-20260114',
      },
      {
        id: 'i1-6',
        date: '8 Jan 2026',
        type: 'call',
        seat: 'Ahmed Al Rashid',
        summary:
          'Intro call — Sarah confirmed DXB→BGW as monthly regular lane. GDP certification non-negotiable.',
      },
    ],
  },
  {
    id: 'c2',
    name: 'Khaled Mansoor',
    role: 'Logistics Manager',
    company: 'AeroTrade LLC',
    phone: '+971555678901',
    email: 'logistics@aerotradellc.ae',
    flag: '🇦🇪',
    country: 'UAE',
    status: 'active',
    totalRevenue: '$12,200',
    shipments: 5,
    assignedSeat: 'Maria Santos',
    lastContact: 'Today',
    tags: ['FCL Sea', 'Electronics', 'Shenzhen'],
    companyAliases: ['AeroTrade', 'Aero Trade', 'aerotradellc'],
    lanes: [
      {
        origin: 'Shenzhen (CNSZX)',
        destination: 'Jebel Ali (AEJEA)',
        mode: 'sea',
        frequency: 'Bi-monthly',
        lastShipment: '2 Apr 2026',
        avgValue: '$2,100',
        totalShipments: 5,
      },
    ],
    preferredCarriers: ['Maersk', 'MSC'],
    momentumMemory:
      'AeroTrade LLC runs a regular Shenzhen→Jebel Ali FCL lane for consumer electronics. Khaled always ships 40HC and is very rate-sensitive — he shops multiple forwarders. Maria consistently wins by responding within 30 minutes with a dual Maersk/MSC comparison. They need 14+ days free demurrage. Ready date is always 2–3 weeks out. Khaled is decisive once he has the rates — no back-and-forth.',
    notes:
      'Khaled mentioned they may add a second lane (Shenzhen→Rotterdam) if June rates are competitive.',
    interactions: [
      {
        id: 'i2-1',
        date: 'Today 07:32',
        type: 'email',
        seat: 'Maria Santos',
        summary:
          'FCL quote request — 40HC, Shenzhen→Jebel Ali, 24 CBM, 8,000 kg, ready date June 15.',
        ref: 'EMAIL-20260529-002',
      },
      {
        id: 'i2-2',
        date: '2 Apr 2026',
        type: 'booking',
        seat: 'Maria Santos',
        summary:
          'Confirmed 40HC FCL CNSZX→AEJEA. MSC JADE. 14 days free demurrage.',
        ref: 'G2L-20260402-3001',
        value: '$1,950',
      },
      {
        id: 'i2-3',
        date: '2 Feb 2026',
        type: 'booking',
        seat: 'Maria Santos',
        summary: 'Maersk AE-1 booking confirmed — 40HC CNSZX→AEJEA.',
        ref: 'G2L-20260202-2710',
        value: '$2,200',
      },
      {
        id: 'i2-4',
        date: '19 Jan 2026',
        type: 'whatsapp',
        seat: 'Maria Santos',
        summary:
          'Khaled sent product images via WhatsApp for new electronics shipment. Momentum parsed HS codes from packaging photos.',
        ref: 'WA-20260119',
      },
    ],
  },
  {
    id: 'c3',
    name: 'Ops Team',
    role: 'Operations',
    company: 'MedSupply MENA',
    phone: '+97142345678',
    email: 'ops@medsupplymena.com',
    flag: '🇦🇪',
    country: 'UAE',
    status: 'active',
    totalRevenue: '$28,600',
    shipments: 12,
    assignedSeat: 'Ahmed Al Rashid',
    lastContact: 'Yesterday',
    tags: ['Air Priority', 'Medical Devices', 'BOM Route', 'Key Account'],
    companyAliases: ['MedSupply', 'Med Supply', 'medsupplymena'],
    lanes: [
      {
        origin: 'Mumbai (BOM)',
        destination: 'Dubai (DXB)',
        mode: 'air',
        frequency: 'Monthly',
        lastShipment: '28 May 2026',
        avgValue: '$2,400',
        totalShipments: 12,
      },
    ],
    preferredCarriers: ['Emirates SkyCargo'],
    momentumMemory:
      'MedSupply MENA is the most consistent client — 12 consecutive monthly bookings BOM→DXB on Emirates SkyCargo. They always use email for booking confirmations with structured AWB references. The ops team (not a single contact) manages logistics — replies come from a shared inbox. They have never requested a rate negotiation — volume consistency matters more than price. Zero complaints on record. Shipments are always 700–900 kg medical devices.',
    notes:
      'MedSupply renewal conversation due July 2026. Ahmed to propose annual contract with locked rate.',
    interactions: [
      {
        id: 'i3-1',
        date: 'Yesterday',
        type: 'booking',
        seat: 'Ahmed Al Rashid',
        summary:
          'Confirmed 800 kg BOM→DXB Emirates SkyCargo. AWB issued to MedSupply MENA FZE.',
        ref: 'MEDS-2026-0529',
        value: '$2,400',
      },
      {
        id: 'i3-2',
        date: '28 Apr 2026',
        type: 'booking',
        seat: 'Ahmed Al Rashid',
        summary: '820 kg BOM→DXB air freight confirmed.',
        ref: 'MEDS-2026-0428',
        value: '$2,460',
      },
      {
        id: 'i3-3',
        date: '28 Mar 2026',
        type: 'booking',
        seat: 'Ahmed Al Rashid',
        summary: '750 kg BOM→DXB air freight confirmed.',
        ref: 'MEDS-2026-0328',
        value: '$2,250',
      },
      {
        id: 'i3-4',
        date: '15 Mar 2026',
        type: 'document',
        seat: 'Ahmed Al Rashid',
        summary:
          'Ops team emailed packing list PDF and invoice. Momentum extracted cargo details and pre-filled booking form.',
        ref: 'DOC-20260315',
      },
    ],
  },
  {
    id: 'c4',
    name: 'Hans Müller',
    role: 'Export Manager',
    company: 'Müller GmbH',
    phone: '+4969987654',
    email: 'shipping@mullergmbh.de',
    flag: '🇩🇪',
    country: 'Germany',
    status: 'warm',
    totalRevenue: '$9,800',
    shipments: 3,
    assignedSeat: 'Sarah Chen',
    lastContact: '2 days ago',
    tags: ['DG Class 3', 'Automotive', 'Air FRA', 'Europe Desk'],
    companyAliases: ['Müller', 'Muller', 'Müller GmbH', 'mullergmbh'],
    lanes: [
      {
        origin: 'Frankfurt (FRA)',
        destination: 'Dubai (DXB)',
        mode: 'air',
        frequency: 'Quarterly',
        lastShipment: '14 Feb 2026',
        avgValue: '$3,300',
        totalShipments: 3,
      },
    ],
    preferredCarriers: ['Lufthansa Cargo'],
    momentumMemory:
      'Müller GmbH ships automotive parts classified as DG Class 3 (flammable liquids) via air FRA→DXB quarterly. Hans is thorough — always asks for rates to hold until end of month before committing. Sarah has the relationship. Important: DG declaration paperwork must be confirmed before quoting. Hans responds to email, rarely WhatsApp. They referenced Aston Martin as their client in the last interaction — high-value supply chain.',
    notes:
      'Sarah to follow up this week on the rate hold request. DG handling surcharge must be included in quote.',
    interactions: [
      {
        id: 'i4-1',
        date: '27 May 2026',
        type: 'email',
        seat: 'Sarah Chen',
        summary:
          'Follow-up on FRA→DXB rate for 800 kg DG class 3 automotive parts. Requests rate hold until end of June.',
        ref: 'EMAIL-20260527-005',
      },
      {
        id: 'i4-2',
        date: '14 Feb 2026',
        type: 'booking',
        seat: 'Sarah Chen',
        summary:
          'Air freight confirmed — 760 kg DG class 3, FRA→DXB, Lufthansa Cargo.',
        ref: 'G2L-20260214-2599',
        value: '$3,300',
      },
      {
        id: 'i4-3',
        date: '10 Feb 2026',
        type: 'document',
        seat: 'Sarah Chen',
        summary:
          'Hans emailed DG declaration, packing list, and MSDS sheets. Momentum verified DG class and flagged surcharge requirement.',
        ref: 'DOC-20260210',
      },
      {
        id: 'i4-4',
        date: '2 Nov 2025',
        type: 'booking',
        seat: 'Sarah Chen',
        summary:
          'First booking — 720 kg automotive parts FRA→DXB. Lufthansa Cargo.',
        ref: 'G2L-20251102-2101',
        value: '$3,150',
      },
    ],
  },
  {
    id: 'c5',
    name: 'Hiroshi Tanaka',
    role: 'Director',
    company: 'Tanaka Trading Co.',
    phone: '+81663456789',
    email: 'trade@tanakajapan.co.jp',
    flag: '🇯🇵',
    country: 'Japan',
    status: 'warm',
    totalRevenue: '$0',
    shipments: 0,
    assignedSeat: 'Maria Santos',
    lastContact: 'Yesterday',
    tags: ['Sea', 'New Client', 'Japan Lane', 'Automotive'],
    companyAliases: ['Tanaka', 'Tanaka Trading', 'tanakajapan'],
    lanes: [
      {
        origin: 'Osaka (JPOSA)',
        destination: 'Rotterdam (NLRTM)',
        mode: 'sea',
        frequency: 'Potential monthly (2×20GP)',
        lastShipment: '—',
        avgValue: '~$2,800',
        totalShipments: 0,
      },
    ],
    preferredCarriers: [],
    momentumMemory:
      'Tanaka Trading Co. is a new prospect — first contact yesterday via email inquiry for Osaka→Rotterdam via Dubai. Hiroshi is evaluating multiple freight forwarders for a regular lane (2×20GP monthly, automotive components). No booking yet. The Dubai hub transit is a key differentiator to highlight. Maria to prioritise fast indicative rate — Hiroshi mentioned making a decision within two weeks.',
    notes:
      'High-potential new lane. If won, $33,600/year revenue at 2×20GP/month. Maria to send indicative rate before EOD 30 May.',
    interactions: [
      {
        id: 'i5-1',
        date: 'Yesterday',
        type: 'email',
        seat: 'Maria Santos',
        summary:
          'First inquiry — regular sea lane JPOSA→NLRTM via Dubai, 2×20GP/month, automotive components. Evaluating forwarders.',
        ref: 'EMAIL-20260528-004',
      },
    ],
  },
];

// ── Lookup helpers ────────────────────────────────────────────────────────────

/**
 * Find a portfolio client by matching company name (fuzzy, case-insensitive).
 * Used by LeadsSection to detect returning clients in incoming leads.
 */
export function findClientByCompany(
  companyName: string,
): PortfolioClient | null {
  if (!companyName) return null;
  const q = companyName.toLowerCase();
  return (
    PORTFOLIO_CLIENTS.find((c) => {
      if (c.company.toLowerCase().includes(q)) return true;
      if (q.includes(c.company.toLowerCase())) return true;
      return c.companyAliases.some(
        (a) => q.includes(a.toLowerCase()) || a.toLowerCase().includes(q),
      );
    }) ?? null
  );
}

/**
 * Build a compact context string for Momentum's system prompt.
 * Injected when a known client is detected in a conversation.
 */
export function buildClientContext(client: PortfolioClient): string {
  const recentInteractions = client.interactions
    .slice(0, 3)
    .map((i) => `  - ${i.date}: ${i.summary}`)
    .join('\n');
  return (
    `EXISTING CLIENT DETECTED — ${client.company}\n` +
    `Contact: ${client.name} (${client.role})\n` +
    `Account owner on your team: ${client.assignedSeat}\n` +
    `History: ${client.shipments} shipments · ${client.totalRevenue} total revenue\n` +
    `Last contact: ${client.lastContact}\n` +
    `What Momentum knows: ${client.momentumMemory}\n` +
    `Recent interactions:\n${recentInteractions}\n` +
    `Notes: ${client.notes}`
  );
}
