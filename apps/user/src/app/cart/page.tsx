"use client";
import CartPage from "@oms/ui/components/customer/order/cart/CartPage";
import { axiosErrorHandler } from "@oms/utils/handlers";
import { CartProduct } from "@oms/types/cart.type";
import { getCartProducts } from "@oms/utils/api.customer";
import { useEffect, useState } from "react";

const Page = () => {
  async function fetchCartDetails() {
    try {
      const { data } = await getCartProducts();
      return data.cartProducts as CartProduct[];
    } catch (error) {
      axiosErrorHandler(error, "Cart Page - Fetching Cart Details");
      return null;
    }
  }

  const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
  useEffect(() => {
    (async () => {
      const cartProducts: CartProduct[] | null = await fetchCartDetails();

      setCartProducts(cartProducts);
    })();
  }, []);

  return (
    <section className="sm:px-16 px-3 mt-12 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold  mb-2">Shopping Cart</h1>
        <p className="text-white/70">Review and modify your cart items</p>
      </div>

      {cartProducts && cartProducts.length > 0 ? (
        <CartPage cartDetails={cartProducts} />
      ) : (
        <p className="text-red-100/50 text-5xl font-black text-center">Empty Cart</p>
      )}
    </section>
  );
};

export default Page;
