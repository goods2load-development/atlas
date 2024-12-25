import { ReactNode } from 'react';

import Spinner from '@/components/ui/spinner';

export interface MarketTrendsTabProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  isLoading?: boolean;
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
  isLoading = false,
}: MarketTrendsTabProps) => {
  return (
    <div className="pt-4 lg:py-8 px-0 lg:px-6 bg-white rounded-md h-full relative">
      {title ? (
        <div className="flex justify-center">
          <h3 className="text-center text-[22px] font-[500]">{title}</h3>
        </div>
      ) : null}
      {description ? (
        <p className="mb-8 text-center max-w-[661px] text-sm mx-auto text-halfBlack h-[60px]">
          {description}
        </p>
      ) : null}
      {children}
      {isLoading && (
        <div className="absolute right-8 top-8">
          <Spinner />
        </div>
      )}
    </div>
  );
};
