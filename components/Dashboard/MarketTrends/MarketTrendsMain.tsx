import Map from '../Map/Map';
import MarketTrendsTabs from './MarketTrendsTabs';
import MostFrequentRoute from './Tabs/MostFrequentRoute';
import MostFrequentDay from './Tabs/MostRequentDay';
import TabMapDetails from './Tabs/TabMapDetails';
import TopTransportsGoods from './Tabs/TopTransportedGoods';
import { Tabs } from './mocks/tabs';
import { tab1Data } from './mocks/tabs';
import { type IAnalyticsStore } from '@/lib/analyticsStore';
import { useAnalyticsStore } from '@/lib/analyticsStore';

import { type ReactNode, useEffect, useState } from 'react';

export interface Tab {
  id: number;
  text: string;
  element: ReactNode;
}

const MarketTrendsMain = () => {
  const { deliveryBy, marketTrendsData, getMarketTrendsData }: IAnalyticsStore =
    useAnalyticsStore();
  const [activeTab, setActiveTab] = useState<Tab>(Tabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(Tabs);

  const onChangeTab = (id: number) => {
    const tab = tabs.find((elem: Tab) => elem.id === id);

    if (tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    getMarketTrendsData(deliveryBy);
  }, [deliveryBy]);

  return (
    <div className="md:flex md:gap-6 lg:items-stretch items-start mt-6">
      <MarketTrendsTabs
        tabs={tabs}
        activeTab={activeTab}
        onChangeTab={onChangeTab}
      />

      <div
        key={activeTab.id}
        className="flex flex-col gap-6 w-full max-w-[733px]"
      >
        {activeTab.id === 1 && <MostFrequentRoute data={[]} />}
        {activeTab.id === 2 && (
          <TopTransportsGoods data={marketTrendsData?.goodsFrequency || []} />
        )}
        {activeTab.id === 3 && (
          <MostFrequentDay data={marketTrendsData?.daysFrequency || []} />
        )}
      </div>
    </div>
  );
};

export default MarketTrendsMain;
