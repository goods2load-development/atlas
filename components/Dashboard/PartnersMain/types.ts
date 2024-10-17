export type PARTNER_STATUS = 'APPROVED' | 'IN REVIEW' | 'NEW';

export interface ResponsePartner {
  id: string;
  status: PARTNER_STATUS;
  hasPage: boolean;
  user: Partner;
}

export interface Partner {
  address: string;
  city: string | null;
  communication: boolean;
  companyName: string;
  companyPhoto: string | null;
  country: string;
  currency: string;
  email: string;
  ferry: boolean;
  firstName: string | null;
  id: string;
  insuranceStatement: string;
  isConfirmed: boolean;
  issuingAuthority: string;
  language: string;
  lastName: string | null;
  phoneNumber: string;
  plane: boolean;
  postalCode: string | null;
  provider: boolean;
  role: string | null;
  tradeLicenseNumber: string;
  truck: boolean;
}

interface FocusItem {
  label: string;
  value: string;
}

interface IndustryItem {
  label: string;
  value: string;
}

interface ServiceProvided {
  airFreight: string;
  seaFreight: string;
  roadFreight: string;
}

interface ClientTarget {
  smallBusiness: string;
  midMarket: string;
  enterprises: string;
}

export interface PartnerPageResponse {
  awardsFiles: any[];
  clientTarget: ClientTarget;
  description: string;
  focus: FocusItem[];
  hasPage: boolean;
  id: string;
  industries: IndustryItem[];
  mission: string;
  name: string;
  placementId: string;
  serviceProvided: ServiceProvided;
}
