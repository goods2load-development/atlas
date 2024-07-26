"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import MainMenuTabs from "./PerformanceTabs";
import MainMenuCardsList from "./PerformanceCards";
import EvolutionTab from "./Tabs/EvolutionTab";
import CompetitivenessTab from "./Tabs/CompetitivenessTab";
import { usePerformanceStore } from "@/lib/analyticsStore";
import { IAnalyticsStore } from "@/app/interface/dashboard";
import { IPerformanceTab, PerformaceTab } from "@/app/interface/dashboard";

const PerformanceMain = () => {
  const {
    transportation,
    performanceData,
    getPerformancedData,
  }: IAnalyticsStore = usePerformanceStore();
  const [activeTab, setActiveTab] = useState<PerformaceTab>(
    PerformaceTab.EVOLUTION
  );

  const tabs = useMemo<IPerformanceTab[]>(
    () => [
      {
        label: PerformaceTab.EVOLUTION,
        element: <EvolutionTab data={performanceData?.evolution || []} />,
      },
      {
        label: PerformaceTab.COMPETITIVENESS,
        element: (
          <CompetitivenessTab data={performanceData?.competitiveness || []} />
        ),
      },
      {
        label: PerformaceTab.COMPETITIVE_PRESSURE,
        element: (
          <CompetitivenessTab
            data={performanceData?.competitivePressure || []}
          />
        ),
      },
    ],
    [performanceData]
  );

  useEffect(() => {
    getPerformancedData(transportation);
  }, []);

  const onChangeTab = useCallback(
    (label: PerformaceTab) => {
      const tab = tabs.filter((tab) => tab.label === label)[0];
      setActiveTab(tab.label);
    },
    [tabs]
  );

  return (
    <div className="flex flex-col justify-center mt-4">
      <MainMenuTabs
        onChangeTab={onChangeTab}
        tabs={tabs}
        activeTab={activeTab}
      />
      <MainMenuCardsList data={performanceData} />
      {tabs.filter((tab) => activeTab === tab.label)[0].element}
    </div>
  );
};

export default PerformanceMain;
