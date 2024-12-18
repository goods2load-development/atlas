import TabPieInfo from './TabPieInfo';
import { calculatePercentages } from '@/lib/utils';

import { MarketTrendsTab } from '@/components/Dashboard/MarketTrends/MarketTrendsTab';

const colors = [
  '#F4BE37',
  '#FB5304',
  '#3F2011',
  '#FF6720',
  '#692607',
  '#FF9F40',
];

export interface IIncoterms {
  label: string;
  value: number;
}

const PreferedIncoterms = ({ data }: { data: IIncoterms[] }) => {
  const constructData = (data: any) => {
    return data
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, 6)
      .map((item: any, idx: number) => {
        return {
          name: item.label,
          value: Math.round(item.value),
          color: colors[idx],
        };
      });
  };

  return (
    <MarketTrendsTab
      title="Preferred Incoterms"
      description="Each Incoterms rule clarifies the tasks, costs, and risks to be borne by buyers and sellers in these transactions. Familiarizing yourself with Incoterms will help improve smoother transactions by clearly defining who is responsible for what and each step of the transaction."
    >
      {!!data.length && (
        <TabPieInfo
          data={constructData(calculatePercentages(data))}
          upperCase={true}
        />
      )}

      {!!!data.length && (
        <div className="text-center text-[24px]/[27px] h-[70%] flex items-center justify-center">
          Data not found
        </div>
      )}
    </MarketTrendsTab>
  );
};

export default PreferedIncoterms;
