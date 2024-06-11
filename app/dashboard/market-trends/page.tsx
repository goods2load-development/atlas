"use client";

import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function MarketTrends({
  params,
}: {
  params: { route: string };
}) {
  const pathname = usePathname();

  const style = pathname === params.route ? "text-black" : "text-blue";
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <main className={`${style} p-9`}></main>;
    </div>
  );
}
