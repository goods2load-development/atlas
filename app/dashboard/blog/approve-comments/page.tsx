import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import ApproveComments from '@/components/Dashboard/BlogMain/ApproveComments';
import CreateUpdateBlog from '@/components/Dashboard/BlogMain/CreateUpdateBlog';

export default function EditBlog() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <ApproveComments />
        </div>
      </>
    </DashboardLayout>
  );
}
