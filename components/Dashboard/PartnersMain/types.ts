export type PARTNER_STATUS = 'APPROVED' | 'IN REVIEW' | 'NEW';

export interface ResponsePartner {
  id: string;
  status: PARTNER_STATUS;
  hasPage: boolean;
  user: Partner;
  aboutUs: string;
  ourMission: string;
}

export interface PartnerIndustry {
  label: string;
  items: string[];
}

interface IBusinessProfile {
  id: string;
  text: string;
  userId: string;
}

export interface Partner {
  SustainabilityProof: any[]; // Define further if structure is known
  address: string;
  businessProfile: {
    id: string;
    text: string;
    userId: string;
  };
  city: string;
  companyName: string;
  companyPhoto: string;
  country: string;
  currency: string;
  email: string;
  ferry: boolean;
  filters: {
    partnerFilter: {
      id: string;
      partnerFilterCategory: {
        id: string;
      };
      value: string;
    };
  }[];
  hasPage: boolean;
  id: string;
  industries: {
    label: string;
    items: string[];
  }[];
  industryRecognitions: {
    id: string;
    isSecondary: boolean;
    name: string;
    proofs: {
      id: string;
      path: string;
      name: string;
    }[];
  }[];
  insuranceStatement: string;
  isConfirmed: boolean;
  issuingAuthority: string;
  language: string;
  partnerId: string;
  partnerLocation: {
    airports: { name: string; code: string }[];
    cities: { name: string; code: string }[];
    ports: { name: string; code: string }[];
    states: string[];
  };
  phoneNumber: string;
  plane: boolean;
  postalCode: string;
  sustainability: boolean;
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
