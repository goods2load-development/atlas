import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import ApproveComments from '@/components/Dashboard/BlogMain/ApproveComments';
import CreateUpdateBlog from '@/components/Dashboard/BlogMain/CreateUpdateBlog';

const ApproveCommentsLazy = dynamic(
  () => import('@/components/Dashboard/BlogMain/ApproveComments'),
  {
    ssr: false,
  },
);

export default function EditBlog() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <ApproveCommentsLazy />
        </div>
      </>
    </DashboardLayout>
  );
}
