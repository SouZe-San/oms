import { Role } from "@oms/types/user.type";
import Sidebar from "@oms/ui/components/admin/Sidebar";
import DashboardNav from "@oms/ui/components/nav/dashboard-nav";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardNav role={Role.ADMIN} />
      <div className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r z-10">
        <Sidebar />
      </div>
      <main className="ml-64 mt-20 h-[calc(100vh-5rem)] overflow-y-auto p-4 bg-white">
        {children}
      </main>
    </>
  );
}