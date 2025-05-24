import "./dash-nav-style.css";

import Image from "next/image";
import Link from "next/link";

import logo from "../../assets/icons/logo/oms.svg";
import { Role } from "@oms/types/user.type";
import LogoutButton from "../button/LogoutButton";

import fillCart from "../../assets/icons/customer/cart-fill.svg";
import fillPackage from "../../assets/icons/customer/package-fill.svg";

const user = {
  firstName: "Souze",
  lastName: "K",
};
const DashboardNav = ({ role }: { role: Role }) => {
  return (
    <header className="flex items-center justify-between p-4 dash-nav">
      <div className="logo">
        <span>
          <Image src={logo} alt="logo" />
        </span>
      </div>
      <nav>
        {role === Role.CUSTOMER && (
          <ul>
            <li>
              <Link href="/home">
                <button>
                  <span> Cart</span>
                  <Image src={fillCart} alt="cart" width={24} height={24} />
                </button>
              </Link>
            </li>
            <li>
              <Link href="/home">
                <button>
                  <span> order</span>
                  <Image src={fillPackage} alt="cart" width={24} height={24} />
                </button>
              </Link>
            </li>
          </ul>
        )}

        <div className="auth_btns">
          <span className="mr-8 text-3xl">
            Hello, <span className="text-xl">{user?.firstName}</span>
          </span>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;
