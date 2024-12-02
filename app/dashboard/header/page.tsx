import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import HeaderMain from '@/components/Dashboard/HeaderFooterMain/HeaderMain';

const HeaderMainLazy = dynamic(
  () => import('@/components/Dashboard/HeaderFooterMain/HeaderMain'),
  {
    ssr: false,
  },
);

export default function Footer() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <HeaderMainLazy />
        </div>
      </>
    </DashboardLayout>
  );
}
