import Product from "./Product";
import { IProduct } from "./MOCK";
import { useFilterStore } from "@/lib/filterStore";
import { useEffect } from "react";

export default function Products() {
  const { products, getProducts } = useFilterStore((state: any) => state);
  console.log("P", products);
  useEffect(() => {
    getProducts();
  }, []);
  return products.length ? (
    <div className="bg-blue-000 grid gap-6">
      {products.map((product: any, index: number) => {
        return (
          <Product key={index} onBuy={() => console.log(index)} {...product} />
        );
      })}
    </div>
  ) : (
    <div className="text-center grid pap-6 items-center">No data found</div>
  );
}
