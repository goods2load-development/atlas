import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import ReferralMain from '@/components/Dashboard/ReferralMain/ReferralMain';

const ReferralMainLazy = dynamic(
  () => import('@/components/Dashboard/ReferralMain/ReferralMain'),
  {
    ssr: false,
  },
);

export default function Referral() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <ReferralMainLazy />
        </div>
      </>
    </DashboardLayout>
  );
}
