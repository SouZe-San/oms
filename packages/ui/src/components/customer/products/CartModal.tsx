"use client";
import { updateCart } from "@oms/utils/api.customer";

import { axiosErrorHandler } from "@oms/utils/handlers";

import { useState } from "react";
import { toast } from "sonner";
interface NotificationModalProps {
  product: { id: string; name: string; stock: number };
  onClose: () => void;
}

const CartModal = ({ product, onClose }: NotificationModalProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  //   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = parseInt(e.target.value);
  //     if (!isNaN(value) && value >= 0) {
  //       setQuantity(value);
  //     }
  //   };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + change));
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    try {
      const productData = {
        name: product.name,
        productId: product.id,
        quantity: quantity,
      };
      await updateCart({ products: [productData] });
      toast.success("Product added to cart successfully!");
    } catch (error) {
      axiosErrorHandler(error, "Cart Modal - Adding to Cart");
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      onClose(); // Close the modal after adding to cart
      setQuantity(1);
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 ">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-2 z-50 w-96 bg-white/ rounded-lg shadow-lg  text-white bg-black/20">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3 text-center">Product Quantity</h2>

          {/* input for Product Quantity */}
          <div className="input">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-8 w-8 p-0 bg-white  hover:bg-white/70 font-black text-black rounded-lg cursor-pointer"
              >
                {/* <Minus size={14} /> */} &#45;
              </button>
              <div
                className="w-12 h-8 flex items-center justify-center text-sm text-white-700 quantity-box"
                style={{
                  background: "#5b5b5b1f",
                  borderRadius: "5px",
                  fontSize: "1.2rem",
                  textShadow: "0 0 3px white",
                }}
              >
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="h-8 w-8 p-0 bg-white  hover:bg-white/70 text-black font-black rounded-lg cursor-pointer"
              >
                {/* <Plus size={14} />  */} +
              </button>
            </div>
          </div>
          <div className="w-full flex gap-2 mt-4">
            <button
              onClick={onClose}
              className="mt-4 flex-1 bg-white text-black py-2 rounded hover:rounded-full text-sm transition-all"
            >
              Close
            </button>
            <button
              onClick={handleAddToCart}
              className="mt-4 flex-1 high-btn-bg  rounded hover:rounded-full transition-all text-sm"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartModal;
