import { cn } from "@/lib/utils";
import { IProduct } from "./MOCK";
import { Button } from "../ui/button";
import { ShipIcon } from "lucide-react";
import LeafIcon from "@/assets/Product/LeafIcon";
import Image, { StaticImageData } from "next/image";
import { HTMLAttributes, PropsWithChildren } from "react";

interface Props extends IProduct {
  onBuy: () => void;
}

export default function Product(props: Props) {
  return (
    <ProductWrapper>
      <TopRow {...props} />
      <BottomRow {...props} />
    </ProductWrapper>
  );
}

function TopRow({
  estimatedTransit,
  company,
  withdrow,
  delivery,
  orderCost,
}: Props) {
  return (
    <RowWrapper className="grid-cols-[1fr_3fr_1fr] [&>div]:border-b-[1px]">
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
    </RowWrapper>
  );
}

function BottomRow({ CO2EmissionControlled, onBuy }: Props) {
  return (
    <RowWrapper className="grid-cols-[4fr_1fr] ">
      <div className="pl-6 grid items-center">
        {CO2EmissionControlled && <CO2EmissionControlledLabel />}
      </div>
      <Button onClick={onBuy} className="rounded-none">
        Buy now
      </Button>
    </RowWrapper>
  );
}

function ProductWrapper({ children }: PropsWithChildren) {
  return (
    <div className="grid border-[1px] rounded-2xl poppins font-normal overflow-hidden">
      {children}
    </div>
  );
}

function RowWrapper({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & PropsWithChildren) {
  return (
    <div
      className={cn(
        `grid [&>div]:border-b-[1px] [&>*:not(:last-child)]:border-r-[1px]`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CellImage({
  name = "",
  logo,
}: {
  name?: string;
  logo?: StaticImageData;
}) {
  return logo ? (
    <Image
      alt={name}
      src={logo.src}
      width={logo.width}
      height={logo.height}
      className="max-w-[104px]"
    />
  ) : (
    <></>
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
