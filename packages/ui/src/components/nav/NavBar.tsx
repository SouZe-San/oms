"use client";
import Link from "next/link";
import "./nav-style.css";

import { useAppSelector } from "@oms/store/hooks";
import LogoutButton from "../button/LogoutButton";

const NavBar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  return (
    <header className="flex items-center justify-between p-4 ">
      <div className="logo">
        <span>LOGO</span>
      </div>

      <nav className="menu">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/#RewardsSection">service</Link>
          </li>
          <li>
            <Link href="/#TopicsSection">Pricing</Link>
          </li>
          <li>
            <Link href="/#RulesSection">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="auth_btns">
        {isAuthenticated ? (
          <>
            <span className="mr-2">Welcome, {user?.firstName}</span>
            <LogoutButton />
          </>
        ) : (
          <Link href="/auth/signin">
            <button className="">Log In</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
