import { StaticImageData } from "next/image";
import logoPlaceholder from "@/assets/Product/DP_World.png";
import logoPlaceholder2 from "@/assets/Product/Hapag_Lloyd.png";

export interface IProduct {
  withdrow: string;
  delivery: string;
  orderCost: string;
  estimatedTransit: string;
  CO2EmissionControlled: boolean;
  company: { name: string; logo: StaticImageData };
}

export const products: IProduct[] = [
  {
    withdrow: "10/04/2024",
    delivery: "20/05/2024",
    orderCost: "From $ 4380",
    estimatedTransit: "48 days",
    CO2EmissionControlled: false,
    company: { name: "DP_World", logo: logoPlaceholder },
  },
  {
    withdrow: "19/04/2024",
    delivery: "29/05/2024",
    orderCost: "From $ 4308",
    estimatedTransit: "53 days",
    CO2EmissionControlled: true,
    company: { name: "Hapag_Lloyd", logo: logoPlaceholder2 },
  },
];
