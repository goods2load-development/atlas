import TabPieInfo from './TabPieInfo';
import { calculatePercentages } from '@/lib/utils';

import { MarketTrendsTab } from '@/components/Dashboard/MarketTrends/MarketTrendsTab';

const colors = ['#F4BE37', '#fB5304', '#FF9F40', '#3F2011'];

const SeasonalVariationsTab = ({ data }: any) => {
  const constructData = (data: any) => {
    return data.map((item: any, idx: number) => {
      return {
        name: item.label,
        value: Math.round(item.value),
        color: colors[idx],
      };
    });
  };

  return (
    <MarketTrendsTab
      title="Seasonal variations"
      description="changes in demand for services depending on the time of year"
    >
      {!!data.length && (
        <TabPieInfo data={constructData(calculatePercentages(data))} />
      )}
      {!!!data.length && (
        <div className="text-center text-[24px]/[27px] h-[70%] flex items-center justify-center">
          Data not found
        </div>
      )}
    </MarketTrendsTab>
  );
};

export default SeasonalVariationsTab;
