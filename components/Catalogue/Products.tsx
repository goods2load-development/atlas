import Product from "./Product";
import { useFilterStore, useCurrenciesStore } from "@/lib/filterStore";
import { useEffect } from "react";
import Image from "next/image";
import UIButton from "../common/Button";

import NotFound from "@/assets/Catalogue/no-products-found.png";

export default function Products() {
  const { products, pagination, getProducts } = useFilterStore(
    (state: any) => state
  );
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);
  useEffect(() => {
    getProducts();
  }, []);

  return products?.length ? (
    <div className="bg-blue-000 space-y-[24px]">
      {products.map((product: any, index: number) => (
        <Product
          key={index}
          {...product}
          currency={selectedCurrency}
          index={index}
        /> // index for mocks data (GoogleReview)
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
    <div className="text-center pt-10">
      <Image
        className="mx-auto"
        width={318}
        height={296}
        src={NotFound}
        alt="not found"
      />
      <h3 className="font-medium text-3xl mb-6">That&apos;s a miss!</h3>
      <p className="w-2/3 mx-auto">
        Sorry, this filter combination has no results. Try different criteria,
        or click on the Solution Finder command to let us help you track down
        the solution you&apos;re looking for!
      </p>
    </div>
  );
}
