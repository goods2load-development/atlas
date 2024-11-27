import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import CreateUpdateBlog from '@/components/Dashboard/BlogMain/CreateUpdateBlog';

const CreateUpdateBlogLazy = dynamic(
  () => import('@/components/Dashboard/BlogMain/CreateUpdateBlog'),
  {
    ssr: false,
  },
);

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <CreateUpdateBlogLazy type="create" />
        </div>
      </>
    </DashboardLayout>
  );
}
