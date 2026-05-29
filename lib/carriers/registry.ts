/**
 * Carrier Registry — Layer 3 Carrier Agents
 * ==========================================
 * Defines the carrier contract portfolio for each freight forwarding company
 * on the Goods2Load network.
 *
 * When a forwarder joins the platform, their carrier contracts are registered
 * here. Momentum queries this registry to know which carrier APIs to call
 * when generating rate quotes for a given shipment.
 *
 * Live carriers: activated automatically when the carrier's API key is set
 *                in Vercel env (e.g. MAERSK_API_KEY, MSC_API_KEY).
 * Demo carriers: return contract-estimated rates based on known lane data.
 *                Replaced by live data as each carrier API is integrated.
 *
 * GLEC Framework v3.1 emission intensity factors (kg CO₂e per tonne·km):
 *   Sea:  0.015   Air: 0.570   Road: 0.062
 */

export type CarrierMode = 'sea' | 'air' | 'road';

export interface CarrierInfo {
  id: string;
  name: string;
  mode: CarrierMode;
  hq: string; // for display
  live: boolean; // true when API key is present in env
  env_key?: string; // Vercel env var name that activates live mode
}

export interface CarrierContract {
  carrier_id: string;
  mode: CarrierMode;
  account_ref: string; // forwarder's account/contract reference
}

export interface CarrierRate {
  carrier: string;
  carrier_id: string;
  mode: CarrierMode;
  origin_hub: string;
  destination_hub: string;
  rate_usd: number;
  rate_unit:
    | 'per_container_20gp'
    | 'per_container_40gp'
    | 'per_kg'
    | 'per_truck';
  transit_days_min: number;
  transit_days_max: number;
  co2_kg_per_tonne: number; // total for this shipment segment
  valid_until: string;
  source: 'live' | 'contract_estimate' | 'demo';
  service_name?: string;
  notes?: string;
}

// ── Carrier directory ──────────────────────────────────────────────────────────

export const CARRIERS: Record<string, CarrierInfo> = {
  // Sea
  maersk: {
    id: 'maersk',
    name: 'Maersk',
    mode: 'sea',
    hq: 'Copenhagen, Denmark',
    live: !!process.env.MAERSK_API_KEY,
    env_key: 'MAERSK_API_KEY',
  },
  msc: {
    id: 'msc',
    name: 'MSC',
    mode: 'sea',
    hq: 'Geneva, Switzerland',
    live: !!process.env.MSC_API_KEY,
    env_key: 'MSC_API_KEY',
  },
  cma_cgm: {
    id: 'cma_cgm',
    name: 'CMA CGM',
    mode: 'sea',
    hq: 'Marseille, France',
    live: !!process.env.CMA_CGM_API_KEY,
    env_key: 'CMA_CGM_API_KEY',
  },
  hapag_lloyd: {
    id: 'hapag_lloyd',
    name: 'Hapag-Lloyd',
    mode: 'sea',
    hq: 'Hamburg, Germany',
    live: !!process.env.HAPAG_LLOYD_API_KEY,
    env_key: 'HAPAG_LLOYD_API_KEY',
  },
  // Air
  emirates_skycargo: {
    id: 'emirates_skycargo',
    name: 'Emirates SkyCargo',
    mode: 'air',
    hq: 'Dubai, UAE',
    live: !!process.env.EMIRATES_CARGO_API_KEY,
    env_key: 'EMIRATES_CARGO_API_KEY',
  },
  lufthansa_cargo: {
    id: 'lufthansa_cargo',
    name: 'Lufthansa Cargo',
    mode: 'air',
    hq: 'Frankfurt, Germany',
    live: !!process.env.LUFTHANSA_CARGO_API_KEY,
    env_key: 'LUFTHANSA_CARGO_API_KEY',
  },
  qatar_cargo: {
    id: 'qatar_cargo',
    name: 'Qatar Airways Cargo',
    mode: 'air',
    hq: 'Doha, Qatar',
    live: !!process.env.QATAR_CARGO_API_KEY,
    env_key: 'QATAR_CARGO_API_KEY',
  },
  // Road
  agility_logistics: {
    id: 'agility_logistics',
    name: 'Agility Logistics',
    mode: 'road',
    hq: 'Kuwait City, Kuwait',
    live: !!process.env.AGILITY_API_KEY,
    env_key: 'AGILITY_API_KEY',
  },
  aramex: {
    id: 'aramex',
    name: 'Aramex',
    mode: 'road',
    hq: 'Dubai, UAE',
    live: !!process.env.ARAMEX_API_KEY,
    env_key: 'ARAMEX_API_KEY',
  },
  gac: {
    id: 'gac',
    name: 'Gulf Agency Company',
    mode: 'road',
    hq: 'Dubai, UAE',
    live: !!process.env.GAC_API_KEY,
    env_key: 'GAC_API_KEY',
  },
};

// ── Per-forwarder carrier contract portfolio ──────────────────────────────────
// When a freight forwarding company joins the network, their carrier contracts
// are registered here. Momentum uses only the carriers in this list when
// generating rate quotes for that company.

export const CARRIER_CONTRACTS: Record<string, CarrierContract[]> = {
  ADSO: [
    { carrier_id: 'maersk', mode: 'sea', account_ref: 'ADSO-MSK-2024' },
    { carrier_id: 'msc', mode: 'sea', account_ref: 'ADSO-MSC-2025' },
    {
      carrier_id: 'emirates_skycargo',
      mode: 'air',
      account_ref: 'ADSO-EK-2024',
    },
    { carrier_id: 'lufthansa_cargo', mode: 'air', account_ref: 'ADSO-LH-2024' },
    {
      carrier_id: 'agility_logistics',
      mode: 'road',
      account_ref: 'ADSO-AGI-2023',
    },
  ],
  AVGO: [
    { carrier_id: 'cma_cgm', mode: 'sea', account_ref: 'AVGO-CMA-2024' },
    { carrier_id: 'hapag_lloyd', mode: 'sea', account_ref: 'AVGO-HL-2025' },
    { carrier_id: 'qatar_cargo', mode: 'air', account_ref: 'AVGO-QR-2024' },
    { carrier_id: 'aramex', mode: 'road', account_ref: 'AVGO-ARX-2024' },
  ],
  MATEEN: [
    { carrier_id: 'maersk', mode: 'sea', account_ref: 'MAT-MSK-2024' },
    {
      carrier_id: 'emirates_skycargo',
      mode: 'air',
      account_ref: 'MAT-EK-2024',
    },
    { carrier_id: 'gac', mode: 'road', account_ref: 'MAT-GAC-2023' },
  ],
};

// ── Demo rate engine ───────────────────────────────────────────────────────────
// Returns realistic contract-estimated rates per carrier for known corridors.
// Replaced by live carrier API calls as each integration goes live.

const GLEC = { sea: 0.015, air: 0.57, road: 0.062 }; // kg CO₂e per tonne·km

function matchCorridor(origin: string, destination: string): string {
  const o = origin.toLowerCase();
  const d = destination.toLowerCase();
  if (
    (o.match(/dubai|dxb|jebel/) && d.match(/rotterdam|rtm|netherlands/)) ||
    (d.match(/dubai|dxb|jebel/) && o.match(/rotterdam|rtm|netherlands/))
  )
    return 'dxb-rtm';
  if (
    (o.match(/dubai|dxb|jebel/) && d.match(/hamburg|germany|fra|frankfurt/)) ||
    (d.match(/dubai|dxb|jebel/) && o.match(/hamburg|germany|fra|frankfurt/))
  )
    return 'dxb-eur';
  if (
    (o.match(/shanghai|shenzhen|sha|szx|china/) &&
      d.match(/dubai|dxb|jebel/)) ||
    (d.match(/shanghai|shenzhen|sha|szx|china/) && o.match(/dubai|dxb|jebel/))
  )
    return 'china-dxb';
  if (
    (o.match(/mumbai|bom|india/) && d.match(/dubai|dxb|jebel/)) ||
    (d.match(/mumbai|bom|india/) && o.match(/dubai|dxb|jebel/))
  )
    return 'bom-dxb';
  if (
    (o.match(/dubai|dxb/) && d.match(/baghdad|bgw|iraq/)) ||
    (d.match(/dubai|dxb/) && o.match(/baghdad|bgw|iraq/))
  )
    return 'dxb-iraq';
  if (
    (o.match(/dubai|dxb/) && d.match(/riyadh|jeddah|saudi/)) ||
    (d.match(/dubai|dxb/) && o.match(/riyadh|jeddah|saudi/))
  )
    return 'dxb-ksa';
  if (
    (o.match(/dubai|dxb/) && d.match(/amman|jordan/)) ||
    (d.match(/dubai|dxb/) && o.match(/amman|jordan/))
  )
    return 'dxb-amman';
  return 'generic';
}

// Corridor distances in km (for CO₂ calculation)
const CORRIDOR_KM: Record<string, Partial<Record<CarrierMode, number>>> = {
  'dxb-rtm': { sea: 13800, air: 5850 },
  'dxb-eur': { sea: 12400, air: 5200 },
  'china-dxb': { sea: 7200, air: 5500 },
  'bom-dxb': { sea: 1950, air: 1980 },
  'dxb-iraq': { road: 1450, air: 2200 },
  'dxb-ksa': { road: 880, air: 1000 },
  'dxb-amman': { road: 2400, air: 2600 },
  generic: { sea: 5000, air: 4000, road: 2000 },
};

type SeaRateTable = Record<
  string,
  { rate: [number, number]; transit: [number, number]; service: string }
>;
type AirRateTable = Record<
  string,
  { rate: [number, number]; transit: [number, number]; service: string }
>;
type RoadRateTable = Record<
  string,
  { rate: [number, number]; transit: [number, number]; service: string }
>;

const SEA_RATES: Record<string, SeaRateTable> = {
  maersk: {
    'dxb-rtm': {
      rate: [1850, 2100],
      transit: [18, 22],
      service: 'AE-1/Shogun',
    },
    'dxb-eur': {
      rate: [1700, 1950],
      transit: [20, 24],
      service: 'AE-5/Albatross',
    },
    'china-dxb': {
      rate: [950, 1200],
      transit: [22, 26],
      service: 'AE-1/Shogun',
    },
    'bom-dxb': { rate: [420, 580], transit: [7, 10], service: 'IMEA' },
    generic: { rate: [1200, 1600], transit: [18, 25], service: 'Standard' },
  },
  msc: {
    'dxb-rtm': { rate: [1780, 2050], transit: [19, 23], service: 'SHOGUN' },
    'dxb-eur': { rate: [1650, 1900], transit: [21, 25], service: 'PEARL' },
    'china-dxb': { rate: [880, 1150], transit: [23, 27], service: 'JADE' },
    'bom-dxb': { rate: [400, 560], transit: [8, 11], service: 'TIGER' },
    generic: { rate: [1150, 1550], transit: [19, 26], service: 'Standard' },
  },
  cma_cgm: {
    'dxb-rtm': { rate: [1820, 2080], transit: [18, 22], service: 'FAL1' },
    'dxb-eur': { rate: [1680, 1930], transit: [20, 24], service: 'FAL5' },
    'china-dxb': { rate: [900, 1180], transit: [21, 25], service: 'CES' },
    'bom-dxb': { rate: [410, 570], transit: [7, 10], service: 'IPAK' },
    generic: { rate: [1180, 1580], transit: [18, 25], service: 'Standard' },
  },
  hapag_lloyd: {
    'dxb-rtm': { rate: [1900, 2150], transit: [17, 21], service: 'MEX1' },
    'dxb-eur': { rate: [1750, 2000], transit: [19, 23], service: 'MEX2' },
    'china-dxb': { rate: [920, 1200], transit: [22, 26], service: 'MDX' },
    'bom-dxb': { rate: [430, 590], transit: [7, 10], service: 'IMEA' },
    generic: { rate: [1220, 1620], transit: [18, 25], service: 'Standard' },
  },
};

const AIR_RATES: Record<string, AirRateTable> = {
  emirates_skycargo: {
    'dxb-eur': { rate: [4.2, 4.8], transit: [1, 2], service: 'EK Direct' },
    'dxb-rtm': { rate: [4.5, 5.1], transit: [1, 2], service: 'EK via DXB' },
    'china-dxb': { rate: [3.2, 4.0], transit: [1, 2], service: 'EK Direct' },
    'bom-dxb': { rate: [1.8, 2.4], transit: [0, 1], service: 'EK Express' },
    generic: { rate: [3.8, 5.2], transit: [1, 3], service: 'EK Standard' },
  },
  lufthansa_cargo: {
    'dxb-eur': { rate: [4.4, 5.0], transit: [1, 2], service: 'LH Direct FRA' },
    'dxb-rtm': { rate: [4.6, 5.3], transit: [1, 2], service: 'LH via FRA' },
    'china-dxb': { rate: [3.4, 4.2], transit: [1, 2], service: 'LH td.Flash' },
    'bom-dxb': { rate: [2.0, 2.6], transit: [0, 1], service: 'LH Direct' },
    generic: { rate: [4.0, 5.5], transit: [1, 3], service: 'LH Standard' },
  },
  qatar_cargo: {
    'dxb-eur': { rate: [4.3, 4.9], transit: [1, 2], service: 'QR via DOH' },
    'dxb-rtm': { rate: [4.5, 5.2], transit: [1, 2], service: 'QR via DOH' },
    'china-dxb': { rate: [3.3, 4.1], transit: [1, 2], service: 'QR Direct' },
    'bom-dxb': { rate: [1.9, 2.5], transit: [0, 1], service: 'QR Express' },
    generic: { rate: [3.9, 5.3], transit: [1, 3], service: 'QR Standard' },
  },
};

const ROAD_RATES: Record<string, RoadRateTable> = {
  agility_logistics: {
    'dxb-iraq': {
      rate: [2800, 3400],
      transit: [4, 6],
      service: 'Full Truck Load',
    },
    'dxb-ksa': { rate: [900, 1300], transit: [1, 2], service: 'Direct Road' },
    'dxb-amman': {
      rate: [2000, 2600],
      transit: [3, 5],
      service: 'GCC Corridor',
    },
    generic: { rate: [1500, 2500], transit: [3, 7], service: 'Standard FTL' },
  },
  aramex: {
    'dxb-iraq': {
      rate: [2600, 3200],
      transit: [4, 6],
      service: 'Land Express',
    },
    'dxb-ksa': { rate: [850, 1200], transit: [1, 2], service: 'Gulf Connect' },
    'dxb-amman': {
      rate: [1900, 2500],
      transit: [3, 4],
      service: 'Middle East Road',
    },
    generic: { rate: [1400, 2400], transit: [3, 7], service: 'Standard' },
  },
  gac: {
    'dxb-iraq': {
      rate: [2700, 3300],
      transit: [4, 5],
      service: 'GAC Road Direct',
    },
    'dxb-ksa': { rate: [880, 1250], transit: [1, 2], service: 'Gulf Road' },
    'dxb-amman': {
      rate: [1950, 2550],
      transit: [2, 4],
      service: 'Levant Corridor',
    },
    generic: { rate: [1450, 2450], transit: [3, 6], service: 'Standard FTL' },
  },
};

function getDemoRate(
  carrierId: string,
  mode: CarrierMode,
  origin: string,
  destination: string,
  weightKg: number,
  containerType: string,
): CarrierRate | null {
  const corridor = matchCorridor(origin, destination);
  const distKm =
    CORRIDOR_KM[corridor]?.[mode] ?? CORRIDOR_KM.generic[mode] ?? 3000;
  const today = new Date();
  const validUntil = new Date(today.getTime() + 7 * 24 * 3600 * 1000)
    .toISOString()
    .split('T')[0];
  const carrier = CARRIERS[carrierId];
  if (!carrier) return null;

  if (mode === 'sea') {
    const table = SEA_RATES[carrierId];
    if (!table) return null;
    const row = table[corridor] ?? table.generic;
    const rate = Math.round((row.rate[0] + row.rate[1]) / 2);
    const tonnes = weightKg / 1000;
    const co2 = Math.round(tonnes * distKm * GLEC.sea);
    return {
      carrier: carrier.name,
      carrier_id: carrierId,
      mode: 'sea',
      origin_hub: origin,
      destination_hub: destination,
      rate_usd: rate,
      rate_unit:
        containerType === '40GP' || containerType === '40HC'
          ? 'per_container_40gp'
          : 'per_container_20gp',
      transit_days_min: row.transit[0],
      transit_days_max: row.transit[1],
      co2_kg_per_tonne: co2,
      valid_until: validUntil,
      source: 'contract_estimate',
      service_name: row.service,
      notes: `Contract rate — ${carrier.name} account. Goes live when ${carrier.env_key} is set.`,
    };
  }

  if (mode === 'air') {
    const table = AIR_RATES[carrierId];
    if (!table) return null;
    const row = table[corridor] ?? table.generic;
    const ratePerKg = (row.rate[0] + row.rate[1]) / 2;
    const totalRate = Math.round(weightKg * ratePerKg);
    const tonnes = weightKg / 1000;
    const co2 = Math.round(tonnes * distKm * GLEC.air);
    return {
      carrier: carrier.name,
      carrier_id: carrierId,
      mode: 'air',
      origin_hub: origin,
      destination_hub: destination,
      rate_usd: totalRate,
      rate_unit: 'per_kg',
      transit_days_min: row.transit[0],
      transit_days_max: row.transit[1],
      co2_kg_per_tonne: co2,
      valid_until: validUntil,
      source: 'contract_estimate',
      service_name: row.service,
      notes: `$${ratePerKg.toFixed(1)}/kg · ${weightKg}kg · GLEC v3.1 CO₂e`,
    };
  }

  if (mode === 'road') {
    const table = ROAD_RATES[carrierId];
    if (!table) return null;
    const row = table[corridor] ?? table.generic;
    const rate = Math.round((row.rate[0] + row.rate[1]) / 2);
    const tonnes = weightKg / 1000;
    const co2 = Math.round(tonnes * distKm * GLEC.road);
    return {
      carrier: carrier.name,
      carrier_id: carrierId,
      mode: 'road',
      origin_hub: origin,
      destination_hub: destination,
      rate_usd: rate,
      rate_unit: 'per_truck',
      transit_days_min: row.transit[0],
      transit_days_max: row.transit[1],
      co2_kg_per_tonne: co2,
      valid_until: validUntil,
      source: 'contract_estimate',
      service_name: row.service,
      notes: `Full Truck Load · GLEC v3.1 CO₂e`,
    };
  }

  return null;
}

// ── Public API ─────────────────────────────────────────────────────────────────

export function getCarrierRates(
  forwarder: string,
  origin: string,
  destination: string,
  mode: CarrierMode,
  weightKg: number,
  containerType = '20GP',
): CarrierRate[] {
  const contracts = CARRIER_CONTRACTS[forwarder] ?? CARRIER_CONTRACTS['ADSO'];
  const relevant = contracts.filter((c) => c.mode === mode);

  return relevant
    .map((contract) =>
      getDemoRate(
        contract.carrier_id,
        mode,
        origin,
        destination,
        weightKg,
        containerType,
      ),
    )
    .filter((r): r is CarrierRate => r !== null)
    .sort((a, b) => a.rate_usd - b.rate_usd); // cheapest first
}

export function getForwarderCarriers(forwarder: string): CarrierInfo[] {
  const contracts = CARRIER_CONTRACTS[forwarder] ?? CARRIER_CONTRACTS['ADSO'];
  return contracts.map((c) => CARRIERS[c.carrier_id]).filter(Boolean);
}
