// Shared types for the Goods2Load Agentic Onboarding

export type OnboardingStep =
  | 'welcome'
  | 'account'
  | 'documents'
  | 'google_profile'
  | 'certifications'
  | 'certifications_secondary'
  | 'sectors'
  | 'air_freight'
  | 'sea_freight'
  | 'road_freight'
  | 'service_mix'
  | 'geo_focus'
  | 'about_us'
  | 'final_agreement'
  | 'payment'
  | 'complete'
  | 'standby';

export interface ServiceMix {
  air: number;
  sea: number;
  road: number;
  other: number;
}

export interface GeoFocusEntry {
  country: string;
  pct: number;
}

export interface CollectedFields {
  // Account
  companyName?: string;
  email?: string;
  countryCode?: string;
  phoneNumber?: string;
  address?: string;
  postalCode?: string;
  country?: string;
  city?: string;
  password?: string;
  confirmPassword?: string;
  privacy?: boolean;
  communication?: boolean;

  // Files (stored as File objects client-side, filenames server-side)
  companyPhoto?: File;
  insuranceStatement?: File;
  issuingAuthority?: File; // VAT registration
  tradeLicenseNumber?: File; // Trade license

  // Google profile
  googleBusinessProfile?: string;

  // Certifications
  industryRecognitions?: string[];
  certProofFiles?: Record<string, string>; // cert code → filename
  industryProofFile?: File[];
  industryRecognitionsSecondary?: string[];
  industryProofFileSecondary?: File[];
  sustainabilityCertificationFile?: File[];

  // Sectors
  industries?: string[];

  // Freight capabilities — structured hub codes
  providesAirFreight?: boolean;
  airports?: string[]; // IATA codes from hub picker
  airCountries?: string[];

  providesSeaFreight?: boolean;
  seaports?: string[]; // port names from hub picker
  seaCountries?: string[];

  providesRoadFreight?: boolean;
  roadStates?: string[];
  roadCountries?: string[]; // countries from hub picker

  // Service mix
  serviceMix?: ServiceMix;

  // Geographic focus
  geoFocus?: GeoFocusEntry[];

  // About us
  aboutUs?: string;
  ourMission?: string;

  // Payment
  paymentStatus?: 'paid' | 'standby';
  paymentSessionId?: string;

  // Final
  finalAgreement?: boolean;
}

export interface OnboardingMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
  card?: OnboardingCard;
}

// ── Inline UI cards embedded in chat ─────────────────────────────────────────

export type OnboardingCard =
  | {
      type: 'file_upload';
      field: string;
      label: string;
      accept: string;
      hint?: string;
    }
  | {
      type: 'multi_select';
      field: string;
      label: string;
      options: { code: string; name: string }[];
    }
  | { type: 'cert_upload'; certs: string[] }
  | { type: 'freight_lanes'; mode: 'air' | 'sea' | 'road' }
  | { type: 'service_mix' }
  | { type: 'geo_focus' }
  | { type: 'payment' }
  | { type: 'summary'; fields: CollectedFields; confirmed?: boolean }
  | { type: 'progress'; step: number; total: number; label: string };

// Step metadata for progress bar
export const ONBOARDING_STEPS: {
  id: OnboardingStep;
  label: string;
  stepNumber: number;
}[] = [
  { id: 'welcome', label: 'Welcome', stepNumber: 0 },
  { id: 'account', label: 'Account', stepNumber: 1 },
  { id: 'documents', label: 'Documents', stepNumber: 2 },
  { id: 'google_profile', label: 'Google Profile', stepNumber: 3 },
  { id: 'certifications', label: 'Certifications', stepNumber: 4 },
  { id: 'certifications_secondary', label: 'More Certs', stepNumber: 5 },
  { id: 'sectors', label: 'Sectors', stepNumber: 6 },
  { id: 'air_freight', label: 'Air Freight', stepNumber: 7 },
  { id: 'sea_freight', label: 'Sea Freight', stepNumber: 8 },
  { id: 'road_freight', label: 'Road Freight', stepNumber: 9 },
  { id: 'service_mix', label: 'Service Mix', stepNumber: 10 },
  { id: 'geo_focus', label: 'Markets', stepNumber: 11 },
  { id: 'about_us', label: 'About You', stepNumber: 12 },
  { id: 'final_agreement', label: 'Agreement', stepNumber: 13 },
  { id: 'payment', label: 'Payment', stepNumber: 14 },
  { id: 'complete', label: 'Done', stepNumber: 15 },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length - 1; // exclude 'complete'
