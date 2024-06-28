"use client";

import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { usePathname } from "next/navigation";
import OpportunitiesMain from "@/components/Dashboard/OpportunitiesMain/OpportunitiesMain";
import RadioGroupItems from "@/components/Dashboard/RadioGroupItems";
import MobileSidebar from "@/components/Dashboard/MobileSidebar/MobileSidebar";
import MobileFooter from "@/components/Dashboard/MobileFooter/MobileFooter";

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
      <MobileSidebar />

      <div className={`${colorClass} lg:p-10 p-4  bg-[#f5f4f3] pt-20`}>
        <div className="flex gap-2 flex-col font-poppins">
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
      <MobileFooter />
    </div>
  );
}
