"use client";

import MobileSidebar from "@/components/Dashboard/MobileSidebar/MobileSidebar";
import PerformanceMain from "@/components/Dashboard/PerformanceMain/PerformanceMain";
import RadioGroupItems from "@/components/Dashboard/RadioGroupItems";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import MobileFooter from "@/components/Dashboard/MobileFooter/MobileFooter";
import { usePerformanceStore } from "@/lib/analyticsStore";
import { DeliveryBy } from "@/lib/filterStore";
import { IAnalyticsStore } from "@/lib/analyticsStore";

export default function Performance({ params }: { params: { route: string } }) {
  const pathname = usePathname();
  const colorClass = pathname === params.route ? "text-black" : "text-blue";
  const { deliveryBy, onChangeTransportation }: IAnalyticsStore =
    usePerformanceStore();

  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <MobileSidebar />
      <div>
        <div className={`${colorClass} lg:p-10 p-4 bg-[#f5f4f3] pt-20`}>
          <div className="flex gap-2 flex-col font-poppins">
            <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
              Company’s insight
            </h1>
            <h2 className="text-[#FF6720] text-[18px] leading-[26px] text-center md:text-left">
              Performance
            </h2>
            <RadioGroupItems
              onChangeValue={(value: DeliveryBy) => {
                onChangeTransportation(value);
              }}
            />
          </div>
          <PerformanceMain key={deliveryBy} />
        </div>

        <MobileFooter />
      </div>
    </div>
  );
}
