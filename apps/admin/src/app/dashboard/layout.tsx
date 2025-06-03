import { Role } from "@oms/types/user.type";
import Sidebar from "@oms/ui/components/admin/Sidebar";
import DashboardNav from "@oms/ui/components/nav/dashboard-nav";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <DashboardNav role={Role.ADMIN} />
      <div className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-white/10 backdrop-blur-lg border-r border-white/20 z-10">
        <Sidebar />
      </div>
      <main className="pl-68 pt-24 h-screen overflow-y-auto pr-4 pb-4 admin-dashboard">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
}
