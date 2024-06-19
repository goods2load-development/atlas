"use client";

import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import OpportunitiesMain from "@/components/Dashboard/OpportunitiesMain/OpportunitiesMain";
import RadioGroupItems from "@/components/Dashboard/RadioGroupItems";
import AdaptiveSidebar from "@/components/Dashboard/MobileSidebar/MobileSidebar";

export default function OpportunitiesPage({
  params,
}: {
  params: { route: string };
}) {
  const pathname = usePathname();

  const colorClass = pathname === params.route ? "text-black" : "text-blue";

  return (
    <div className="grid sm:grid-cols-[auto_1fr]">
      <Sidebar />
      <AdaptiveSidebar />

      <div className={`${colorClass} p-2 md:p-10 bg-[#f5f4f3] pt-20 md:pt-0`}>
        <div className="flex gap-4 flex-col font-poppins">
          <h1 className="text-[26px] font-[400] text-[#263238] leading-[30px] text-center md:text-left">
            Opportunities
          </h1>
          <h2 className="text-[#FF6720] text-[18px] leading-[26px] text-center md:text-left">
            Unserved Routes
          </h2>
          <RadioGroupItems />
        </div>

        <OpportunitiesMain />
      </div>
    </div>
  );
}
