import DashboardLayout from '@/app/_components/DashboardLayout/DashboardLayout';

import CommentsMain from '@/components/Dashboard/BlogMain/CommentsMain';

export default function CommentsPage() {
  return (
    <DashboardLayout>
      <>
        <div className="lg:p-10 p-4 bg-[#f5f4f3] pt-20">
          <CommentsMain />
        </div>
      </>
    </DashboardLayout>
  );
}
