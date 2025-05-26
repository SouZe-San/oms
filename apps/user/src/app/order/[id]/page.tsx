"use client";

import SingleOrder from "@oms/ui/components/customer/order/singleOrder";
import { Order } from "@oms/types/order.type";
import { getOrderDetails } from "@oms/utils/api.customer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const Page = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams() as { id: string };
  const router = useRouter();
  useEffect(() => {
    if (!id) {
      toast.error("Invalid Call");
      router.push("/order");
      return;
    }

    setLoading(true);
    async function fetchOrderDetails() {
      try {
        const { data } = await getOrderDetails(id);
        return data.order;
      } catch (error) {
        console.error("Error fetching order details:", error);
        return null;
        // Handle error appropriately, e.g., show a message to the user
      } finally {
        setLoading(false);
      }
    }
    (async () => {
      const orderDetails: Order | null = await fetchOrderDetails();
      setOrder(orderDetails);
    })();
  }, [id, router]);

  // const order: Order = {
  //   id: "4f4ffd2a-7bef-497b-b5ba-ea61b81521b7",
  //   userId: "52e6000c-86e7-4979-b662-0640c8204b85",
  //   shippingAddressId: "91cbf212-17f4-4d2c-9e36-f88718b1c3f0",
  //   status: "CONFIRMED",
  //   totalAmount: 6201.98,
  //   createdAt: "2025-05-25T10:21:11.962Z",
  //   totalItems: 4,
  //   payment: null,
  //   orderProducts: [
  //     {
  //       id: "571e014f-99c0-40a1-8260-8f553c2f050d",
  //       orderId: "4f4ffd2a-7bef-497b-b5ba-ea61b81521b7",
  //       productId: "b4af43d2-b01b-4796-9de9-67e59084b03c",
  //       name: "Wireless Bluetooth Headphones",
  //       quantity: 2,
  //       price: 1200.5,
  //     },
  //     {
  //       id: "37c38c68-d0e5-4806-b9d3-65e418793f9c",
  //       orderId: "4f4ffd2a-7bef-497b-b5ba-ea61b81521b7",
  //       productId: "a69b20f6-ecb2-4aba-b43b-94f8c15bf9e8",
  //       name: "Smartphone Case - Clear",
  //       quantity: 1,
  //       price: 699.99,
  //     },
  //     {
  //       id: "4bda36fe-4ded-44e4-9640-f2cb18307ed1",
  //       orderId: "4f4ffd2a-7bef-497b-b5ba-ea61b81521b7",
  //       productId: "fc12416d-5f2a-4124-b4df-a7c8b2f9dbda",
  //       name: "USB-C Charging Cable",
  //       quantity: 2,
  //       price: 1200.5,
  //     },
  //     {
  //       id: "6f900e15-2909-4f9b-8e37-22be705e1fe2",
  //       orderId: "4f4ffd2a-7bef-497b-b5ba-ea61b81521b7",
  //       productId: "d5d0f8f1-e5ef-40f2-93ac-65991fc2bde0",
  //       name: "Laptop Stand - Adjustable",
  //       quantity: 1,
  //       price: 699.99,
  //     },
  //   ],
  //   shippingAddress: {
  //     id: "91cbf212-17f4-4d2c-9e36-f88718b1c3f0",
  //     userId: "52e6000c-86e7-4979-b662-0640c8204b85",
  //     type: "CURRENT",
  //     street: "456 Customer St",
  //     city: "Customer City",
  //     state: "Customer State",
  //     country: "Customer Land",
  //     zipCode: "67890",
  //   },
  // };

  if (loading) {
    return <p className="text-center text-2xl font-bold">Loading...</p>;
  }

  return (
    <section className="px-16 mt-12 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      {order === null ? (
        <p className="text-red-100/50 text-5xl font-black text-center">Order not found </p>
      ) : (
        <SingleOrder order={order} />
      )}
    </section>
  );
};

export default Page;
