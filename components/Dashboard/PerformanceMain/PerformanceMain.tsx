'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import PerformanceTabs from "./PerformanceTabs";
import EvolutionTab from "./Tabs/EvolutionTab/EvolutionTab";
import CompetitivenessTab from "./Tabs/CompetitivenessTab/CompetitivenessTab";
import { useAnalyticsStore } from "@/lib/analyticsStore";
import { PerformaceTab, type IPerformanceTab } from "./PerformanceTabs";
import { type IAnalyticsStore } from "@/lib/analyticsStore";
import UserSegmentationTab from "./Tabs/UserSegmentationaTab/UserSegmentationTab";
// import UserSegmentationTab from "./Tabs/UserSegmentationTab";

const PerformanceMain = () => {
  const { deliveryBy, performanceData, getPerformancedData }: IAnalyticsStore =
    useAnalyticsStore();
  const [activeTab, setActiveTab] = useState<PerformaceTab>(
    PerformaceTab.EVOLUTION,
  );

  const tabs = useMemo<IPerformanceTab[]>(
    () => [
      {
        label: PerformaceTab.EVOLUTION,
        element: <EvolutionTab data={performanceData || []} />,
      },
      {
        label: PerformaceTab.COMPETITIVENESS,
        element: <CompetitivenessTab data={performanceData || []} />,
        element: <CompetitivenessTab data={performanceData || []} />,
      },
      {
        label: PerformaceTab.USER_SEGMENTATION,
        element: <UserSegmentationTab data={performanceData || []} />,
        element: <UserSegmentationTab data={performanceData || []} />,
      },
    ],
    [performanceData],
  );

  useEffect(() => {
    getPerformancedData(deliveryBy);
  }, []);

  const onChangeTab = useCallback(
    (label: PerformaceTab) => {
      const tab = tabs.filter((tab) => tab.label === label)[0];
      setActiveTab(tab.label);
    },
    [tabs],
  );

  return (
    <div className="flex flex-col justify-center mt-4">
      <PerformanceTabs
        onChangeTab={onChangeTab}
        tabs={tabs}
        activeTab={activeTab}
      />
      {tabs.filter((tab) => activeTab === tab.label)[0].element}
    </div>
  );
};

export default PerformanceMain;

