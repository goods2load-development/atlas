import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import TemplateCategoriesMain from '@/components/Dashboard/TemplateMain/TemplateCategoriesMain';

export default function TemplcateCategoriesPage() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <TemplateCategoriesMain />
        </div>
      </>
    </DashboardLayout>
  );
}
