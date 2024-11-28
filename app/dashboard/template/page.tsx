import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import TemplateMain from '@/components/Dashboard/TemplateMain/TemplateMain';

const TemplateMainLazy = dynamic(
  () => import('@/components/Dashboard/TemplateMain/TemplateMain'),
  {
    ssr: false,
  },
);

export default function Template() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <Suspense>
            <TemplateMainLazy />
          </Suspense>
        </div>
      </>
    </DashboardLayout>
  );
}
