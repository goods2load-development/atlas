"use client";

import Image from "next/image";
import PriceAlerts from "@/components/SolutionFinder";
import Filter from "./Filter";
import Products from "./Products";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useFilterStore } from "@/lib/filterStore";
import SelectedSearch from "../SelectedSearch";
import { Referal } from "./Referral";

const renderIcon = (deliveryBy: string) => {
  let src = "";
  switch (deliveryBy) {
    case "plane":
      src = "/filtericon-plane.svg";
      break;

    case "ferry":
      src = "/filtericon-ship.svg";
      break;
    case "truck":
      src = "/filtericon-truck.svg";
      break;
  }
  return <Image src={src} alt={deliveryBy} width={44} height={44} />;
};

export default function Catalogue() {
  const [searchOpened, setSearchOpened] = useState(false);
  const { deliveryBy } = useFilterStore((state: any) => state);

  return (
    <div className=" lg:grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] p-[24px_16px] max-w-[1328px] mx-auto gap-8 overflow-visible">
      <div className="lg:hidden flex justify-between pb-[18px] items-center">
        {renderIcon(deliveryBy)}
        <div className="flex items-center space-x-[6px]">
          <Sheet>
            <SheetTrigger>
              <img src="/filtermobilebutton.svg" />
            </SheetTrigger>
            <SheetContent side="left" className="pt-[54px] overflow-y-auto">
              <p className="pb-[32px] text-[18px] font-medium">Filters</p>
              <PriceAlerts />
              <Filter />
            </SheetContent>
          </Sheet>
          <div
            className={`w-[44px] h-[44px] rounded-[8px] p-[8px] cursor-pointer border-[2px] grid grid-cols-2 gap-1 [&>i]:inline-block [&>i]:w-[10px] [&>i]:h-[10px]  [&>i]:rounded-sm ${searchOpened ? "border-orangePrimary bg-orangePrimary [&>i]:bg-white" : "border-[#FFEDE4] [&>i]:bg-orangePrimary"}`}
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
        className={`col-span-2 rounded-2xl overflow-hidden ${searchOpened ? "max-h-min" : "max-h-0"} lg:max-h-min transition-all duration-500 ease lg:h-auto`}
      >
        <SelectedSearch />
      </div>
      <div>
        <div className="lg:bg-[#F9F9F9] rounded-2xl w-full lg:w-[280px] hidden lg:block h-max">
          <div className="lg:p-4">
            <PriceAlerts />
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
