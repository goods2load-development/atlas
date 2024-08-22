"use client";

import MarketTrendsMain from "@/components/Dashboard/MarketTrends/MarketTrendsMain";
import RadioGroupItems from "@/components/Dashboard/RadioGroupItems";
import { usePathname } from "next/navigation";
import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";

export default function MarketTrends({
  params,
}: {
  params: { route: string };
}) {
  const pathname = usePathname();
  const colorClass = pathname === params.route ? "text-black" : "text-blue";

  return (
    <DashboardLayout>
      <div className={`${colorClass} p-4 lg:p-10 bg-[#f5f4f3] pt-20`}>
        <div className="flex gap-2 flex-col font-poppins">
          <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
            Company’s insight
          </h1>
          <h2 className="text-[#FF6720] text-[18px] leading-[26px] text-center md:text-left">
            Market trends
          </h2>
          <RadioGroupItems />
        </div>

        <MarketTrendsMain />
      </div>
    </DashboardLayout>
  );
}
