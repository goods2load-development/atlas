import MobileFooter from '@/components/Dashboard/MobileFooter/MobileFooter';
import MobileSidebar from '@/components/Dashboard/MobileSidebar/MobileSidebar';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto]">
      <div className="fixed">
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className="sm:ml-[240px]">{children}</div>
      <MobileFooter />
    </div>
  );
}

export default DashboardLayout;
