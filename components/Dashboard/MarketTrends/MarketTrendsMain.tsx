import { type ReactNode, useState } from "react";
import MarketTrendsTabs from "./MarketTrendsTabs";
import { tabsMocks } from "./mocks/tabs";

export interface Tab {
  id: number;
  text: string;
  element: ReactNode;
}

const MarketTrendsMain = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabsMocks[0]);
  const [tabs, setTabs] = useState<Tab[]>(tabsMocks);

  const onChangeTab = (id: number) => {
    const tab = tabs.find((elem: Tab) => elem.id === id);

    if (tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="md:flex md:gap-6 lg:items-stretch items-start">
      <MarketTrendsTabs
        tabs={tabs}
        activeTab={activeTab}
        onChangeTab={onChangeTab}
      />

      <div className="flex flex-col gap-6 w-full">{activeTab.element}</div>
    </div>
  );
};

export default MarketTrendsMain;
