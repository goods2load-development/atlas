"use client";

import Image from "next/image";
import PriceAlerts from "@/components/PriceAlerts";
import Filter from "./Filter";
import Products from "./Products";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useFilterStore } from "@/lib/filterStore";
import SelectedSearch from "../SelectedSearch";

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
  const [filterOpened, setFilterOpened] = useState(false);
  const { deliveryBy } = useFilterStore((state: any) => state);
  return (
    <div className="relative md:grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] p-[24px_8px] md:p-[40px_72px] gap-8 overflow-visible">
      <div className="md:hidden flex justify-between pb-[18px] px-[8px] items-center">
        {renderIcon(deliveryBy)}
        <div className="flex items-center space-x-[6px]">
          <Sheet>
            <SheetTrigger>
              <img src="/filtermobilebutton.svg" />
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <p>Filters</p>
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
        className={`col-span-2 rounded-2xl overflow-hidden p-1 md:p-4 ${searchOpened ? "max-h-min" : "max-h-0"} transition-all duration-500 ease md:h-auto`}
      >
        <SelectedSearch />
      </div>
      <div className="md:bg-[#F9F9F9] rounded-2xl w-full md:w-[280px] hidden md:block">
        <div className="md:p-4 sticky top-0">
          <PriceAlerts />
          <Filter />
        </div>
      </div>

      <Products />
    </div>
  );
}
