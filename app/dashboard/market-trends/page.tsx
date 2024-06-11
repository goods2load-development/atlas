"use client";

import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function MarketTrends({ route }: { route: string }) {
  const pathname = usePathname();

  const style = pathname === route ? "text-black" : "text-blue";
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <main className={`${style} p-9`}>
        
         
      </main>
      ;
    </div>
  );
}
