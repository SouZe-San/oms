"use client";

import "./dash-nav-style.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchLowStockProducts } from "@oms/store/stockNotification";
import { useAppDispatch, useAppSelector } from "@oms/store/hooks";
import { Role } from "@oms/types/user.type";

import NotificationModal from "./NotificationModal";
import LogoutButton from "../button/LogoutButton";

import logo from "../../assets/icons/logo/oms.svg";
import fillCart from "../../assets/icons/customer/cart-fill.svg";
import fillPackage from "../../assets/icons/customer/package-fill.svg";
import notification from "../../assets/icons/admin/notification.svg";
import notificationAlert from "../../assets/icons/admin/alert-notification.svg";

const DashboardNav = ({ role }: { role: Role }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  //@alfaarghya
  /* handel notification for admin */
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.stockNotification.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasLowStock, setHasLowStock] = useState(false);

  useEffect(() => {
    (dispatch as any)(fetchLowStockProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      setHasLowStock(true);
    } else {
      setHasLowStock(false);
    }
  }, [products]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  /*---- ---- */

  return (
    <header className="flex items-center justify-between p-4 dash-nav">
      <div className="logo">
        <span>
          <Link href="/">
            <Image src={logo} alt="logo" />
          </Link>
        </span>
      </div>
      <nav>
        {/* @SouZe-San  */}
        {/* handle Customer item */}
        {role === Role.CUSTOMER && (
          <ul>
            <li>
              <Link href="/cart">
                <button>
                  <span> Cart</span>
                  <Image src={fillCart} alt="cart" width={24} height={24} />
                </button>
              </Link>
            </li>
            <li>
              <Link href="/order">
                <button>
                  <span> order</span>
                  <Image src={fillPackage} alt="cart" width={24} height={24} />
                </button>
              </Link>
            </li>
          </ul>
        )}

        {/* @alfaarghya */}
        {/* handle admin item */}
        {role === Role.ADMIN && (
          <div className="relative px-5">
            <button onClick={toggleModal} className="relative cursor-pointer">
              {hasLowStock ? (
                <Image src={notificationAlert} alt="notifications" width={24} height={24} />
              ) : (
                <Image src={notification} alt="notifications" width={24} height={24} />
              )}
            </button>

            {isModalOpen && <NotificationModal onClose={toggleModal} products={products} />}
          </div>
        )}

        <div className={`auth_btns ${isAuthenticated ? "" : "-ml-4"}`}>
          {isAuthenticated ? (
            <>
              <span className="mr-8">
                Hello, <span>{user?.firstName}</span>
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/auth/signin">
              <button>Log In</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default DashboardNav;
