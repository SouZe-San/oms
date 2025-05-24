import Image from "next/image";
import Link from "next/link";

import logo from "../../assets/icons/logo/oms.svg";
const LogoHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 absolute top-0 left-0 z-10 px-32 py-8">
      <div className="logo">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
    </header>
  );
};

export default LogoHeader;
