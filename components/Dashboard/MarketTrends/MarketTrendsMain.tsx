import MarketTrendsTabs from './MarketTrendsTabs';
import BookingBihaviorTab from './Tabs/BookingBihaviorTab';
import GeographicalTrendsTab from './Tabs/GeographicalTrendsTab';
import JourneyDurationTab from './Tabs/JourneyDurationTab';
import MostFrequentRouteTab from './Tabs/MostFrequentRouteTab';
import MostFrequentDay from './Tabs/MostRequentDay';
import PreferedIncoterms, { IIncoterms } from './Tabs/PreferedIcoterms';
import SeasonalVariationsTab from './Tabs/SeasonalVariationsTab';
import ServiceSatisfactionTab from './Tabs/ServiceSatisfactionTab';
import TopDeparturePoint from './Tabs/TopDeparturePoint';
import TopTransportsGoods from './Tabs/TopTransportedGoods';
import { Tabs } from './mocks/tabs';
import { tab1Data, tab4Data, tab5Data, tab6Data, tab7Data } from './mocks/tabs';
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
        {activeTab.id === 1 && (
          <MostFrequentRouteTab key={deliveryBy} data={[]} />
        )}
        {activeTab.id === 2 && (
          <TopTransportsGoods data={marketTrendsData?.goodsFrequency || []} />
        )}
        {activeTab.id === 3 && (
          <MostFrequentDay data={marketTrendsData?.daysFrequency || []} />
        )}
        {activeTab.id === 4 && <JourneyDurationTab data={tab4Data} />}
        {activeTab.id === 5 && (
          <TopDeparturePoint
            data={marketTrendsData?.fromRouteFrequency || []}
          />
        )}
        {activeTab.id === 6 && <ServiceSatisfactionTab data={tab6Data} />}
        {activeTab.id === 7 && <BookingBihaviorTab data={tab7Data} />}
        {activeTab.id === 8 && <GeographicalTrendsTab data={tab1Data} />}
        {activeTab.id === 9 && (
          <PreferedIncoterms
            data={(marketTrendsData?.generalIncoterms as IIncoterms[]) || []}
          />
        )}
        {activeTab.id === 10 && (
          <SeasonalVariationsTab
            data={marketTrendsData?.seasonsFrequency || []}
          />
        )}
      </div>
    </div>
  );
};

export default MarketTrendsMain;
