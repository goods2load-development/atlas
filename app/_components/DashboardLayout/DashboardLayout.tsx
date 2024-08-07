import MobileSidebar from "@/components/Dashboard/MobileSidebar/MobileSidebar";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";
import MobileFooter from "@/components/Dashboard/MobileFooter/MobileFooter";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <MobileSidebar />
      <div>{children}</div>
      <MobileFooter />
    </div>
  );
}

export default DashboardLayout;
