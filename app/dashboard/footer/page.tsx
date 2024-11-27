import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import FooterMain from '@/components/Dashboard/HeaderFooterMain/FooterMain';

const FooterMainLazy = dynamic(
  () => import('@/components/Dashboard/HeaderFooterMain/FooterMain'),
  {
    ssr: false,
  },
);

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <FooterMainLazy />
        </div>
      </>
    </DashboardLayout>
  );
}
