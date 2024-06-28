import Product from "./Product";
import { IProduct } from "./MOCK";
import { useFilterStore } from "@/lib/filterStore";
import { useEffect } from "react";
import UIButton from "../common/Button";

export default function Products() {
  const { products, getProducts } = useFilterStore((state: any) => state);
  console.log("P", products);
  useEffect(() => {
    getProducts();
  }, []);
  return products.length ? (
    <div className="bg-blue-000 space-y-[24px]">
      {products.map((product: any, index: number) => {
        return (
          <Product key={index} onBuy={() => console.log(index)} {...product} />
        );
      })}
      <div className="text-center pb-5">
        <UIButton secondary>Show more results</UIButton>
      </div>
    </div>
  ) : (
    <div className="text-center grid pap-6 items-center">No data found</div>
  );
}
