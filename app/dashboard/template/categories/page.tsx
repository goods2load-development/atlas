import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import dynamic from 'next/dynamic';

import TemplateCategoriesMain from '@/components/Dashboard/TemplateMain/TemplateCategoriesMain';

const TemplateCategoriesMainLazy = dynamic(
  () => import('@/components/Dashboard/TemplateMain/TemplateCategoriesMain'),
  {
    ssr: false,
  },
);

export default function TemplcateCategoriesPage() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <TemplateCategoriesMainLazy />
        </div>
      </>
    </DashboardLayout>
  );
}
