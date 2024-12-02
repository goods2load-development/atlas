import { StaticImageData } from 'next/image';

export interface IProductServices {
  label: string;
  items: string[];
}

export interface IPartnerInfo {
  partnerId: string;
  services: IProductServices[];
  awards: boolean;
  rating: number;
  totalReviews: number;
  placementId: string;
}

export interface IProduct {
  orderId: string;
  withdraw: string;
  delivery: string;
  orderCost: string;
  estimatedTransit: number;
  CO2EmissionControlled: boolean;
  company: { name: string; logo: StaticImageData };
  portArrival: string;
  portDeparture: string;
  price: string;
  placementOfGoods: string;
  partnerInfo: IPartnerInfo;
}
