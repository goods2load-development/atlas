import TabPieInfo from './TabPieInfo';
import { useGoodsStore } from '@/lib/store';
import { calculatePercentages } from '@/lib/utils';

import { useCallback, useEffect, useRef, useState } from 'react';

import { MarketTrendsTab } from '@/components/Dashboard/MarketTrends/MarketTrendsTab';
import Spinner from '@/components/ui/spinner';

interface ITransportedItem {
  label: string;
  value: number;
}

const colors = [
  '#F4BE37',
  '#FB5304',
  '#3F2011',
  '#FF6720',
  '#692607',
  '#FF9F40',
];

const TopTransportsGoods = ({ data }: any) => {
  const { getGoodsNameByCode }: any = useGoodsStore();
  const [preperedData, setPreperedData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const animationDeley = useRef<any>();

  useEffect(() => {
    setPreperedData([]);
    if (!!data?.length) {
      constructData(calculatePercentages(data));
    }
  }, [data]);

  useEffect(() => {
    return () => {
      clearTimeout(animationDeley.current);
    };
  }, []);

  const constructData = useCallback(
    async (data: ITransportedItem[]) => {
      if (!data) return;

      setIsLoading(true);
      const results = await Promise.all(
        data?.map(async (item) => {
          const result = await getGoodsNameByCode(
            item.label.replace(/\./g, ''),
          );
          if (result?.status === 'success') {
            return {
              name: result.result.description.split(/[.,:]/)[0].trim(),
              value: item.value,
            };
          } else {
            return null;
          }
        }),
      );

      setPreperedData(
        results
          .filter((item: any) => item)
          .sort((a: any, b: any) => b.value - a.value)
          .slice(0, 6)
          .map((item: any, i: number) => ({
            name: item.name,
            value: Math.round(item.value),
            color: colors[i],
          })),
      );

      animationDeley.current = setTimeout(() => {
        setIsLoading(false);
      }, 600);
    },
    [data],
  );

  return (
    <MarketTrendsTab
      title={'Top transported goods'}
      description={'the most popular goods transported by your company'}
    >
      {!!preperedData.length && !isLoading && (
        <TabPieInfo data={preperedData} />
      )}

      {!!!preperedData.length && !isLoading && (
        <div className="text-center text-[24px]/[27px] h-[70%] flex items-center justify-center pb-10 lg:pb-0">
          Data not found
        </div>
      )}

      {isLoading && <Spinner />}
    </MarketTrendsTab>
  );
};

export default TopTransportsGoods;
