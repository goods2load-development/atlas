export interface UserRoute {
  id: string;
  firstName: string | null;
  lastName: string | null;
  companyName: string;
  companyPhoto: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  language: string;
  isConfirmed: boolean;
  provider: boolean;
  communication: boolean;
  ferry: boolean;
  plane: boolean;
  truck: boolean;
  tradeLicenseNumber: string;
  insuranceStatement: string;
  issuingAuthority: string;
  currency: string;
}

export interface OrderRoute {
  id: string;
  companyName: string;
  transportation: string;
  goods: string;
  quantity: number;
  kilogram: number;
  length: number;
  width: number;
  height: number;
  placementOfGoods: string;
  price: number;
  fromRoute: string;
  toRoute: string;
  portDeparture: string;
  portArrival: string;
  transit: number;
  goGreen: boolean;
  incotermsFerry: string;
  incotermsPlane: string;
  incotermsTruck: string;
  withdraw: string;
  delivery: string;
  description: string;
  message?: string;
  attachments?: string[];
}

export interface Route {
  createdAt: string;
  id: string;
  order: OrderRoute;
  user: UserRoute;
}
