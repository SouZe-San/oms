import { Role } from "@oms/types/user.type"
import SignupPage from "@oms/ui/pages/SignupPage"

const Page = () => {
  return <SignupPage role={Role.CUSTOMER} />
}

export default Page;
