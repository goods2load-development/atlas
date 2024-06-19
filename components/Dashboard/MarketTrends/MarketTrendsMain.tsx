import { type ReactNode, useState } from "react";
import MarketTrendsTabs from "./MarketTrendsTabs";
import { Tabs } from "./mocks/tabs";

export interface Tab {
  id: number;
  text: string;
  element: ReactNode;
}

const MarketTrendsMain = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(Tabs);

  const onChangeTab = (id: number) => {
    const tab = tabs.find((elem: Tab) => elem.id === id);

    if (tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="md:flex md:gap-6 lg:items-stretch items-start mt-6">
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
