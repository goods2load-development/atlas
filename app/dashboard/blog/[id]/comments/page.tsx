import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import CommentsMain from '@/components/Dashboard/BlogMain/CommentsMain';

const CommentsMainLazy = dynamic(
  () => import('@/components/Dashboard/BlogMain/CommentsMain'),
  {
    ssr: false,
  },
);

export default function CommentsPage() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <CommentsMainLazy />
        </div>
      </>
    </DashboardLayout>
  );
}
