import { Role } from "@oms/types/user.type";
import SigninPage from "@oms/ui/pages/SigninPage";

const Page = () => {
  return <SigninPage role={Role.ADMIN} />
}

export default Page;
