import { StaticImageData } from "next/image";
import logoPlaceholder from "@/assets/Product/DP_World.png";
import logoPlaceholder2 from "@/assets/Product/Hapag_Lloyd.png";

export interface IProduct {
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

export const products: IProduct[] = [
  {
    withdraw: "10/04/2024",
    delivery: "20/05/2024",
    orderCost: "From $ 4380",
    estimatedTransit: 48,
    CO2EmissionControlled: false,
    company: { name: "DP_World", logo: logoPlaceholder },
    portArrival: "",
    portDeparture: "",
    price: "0",
    placementOfGoods: "Pallets"
  },
  {
    withdraw: "19/04/2024",
    delivery: "29/05/2024",
    orderCost: "From $ 4308",
    estimatedTransit: 53,
    CO2EmissionControlled: true,
    company: { name: "Hapag_Lloyd", logo: logoPlaceholder2 },
    portArrival: "",
    portDeparture: "",
    price: "0",
    placementOfGoods: "Pallets"
  },
];
