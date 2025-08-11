'use client';

import SelectedSearch from '../SelectedSearch';
import Filter from './Filter';
import Products from './Products';
import { Referal } from './Referral';
import FilterPlaneIcon from '@/assets/icons/filtericon-plane.svg';
import FilterShipIcon from '@/assets/icons/filtericon-ship.svg';
import FilterTruckIcon from '@/assets/icons/filtericon-truck.svg';
import FilterMobileButton from '@/assets/icons/filtermobilebutton.svg';
import { useFilterStore } from '@/lib/filterStore';

import { useState } from 'react';

import Image from 'next/image';

import PriceAlerts from '@/components/SolutionFinder';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const renderIcon = (deliveryBy: string) => {
  let src = '';
  switch (deliveryBy) {
    case 'plane':
      src = FilterPlaneIcon;
      break;

    case 'ferry':
      src = FilterShipIcon;
      break;
    case 'truck':
      src = FilterTruckIcon;
      break;
  }
  return <Image src={src} alt={deliveryBy} width={44} height={44} />;
};

export default function Catalogue() {
  const [searchOpened, setSearchOpened] = useState(false);
  const {
    deliveryBy,
    partners = [],
    isPartnersLoading,
  } = useFilterStore((state: any) => state);

  return (
    <div className=" lg:grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] p-[24px_16px] max-w-[1328px] mx-auto gap-8 overflow-visible">
      <div className="lg:hidden flex justify-between pb-[18px] items-center">
        {renderIcon(deliveryBy)}
        <div className="flex items-center space-x-[6px]">
          <Sheet>
            <SheetTrigger>
              <Image
                width={44}
                height={44}
                src={FilterMobileButton}
                alt="Filter"
              />
            </SheetTrigger>
            <SheetContent side="left" className="pt-[54px] overflow-y-auto">
              <p className="pb-[32px] text-[18px] font-medium">Filters</p>
              <PriceAlerts
                isPulseAnimation={!partners.length && !isPartnersLoading}
              />
              <Filter />
            </SheetContent>
          </Sheet>
          <div
            className={`w-[44px] h-[44px] rounded-[8px] p-[8px] cursor-pointer border-[2px] grid grid-cols-2 gap-1 [&>i]:inline-block [&>i]:w-[10px] [&>i]:h-[10px]  [&>i]:rounded-sm ${searchOpened ? 'border-orangePrimary bg-orangePrimary [&>i]:bg-white' : 'border-[#FFEDE4] [&>i]:bg-orangePrimary'}`}
            onClick={() => setSearchOpened(!searchOpened)}
          >
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <div
        className={`col-span-2 rounded-2xl overflow-hidden ${searchOpened ? 'max-h-min' : 'max-h-0'} lg:max-h-min transition-all duration-500 ease lg:h-auto`}
      >
        <SelectedSearch />
      </div>
      <div>
        <div className="lg:bg-[#F9F9F9] rounded-2xl w-full lg:w-[280px] hidden lg:block h-max">
          <div className="lg:p-4">
            <PriceAlerts
              isPulseAnimation={!!!partners.length && !isPartnersLoading}
            />
            <Filter />
          </div>
        </div>

        <div className="mt-8 hidden lg:block">
          <Referal />
        </div>
      </div>
      <Products />

      <div className="lg:hidden block mt-8">
        <Referal className="mx-auto" />
      </div>
    </div>
  );
}
