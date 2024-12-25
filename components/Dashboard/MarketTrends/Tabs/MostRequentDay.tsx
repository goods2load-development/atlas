import BarChartGraph from '../../Charts/BarChart';

import { useCallback, useEffect, useState } from 'react';

import { MarketTrendsTab } from '@/components/Dashboard/MarketTrends/MarketTrendsTab';

const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const displayWeekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const colors = [
  '#FFBD18',
  '#FFA800',
  '#FF7F00',
  '#FF6720',
  '#FF5620',
  '#FB5304',
  '#FB3004',
];

const MostFrequentDay = ({ data }: any) => {
  const [preperedData, setPreperedData] = useState<any>([]);

  useEffect(() => {
    setPreperedData([]);
    if (!!data.length) {
      constractData(data);
    }
  }, [data]);

  const constractData = useCallback(
    (data: any) => {
      const result = weekDays.map((localItem, i) => {
        return {
          name: displayWeekDays[i],
          value: data.find((item: any) => item.label === localItem)?.value || 0,
          color: colors[i],
        };
      });

      setPreperedData(result);
    },
    [data],
  );

  return (
    <MarketTrendsTab
      title="Most frequent day"
      description="demand for cargo transportation depending on the day of the week"
    >
      <div className="h-[300px] lg:h-[500px] w-full">
        {!!preperedData.length && <BarChartGraph data={preperedData} />}
        {!!!preperedData.length && (
          <div className="text-center text-[24px]/[27px] h-[70%] flex items-center justify-center">
            Data not found
          </div>
        )}
      </div>
    </MarketTrendsTab>
  );
};

export default MostFrequentDay;
