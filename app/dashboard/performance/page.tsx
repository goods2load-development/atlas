"use client";

import AdaptiveSidebar from "@/components/Dashboard/MobileSidebar/MobileSidebar";
import PerformanceMain from "@/components/Dashboard/PerformanceMain/PerformanceMain";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function Performance({ params }: { params: { route: string } }) {
  const pathname = usePathname();

  const colorClass = pathname === params.route ? "text-black" : "text-blue";

  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <AdaptiveSidebar />
      <div className={`${colorClass} p-10 bg-[#f5f4f3] pt-20 md:pt-0`}>
        <div className="flex gap-4 flex-col font-poppins">
          <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px]">
            Company’s insight
          </h1>
          <h2 className="text-[#FF6720] text-[18px] leading-[26px]">
            Performance
          </h2>
        </div>
        <PerformanceMain />
      </div>
    </div>
  );
}
