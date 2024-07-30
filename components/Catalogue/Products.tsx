import Product from "./Product";
import { IProduct } from "./MOCK";
import { useFilterStore, useCurrenciesStore } from "@/lib/filterStore";
import { useEffect } from "react";
import UIButton from "../common/Button";

export default function Products() {
  const { products, pagination, getProducts } = useFilterStore(
    (state: any) => state
  );
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);
  useEffect(() => {
    getProducts();
  }, []);
  return products.length ? (
    <div className="bg-blue-000 space-y-[24px]">
      {products.map((product: any, index: number) => (
        <Product key={index} {...product} currency={selectedCurrency} />
      ))}
      {pagination.hasNextPage && (
        <div className="text-center pb-5">
          <UIButton onClick={() => getProducts(pagination.page + 1)} secondary>
            Show more results
          </UIButton>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center grid pap-6 items-center">No data found</div>
  );
}
