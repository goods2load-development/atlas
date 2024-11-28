import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import BlogMain from '@/components/Dashboard/BlogMain/BlogMain';

const BlogMainLazy = dynamic(
  () => import('@/components/Dashboard/BlogMain/BlogMain'),
  {
    ssr: false,
  },
);

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <Suspense>
            <BlogMainLazy />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
