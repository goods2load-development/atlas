"use client";

import { type Tab } from "./MarketTrendsMain";

interface MarketTrendsTabs {
  tabs: Tab[];
  activeTab: Tab;
  onChangeTab: (id: number) => void;
}

const MarketTrendsTabs = ({
  tabs,
  activeTab,
  onChangeTab,
}: MarketTrendsTabs) => {
  return (
    <div className="py-8 px-6 rounded-md bg-white">
      {
        <ol className="flex flex-col gap-4">
          {tabs.map(({ id, text }, idx) => {
            return (
              <li
                className="p-2 whitespace-nowrap rounded-md flex gap-2 hover:bg-primaryOrange hover:opacity-80 cursor-pointer hover:text-white transition-all font"
                key={id}
                style={{
                  backgroundColor: activeTab.id === id ? "#FF6720" : "",
                  color: activeTab.id === id ? "white" : "",
                  pointerEvents: activeTab.id === id ? "none" : "all",
                }}
                onClick={() => onChangeTab(id)}
              >
                <span>{idx + 1}</span>
                <span className="">{text}</span>
              </li>
            );
          })}
        </ol>
      }
    </div>
  );
};

export default MarketTrendsTabs;
