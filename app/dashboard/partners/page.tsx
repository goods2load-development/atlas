import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import PartnersMain from '@/components/Dashboard/PartnersMain/PartnersMain';

const PartnersMainLazy = dynamic(
  () => import('@/components/Dashboard/PartnersMain/PartnersMain'),
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
            <PartnersMainLazy />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
