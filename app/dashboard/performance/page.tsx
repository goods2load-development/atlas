"use client";

import PerformanceMain from "@/components/Dashboard/PerformanceMain/PerformanceMain";
import RadioGroupItems from "@/components/Dashboard/RadioGroupItems";
import { usePathname } from "next/navigation";
import { TabName } from "@/app/interface/helpData";
import { useState } from "react";
import { performanceData } from "@/components/Dashboard/PerformanceMain/mocks/data";
import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";

export default function Performance({ params }: { params: { route: string } }) {
  const pathname = usePathname();
  const colorClass = pathname === params.route ? "text-black" : "text-blue";

  const [activeTransport, setActiveTransport] = useState<TabName>(
    TabName.PLANE
  );

  return (
    <DashboardLayout>
      <>
        <div className={`${colorClass} lg:p-10 p-4 bg-[#f5f4f3] pt-20`}>
          <div className="flex gap-2 flex-col font-poppins">
            <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
              Company’s insight
            </h1>
            <h2 className="text-[#FF6720] text-[18px] leading-[26px] text-center md:text-left">
              Performance
            </h2>
            <RadioGroupItems
              onChageValue={(value: TabName) => setActiveTransport(value)}
            />
          </div>
          <PerformanceMain
            key={activeTransport}
            cardsData={performanceData[activeTransport].cards}
            tabsData={performanceData[activeTransport].tabsData}
          />
        </div>
      </>
    </DashboardLayout>
  );
}
