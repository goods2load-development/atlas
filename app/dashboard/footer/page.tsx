import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";
import FooterMain from "@/components/Dashboard/FooterMain/FooterMain";
import { Suspense } from "react";

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <Suspense>
            <FooterMain />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
