import DashboardLayout from "@/app/_components/DashboardLayout/DashboardLayout";
import CreateUpdateBlog from "@/components/Dashboard/BlogMain/CreateUpdateBlog";

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <CreateUpdateBlog type="create" />
        </div>
      </>
    </DashboardLayout>
  );
}
