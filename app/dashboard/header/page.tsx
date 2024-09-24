import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";
import HeaderMain from "@/components/Dashboard/HeaderFooterMain/HeaderMain";

export default function Footer() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <HeaderMain />
        </div>
      </>
    </DashboardLayout>
  );
}
