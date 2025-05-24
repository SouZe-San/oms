import type { Metadata } from "next";
import LogoHeader from "@oms/ui/components/nav/logo-header";
export const metadata: Metadata = {
  title: "OMS - Authentication",
  description: "Shopping with OMS",
};
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Nav */}
      <LogoHeader />
      {/* Main  */}
      <main className="dashboard-section min-h-screen flex justify-center items-center">{children}</main>
    </>
  );
}
