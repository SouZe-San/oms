import DashboardNav from "@oms/ui/components/nav/dashboard-nav";
import type { Metadata } from "next";
import { Role } from "@oms/types/user.type";
export const metadata: Metadata = {
  title: "OMS - Orders",
  description: "Shopping with OMS",
};
export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Nav */}
      <DashboardNav role={Role.CUSTOMER} />
      {/* Main  */}
      <main className="flex-1 dashboard-section min-h-screen">{children}</main>
    </>
  );
}
