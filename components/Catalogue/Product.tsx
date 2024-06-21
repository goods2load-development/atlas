import { cn } from "@/lib/utils";
import { IProduct } from "./MOCK";
import { Button } from "../ui/button";
import { ShipIcon } from "lucide-react";
import LeafIcon from "@/assets/Product/LeafIcon";
import { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends IProduct {
  onBuy: () => void;
}

export default function Product(props: Props) {
  return (
    <div className="border-[1px] rounded-2xl overflow-hidden">
      <div className="sm:flex justify-between">
        <div className="flex border-b-[1px]">
          <div className="w-1/2 sm:w-[184px] p-[24px] border-r-[1px]">
            <div className="text-[24px]/[28px] font-light [&>i]:font-normal">
              Estimated <i>transit</i>
            </div>
            <div className="text-[16px]/[24px] text-primary">
              {props.estimatedTransit}
              {props.estimatedTransit === 1 ? " day" : " days"}
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center text-center text-[20px]/[22px] font-medium">
            Company
            {props.company.logo ? (
              <img
                alt={props.company.name}
                src={props.company.logo.src}
                className="max-w-[104px] block"
              />
            ) : (
              <div>{props.company.name}</div>
            )}
          </div>
        </div>
        <div className="flex border-b-[1px]">
          <div className="w-1/2 flex flex-col items-center p-[24px]">
            <div className="text-[20px]/[22px] font-medium flex gap-2 items-center">
              <ShipIcon />
              Withdraw
            </div>
            <div className="text-[12px]/[18px]">
              <div className="text-[14px]/[21px]">{props.withdrow}</div>
              Estimated date
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center p-[24px]">
            <div className="text-[20px]/[22px] font-medium flex gap-2 items-center">
              <ShipIcon />
              Delivery
            </div>
            <div className="text-[12px]/[18px]">
              <div className="text-[14px]/[21px]">{props.delivery}</div>
              Estimated date
            </div>
          </div>
        </div>
        <div className="sm:w-[200px] min-h-[104px] text-center flex flex-col justify-center sm:border-l-[1px]">
          <div className="text-[24px]/[28px] font-light [&>span]:font-normal [&>span]:italic">
            Order <span>cost</span>
          </div>
          <div className="text-[20px]/[22px] font-medium">
            From ${props.orderCost}
          </div>
        </div>
      </div>
      <div className="sm:flex justify-between">
        <div className="pl-6 grid items-center">
          {props.CO2EmissionControlled && (
            <div className="rounded-[5px] px-2 text-[15px]/[22.5px] bg-[#E6F4EB] text-[#004E00] w-fit flex">
              <LeafIcon />
              CO2 Emission controlled
            </div>
          )}
        </div>
        <Button
          onClick={props.onBuy}
          className="rounded-none w-full sm:w-[200px]"
        >
          Buy now
        </Button>
      </div>
    </div>
  );
}
