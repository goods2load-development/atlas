'use client';

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
    hasHydrated,
    hasLoadedPartners,
    isPartnersLoading,
    pagination,
    getPartners,
    hydrate,
    setPartnersFilters,
  } = useFilterStore((state: any) => state);
  const [isFirstRequest, setIsFirstRequest] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);

  useEffect(() => {
    setMounted(true);
    hydrate();
    getPartners();
  }, [getPartners, hydrate]);

  useEffect(() => {
    if (!!partners?.length && isFirstRequest) {
      setIsFirstRequest(false);
      setPartnersFilters(partners);
    }
  }, [isFirstRequest, partners, setPartnersFilters]);

  if (!mounted) return null;

  // FIX: Show spinner when:
  // - store not hydrated yet
  // - actively loading
  // - partners is undefined (first fetch hasn't completed yet — never show empty state here)
  //
  // Previously `!hasLoadedPartners` was used, but that caused a flash because:
  // 1. isPartnersLoading starts false → spinner didn't show immediately
  // 2. partners was [] → empty state flashed before data arrived
  // 3. real data arrived → data shown
  //
  // Now partners starts as `undefined` (see filterStore fix), so we can
  // reliably gate on that to mean "not yet fetched".
  const shouldShowLoading =
    !hasHydrated || isPartnersLoading || partners === undefined;

  if (shouldShowLoading) {
    return (
      <div className="mb-auto mt-20">
        <Spinner />
      </div>
    );
  }

  // At this point: hydrated, not loading, and partners is a real array ([] or [...])
  return partners.length ? (
    <div className="bg-blue-000 space-y-[24px]">
      {partners.map((partner: any, index: number) => (
        <Product
          key={index}
          {...partner}
          currency={selectedCurrency}
          index={index}
        />
      ))}
      {pagination.hasNextPage && (
        <div className="text-center pb-5">
          <UIButton onClick={() => getPartners(pagination.page + 1)} secondary>
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