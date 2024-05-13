"use client";
import { StaticImageData } from "next/image";
import logoPlaceholder from "@/assets/Product/DP_World.png";
import logoPlaceholder2 from "@/assets/Product/Hapag_Lloyd.png";
import Product from "./Product";

export interface IProduct {
  estimatedTransit: string;
  company: {
    name: string;
    logo: StaticImageData;
  };
  withdrow: string;
  delivery: string;
  orderCost: string;
  CO2EmissionControlled: boolean;
}

const products: IProduct[] = [
  {
    estimatedTransit: "48 days",
    company: {
      name: "DP_World",
      logo: logoPlaceholder,
    },
    withdrow: "10/04/2024",
    delivery: "20/05/2024",
    orderCost: "From $ 4380",
    CO2EmissionControlled: false,
  },
  {
    estimatedTransit: "53 days",
    company: {
      name: "Hapag_Lloyd",
      logo: logoPlaceholder2,
    },
    withdrow: "19/04/2024",
    delivery: "29/05/2024",
    orderCost: "From $ 4308",
    CO2EmissionControlled: true,
  },
];

export default function Catalogue() {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] p-[40px_72px] gap-8">
      <div className="p-4 col-span-2 bg-[#FFEDE4] rounded-2xl">Search</div>
      <div className="p-4 bg-[#F9F9F9] rounded-2xl">Sidebar</div>
      <div className="bg-blue-000 grid gap-6">
        {products.map((product, index) => {
          return (
            <Product
              key={index}
              onBuy={() => console.log(index)}
              {...product}
            />
          );
        })}
      </div>
    </div>
  );
}
