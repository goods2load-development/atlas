"use client";

import MarketTrendsMain from "@/components/Dashboard/MarketTrends/MarketTrendsMain";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function MarketTrends({
  params,
}: {
  params: { route: string };
}) {
  const pathname = usePathname();

  const colorClass = pathname === params.route ? "text-black" : "text-blue";

  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <div className={`${colorClass} p-10 bg-[#f5f4f3]`}>
        <div className="flex gap-4 flex-col font-poppins">
          <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px]">
            Company’s insight
          </h1>
          <h2 className="text-[#FF6720] text-[18px] leading-[26px]">
            Market trends
          </h2>
        </div>

        <MarketTrendsMain />
      </div>
    </div>
  );
}
