"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ServiceProvided } from "./TabsElements/ServiceProvided";
import { tab1Data, tab2Data, tab3Data, tab4Data } from "./mocks.data";

enum TabsEnum {
  SERVICES_PROVIDED = "Service provided",
  FOCUS = "Focus",
  INDUSTRIES = "Industries",
  CLIENT_TARGET = "Clients target",
}

const tabs = [
  {
    label: TabsEnum.SERVICES_PROVIDED,
    element: <ServiceProvided data={tab1Data} />,
  },
  {
    label: TabsEnum.FOCUS,
    element: <ServiceProvided data={tab2Data} />,
  },
  {
    label: TabsEnum.INDUSTRIES,
    element: <ServiceProvided data={tab3Data} />,
  },
  {
    label: TabsEnum.CLIENT_TARGET,
    element: <ServiceProvided data={tab4Data} />,
  },
];

export const ChartsComponent = () => {
  const [activeTab, setActiveTab] = useState<TabsEnum>(tabs[0].label);

  const onTabChange = (value: string) => {
    setActiveTab(value as TabsEnum);
  };

  return (
    <div className="text-black text-left p-4 border border-lightOrange">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="">
          {tabs.map(({ label }: { label: TabsEnum }, idx) => {
            const isActive = label === activeTab;
            const lastElement = tabs.length === idx + 1;

            return (
              <TabsTrigger
                key={label}
                className={`cursor-pointer text-[16px]/[24px] font-semibold w-[169px] rounded-none border-b border-r  ${lastElement ? "border-r-transparent border-b-lightOrange" : "border-lightOrange"}`}
                value={label}
                style={{
                  backgroundColor: isActive ? "#FFEDE4" : "inherit",
                  color: isActive ? "#FF6720" : "#000",
                }}
              >
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map(({ label, element }) => {
          return (
            <TabsContent key={label} value={label} className="">
              {element}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
