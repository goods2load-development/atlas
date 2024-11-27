import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import CategoriesMain from '@/components/Dashboard/BlogMain/CategoriesMain';

const CategoriesMainLazy = dynamic(
  () => import('@/components/Dashboard/BlogMain/CategoriesMain'),
  {
    ssr: false,
  },
);

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <CategoriesMainLazy />
        </div>
      </>
    </DashboardLayout>
  );
}
