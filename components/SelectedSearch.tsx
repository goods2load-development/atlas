"use client";

import { format } from "date-fns";
import { useFilterStore, useCurrenciesStore } from "@/lib/filterStore";
import Image from "next/image";
import { ToolTipComponent } from "./SearchMain";
import { countVolume } from "@/lib/utils";

export default function SelectedSearch() {
  const {
    deliveryBy,
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
  const { selectedCurrency } = useCurrenciesStore((state: any) => state);

  const renderIcon = (deliveryBy: string) => {
    switch (deliveryBy) {
      case "plane": {
        return (
          <Image
            src={`/filtericon-plane.svg`}
            alt={"plane"}
            width={58}
            height={58}
          />
        );
      }
      case "ferry": {
        return (
          <Image
            src={`/filtericon-ship.svg`}
            alt={"ferry"}
            width={58}
            height={58}
          />
        );
      }
      case "truck": {
        return (
          <Image
            src={`/filtericon-truck.svg`}
            alt={"truck"}
            width={58}
            height={58}
          />
        );
      }
    }
  };

  return (
    <div
      className={`bg-[#ffede4] rounded-xl font-bold text-[16px]/[20px] text-[#ff6720] sm:p-[24px] p-4 px-1 mt-[10px] relative z-40 max-w-[1400px] xl:mx-auto`}
    >
      <div className="flex lg:justify-start justify-center xl:justify-center items-center overflow-x-scroll pb-4 hide-scrollbar">
        <div className="flex flex-wrap lg:flex-nowrap items-end justify-center lg:justify-start">
          <div className="lg:block hidden mt-4 mr-2">
            {renderIcon(deliveryBy)}
          </div>

          {fromCountry && from && (
            <div className="mr-[1px] w-[45%] lg:w-[134px] mb-4 lg:mb-0">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                From
              </label>
              <div className="h-[60px] rounded-l-[16px] border-none font-normal text-black justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm">
                <ToolTipComponent text={`${fromCountry}, ${from}`}>
                  <div className="block w-full truncate lg:w-[110px] text-left">
                    {fromCountry}, {from}
                  </div>
                </ToolTipComponent>
              </div>
            </div>
          )}
          {toCountry && to && (
            <div className="sm:mr-[1px] w-[45%] lg:w-[126px] mb-4 lg:mb-0">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                To
              </label>
              <div className="h-[60px] border-none rounded-r-[16px] lg:rounded-none font-normal text-black justify-start bg-white flex items-center whitespace-nowrap px-[8px] text-sm">
                <ToolTipComponent text={`${toCountry}, ${to}`}>
                  <div className="block w-full truncate lg:w-[110px] text-left">
                    {toCountry}, {to}
                  </div>
                </ToolTipComponent>
              </div>
            </div>
          )}
          {departure && (
            <div className="mr-[1px] w-[45%] lg:w-[128px] mb-4 lg:mb-0">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Departure
              </label>
              <div className="h-[60px] rounded-l-[16px] lg:rounded-l-none border-none font-normal text-black justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm">
                {format(departure, "dd/MM/yyyy")}
              </div>
            </div>
          )}
          {arrival && (
            <div className="mr-[1px] w-[45%] lg:w-[128px] mb-4 lg:mb-0">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Arrival
              </label>
              <div className="h-[60px] lg:rounded-r-none border-none font-normal rounded-r-[16px] text-black justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm">
                {format(arrival, "dd/MM/yyyy")}
              </div>
            </div>
          )}
          {typeOfGoods && (
            <div className="mr-[1px] w-[30%] lg:w-[122px] mb-4 lg:mb-0">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Goods
              </label>
              <div className="h-[60px] rounded-l-[16px] lg:rounded-l-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="h-full flex items-center max-w-[122px] sm:max-w-auto">
                  <ToolTipComponent text={`${typeOfGoods}`}>
                    <div className="block w-full truncate lg:w-[100px] text-left">
                      {typeOfGoods}
                    </div>
                  </ToolTipComponent>
                </div>
              </div>
            </div>
          )}
          {placementOfGoods && (
            <div className="mr-[1px] w-[30%] lg:w-[122px] mb-4 lg:mb-0">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Placement
              </label>
              <div className="h-[60px] w-full rounded-r-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="h-full flex items-center overflow-x-scroll hide-scrollbar">
                  {placementOfGoods}
                </div>
              </div>
            </div>
          )}
          {width && length && height && (
            <div className="mr-[1px] w-[30%] lg:w-[154px] mb-4 lg:mb-0">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Volume
              </label>
              <div className="h-[60px]  w-full rounded-r-[16px] lg:rounded-r-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className=" h-full flex items-center overflow-x-scroll hide-scrollbar">
                  Vol: {countVolume(width, length, height)} m³
                </div>
              </div>
            </div>
          )}
          {quantity && (
            <div className="mr-[1px] w-[30%] lg:w-[87px]">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Quantity
              </label>
              <div className="h-[60px]  w-full rounded-l-[16px] lg:rounded-l-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className=" h-ful flex items-center overflow-x-scroll hide-scrollbar">
                  {quantity}
                </div>
              </div>
            </div>
          )}
          {goodsValue && (
            <div className="mr-[1px] w-[30%] lg:w-[112px]">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Goods Value
              </label>
              <div className="h-[60px]  w-full rounded-r-none border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className="h-full flex items-center overflow-x-scroll hide-scrollbar">
                  {selectedCurrency.symbol}{" "}
                  {Math.round(goodsValue * selectedCurrency.rate)}
                </div>
              </div>
            </div>
          )}
          {incoterms && (
            <div className="mr-[1px] w-[30%] lg:w-[85px]">
              <label className="mb-2 block text-[15px]/[22px] font-semibold">
                Incoterms
              </label>
              <div className="h-[60px] rounded-r-[16px]  w-full  border-none font-normal text-black  justify-start bg-white flex items-center whitespace-nowrap px-[16px] text-sm pr-2">
                <div className=" h-full flex items-center overflow-x-scroll hide-scrollbar">
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
