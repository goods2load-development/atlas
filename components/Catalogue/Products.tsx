import UIButton from '../common/Button';
import { IProduct } from './MOCK';
import Product from './Product';
import { useCurrenciesStore, useFilterStore } from '@/lib/filterStore';

import { useEffect } from 'react';

export default function Products() {
  const { products, pagination, getProducts } = useFilterStore(
    (state: any) => state,
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
    <div className="text-center grid pap-6 items-center">No data found</div>
  );
}
