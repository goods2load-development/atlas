import TabPieInfo from './TabPieInfo';
import { useGoodsStore } from '@/lib/store';
import { calculatePercentages } from '@/lib/utils';

import { useCallback, useEffect, useState } from 'react';

import { MarketTrendsTab } from '@/components/Dashboard/MarketTrends/MarketTrendsTab';

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

  useEffect(() => {
    if (!!data?.length) {
      constructData(calculatePercentages(data));
    }
  }, [data]);

  const constructData = useCallback(
    async (data: ITransportedItem[]) => {
      if (!data) return;

      setIsLoading(true);
      const results = await Promise.all(
        data?.map(async (item) => {
          // const result = await getGoodsNameByCode(item.label);
          // if (result?.status === 'success') {
          //   return {
          //     name: result.result.description.split(/[.,:]/)[0].trim(),
          //     value: item.value,
          //   };
          // } else {
          //   return null;
          // }
        }),
      );

      setPreperedData(
        data
          .filter((item: any) => item)
          .sort((a: any, b: any) => b.value - a.value)
          .slice(0, 6)
          .map((item: any, i: number) => ({
            name: item.label,
            value: Math.round(item.value),
            color: colors[i],
          })),
      );

      setIsLoading(false);
    },
    [data],
  );

  return (
    <MarketTrendsTab
      title={'Top transported goods'}
      description={'the most popular goods transported by your company'}
    >
      <TabPieInfo data={preperedData} />
    </MarketTrendsTab>
  );
};

export default TopTransportsGoods;
