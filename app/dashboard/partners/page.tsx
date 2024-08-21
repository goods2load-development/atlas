import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";
import PartnersMain from "@/components/Dashboard/PartnersMain/PartnersMain";
import { Suspense } from "react";

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <Suspense>
            <PartnersMain />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
