import { ReactNode } from "react";

export interface MarketTrendsTabProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

export interface MarketTrendsTabData<T> {
  data: T;
  title?: string;
  description?: string;
}

export const MarketTrendsTab = ({
  title,
  description,
  children,
}: MarketTrendsTabProps) => {
  return (
    <div className="pt-4 lg:py-8 px-0 lg:px-6 bg-white rounded-md h-full">
      {title ? (
        <h3 className="text-center text-[22px] font-[500] up">{title}</h3>
      ) : null}
      {description ? (
        <p className="mb-8 text-center max-w-[661px] text-sm mx-auto text-halfBlack h-[60px]">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
};
