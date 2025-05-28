import { Role } from "@oms/types/user.type";
// import SignupPage from "@oms/ui/pages/SignupPage"
import SignUp from "@oms/ui/pages/SignUp";
const Page = () => {
  return <SignUp role={Role.CUSTOMER} />;
};

export default Page;
