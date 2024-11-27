import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import RoutesMain from '@/components/Dashboard/RoutesMain/RoutesMain';

const RoutesMainLazy = dynamic(
  () => import('@/components/Dashboard/RoutesMain/RoutesMain'),
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
            <RoutesMainLazy />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
