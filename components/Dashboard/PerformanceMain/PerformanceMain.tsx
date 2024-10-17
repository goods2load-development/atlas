'use client';

import { type IPerformanceTab, PerformaceTab } from './PerformanceTabs';
import PerformanceTabs from './PerformanceTabs';
import CompetitivenessTab from './Tabs/CompetitivenessTab/CompetitivenessTab';
import EvolutionTab from './Tabs/EvolutionTab/EvolutionTab';
import UserSegmentationTab from './Tabs/UserSegmentationaTab/UserSegmentationTab';
import { type IAnalyticsStore } from '@/lib/analyticsStore';
import { usePerformanceStore } from '@/lib/analyticsStore';

import { useCallback, useEffect, useMemo, useState } from 'react';

// import UserSegmentationTab from "./Tabs/UserSegmentationTab";

const PerformanceMain = () => {
  const { deliveryBy, performanceData, getPerformancedData }: IAnalyticsStore =
    usePerformanceStore();
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
      },
      {
        label: PerformaceTab.USER_SEGMENTATION,
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
