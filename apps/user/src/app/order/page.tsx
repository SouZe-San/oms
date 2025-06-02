"use client";

import { OrderResponse } from "@oms/types/api.type";
import OrderItem from "@oms/ui/components/customer/order/order-item";
import { getAllOrders } from "@oms/utils/api.customer";
import { axiosErrorHandler } from "@oms/utils/handlers";
import { useEffect, useState } from "react";

// const orders = [
//   {
//     id: 1,
//     title: "Order 1",
//     status: "pending",
//     date: "2023-10-01",
//     price: "100.00",
//     quantity: 2,
//   },

//   {
//     id: 2,
//     title: "Order 1",
//     status: "completed",
//     date: "2023-10-02",
//     price: "150.00",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     title: "Order 1",
//     status: "cancelled",
//     date: "2023-10-03",
//     price: "200.00",
//     quantity: 3,
//   },
//   {
//     id: 4,
//     title: "Order 1",
//     status: "pending",
//     date: "2023-10-04",
//     price: "120.00",
//     quantity: 1,
//   },
// ];

const Page = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await getAllOrders();
        return data.orders || []; // Ensure we return an empty array if no orders are found
      } catch (error) {
        axiosErrorHandler(error, "Order Page - Fetching Orders");
        return [];
      }
    }
    (async () => {
      const fetchedOrders: OrderResponse[] = await fetchOrders();
      setOrders(fetchedOrders);
    })();
  }, []);

  return (
    <div className="sm:px-16 px-4 mt-12 py-8 flex flex-col gap-8">
      <h1 className="sm:text-6xl text-4xl font-medium mb-8 font-roboto-flex">Order List</h1>

      {orders.length === 0 ? (
        <p className="text-red-100/50 sm:text-5xl text-3xl font-black text-center font-neue">No Orders Found</p>
      ) : (
        orders.map((order: OrderResponse, index) => <OrderItem key={order.id} order={order} index={index} />)
      )}
    </div>
  );
};

export default Page;
