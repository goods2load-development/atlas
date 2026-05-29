/**
 * Route-aware sponsored ad engine for Goods2Load Atlas.
 *
 * Parses any free-text freight query, detects origin + destination
 * (any global trade route), and returns 3 contextually relevant
 * sponsored service cards.
 *
 * Zero backend calls — all client-side pattern matching.
 * Designed to be resilient: always returns 3 ads even if no route detected.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type Region =
  | 'middle-east'
  | 'europe'
  | 'asia'
  | 'south-asia'
  | 'southeast-asia'
  | 'americas'
  | 'africa'
  | 'oceania'
  | 'central-asia';

export type CargoCat =
  | 'pharma'
  | 'electronics'
  | 'automotive'
  | 'food'
  | 'dg'
  | 'general';

export type AdCategory =
  | 'warehousing'
  | 'customs'
  | 'insurance'
  | 'finance'
  | 'cold-chain'
  | 'dg-handling'
  | 'compliance';

export interface GeoEntry {
  country: string;
  city?: string;
  region: Region;
  flag: string;
}

export interface DetectedRoute {
  origin?: GeoEntry;
  destination?: GeoEntry;
  cargo?: CargoCat;
  mode?: 'air' | 'sea' | 'road';
}

export interface SponsoredAd {
  id: string;
  category: AdCategory;
  company: string;
  initial: string;
  avatarColor: string; // tailwind bg class
  headline: string;
  description: string;
  cta: string;
  url: string;
}

// ── Comprehensive geo lookup ──────────────────────────────────────────────────
// Keys are lowercase for case-insensitive matching.
// Covers ~200 locations: major trade cities, countries, IATA codes, port codes.

const GEO: Record<string, GeoEntry> = {
  // ── UAE / Middle East ──
  dubai: { country: 'UAE', city: 'Dubai', region: 'middle-east', flag: '🇦🇪' },
  dxb: { country: 'UAE', city: 'Dubai', region: 'middle-east', flag: '🇦🇪' },
  'abu dhabi': {
    country: 'UAE',
    city: 'Abu Dhabi',
    region: 'middle-east',
    flag: '🇦🇪',
  },
  auh: { country: 'UAE', city: 'Abu Dhabi', region: 'middle-east', flag: '🇦🇪' },
  sharjah: {
    country: 'UAE',
    city: 'Sharjah',
    region: 'middle-east',
    flag: '🇦🇪',
  },
  shj: { country: 'UAE', city: 'Sharjah', region: 'middle-east', flag: '🇦🇪' },
  'jebel ali': {
    country: 'UAE',
    city: 'Jebel Ali',
    region: 'middle-east',
    flag: '🇦🇪',
  },
  aejea: {
    country: 'UAE',
    city: 'Jebel Ali',
    region: 'middle-east',
    flag: '🇦🇪',
  },
  uae: { country: 'UAE', region: 'middle-east', flag: '🇦🇪' },
  'united arab emirates': { country: 'UAE', region: 'middle-east', flag: '🇦🇪' },

  // Saudi Arabia
  saudi: { country: 'Saudi Arabia', region: 'middle-east', flag: '🇸🇦' },
  'saudi arabia': {
    country: 'Saudi Arabia',
    region: 'middle-east',
    flag: '🇸🇦',
  },
  ksa: { country: 'Saudi Arabia', region: 'middle-east', flag: '🇸🇦' },
  riyadh: {
    country: 'Saudi Arabia',
    city: 'Riyadh',
    region: 'middle-east',
    flag: '🇸🇦',
  },
  ruh: {
    country: 'Saudi Arabia',
    city: 'Riyadh',
    region: 'middle-east',
    flag: '🇸🇦',
  },
  jeddah: {
    country: 'Saudi Arabia',
    city: 'Jeddah',
    region: 'middle-east',
    flag: '🇸🇦',
  },
  jed: {
    country: 'Saudi Arabia',
    city: 'Jeddah',
    region: 'middle-east',
    flag: '🇸🇦',
  },
  dammam: {
    country: 'Saudi Arabia',
    city: 'Dammam',
    region: 'middle-east',
    flag: '🇸🇦',
  },

  // Other Middle East
  qatar: { country: 'Qatar', region: 'middle-east', flag: '🇶🇦' },
  doha: { country: 'Qatar', city: 'Doha', region: 'middle-east', flag: '🇶🇦' },
  doh: { country: 'Qatar', city: 'Doha', region: 'middle-east', flag: '🇶🇦' },
  kuwait: { country: 'Kuwait', region: 'middle-east', flag: '🇰🇼' },
  kwi: { country: 'Kuwait', region: 'middle-east', flag: '🇰🇼' },
  bahrain: { country: 'Bahrain', region: 'middle-east', flag: '🇧🇭' },
  bah: { country: 'Bahrain', region: 'middle-east', flag: '🇧🇭' },
  oman: { country: 'Oman', region: 'middle-east', flag: '🇴🇲' },
  muscat: {
    country: 'Oman',
    city: 'Muscat',
    region: 'middle-east',
    flag: '🇴🇲',
  },
  mct: { country: 'Oman', city: 'Muscat', region: 'middle-east', flag: '🇴🇲' },
  jordan: { country: 'Jordan', region: 'middle-east', flag: '🇯🇴' },
  amman: {
    country: 'Jordan',
    city: 'Amman',
    region: 'middle-east',
    flag: '🇯🇴',
  },
  amm: { country: 'Jordan', city: 'Amman', region: 'middle-east', flag: '🇯🇴' },
  iraq: { country: 'Iraq', region: 'middle-east', flag: '🇮🇶' },
  baghdad: {
    country: 'Iraq',
    city: 'Baghdad',
    region: 'middle-east',
    flag: '🇮🇶',
  },
  bgw: { country: 'Iraq', city: 'Baghdad', region: 'middle-east', flag: '🇮🇶' },
  basra: { country: 'Iraq', city: 'Basra', region: 'middle-east', flag: '🇮🇶' },
  lebanon: { country: 'Lebanon', region: 'middle-east', flag: '🇱🇧' },
  beirut: {
    country: 'Lebanon',
    city: 'Beirut',
    region: 'middle-east',
    flag: '🇱🇧',
  },
  bey: {
    country: 'Lebanon',
    city: 'Beirut',
    region: 'middle-east',
    flag: '🇱🇧',
  },
  israel: { country: 'Israel', region: 'middle-east', flag: '🇮🇱' },
  'tel aviv': {
    country: 'Israel',
    city: 'Tel Aviv',
    region: 'middle-east',
    flag: '🇮🇱',
  },
  tlv: {
    country: 'Israel',
    city: 'Tel Aviv',
    region: 'middle-east',
    flag: '🇮🇱',
  },
  iran: { country: 'Iran', region: 'middle-east', flag: '🇮🇷' },
  tehran: {
    country: 'Iran',
    city: 'Tehran',
    region: 'middle-east',
    flag: '🇮🇷',
  },
  thr: { country: 'Iran', city: 'Tehran', region: 'middle-east', flag: '🇮🇷' },
  yemen: { country: 'Yemen', region: 'middle-east', flag: '🇾🇪' },

  // ── Europe ──
  germany: { country: 'Germany', region: 'europe', flag: '🇩🇪' },
  frankfurt: {
    country: 'Germany',
    city: 'Frankfurt',
    region: 'europe',
    flag: '🇩🇪',
  },
  fra: { country: 'Germany', city: 'Frankfurt', region: 'europe', flag: '🇩🇪' },
  hamburg: {
    country: 'Germany',
    city: 'Hamburg',
    region: 'europe',
    flag: '🇩🇪',
  },
  ham: { country: 'Germany', city: 'Hamburg', region: 'europe', flag: '🇩🇪' },
  munich: { country: 'Germany', city: 'Munich', region: 'europe', flag: '🇩🇪' },
  muc: { country: 'Germany', city: 'Munich', region: 'europe', flag: '🇩🇪' },
  berlin: { country: 'Germany', city: 'Berlin', region: 'europe', flag: '🇩🇪' },
  ber: { country: 'Germany', city: 'Berlin', region: 'europe', flag: '🇩🇪' },
  dusseldorf: {
    country: 'Germany',
    city: 'Düsseldorf',
    region: 'europe',
    flag: '🇩🇪',
  },
  dus: { country: 'Germany', city: 'Düsseldorf', region: 'europe', flag: '🇩🇪' },

  uk: { country: 'UK', region: 'europe', flag: '🇬🇧' },
  'united kingdom': { country: 'UK', region: 'europe', flag: '🇬🇧' },
  britain: { country: 'UK', region: 'europe', flag: '🇬🇧' },
  england: { country: 'UK', region: 'europe', flag: '🇬🇧' },
  london: { country: 'UK', city: 'London', region: 'europe', flag: '🇬🇧' },
  lhr: { country: 'UK', city: 'London Heathrow', region: 'europe', flag: '🇬🇧' },
  lgw: { country: 'UK', city: 'London Gatwick', region: 'europe', flag: '🇬🇧' },
  felixstowe: {
    country: 'UK',
    city: 'Felixstowe',
    region: 'europe',
    flag: '🇬🇧',
  },
  manchester: {
    country: 'UK',
    city: 'Manchester',
    region: 'europe',
    flag: '🇬🇧',
  },
  man: { country: 'UK', city: 'Manchester', region: 'europe', flag: '🇬🇧' },

  france: { country: 'France', region: 'europe', flag: '🇫🇷' },
  paris: { country: 'France', city: 'Paris', region: 'europe', flag: '🇫🇷' },
  cdg: { country: 'France', city: 'Paris CDG', region: 'europe', flag: '🇫🇷' },
  marseille: {
    country: 'France',
    city: 'Marseille',
    region: 'europe',
    flag: '🇫🇷',
  },
  mrs: { country: 'France', city: 'Marseille', region: 'europe', flag: '🇫🇷' },
  'le havre': {
    country: 'France',
    city: 'Le Havre',
    region: 'europe',
    flag: '🇫🇷',
  },
  lyon: { country: 'France', city: 'Lyon', region: 'europe', flag: '🇫🇷' },
  lys: { country: 'France', city: 'Lyon', region: 'europe', flag: '🇫🇷' },

  netherlands: { country: 'Netherlands', region: 'europe', flag: '🇳🇱' },
  holland: { country: 'Netherlands', region: 'europe', flag: '🇳🇱' },
  rotterdam: {
    country: 'Netherlands',
    city: 'Rotterdam',
    region: 'europe',
    flag: '🇳🇱',
  },
  nlrtm: {
    country: 'Netherlands',
    city: 'Rotterdam',
    region: 'europe',
    flag: '🇳🇱',
  },
  amsterdam: {
    country: 'Netherlands',
    city: 'Amsterdam',
    region: 'europe',
    flag: '🇳🇱',
  },
  ams: {
    country: 'Netherlands',
    city: 'Amsterdam',
    region: 'europe',
    flag: '🇳🇱',
  },

  belgium: { country: 'Belgium', region: 'europe', flag: '🇧🇪' },
  brussels: {
    country: 'Belgium',
    city: 'Brussels',
    region: 'europe',
    flag: '🇧🇪',
  },
  bru: { country: 'Belgium', city: 'Brussels', region: 'europe', flag: '🇧🇪' },
  antwerp: {
    country: 'Belgium',
    city: 'Antwerp',
    region: 'europe',
    flag: '🇧🇪',
  },

  italy: { country: 'Italy', region: 'europe', flag: '🇮🇹' },
  milan: { country: 'Italy', city: 'Milan', region: 'europe', flag: '🇮🇹' },
  mxp: { country: 'Italy', city: 'Milan', region: 'europe', flag: '🇮🇹' },
  lin: { country: 'Italy', city: 'Milan', region: 'europe', flag: '🇮🇹' },
  rome: { country: 'Italy', city: 'Rome', region: 'europe', flag: '🇮🇹' },
  fco: { country: 'Italy', city: 'Rome', region: 'europe', flag: '🇮🇹' },
  genoa: { country: 'Italy', city: 'Genoa', region: 'europe', flag: '🇮🇹' },
  genova: { country: 'Italy', city: 'Genoa', region: 'europe', flag: '🇮🇹' },
  venice: { country: 'Italy', city: 'Venice', region: 'europe', flag: '🇮🇹' },
  vce: { country: 'Italy', city: 'Venice', region: 'europe', flag: '🇮🇹' },

  spain: { country: 'Spain', region: 'europe', flag: '🇪🇸' },
  madrid: { country: 'Spain', city: 'Madrid', region: 'europe', flag: '🇪🇸' },
  mad: { country: 'Spain', city: 'Madrid', region: 'europe', flag: '🇪🇸' },
  barcelona: {
    country: 'Spain',
    city: 'Barcelona',
    region: 'europe',
    flag: '🇪🇸',
  },
  bcn: { country: 'Spain', city: 'Barcelona', region: 'europe', flag: '🇪🇸' },
  valencia: {
    country: 'Spain',
    city: 'Valencia',
    region: 'europe',
    flag: '🇪🇸',
  },

  switzerland: { country: 'Switzerland', region: 'europe', flag: '🇨🇭' },
  zurich: {
    country: 'Switzerland',
    city: 'Zurich',
    region: 'europe',
    flag: '🇨🇭',
  },
  zrh: { country: 'Switzerland', city: 'Zurich', region: 'europe', flag: '🇨🇭' },
  geneva: {
    country: 'Switzerland',
    city: 'Geneva',
    region: 'europe',
    flag: '🇨🇭',
  },
  gva: { country: 'Switzerland', city: 'Geneva', region: 'europe', flag: '🇨🇭' },

  poland: { country: 'Poland', region: 'europe', flag: '🇵🇱' },
  warsaw: { country: 'Poland', city: 'Warsaw', region: 'europe', flag: '🇵🇱' },
  waw: { country: 'Poland', city: 'Warsaw', region: 'europe', flag: '🇵🇱' },
  gdansk: { country: 'Poland', city: 'Gdańsk', region: 'europe', flag: '🇵🇱' },

  turkey: { country: 'Turkey', region: 'europe', flag: '🇹🇷' },
  turkiye: { country: 'Turkey', region: 'europe', flag: '🇹🇷' },
  istanbul: {
    country: 'Turkey',
    city: 'Istanbul',
    region: 'europe',
    flag: '🇹🇷',
  },
  ist: { country: 'Turkey', city: 'Istanbul', region: 'europe', flag: '🇹🇷' },
  ankara: { country: 'Turkey', city: 'Ankara', region: 'europe', flag: '🇹🇷' },
  izmir: { country: 'Turkey', city: 'Izmir', region: 'europe', flag: '🇹🇷' },

  sweden: { country: 'Sweden', region: 'europe', flag: '🇸🇪' },
  stockholm: {
    country: 'Sweden',
    city: 'Stockholm',
    region: 'europe',
    flag: '🇸🇪',
  },
  arn: { country: 'Sweden', city: 'Stockholm', region: 'europe', flag: '🇸🇪' },
  norway: { country: 'Norway', region: 'europe', flag: '🇳🇴' },
  oslo: { country: 'Norway', city: 'Oslo', region: 'europe', flag: '🇳🇴' },
  osl: { country: 'Norway', city: 'Oslo', region: 'europe', flag: '🇳🇴' },
  denmark: { country: 'Denmark', region: 'europe', flag: '🇩🇰' },
  copenhagen: {
    country: 'Denmark',
    city: 'Copenhagen',
    region: 'europe',
    flag: '🇩🇰',
  },
  cph: { country: 'Denmark', city: 'Copenhagen', region: 'europe', flag: '🇩🇰' },
  finland: { country: 'Finland', region: 'europe', flag: '🇫🇮' },
  helsinki: {
    country: 'Finland',
    city: 'Helsinki',
    region: 'europe',
    flag: '🇫🇮',
  },
  hel: { country: 'Finland', city: 'Helsinki', region: 'europe', flag: '🇫🇮' },

  portugal: { country: 'Portugal', region: 'europe', flag: '🇵🇹' },
  lisbon: { country: 'Portugal', city: 'Lisbon', region: 'europe', flag: '🇵🇹' },
  lis: { country: 'Portugal', city: 'Lisbon', region: 'europe', flag: '🇵🇹' },
  greece: { country: 'Greece', region: 'europe', flag: '🇬🇷' },
  athens: { country: 'Greece', city: 'Athens', region: 'europe', flag: '🇬🇷' },
  ath: { country: 'Greece', city: 'Athens', region: 'europe', flag: '🇬🇷' },
  piraeus: { country: 'Greece', city: 'Piraeus', region: 'europe', flag: '🇬🇷' },

  austria: { country: 'Austria', region: 'europe', flag: '🇦🇹' },
  vienna: { country: 'Austria', city: 'Vienna', region: 'europe', flag: '🇦🇹' },
  vie: { country: 'Austria', city: 'Vienna', region: 'europe', flag: '🇦🇹' },
  'czech republic': { country: 'Czech Republic', region: 'europe', flag: '🇨🇿' },
  czechia: { country: 'Czech Republic', region: 'europe', flag: '🇨🇿' },
  prague: {
    country: 'Czech Republic',
    city: 'Prague',
    region: 'europe',
    flag: '🇨🇿',
  },
  prg: {
    country: 'Czech Republic',
    city: 'Prague',
    region: 'europe',
    flag: '🇨🇿',
  },
  hungary: { country: 'Hungary', region: 'europe', flag: '🇭🇺' },
  budapest: {
    country: 'Hungary',
    city: 'Budapest',
    region: 'europe',
    flag: '🇭🇺',
  },
  bud: { country: 'Hungary', city: 'Budapest', region: 'europe', flag: '🇭🇺' },
  romania: { country: 'Romania', region: 'europe', flag: '🇷🇴' },
  bucharest: {
    country: 'Romania',
    city: 'Bucharest',
    region: 'europe',
    flag: '🇷🇴',
  },
  russia: { country: 'Russia', region: 'europe', flag: '🇷🇺' },
  moscow: { country: 'Russia', city: 'Moscow', region: 'europe', flag: '🇷🇺' },
  svo: { country: 'Russia', city: 'Moscow', region: 'europe', flag: '🇷🇺' },
  ukraine: { country: 'Ukraine', region: 'europe', flag: '🇺🇦' },
  kyiv: { country: 'Ukraine', city: 'Kyiv', region: 'europe', flag: '🇺🇦' },

  // ── Asia ──
  china: { country: 'China', region: 'asia', flag: '🇨🇳' },
  shanghai: { country: 'China', city: 'Shanghai', region: 'asia', flag: '🇨🇳' },
  sha: { country: 'China', city: 'Shanghai', region: 'asia', flag: '🇨🇳' },
  pvg: { country: 'China', city: 'Shanghai', region: 'asia', flag: '🇨🇳' },
  shenzhen: { country: 'China', city: 'Shenzhen', region: 'asia', flag: '🇨🇳' },
  szx: { country: 'China', city: 'Shenzhen', region: 'asia', flag: '🇨🇳' },
  cnszx: { country: 'China', city: 'Shenzhen', region: 'asia', flag: '🇨🇳' },
  guangzhou: {
    country: 'China',
    city: 'Guangzhou',
    region: 'asia',
    flag: '🇨🇳',
  },
  can: { country: 'China', city: 'Guangzhou', region: 'asia', flag: '🇨🇳' },
  beijing: { country: 'China', city: 'Beijing', region: 'asia', flag: '🇨🇳' },
  pek: { country: 'China', city: 'Beijing', region: 'asia', flag: '🇨🇳' },
  tianjin: { country: 'China', city: 'Tianjin', region: 'asia', flag: '🇨🇳' },
  tna: { country: 'China', city: 'Tianjin', region: 'asia', flag: '🇨🇳' },
  qingdao: { country: 'China', city: 'Qingdao', region: 'asia', flag: '🇨🇳' },
  tao: { country: 'China', city: 'Qingdao', region: 'asia', flag: '🇨🇳' },
  ningbo: { country: 'China', city: 'Ningbo', region: 'asia', flag: '🇨🇳' },
  ngb: { country: 'China', city: 'Ningbo', region: 'asia', flag: '🇨🇳' },
  chengdu: { country: 'China', city: 'Chengdu', region: 'asia', flag: '🇨🇳' },
  ctu: { country: 'China', city: 'Chengdu', region: 'asia', flag: '🇨🇳' },

  japan: { country: 'Japan', region: 'asia', flag: '🇯🇵' },
  tokyo: { country: 'Japan', city: 'Tokyo', region: 'asia', flag: '🇯🇵' },
  nrt: { country: 'Japan', city: 'Tokyo', region: 'asia', flag: '🇯🇵' },
  hnd: { country: 'Japan', city: 'Tokyo', region: 'asia', flag: '🇯🇵' },
  osaka: { country: 'Japan', city: 'Osaka', region: 'asia', flag: '🇯🇵' },
  kix: { country: 'Japan', city: 'Osaka', region: 'asia', flag: '🇯🇵' },
  jposa: { country: 'Japan', city: 'Osaka', region: 'asia', flag: '🇯🇵' },
  nagoya: { country: 'Japan', city: 'Nagoya', region: 'asia', flag: '🇯🇵' },
  ngo: { country: 'Japan', city: 'Nagoya', region: 'asia', flag: '🇯🇵' },

  'south korea': { country: 'South Korea', region: 'asia', flag: '🇰🇷' },
  korea: { country: 'South Korea', region: 'asia', flag: '🇰🇷' },
  seoul: { country: 'South Korea', city: 'Seoul', region: 'asia', flag: '🇰🇷' },
  icn: { country: 'South Korea', city: 'Seoul', region: 'asia', flag: '🇰🇷' },
  busan: { country: 'South Korea', city: 'Busan', region: 'asia', flag: '🇰🇷' },
  pus: { country: 'South Korea', city: 'Busan', region: 'asia', flag: '🇰🇷' },

  'hong kong': { country: 'Hong Kong', region: 'asia', flag: '🇭🇰' },
  hkg: { country: 'Hong Kong', region: 'asia', flag: '🇭🇰' },
  taiwan: { country: 'Taiwan', region: 'asia', flag: '🇹🇼' },
  taipei: { country: 'Taiwan', city: 'Taipei', region: 'asia', flag: '🇹🇼' },
  tpe: { country: 'Taiwan', city: 'Taipei', region: 'asia', flag: '🇹🇼' },

  // ── South Asia ──
  india: { country: 'India', region: 'south-asia', flag: '🇮🇳' },
  mumbai: {
    country: 'India',
    city: 'Mumbai',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  bom: { country: 'India', city: 'Mumbai', region: 'south-asia', flag: '🇮🇳' },
  'new delhi': {
    country: 'India',
    city: 'Delhi',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  delhi: { country: 'India', city: 'Delhi', region: 'south-asia', flag: '🇮🇳' },
  del: { country: 'India', city: 'Delhi', region: 'south-asia', flag: '🇮🇳' },
  chennai: {
    country: 'India',
    city: 'Chennai',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  maa: { country: 'India', city: 'Chennai', region: 'south-asia', flag: '🇮🇳' },
  bangalore: {
    country: 'India',
    city: 'Bangalore',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  bengaluru: {
    country: 'India',
    city: 'Bangalore',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  blr: {
    country: 'India',
    city: 'Bangalore',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  kolkata: {
    country: 'India',
    city: 'Kolkata',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  ccu: { country: 'India', city: 'Kolkata', region: 'south-asia', flag: '🇮🇳' },
  hyderabad: {
    country: 'India',
    city: 'Hyderabad',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  hyd: {
    country: 'India',
    city: 'Hyderabad',
    region: 'south-asia',
    flag: '🇮🇳',
  },
  pakistan: { country: 'Pakistan', region: 'south-asia', flag: '🇵🇰' },
  karachi: {
    country: 'Pakistan',
    city: 'Karachi',
    region: 'south-asia',
    flag: '🇵🇰',
  },
  khi: {
    country: 'Pakistan',
    city: 'Karachi',
    region: 'south-asia',
    flag: '🇵🇰',
  },
  lahore: {
    country: 'Pakistan',
    city: 'Lahore',
    region: 'south-asia',
    flag: '🇵🇰',
  },
  lhe: {
    country: 'Pakistan',
    city: 'Lahore',
    region: 'south-asia',
    flag: '🇵🇰',
  },
  'sri lanka': { country: 'Sri Lanka', region: 'south-asia', flag: '🇱🇰' },
  colombo: {
    country: 'Sri Lanka',
    city: 'Colombo',
    region: 'south-asia',
    flag: '🇱🇰',
  },
  cmb: {
    country: 'Sri Lanka',
    city: 'Colombo',
    region: 'south-asia',
    flag: '🇱🇰',
  },
  bangladesh: { country: 'Bangladesh', region: 'south-asia', flag: '🇧🇩' },
  dhaka: {
    country: 'Bangladesh',
    city: 'Dhaka',
    region: 'south-asia',
    flag: '🇧🇩',
  },
  dac: {
    country: 'Bangladesh',
    city: 'Dhaka',
    region: 'south-asia',
    flag: '🇧🇩',
  },

  // ── Southeast Asia ──
  singapore: { country: 'Singapore', region: 'southeast-asia', flag: '🇸🇬' },
  sin: { country: 'Singapore', region: 'southeast-asia', flag: '🇸🇬' },
  sgs: { country: 'Singapore', region: 'southeast-asia', flag: '🇸🇬' },
  malaysia: { country: 'Malaysia', region: 'southeast-asia', flag: '🇲🇾' },
  'kuala lumpur': {
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    region: 'southeast-asia',
    flag: '🇲🇾',
  },
  kul: {
    country: 'Malaysia',
    city: 'Kuala Lumpur',
    region: 'southeast-asia',
    flag: '🇲🇾',
  },
  'port klang': {
    country: 'Malaysia',
    city: 'Port Klang',
    region: 'southeast-asia',
    flag: '🇲🇾',
  },
  thailand: { country: 'Thailand', region: 'southeast-asia', flag: '🇹🇭' },
  bangkok: {
    country: 'Thailand',
    city: 'Bangkok',
    region: 'southeast-asia',
    flag: '🇹🇭',
  },
  bkk: {
    country: 'Thailand',
    city: 'Bangkok',
    region: 'southeast-asia',
    flag: '🇹🇭',
  },
  vietnam: { country: 'Vietnam', region: 'southeast-asia', flag: '🇻🇳' },
  'ho chi minh': {
    country: 'Vietnam',
    city: 'Ho Chi Minh City',
    region: 'southeast-asia',
    flag: '🇻🇳',
  },
  sgn: {
    country: 'Vietnam',
    city: 'Ho Chi Minh City',
    region: 'southeast-asia',
    flag: '🇻🇳',
  },
  hanoi: {
    country: 'Vietnam',
    city: 'Hanoi',
    region: 'southeast-asia',
    flag: '🇻🇳',
  },
  han: {
    country: 'Vietnam',
    city: 'Hanoi',
    region: 'southeast-asia',
    flag: '🇻🇳',
  },
  indonesia: { country: 'Indonesia', region: 'southeast-asia', flag: '🇮🇩' },
  jakarta: {
    country: 'Indonesia',
    city: 'Jakarta',
    region: 'southeast-asia',
    flag: '🇮🇩',
  },
  cgk: {
    country: 'Indonesia',
    city: 'Jakarta',
    region: 'southeast-asia',
    flag: '🇮🇩',
  },
  philippines: { country: 'Philippines', region: 'southeast-asia', flag: '🇵🇭' },
  manila: {
    country: 'Philippines',
    city: 'Manila',
    region: 'southeast-asia',
    flag: '🇵🇭',
  },
  mnl: {
    country: 'Philippines',
    city: 'Manila',
    region: 'southeast-asia',
    flag: '🇵🇭',
  },
  cambodia: { country: 'Cambodia', region: 'southeast-asia', flag: '🇰🇭' },
  'phnom penh': {
    country: 'Cambodia',
    city: 'Phnom Penh',
    region: 'southeast-asia',
    flag: '🇰🇭',
  },
  myanmar: { country: 'Myanmar', region: 'southeast-asia', flag: '🇲🇲' },
  rangoon: {
    country: 'Myanmar',
    city: 'Yangon',
    region: 'southeast-asia',
    flag: '🇲🇲',
  },
  yangon: {
    country: 'Myanmar',
    city: 'Yangon',
    region: 'southeast-asia',
    flag: '🇲🇲',
  },

  // ── Americas ──
  usa: { country: 'USA', region: 'americas', flag: '🇺🇸' },
  'united states': { country: 'USA', region: 'americas', flag: '🇺🇸' },
  america: { country: 'USA', region: 'americas', flag: '🇺🇸' },
  'new york': {
    country: 'USA',
    city: 'New York',
    region: 'americas',
    flag: '🇺🇸',
  },
  nyc: { country: 'USA', city: 'New York', region: 'americas', flag: '🇺🇸' },
  jfk: { country: 'USA', city: 'New York JFK', region: 'americas', flag: '🇺🇸' },
  ewr: {
    country: 'USA',
    city: 'New York/Newark',
    region: 'americas',
    flag: '🇺🇸',
  },
  'los angeles': {
    country: 'USA',
    city: 'Los Angeles',
    region: 'americas',
    flag: '🇺🇸',
  },
  lax: { country: 'USA', city: 'Los Angeles', region: 'americas', flag: '🇺🇸' },
  miami: { country: 'USA', city: 'Miami', region: 'americas', flag: '🇺🇸' },
  mia: { country: 'USA', city: 'Miami', region: 'americas', flag: '🇺🇸' },
  chicago: { country: 'USA', city: 'Chicago', region: 'americas', flag: '🇺🇸' },
  ord: { country: 'USA', city: 'Chicago', region: 'americas', flag: '🇺🇸' },
  houston: { country: 'USA', city: 'Houston', region: 'americas', flag: '🇺🇸' },
  iah: { country: 'USA', city: 'Houston', region: 'americas', flag: '🇺🇸' },
  'san francisco': {
    country: 'USA',
    city: 'San Francisco',
    region: 'americas',
    flag: '🇺🇸',
  },
  sfo: {
    country: 'USA',
    city: 'San Francisco',
    region: 'americas',
    flag: '🇺🇸',
  },
  seattle: { country: 'USA', city: 'Seattle', region: 'americas', flag: '🇺🇸' },
  sea: { country: 'USA', city: 'Seattle', region: 'americas', flag: '🇺🇸' },
  'long beach': {
    country: 'USA',
    city: 'Long Beach',
    region: 'americas',
    flag: '🇺🇸',
  },

  canada: { country: 'Canada', region: 'americas', flag: '🇨🇦' },
  toronto: {
    country: 'Canada',
    city: 'Toronto',
    region: 'americas',
    flag: '🇨🇦',
  },
  yyz: { country: 'Canada', city: 'Toronto', region: 'americas', flag: '🇨🇦' },
  vancouver: {
    country: 'Canada',
    city: 'Vancouver',
    region: 'americas',
    flag: '🇨🇦',
  },
  yvr: { country: 'Canada', city: 'Vancouver', region: 'americas', flag: '🇨🇦' },
  montreal: {
    country: 'Canada',
    city: 'Montreal',
    region: 'americas',
    flag: '🇨🇦',
  },
  yul: { country: 'Canada', city: 'Montreal', region: 'americas', flag: '🇨🇦' },

  mexico: { country: 'Mexico', region: 'americas', flag: '🇲🇽' },
  'mexico city': {
    country: 'Mexico',
    city: 'Mexico City',
    region: 'americas',
    flag: '🇲🇽',
  },
  mex: {
    country: 'Mexico',
    city: 'Mexico City',
    region: 'americas',
    flag: '🇲🇽',
  },
  guadalajara: {
    country: 'Mexico',
    city: 'Guadalajara',
    region: 'americas',
    flag: '🇲🇽',
  },
  gdl: {
    country: 'Mexico',
    city: 'Guadalajara',
    region: 'americas',
    flag: '🇲🇽',
  },
  manzanillo: {
    country: 'Mexico',
    city: 'Manzanillo',
    region: 'americas',
    flag: '🇲🇽',
  },

  brazil: { country: 'Brazil', region: 'americas', flag: '🇧🇷' },
  'sao paulo': {
    country: 'Brazil',
    city: 'São Paulo',
    region: 'americas',
    flag: '🇧🇷',
  },
  gru: { country: 'Brazil', city: 'São Paulo', region: 'americas', flag: '🇧🇷' },
  santos: { country: 'Brazil', city: 'Santos', region: 'americas', flag: '🇧🇷' },
  'rio de janeiro': {
    country: 'Brazil',
    city: 'Rio de Janeiro',
    region: 'americas',
    flag: '🇧🇷',
  },
  gig: {
    country: 'Brazil',
    city: 'Rio de Janeiro',
    region: 'americas',
    flag: '🇧🇷',
  },
  argentina: { country: 'Argentina', region: 'americas', flag: '🇦🇷' },
  'buenos aires': {
    country: 'Argentina',
    city: 'Buenos Aires',
    region: 'americas',
    flag: '🇦🇷',
  },
  eze: {
    country: 'Argentina',
    city: 'Buenos Aires',
    region: 'americas',
    flag: '🇦🇷',
  },
  chile: { country: 'Chile', region: 'americas', flag: '🇨🇱' },
  santiago: {
    country: 'Chile',
    city: 'Santiago',
    region: 'americas',
    flag: '🇨🇱',
  },
  scl: { country: 'Chile', city: 'Santiago', region: 'americas', flag: '🇨🇱' },
  colombia: { country: 'Colombia', region: 'americas', flag: '🇨🇴' },
  bogota: {
    country: 'Colombia',
    city: 'Bogotá',
    region: 'americas',
    flag: '🇨🇴',
  },
  bog: { country: 'Colombia', city: 'Bogotá', region: 'americas', flag: '🇨🇴' },
  peru: { country: 'Peru', region: 'americas', flag: '🇵🇪' },
  lima: { country: 'Peru', city: 'Lima', region: 'americas', flag: '🇵🇪' },
  lim: { country: 'Peru', city: 'Lima', region: 'americas', flag: '🇵🇪' },

  // ── Africa ──
  nigeria: { country: 'Nigeria', region: 'africa', flag: '🇳🇬' },
  lagos: { country: 'Nigeria', city: 'Lagos', region: 'africa', flag: '🇳🇬' },
  los: { country: 'Nigeria', city: 'Lagos', region: 'africa', flag: '🇳🇬' },
  abuja: { country: 'Nigeria', city: 'Abuja', region: 'africa', flag: '🇳🇬' },
  'south africa': { country: 'South Africa', region: 'africa', flag: '🇿🇦' },
  johannesburg: {
    country: 'South Africa',
    city: 'Johannesburg',
    region: 'africa',
    flag: '🇿🇦',
  },
  jnb: {
    country: 'South Africa',
    city: 'Johannesburg',
    region: 'africa',
    flag: '🇿🇦',
  },
  'cape town': {
    country: 'South Africa',
    city: 'Cape Town',
    region: 'africa',
    flag: '🇿🇦',
  },
  cpt: {
    country: 'South Africa',
    city: 'Cape Town',
    region: 'africa',
    flag: '🇿🇦',
  },
  durban: {
    country: 'South Africa',
    city: 'Durban',
    region: 'africa',
    flag: '🇿🇦',
  },
  dur: {
    country: 'South Africa',
    city: 'Durban',
    region: 'africa',
    flag: '🇿🇦',
  },
  kenya: { country: 'Kenya', region: 'africa', flag: '🇰🇪' },
  nairobi: { country: 'Kenya', city: 'Nairobi', region: 'africa', flag: '🇰🇪' },
  nbo: { country: 'Kenya', city: 'Nairobi', region: 'africa', flag: '🇰🇪' },
  mombasa: { country: 'Kenya', city: 'Mombasa', region: 'africa', flag: '🇰🇪' },
  mba: { country: 'Kenya', city: 'Mombasa', region: 'africa', flag: '🇰🇪' },
  ethiopia: { country: 'Ethiopia', region: 'africa', flag: '🇪🇹' },
  'addis ababa': {
    country: 'Ethiopia',
    city: 'Addis Ababa',
    region: 'africa',
    flag: '🇪🇹',
  },
  add: {
    country: 'Ethiopia',
    city: 'Addis Ababa',
    region: 'africa',
    flag: '🇪🇹',
  },
  egypt: { country: 'Egypt', region: 'africa', flag: '🇪🇬' },
  cairo: { country: 'Egypt', city: 'Cairo', region: 'africa', flag: '🇪🇬' },
  cai: { country: 'Egypt', city: 'Cairo', region: 'africa', flag: '🇪🇬' },
  'port said': {
    country: 'Egypt',
    city: 'Port Said',
    region: 'africa',
    flag: '🇪🇬',
  },
  morocco: { country: 'Morocco', region: 'africa', flag: '🇲🇦' },
  casablanca: {
    country: 'Morocco',
    city: 'Casablanca',
    region: 'africa',
    flag: '🇲🇦',
  },
  cmy: { country: 'Morocco', city: 'Casablanca', region: 'africa', flag: '🇲🇦' },
  ghana: { country: 'Ghana', region: 'africa', flag: '🇬🇭' },
  accra: { country: 'Ghana', city: 'Accra', region: 'africa', flag: '🇬🇭' },
  acc: { country: 'Ghana', city: 'Accra', region: 'africa', flag: '🇬🇭' },
  tanzania: { country: 'Tanzania', region: 'africa', flag: '🇹🇿' },
  'dar es salaam': {
    country: 'Tanzania',
    city: 'Dar es Salaam',
    region: 'africa',
    flag: '🇹🇿',
  },
  dar: {
    country: 'Tanzania',
    city: 'Dar es Salaam',
    region: 'africa',
    flag: '🇹🇿',
  },

  // ── Oceania ──
  australia: { country: 'Australia', region: 'oceania', flag: '🇦🇺' },
  sydney: {
    country: 'Australia',
    city: 'Sydney',
    region: 'oceania',
    flag: '🇦🇺',
  },
  syd: { country: 'Australia', city: 'Sydney', region: 'oceania', flag: '🇦🇺' },
  melbourne: {
    country: 'Australia',
    city: 'Melbourne',
    region: 'oceania',
    flag: '🇦🇺',
  },
  mel: {
    country: 'Australia',
    city: 'Melbourne',
    region: 'oceania',
    flag: '🇦🇺',
  },
  brisbane: {
    country: 'Australia',
    city: 'Brisbane',
    region: 'oceania',
    flag: '🇦🇺',
  },
  bne: {
    country: 'Australia',
    city: 'Brisbane',
    region: 'oceania',
    flag: '🇦🇺',
  },
  perth: { country: 'Australia', city: 'Perth', region: 'oceania', flag: '🇦🇺' },
  per: { country: 'Australia', city: 'Perth', region: 'oceania', flag: '🇦🇺' },
  'new zealand': { country: 'New Zealand', region: 'oceania', flag: '🇳🇿' },
  auckland: {
    country: 'New Zealand',
    city: 'Auckland',
    region: 'oceania',
    flag: '🇳🇿',
  },
  akl: {
    country: 'New Zealand',
    city: 'Auckland',
    region: 'oceania',
    flag: '🇳🇿',
  },

  // ── Central Asia / CIS ──
  kazakhstan: { country: 'Kazakhstan', region: 'central-asia', flag: '🇰🇿' },
  almaty: {
    country: 'Kazakhstan',
    city: 'Almaty',
    region: 'central-asia',
    flag: '🇰🇿',
  },
  ala: {
    country: 'Kazakhstan',
    city: 'Almaty',
    region: 'central-asia',
    flag: '🇰🇿',
  },
  uzbekistan: { country: 'Uzbekistan', region: 'central-asia', flag: '🇺🇿' },
  tashkent: {
    country: 'Uzbekistan',
    city: 'Tashkent',
    region: 'central-asia',
    flag: '🇺🇿',
  },
  tas: {
    country: 'Uzbekistan',
    city: 'Tashkent',
    region: 'central-asia',
    flag: '🇺🇿',
  },
  georgia: { country: 'Georgia', region: 'central-asia', flag: '🇬🇪' },
  tbilisi: {
    country: 'Georgia',
    city: 'Tbilisi',
    region: 'central-asia',
    flag: '🇬🇪',
  },
  tbs: {
    country: 'Georgia',
    city: 'Tbilisi',
    region: 'central-asia',
    flag: '🇬🇪',
  },
  azerbaijan: { country: 'Azerbaijan', region: 'central-asia', flag: '🇦🇿' },
  baku: {
    country: 'Azerbaijan',
    city: 'Baku',
    region: 'central-asia',
    flag: '🇦🇿',
  },
  gyd: {
    country: 'Azerbaijan',
    city: 'Baku',
    region: 'central-asia',
    flag: '🇦🇿',
  },
  armenia: { country: 'Armenia', region: 'central-asia', flag: '🇦🇲' },
  yerevan: {
    country: 'Armenia',
    city: 'Yerevan',
    region: 'central-asia',
    flag: '🇦🇲',
  },
  eve: {
    country: 'Armenia',
    city: 'Yerevan',
    region: 'central-asia',
    flag: '🇦🇲',
  },
};

// ── Cargo type detection ──────────────────────────────────────────────────────

const CARGO_KEYWORDS: Record<CargoCat, string[]> = {
  pharma: [
    'pharma',
    'pharmaceutical',
    'medicine',
    'medical',
    'drug',
    'vaccine',
    'healthcare',
    'gdp',
    'cold chain',
    'temperature',
    '2-8',
    '+2/+8',
    '2°c',
    '8°c',
  ],
  electronics: [
    'electronics',
    'electronic',
    'semiconductor',
    'laptop',
    'phone',
    'computer',
    'tech',
    'consumer goods',
    'hs85',
  ],
  automotive: [
    'automotive',
    'auto parts',
    'car parts',
    'vehicle',
    'spare parts',
    'aston martin',
    'lithium batter',
  ],
  food: [
    'food',
    'frozen',
    'perishable',
    'fmcg',
    'beverage',
    'reefer',
    'fresh',
    'chilled',
  ],
  dg: [
    'dangerous goods',
    'dg class',
    'hazmat',
    'hazardous',
    'flammable',
    'lithium',
    'chemicals',
    'class 3',
    'class 9',
    'un3480',
    'un1950',
  ],
  general: [],
};

function detectCargo(text: string): CargoCat {
  const lower = text.toLowerCase();
  for (const [cat, keywords] of Object.entries(CARGO_KEYWORDS) as [
    CargoCat,
    string[],
  ][]) {
    if (cat === 'general') continue;
    if (keywords.some((k) => lower.includes(k))) return cat;
  }
  return 'general';
}

// ── Mode detection ────────────────────────────────────────────────────────────

function detectMode(text: string): 'air' | 'sea' | 'road' | undefined {
  const lower = text.toLowerCase();
  if (
    /\b(air|fly|flight|airline|airfreight|air freight|air cargo|kg|per kg)\b/.test(
      lower,
    )
  )
    return 'air';
  if (
    /\b(sea|ocean|fcl|lcl|container|teu|vessel|ship|port|nautical)\b/.test(
      lower,
    )
  )
    return 'sea';
  if (/\b(road|truck|trucking|land|overland|lorry|tir|drive)\b/.test(lower))
    return 'road';
  return undefined;
}

// ── Route detection ───────────────────────────────────────────────────────────

const DEST_SIGNALS = [
  ' to ',
  ' →',
  ' -> ',
  ' heading to ',
  ' destined for ',
  ' destination ',
  ' going to ',
  ' bound for ',
  ' deliver to ',
  ' arriving in ',
  ' land in ',
  ' port of ',
];
const ORIG_SIGNALS = [' from ', ' out of ', ' departing ', ' origin ', ' ex '];

export function detectRoute(text: string): DetectedRoute {
  const lower = text.toLowerCase().replace(/[^\w\s→>\-·]/g, ' ');
  const cargo = detectCargo(lower);
  const mode = detectMode(lower);
  let origin: GeoEntry | undefined;
  let destination: GeoEntry | undefined;

  // Try structured "from X to Y" parsing
  for (const destSignal of DEST_SIGNALS) {
    const destIdx = lower.indexOf(destSignal);
    if (destIdx < 0) continue;
    const afterDest = lower.slice(destIdx + destSignal.length).trim();
    // Find destination
    destination = matchLongestGeo(afterDest);
    if (destination) {
      // Now find origin (before the dest signal)
      const beforeDest = lower.slice(0, destIdx);
      for (const origSignal of ORIG_SIGNALS) {
        const origIdx = beforeDest.lastIndexOf(origSignal);
        if (origIdx >= 0) {
          const afterOrig = beforeDest
            .slice(origIdx + origSignal.length)
            .trim();
          origin = matchLongestGeo(afterOrig);
          break;
        }
      }
      if (!origin) origin = matchLongestGeo(beforeDest);
      break;
    }
  }

  // Fallback: scan all tokens for any geo match
  if (!destination && !origin) {
    const tokens = lower.split(/[\s,→>\-·]+/).filter(Boolean);
    const found: GeoEntry[] = [];
    // Also try multi-word combinations
    for (let i = 0; i < tokens.length; i++) {
      for (let len = 3; len >= 1; len--) {
        if (i + len > tokens.length) continue;
        const phrase = tokens.slice(i, i + len).join(' ');
        const entry = GEO[phrase];
        if (entry) {
          found.push(entry);
          break;
        }
      }
    }
    if (found.length >= 2) {
      origin = found[0];
      destination = found[found.length - 1];
    } else if (found.length === 1) {
      destination = found[0];
    }
  }

  return { origin, destination, cargo, mode };
}

function matchLongestGeo(text: string): GeoEntry | undefined {
  const words = text.trim().split(/\s+/);
  // Try up to 3-word combos (longest match wins)
  for (let len = Math.min(3, words.length); len >= 1; len--) {
    const phrase = words
      .slice(0, len)
      .join(' ')
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .trim();
    if (GEO[phrase]) return GEO[phrase];
  }
  return undefined;
}

// ── Ad pool ───────────────────────────────────────────────────────────────────
// Real global companies + plausible service descriptions.
// Headlines are generated dynamically with destination injected.

type AdPool = {
  company: string;
  initial: string;
  avatarColor: string;
  category: AdCategory;
  headline: (dest: string, flag: string) => string;
  description: (dest: string, cargo?: CargoCat, mode?: string) => string;
  cta: string;
  url: string;
};

const WAREHOUSING_POOL: AdPool[] = [
  {
    company: 'Agility Logistics',
    initial: 'A',
    avatarColor: 'bg-blue-600',
    category: 'warehousing',
    headline: (d, f) => `Bonded warehousing in ${d} ${f}`,
    description: (d) =>
      `Secure, GDP-ready storage in ${d}. Direct port access, real-time inventory. 200+ facilities worldwide.`,
    cta: 'Check availability',
    url: 'https://agility.com',
  },
  {
    company: 'Kuehne+Nagel',
    initial: 'K',
    avatarColor: 'bg-sky-700',
    category: 'warehousing',
    headline: (d, f) => `Distribution hub in ${d} ${f}`,
    description: (d) =>
      `Kuehne+Nagel operates a full distribution network across ${d}. Multi-modal, industry-certified.`,
    cta: 'View facilities',
    url: 'https://kuehne-nagel.com',
  },
  {
    company: 'DB Schenker',
    initial: 'D',
    avatarColor: 'bg-red-600',
    category: 'warehousing',
    headline: (d, f) => `3PL warehousing — ${d} ${f}`,
    description: (d) =>
      `Value-added warehousing in ${d}: pick & pack, cross-docking, and customs bonded storage.`,
    cta: 'Get a quote',
    url: 'https://dbschenker.com',
  },
  {
    company: 'DHL Supply Chain',
    initial: 'D',
    avatarColor: 'bg-yellow-500',
    category: 'warehousing',
    headline: (d, f) => `DHL warehouse space in ${d} ${f}`,
    description: (d) =>
      `Premium storage and fulfillment solutions in ${d}. Temperature-controlled options available.`,
    cta: 'Request space',
    url: 'https://dhl.com',
  },
  {
    company: 'Maersk Logistics',
    initial: 'M',
    avatarColor: 'bg-blue-800',
    category: 'warehousing',
    headline: (d, f) => `Integrated storage in ${d} ${f}`,
    description: (d) =>
      `Maersk's end-to-end warehousing in ${d} — port-linked, with direct container handoff.`,
    cta: 'Learn more',
    url: 'https://maersk.com',
  },
];

const CUSTOMS_POOL: AdPool[] = [
  {
    company: 'Flexport Customs',
    initial: 'F',
    avatarColor: 'bg-purple-600',
    category: 'customs',
    headline: (d, f) => `Customs clearance — ${d} ${f}`,
    description: (d) =>
      `Flexport handles all import/export declarations in ${d}. Real-time duty calculation. 200+ trade lanes.`,
    cta: 'Start filing',
    url: 'https://flexport.com',
  },
  {
    company: 'DHL Trade Services',
    initial: 'D',
    avatarColor: 'bg-yellow-500',
    category: 'customs',
    headline: (d, f) => `Duty & compliance in ${d} ${f}`,
    description: (d) =>
      `Expert customs brokerage and HS code classification for all goods entering ${d}. Live tariff data.`,
    cta: 'Check compliance',
    url: 'https://dhl.com',
  },
  {
    company: 'Bureau Veritas',
    initial: 'B',
    avatarColor: 'bg-orange-600',
    category: 'customs',
    headline: (d, f) => `Pre-shipment inspection — ${d} ${f}`,
    description: (d) =>
      `Bureau Veritas provides cargo inspection and compliance certificates accepted in ${d} and 140+ countries.`,
    cta: 'Book inspection',
    url: 'https://bureauveritas.com',
  },
  {
    company: 'Expeditors',
    initial: 'E',
    avatarColor: 'bg-green-700',
    category: 'customs',
    headline: (d, f) => `Customs brokerage in ${d} ${f}`,
    description: (d) =>
      `Expeditors' licensed customs brokers in ${d} ensure first-pass clearance. Specialists in all HS chapters.`,
    cta: 'Get clearance',
    url: 'https://expeditors.com',
  },
];

const INSURANCE_POOL: AdPool[] = [
  {
    company: 'Allianz Trade',
    initial: 'A',
    avatarColor: 'bg-blue-700',
    category: 'insurance',
    headline: (d, f) => `Cargo insurance for ${d} ${f}`,
    description: (d) =>
      `All-risk marine cargo coverage for shipments to/from ${d}. Instant digital certificate. A-rated capacity.`,
    cta: 'Get a quote',
    url: 'https://allianz-trade.com',
  },
  {
    company: "Lloyd's of London",
    initial: 'L',
    avatarColor: 'bg-slate-700',
    category: 'insurance',
    headline: (d, f) => `Marine insurance — ${d} ${f}`,
    description: (d) =>
      `Lloyd's syndicate coverage for cargo on all corridors through ${d}. Tailored limits, war risk available.`,
    cta: 'Enquire now',
    url: 'https://lloyds.com',
  },
  {
    company: 'Marsh Specialty',
    initial: 'M',
    avatarColor: 'bg-indigo-700',
    category: 'insurance',
    headline: (d, f) => `Cargo risk cover — ${d} ${f}`,
    description: (d) =>
      `Marsh structures cargo insurance programs for complex or high-value shipments to ${d}.`,
    cta: 'Talk to Marsh',
    url: 'https://marsh.com',
  },
  {
    company: 'Chubb Trade',
    initial: 'C',
    avatarColor: 'bg-teal-600',
    category: 'insurance',
    headline: (d, f) => `Trade credit & cargo — ${d} ${f}`,
    description: (d) =>
      `Chubb provides cargo and trade credit insurance covering payment risk on ${d} trade lanes.`,
    cta: 'Get covered',
    url: 'https://chubb.com',
  },
];

const FINANCE_POOL: AdPool[] = [
  {
    company: 'Drip Capital',
    initial: 'D',
    avatarColor: 'bg-green-600',
    category: 'finance',
    headline: (d, f) => `Trade finance for ${d} ${f} exports`,
    description: (d) =>
      `Drip Capital advances up to 90% of invoice value on shipments to ${d}. No collateral required.`,
    cta: 'Apply in 2 min',
    url: 'https://dripcapital.com',
  },
  {
    company: 'Modifi',
    initial: 'M',
    avatarColor: 'bg-violet-600',
    category: 'finance',
    headline: (d, f) => `Invoice financing — ${d} ${f}`,
    description: (d) =>
      `Get paid upfront on your ${d} trade receivables. Modifi funds B2B transactions in 100+ countries.`,
    cta: 'Unlock capital',
    url: 'https://getmodifi.com',
  },
  {
    company: 'Stenn',
    initial: 'S',
    avatarColor: 'bg-cyan-700',
    category: 'finance',
    headline: (d, f) => `Supply chain finance — ${d} ${f}`,
    description: (d) =>
      `Stenn finances your receivables and payables on ${d} trade lanes. 100% digital, no minimum volume.`,
    cta: 'Get funded',
    url: 'https://stenn.com',
  },
];

const COLD_CHAIN_POOL: AdPool[] = [
  {
    company: 'World Courier',
    initial: 'W',
    avatarColor: 'bg-blue-500',
    category: 'cold-chain',
    headline: (d, f) => `GDP cold chain to ${d} ${f}`,
    description: (d) =>
      `World Courier operates temperature-controlled air freight to ${d}. 2–8°C and -20°C lanes. GDP certified.`,
    cta: 'Book cold chain',
    url: 'https://worldcourier.com',
  },
  {
    company: 'Cryoport',
    initial: 'C',
    avatarColor: 'bg-sky-600',
    category: 'cold-chain',
    headline: (d, f) => `Cryogenic logistics — ${d} ${f}`,
    description: (d) =>
      `Cryoport specialises in ultra-low temperature and pharma cold chain to ${d}. Continuous IoT monitoring.`,
    cta: 'Get a quote',
    url: 'https://cryoport.com',
  },
  {
    company: 'Marken',
    initial: 'M',
    avatarColor: 'bg-emerald-600',
    category: 'cold-chain',
    headline: (d, f) => `Pharma logistics to ${d} ${f}`,
    description: (d) =>
      `Marken (UPS Healthcare) delivers temperature-sensitive pharma to ${d} with 24/7 chain-of-custody tracking.`,
    cta: 'Ship with Marken',
    url: 'https://marken.com',
  },
];

const DG_POOL: AdPool[] = [
  {
    company: 'DSV Hazmat',
    initial: 'D',
    avatarColor: 'bg-orange-700',
    category: 'dg-handling',
    headline: (d, f) => `Dangerous goods to ${d} ${f}`,
    description: (d) =>
      `DSV handles all DG classes on air and sea lanes to ${d}. IATA/IMDG certified specialists. Full documentation.`,
    cta: 'DG enquiry',
    url: 'https://dsv.com',
  },
  {
    company: 'Rhenus DG',
    initial: 'R',
    avatarColor: 'bg-red-700',
    category: 'dg-handling',
    headline: (d, f) => `DG freight cleared for ${d} ${f}`,
    description: (d) =>
      `Rhenus specialises in DG class 1–9 logistics to ${d}. Full hazmat documentation and ADR-certified vehicles.`,
    cta: 'Request handling',
    url: 'https://rhenus.com',
  },
];

// ── Ad generation ─────────────────────────────────────────────────────────────

let _adCounter = 0;

function pickAd(
  pool: AdPool[],
  dest: GeoEntry,
  cargo?: CargoCat,
  mode?: string,
): SponsoredAd {
  const idx = _adCounter++ % pool.length;
  const t = pool[idx];
  const destLabel = dest.city ?? dest.country;
  return {
    id: `ad-${_adCounter}-${t.company.slice(0, 3)}`,
    category: t.category,
    company: t.company,
    initial: t.initial,
    avatarColor: t.avatarColor,
    headline: t.headline(destLabel, dest.flag),
    description: t.description(destLabel, cargo, mode),
    cta: t.cta,
    url: t.url,
  };
}

export function generateAds(route: DetectedRoute): SponsoredAd[] {
  const dest = route.destination ?? {
    country: 'your destination',
    region: 'middle-east' as Region,
    flag: '🌍',
  };
  const { cargo, mode } = route;

  const ads: SponsoredAd[] = [];

  // Slot 1: Always warehousing (destination-specific)
  ads.push(pickAd(WAREHOUSING_POOL, dest, cargo, mode));

  // Slot 2: Always customs/compliance
  ads.push(pickAd(CUSTOMS_POOL, dest, cargo, mode));

  // Slot 3: Cargo-type specific
  if (cargo === 'pharma' || cargo === 'food') {
    ads.push(pickAd(COLD_CHAIN_POOL, dest, cargo, mode));
  } else if (cargo === 'dg' || cargo === 'automotive') {
    ads.push(pickAd(DG_POOL, dest, cargo, mode));
  } else if (
    mode === 'sea' ||
    (dest.region !== 'middle-east' && dest.region !== 'europe')
  ) {
    // Long-haul sea or exotic lane → trade finance
    ads.push(pickAd(FINANCE_POOL, dest, cargo, mode));
  } else {
    ads.push(pickAd(INSURANCE_POOL, dest, cargo, mode));
  }

  return ads;
}

export function getDefaultAds(): SponsoredAd[] {
  const world: GeoEntry = {
    country: 'global markets',
    flag: '🌍',
    region: 'middle-east',
  };
  return [
    pickAd(WAREHOUSING_POOL, world),
    pickAd(CUSTOMS_POOL, world),
    pickAd(INSURANCE_POOL, world),
  ];
}
