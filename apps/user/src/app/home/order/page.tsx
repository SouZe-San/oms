import OrderItem from "@oms/ui/components/customer/order/order-item";

const orders = [
  {
    id: 1,
    title: "Order 1",
    status: "pending",
    date: "2023-10-01",
    price: "100.00",
    quantity: 2,
  },

  {
    id: 2,
    title: "Order 1",
    status: "completed",
    date: "2023-10-02",
    price: "150.00",
    quantity: 1,
  },
  {
    id: 3,
    title: "Order 1",
    status: "cancelled",
    date: "2023-10-03",
    price: "200.00",
    quantity: 3,
  },
  {
    id: 4,
    title: "Order 1",
    status: "pending",
    date: "2023-10-04",
    price: "120.00",
    quantity: 1,
  },
];

const page = () => {
  return (
    <div className="px-16 mt-12 py-8 flex flex-col gap-8">
      <h1 className="text-5xl font-medium mb-8">
        Your
        <span className="text-4xl"> Orders,</span>
      </h1>
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default page;
