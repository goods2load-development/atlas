import UIButton from '../common/Button';
import Spinner from '../ui/spinner';
import Product from './Product';
import NotFound from '@/assets/images/catalogue-no-products-found.png';
import { useCurrenciesStore, useFilterStore } from '@/lib/filterStore';

import { useEffect, useState } from 'react';

import Image from 'next/image';

export default function Products() {
  const {
    partners,
    isPartnersLoading,
    pagination,
    getPartners,
    clearPartners,
    setPartnersFilters,
  } = useFilterStore((state: any) => state);
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);
  useEffect(() => {
    clearPartners();
    getPartners();
  }, []);

  useEffect(() => {
    if (!!partners?.length && isFirstRequest) {
      setIsFirstRequest(false);
      setPartnersFilters(partners);
    }
  }, [partners]);

  return partners?.length && !isPartnersLoading ? (
    <div className="bg-blue-000 space-y-[24px]">
      {partners.map((partner: any, index: number) => (
        <Product
          key={index}
          {...partner}
          currency={selectedCurrency}
          index={index}
        /> // index for mocks data (GoogleReview)
      ))}
      {pagination.hasNextPage && (
        <div className="text-center pb-5">
          <UIButton onClick={() => getPartners(pagination.page + 1)} secondary>
            Show more results
          </UIButton>
        </div>
      )}
    </div>
  ) : isPartnersLoading ? (
    <div className="mb-auto mt-20">
      <Spinner />
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
