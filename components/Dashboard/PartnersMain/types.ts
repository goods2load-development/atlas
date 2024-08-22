export type PARTNER_STATUS = "APPROVED" | "IN REVIEW" | "NEW";

export interface ResponsePartner {
  id: string;
  status: PARTNER_STATUS;
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
