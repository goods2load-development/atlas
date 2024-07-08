"use client";

import { format } from "date-fns";
import { useFilterStore } from "@/lib/filterStore";
import { number } from "zod";

export default function SelectedSearch() {
  const {
    fromCountry,
    from,
    toCountry,
    to,
    departure,
    arrival,
    typeOfGoods,
    placementOfGoods,
    goodsValue,
    width,
    height,
    length,
    quantity,
    incoterms,
  } = useFilterStore((state: any) => state);

  const countVolume = (width: number, length: number, height: number) => {
    return width * height * length;
  };

  return (
    <div
      className={`bg-[#ffede4] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720] items-end sm:p-[24px] p-4 px-1 mt-[10px] relative z-50`}
    >
      <div className="flex justify-stretch items-end w-full overflow-x-scroll pb-4">
        <div className="flex flex-wrap lg:flex-nowrap items-end justify-center lg:justify-start">
          {fromCountry && from && (
            <div className="mr-[1px] w-[45%] lg:w-auto mb-4 lg:mb-0">
              <label className="mb-2 block">From</label>
              <div className="h-[60px] rounded-l-[16px] border-none font-normal text-black w-full justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm">
                {fromCountry}, {from}
              </div>
            </div>
          )}
          {toCountry && to && (
            <div className="sm:mr-[1px] w-[45%] lg:w-auto mb-4 lg:mb-0">
              <label className="mb-2 block">To</label>
              <div className="h-[60px] border-none rounded-r-[16px] lg:rounded-none font-normal text-black w-full justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm">
                {toCountry}, {to}
              </div>
            </div>
          )}
          {departure && (
            <div className="mr-[1px] w-[45%] lg:w-auto mb-4 lg:mb-0">
              <label className="mb-2 block">Departure</label>
              <div className="h-[60px] rounded-l-[16px] lg:rounded-l-none border-none font-normal text-black w-full justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm">
                {format(departure, "dd/MM/yyyy")}
              </div>
            </div>
          )}
          {arrival && (
            <div className="mr-[1px] w-[45%] lg:w-auto mb-4 lg:mb-0">
              <label className="mb-2 block">Arrival</label>
              <div className="h-[60px] lg:rounded-r-none border-none font-normal rounded-r-[16px] text-black w-full justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm">
                {format(arrival, "dd/MM/yyyy")}
              </div>
            </div>
          )}
          {typeOfGoods && (
            <div className="mr-[1px] w-[30%] lg:w-auto mb-4 lg:mb-0">
              <label className="mb-2 block">Goods</label>
              <div className="h-[60px]  w-full rounded-l-[16px] lg:rounded-l-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="w-[100px] h-full flex items-center overflow-x-scroll">
                  {typeOfGoods}
                </div>
              </div>
            </div>
          )}
          {placementOfGoods && (
            <div className="mr-[1px] w-[30%] lg:w-auto mb-4 lg:mb-0">
              <label className="mb-2 block">Placement</label>
              <div className="h-[60px]  w-full rounded-r-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="w-[100px] h-full flex items-center overflow-x-scroll">
                  {placementOfGoods}
                </div>
              </div>
            </div>
          )}
          {width && length && height && (
            <div className="mr-[1px] w-[30%] lg:w-auto mb-4 lg:mb-0">
              <label className="mb-2 block">Volume</label>
              <div className="h-[60px]  w-full rounded-r-[16px] lg:rounded-r-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="w-[100px] h-full flex items-center overflow-x-scroll">
                  Vol: {countVolume(width, length, height)} m³
                </div>
              </div>
            </div>
          )}
          {quantity && (
            <div className="mr-[1px] w-[30%] lg:w-auto">
              <label className="mb-2 block">Quantity</label>
              <div className="h-[60px]  w-full rounded-l-[16px] lg:rounded-l-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="w-[100px] h-full flex items-center overflow-x-scroll">
                  {quantity}
                </div>
              </div>
            </div>
          )}
          {goodsValue && (
            <div className="mr-[1px] w-[30%] lg:w-auto">
              <label className="mb-2 block">Goods Value</label>
              <div className="h-[60px]  w-full rounded-r-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="w-[100px] h-full flex items-center overflow-x-scroll">
                  $ {goodsValue}
                </div>
              </div>
            </div>
          )}
          {incoterms && (
            <div className="mr-[1px] w-[30%] lg:w-auto">
              <label className="mb-2 block">Incoterms</label>
              <div className="h-[60px] rounded-r-[16px]  w-full  border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="w-[100px] h-full flex items-center overflow-x-scroll">
                  {incoterms}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
