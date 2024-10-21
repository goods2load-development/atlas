import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import FooterMain from '@/components/Dashboard/HeaderFooterMain/FooterMain';

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <FooterMain />
        </div>
      </>
    </DashboardLayout>
  );
}
