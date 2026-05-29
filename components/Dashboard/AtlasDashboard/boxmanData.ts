// Real Boxman Global Logistics data — sourced from their G2L registration
// Provider ID: 94e7ee99-478e-48cd-a12e-d265369903c1

export const BOXMAN = {
  id: '94e7ee99-478e-48cd-a12e-d265369903c1',
  companyName: 'Boxman Global Logistics',
  legalName: 'BOXMAN GLOBAL LOGISTICS',
  slug: 'BOXMAN-GLOBAL-LOGISTICS',
  email: 'getquote@boxmanglobal.com',
  phone: '+97145216555',
  whatsapp: '+97145216555',
  country: 'United Arab Emirates',
  city: 'Dubai',
  address: 'Al Garhoud, Airport Road',
  website: 'https://www.boxmanglobal.com',
  status: 'APPROVED' as const,

  // Mode mix — declared on platform
  modeMix: { air: 50, sea: 30, road: 20 },

  // Google — real from website (0 in DB, Sufian to fetch)
  googleRating: 5.0,
  googleReviews: 21,

  // Certifications — from their own description + website
  certifications: ['ISO 9001:2015', 'FIATA', 'NAFL'],

  // Trust score — calculated from verification signals
  trustScore: 84,
  verificationTier: 'VERIFIED' as const,

  // Hub airports (UAE cluster — all declared)
  airports: ['DXB', 'DWC', 'AUH', 'SHJ', 'FJR'],

  // Top sea lanes — their declared ports are predominantly Chinese → Dubai
  topSeaLanes: [
    { from: 'Shanghai (SHA)', to: 'Jebel Ali (AEJEA)' },
    { from: 'Shenzhen (SZX)', to: 'Jebel Ali (AEJEA)' },
    { from: 'Guangzhou (CAN)', to: 'Jebel Ali (AEJEA)' },
  ],

  // Road coverage
  roadRegions: [
    'UAE (all emirates)',
    'Oman',
    'Qatar',
    'Bahrain',
    'Kuwait',
    'Saudi Arabia',
  ],

  // Capabilities — declared on platform
  transportSolutions: [
    'Cold Chain',
    'Dangerous Goods',
    'High-Value Goods',
    'Last Mile Delivery',
    'Project Cargo',
    'General Solutions',
  ],
  industrySolutions: [
    'E-commerce',
    'Pharmaceuticals',
    'Electronics',
    'Automotive',
    'Manufacturing & Retail',
    'Exhibition & Interior Design',
    'Apparel & Fashion',
  ],
  additionalServices: [
    'E-commerce Fulfillment',
    'Cross Border Expansion',
    'Heavy Equipment Logistics',
    'Warehousing',
    'Customs Clearance',
  ],

  // Their own description from the platform
  description:
    'Dubai-based logistics powerhouse blending cutting-edge technology with strategic geographical advantages. ISO 9001:2015 certified — specialising in air, sea, and road freight with 3PL warehousing, customs brokerage, and specialized handling for diverse industries worldwide.',

  // Known clients from website
  notableClients: ['Aston Martin', 'Leader Healthcare', 'Patriot Sealing'],
};

// ── Demo leads — built around Boxman's real declared capabilities ─────────────

export interface DemoLead {
  id: string;
  channel: 'whatsapp' | 'email' | 'g2l';
  status: 'new' | 'contacted' | 'quoting' | 'sent' | 'won' | 'lost';
  from: string;
  company: string;
  country: string;
  flag: string;
  cargo: string;
  mode: 'air' | 'sea' | 'road';
  weight?: string;
  origin: string;
  destination: string;
  time: string;
  matchScore: number;
  winProbability: number;
  matchReasons: string[];
  marketRate?: {
    low: number;
    high: number;
    unit: string;
    trend: 'up' | 'down' | 'flat';
  };
  momentumSent?: boolean;
  momentumTime?: string;
  momentumMessage?: string;
  shipperReply?: string;
  value?: string;
}

export const DEMO_LEADS: DemoLead[] = [
  {
    id: 'lead-001',
    channel: 'whatsapp',
    status: 'new',
    from: 'Wolfgang Müller',
    company: 'Müller Automotive GmbH',
    country: 'Germany',
    flag: '🇩🇪',
    cargo:
      'Automotive parts (Aston Martin supplier) — DG class 9 lithium batteries',
    mode: 'air',
    weight: '800 kg',
    origin: 'Frankfurt (FRA)',
    destination: 'Dubai (DXB)',
    time: '2 min ago',
    matchScore: 96,
    winProbability: 88,
    matchReasons: [
      'Automotive expertise ✓',
      'DG class 9 certified ✓',
      'FRA→DXB regular lane ✓',
    ],
    marketRate: { low: 4.2, high: 4.8, unit: '/kg', trend: 'up' },
    momentumSent: true,
    momentumTime: '38 seconds after request',
    momentumMessage:
      "Hi Wolfgang, this is Freight Forwarding Co. in Dubai. Automotive freight including DG class 9 from Frankfurt is one of our core lanes — we handle Aston Martin's UAE logistics. We're checking current rates now. What's your target budget per kg?",
    value: '~$3,840',
  },
  {
    id: 'lead-002',
    channel: 'whatsapp',
    status: 'contacted',
    from: 'Priya Nair',
    company: 'MedCore Pharma',
    country: 'India',
    flag: '🇮🇳',
    cargo: 'Pharmaceutical products — temperature-controlled (+2°C to +8°C)',
    mode: 'air',
    weight: '340 kg',
    origin: 'Mumbai (BOM)',
    destination: 'Dubai (DXB)',
    time: '1 hr ago',
    matchScore: 91,
    winProbability: 79,
    matchReasons: [
      'Pharma industry ✓',
      'Cold chain certified ✓',
      'BOM↔DXB active lane ✓',
    ],
    marketRate: { low: 3.8, high: 4.4, unit: '/kg', trend: 'flat' },
    momentumSent: true,
    momentumTime: '52 seconds after request',
    momentumMessage:
      'Hi Priya, Freight Forwarding Co. here. We handle cold chain pharma freight between Mumbai and Dubai regularly — GDP-compliant handling, +2/+8°C guaranteed. Can you confirm the commodity and HS code?',
    shipperReply:
      "Yes, it's vaccines. HS code 3002.20. We need delivery by Thursday.",
    value: '~$1,530',
  },
  {
    id: 'lead-003',
    channel: 'g2l',
    status: 'quoting',
    from: 'Chen Wei',
    company: 'Shenzhen TechExport Co.',
    country: 'China',
    flag: '🇨🇳',
    cargo: 'Consumer electronics — 2×40ft FCL',
    mode: 'sea',
    weight: '24,000 kg',
    origin: 'Shenzhen (SZX)',
    destination: 'Jebel Ali (AEJEA)',
    time: '3 hr ago',
    matchScore: 88,
    winProbability: 72,
    matchReasons: [
      'Electronics ✓',
      'China→Jebel Ali declared lane ✓',
      'FCL capacity ✓',
    ],
    marketRate: { low: 1800, high: 2400, unit: '/TEU', trend: 'down' },
    momentumSent: true,
    momentumTime: '1 min 12 sec after request',
    momentumMessage:
      'Hi Chen, Freight Forwarding Co. here. We run regular FCL services from Shenzhen and Guangzhou to Jebel Ali — typically 18–22 days transit. Market rates are currently around $1,800–2,400/TEU. Is that in line with your budget?',
    value: '~$4,200',
  },
  {
    id: 'lead-004',
    channel: 'email',
    status: 'sent',
    from: 'Sara Al Mansoori',
    company: 'Emirates Exhibition LLC',
    country: 'UAE',
    flag: '🇦🇪',
    cargo: 'Exhibition stands & display materials — time-critical for GITEX',
    mode: 'road',
    weight: '2,800 kg',
    origin: 'Abu Dhabi',
    destination: 'Dubai World Trade Centre',
    time: '5 hr ago',
    matchScore: 85,
    winProbability: 83,
    matchReasons: [
      'Exhibition & Interior Design ✓',
      'UAE road coverage ✓',
      'Last mile ✓',
    ],
    marketRate: { low: 180, high: 320, unit: ' flat', trend: 'flat' },
    momentumSent: true,
    momentumTime: '2 min 05 sec after request',
    momentumMessage:
      'Hi Sara, Freight Forwarding Co. here. Exhibition logistics for GITEX is something we do every year — we know the DWTC loading bays well. We can have a truck in Abu Dhabi tomorrow morning. Sending proforma now.',
    value: '~$260',
  },
  {
    id: 'lead-005',
    channel: 'email',
    status: 'lost',
    from: 'James Okafor',
    company: 'Lagos Imports Ltd',
    country: 'Nigeria',
    flag: '🇳🇬',
    cargo: 'General cargo — 1×20ft LCL',
    mode: 'sea',
    weight: '8,500 kg',
    origin: 'Dubai (AEJEA)',
    destination: 'Lagos (NGAPP)',
    time: '1 day ago',
    matchScore: 41,
    winProbability: 18,
    matchReasons: ['Low match — lane not declared ✗', 'No Nigeria coverage ✗'],
    momentumSent: false,
    value: '~$1,100',
  },
];

// ── Performance stats ─────────────────────────────────────────────────────────

export const BOXMAN_STATS = {
  activeLeads: 14,
  newToday: 3,
  winRate: 61,
  atlasTarget: 78,
  avgResponseTime: '48 sec',
  avgQuoteTime: '22 min',
  dealsThisMonth: 8,
  revenueThisMonth: '$24,800',
  trustScore: 84,
  rankOnPlatform: 7,
  totalForwarders: 24,
};

// ── Market rate intelligence ─────────────────────────────────────────────────

export const MARKET_RATES = [
  {
    lane: 'FRA → DXB',
    mode: 'air',
    rate: '$4.2–4.8/kg',
    trend: 'up',
    delta: '+8% vs last week',
  },
  {
    lane: 'SHA → Jebel Ali',
    mode: 'sea',
    rate: '$1,800–2,400/TEU',
    trend: 'down',
    delta: '-5% vs last week',
  },
  {
    lane: 'BOM → DXB',
    mode: 'air',
    rate: '$3.8–4.4/kg',
    trend: 'flat',
    delta: 'stable',
  },
  {
    lane: 'Dubai → Riyadh',
    mode: 'road',
    rate: '$280–420 flat',
    trend: 'flat',
    delta: 'stable',
  },
];
