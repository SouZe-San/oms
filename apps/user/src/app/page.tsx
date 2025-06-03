import MainSection from "@oms/ui/pages/customer/home/Home";
import DashboardNav from "@oms/ui/components/nav/dashboard-nav";

import { Role } from "@oms/types/user.type";
const page = () => {
  return (
    <>
      <DashboardNav role={Role.CUSTOMER} />
      <main className="flex-1 dashboard-section min-h-screen product-list-section">
        <MainSection />
      </main>
    </>
  );
};

export default page;
