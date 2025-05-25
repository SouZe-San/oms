"use client";

import { Cart } from "@oms/types/cart.type";
import CartTable from "@oms/ui/components/customer/order/cart/CartTable";
import { useState } from "react";

const Page = () => {
  const [cart, setCart] = useState<Cart>([
    {
      id: "1a0019a3-8a75-4df2-b976-09e01fe45b2f",
      productId: "77f5e977-700a-4012-bc23-22b4b259b82d",
      name: "Laptop",
      quantity: 2,
      userId: "2be81e93-c5c7-4e0b-9ba6-a66eb21e0de5",
      product: {
        id: "77f5e977-700a-4012-bc23-22b4b259b82d",
        adminId: "8a8b7661-557b-47ba-8f5e-58bcbba1b1c2",
        name: "Laptop",
        description: "High-performance laptop",
        price: 1200.5,
        stock: 8,
        updatedAt: "2025-05-25T15:51:15.529Z",
        createdAt: "2025-05-25T15:51:15.447Z",
      },
    },
    {
      id: "0d6a85dc-904e-4139-af4b-c272aef404ed",
      productId: "243c9b21-fd65-42b6-ae41-a78a752847d3",
      name: "Laptop",
      quantity: 1,
      userId: "2be81e93-c5c7-4e0b-9ba6-a66eb21e0de5",
      product: {
        id: "243c9b21-fd65-42b6-ae41-a78a752847d3",
        adminId: "8a8b7661-557b-47ba-8f5e-58bcbba1b1c2",
        name: "Smartphone",
        description: "Latest smartphone with best camera",
        price: 699.99,
        stock: 19,
        updatedAt: "2025-05-25T15:51:15.529Z",
        createdAt: "2025-05-25T15:51:15.460Z",
      },
    },
  ]);

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item));
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = updatedItems.reduce((sum, item) => sum + item.product!.price * item.quantity, 0);

      return {
        ...prevCart,
        items: updatedItems,
        totalItems,
        totalAmount,
      };
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.filter((item) => item.id !== itemId);
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalAmount = updatedItems.reduce((sum, item) => sum + item.product!.price * item.quantity, 0);

      return {
        ...prevCart,
        items: updatedItems,
        totalItems,
        totalAmount,
      };
    });
  };

  return (
    <section className="px-16 mt-12 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold  mb-2">Shopping Cart</h1>
        <p className="text-white/70">Review and modify your cart items</p>
      </div>

      <CartTable cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />
    </section>
  );
};

export default Page;
