import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";
import TemplateMain from "@/components/Dashboard/TemplateMain/TemplateMain";
import { Suspense } from "react";

export default function Template() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <Suspense>
            <TemplateMain />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
