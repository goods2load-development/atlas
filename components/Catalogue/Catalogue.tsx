"use client";

import PriceAlerts from "@/components/PriceAlerts";
import SearchMain from "../SearchMain";
import Filter from "./Filter";
import Products from "./Products";
import { products } from "./MOCK";
import { useState } from "react";
import UIButton from "../common/Button";

import { useFilterStore } from "@/lib/filterStore";

export default function Catalogue() {
  const [searchOpened, setSearchOpened] = useState(false);
  const [filterOpened, setFilterOpened] = useState(false);
  const { deliveryBy } = useFilterStore((state: any) => state);
  return (
    <div className="relative sm:grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] px-5 sm:p-[40px_72px] gap-8">
      <div
        className={`absolute left-0 top-[220px] sm:static col-span-2 rounded-2xl overflow-hidden ${searchOpened ? "h-auto p-4" : "h-0"} sm:h-auto`}
      >
        <SearchMain />
      </div>
      <div className={`sm:p-4 sm:bg-[#F9F9F9] rounded-2xl w-full sm:w-[280px]`}>
        <div className="hidden sm:block">
          <PriceAlerts />
        </div>
        <Filter />
      </div>
      <div className="sm:hidden flex justify-between pb-5">
        <span className="text-[28px] capitalize font-medium">{deliveryBy}</span>
        <div className="flex space-x-5">
          <div
            className={`w-[44px] h-[44px] rounded-[8px] p-[8px] cursor-pointer border-[2px] grid grid-cols-2 gap-1 [&>i]:inline-block [&>i]:w-[10px] [&>i]:h-[10px]  [&>i]:rounded-sm ${searchOpened ? "border-orangePrimary bg-orangePrimary [&>i]:bg-white" : "border-[#FFEDE4] [&>i]:bg-orangePrimary"}`}
            onClick={() => {
              setSearchOpened(!searchOpened);
              setFilterOpened(false);
            }}
          >
            <i />
            <i />
            <i />
            <i />
          </div>
          <PriceAlerts />
        </div>
      </div>
      <Products />
    </div>
  );
}
