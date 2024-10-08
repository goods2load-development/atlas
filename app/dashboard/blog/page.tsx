import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";
import BlogMain from "@/components/Dashboard/BlogMain/BlogMain";
import { Suspense } from "react";

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <Suspense>
            <BlogMain />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
