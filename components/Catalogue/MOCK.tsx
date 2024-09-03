import { StaticImageData } from "next/image";
import logoPlaceholder from "@/assets/Product/DP_World.png";
import logoPlaceholder2 from "@/assets/Product/Hapag_Lloyd.png";
import { GoogleRatingProps } from "./GoogleRating";

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
}

export const googleRatingMocks: GoogleRatingProps[] = [
  {
    value: 4.6,
    reviewsCount: 34,
  },
  {
    value: 3.1,
    reviewsCount: 45,
  },
  {
    value: 5,
    reviewsCount: 94,
  },
];
