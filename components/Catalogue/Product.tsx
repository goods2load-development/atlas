import { PropsWithChildren } from "react";
import { IProduct } from "./Catalogue";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { boolean } from "zod";
import SearchMain from "../SearchMain";
import { ShipIcon } from "lucide-react";
import LeafIcon from "@/assets/Product/LeafIcon";

interface Props extends IProduct {
  onBuy: () => void;
}

export default function Product({
  estimatedTransit,
  company,
  withdrow,
  delivery,
  orderCost,
  CO2EmissionControlled,
  onBuy,
}: Props) {
  return (
    <div className="grid grid-rows-[1fr_auto] border-[1px] rounded-2xl poppins font-normal overflow-hidden">
      <div className="grid grid-cols-[1fr_3fr_1fr] [&>div]:border-b-[1px] [&>*:not(:last-child)]:border-r-[1px]">
        <CellWrap>
          <CellTitleWithSpan>
            Estimated <span>transit</span>
          </CellTitleWithSpan>
          <div className="text-[16px]/[24px] text-primary">
            {estimatedTransit}
          </div>
        </CellWrap>
        <div className="grid grid-cols-3">
          <CellWrap centered>
            <CellTitle>Company</CellTitle>
            <CellImage {...company} />
          </CellWrap>
          <CellWrap centered>
            <CellTitle>
              <ShipIcon />
              Withdrow
            </CellTitle>
            <EstimatedDate>{withdrow}</EstimatedDate>
          </CellWrap>
          <CellWrap centered>
            <CellTitle>
              <ShipIcon />
              Delivery
            </CellTitle>
            <EstimatedDate>{delivery}</EstimatedDate>
          </CellWrap>
        </div>
        <CellWrap centered>
          <CellTitleWithSpan>
            Order <span>cost</span>
          </CellTitleWithSpan>
          <div className="text-[20px]/[22px] font-medium">{orderCost}</div>
        </CellWrap>
      </div>
      <div className="grid grid-cols-[4fr_1fr] [&>div:not(:last-child)]:border-r-[1px]">
        <div className="pl-6 grid items-center">
          {CO2EmissionControlled && <CO2EmissionControlledLabel />}
        </div>
        <Button onClick={onBuy} className="rounded-none">
          Buy now
        </Button>
      </div>
    </div>
  );
}

function CellImage({ name, logo }: { name: string; logo: StaticImageData }) {
  return (
    <Image
      alt={name}
      src={logo.src}
      width={logo.width}
      height={logo.height}
      className="max-w-[104px]"
    />
  );
}

function CellWrap({
  children,
  centered = false,
}: PropsWithChildren & {
  centered?: boolean;
}) {
  return (
    <div
      className={`px-6 pt-6 pb-2 grid gap-2 ${centered ? "text-center justify-center" : ""}`}
    >
      {children}
    </div>
  );
}

function CO2EmissionControlledLabel() {
  return (
    <div className="rounded-[5px] px-2 text-[15px]/[22.5px] bg-[#E6F4EB] text-[#004E00] w-fit flex">
      <LeafIcon />
      CO2 Emission controlled
    </div>
  );
}

function CellTitle({ children }: PropsWithChildren) {
  return (
    <div className="text-[20px]/[22px] font-medium flex gap-2 items-center justify-center w-fit">
      {children}
    </div>
  );
}

function CellTitleWithSpan({ children }: PropsWithChildren) {
  return (
    <div className="text-[24px]/[28px] font-light [&>span]:font-normal [&>span]:italic">
      {children}
    </div>
  );
}

function EstimatedDate({ children }: PropsWithChildren) {
  return (
    <div className="text-[12px]/[18px]">
      <div className="text-[14px]/[21px]">{children}</div>
      Estimated date
    </div>
  );
}
