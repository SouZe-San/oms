import { OrderENUM, PaymentENUM } from "@oms/types/order.type";
import { useMemo, useState } from "react";
interface OrderProps {
  orderId: string;
  quantity: number;
  price: number;
  date: string;
  status: string;
  payment: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
}

const OrderList = ({ orders }: { orders: OrderProps[] }) => {
  const [dateOrder, setDateOrder] = useState<"asc" | "desc">("desc");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (paymentFilter !== "ALL") {
      filtered = filtered.filter((o) => o.payment === paymentFilter);
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [orders, dateOrder, paymentFilter, statusFilter]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mx-2">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-muted-foreground text-sm">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border-collapse text-sm ">
            <thead className="bg-white/25  text-white text-center">
              <tr>
                <th className="px-4 py-4 border-r border-white/40">Order ID</th>
                <th className="px-4 py-4 border-r border-white/40">Qty</th>
                <th className="px-4 py-4 border-r border-white/40">Price ₹</th>

                {/* Date Sorter */}
                <th className="px-4 py-4 border-r border-white/40">
                  <div className="flex items-end justify-center gap-2">
                    <span className="text-lg">Date</span>
                    <button
                      className="text-xs border border-white/30 text-white/50 rounded-full px-2 hover:decoration-2 cursor-pointer"
                      onClick={() => setDateOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                    >
                      {dateOrder === "asc" ? (
                        <>
                          Asce <i className="ri-arrow-up-long-line"></i>
                        </>
                      ) : (
                        <>
                          Desc <i className="ri-arrow-down-long-line"></i>
                        </>
                      )}
                    </button>
                  </div>
                </th>

                {/* Status Filter */}
                <th className="px-4 py-4 border-r border-white/40">
                  <select
                    className="text-xs border rounded px-2 py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="ALL" className="bg-black/30">
                      Status
                    </option>
                    {Object.values(OrderENUM).map((status) => (
                      <option key={status} value={status} className="bg-black/30">
                        {status}
                      </option>
                    ))}
                  </select>
                </th>

                {/* Payment Filter */}
                <th className="px-4 py-4 border-r border-white/40">
                  <select
                    className="text-xs border rounded px-2 py-1"
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                  >
                    <option value="ALL" className="bg-black/30">
                      Payment
                    </option>
                    {Object.values(PaymentENUM).map((pay) => (
                      <option key={pay} value={pay} className="bg-black/30">
                        {pay}
                      </option>
                    ))}
                  </select>
                </th>

                <th className="px-4 py-4  border-white/40">Address</th>
              </tr>
            </thead>
            <tbody className="text-center text-white">
              {filteredOrders.map(
                (order: {
                  orderId: string;
                  quantity: number;
                  price: number;
                  date: string;
                  status: string;
                  payment: string;
                  address: any;
                }) => (
                  <tr
                    key={order.orderId}
                    className=" not-last:border-b not-last:border-white/40 hover:bg-white/10 bg-white/5 transition-colors"
                  >
                    <td className="py-4 border-r border-white/40 font-neue">{order.orderId}</td>
                    <td className="px-4 py-4 border-r border-white/40 font-roboto-flex">{order.quantity}</td>
                    <td className="px-4 py-4 border-r border-white/40 font-roboto-flex">{order.price.toFixed(2)}</td>
                    <td className="px-4 py-4 border-r border-white/40 font-roboto-flex">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="  border-r border-white/40">
                      {order.status === OrderENUM.CANCELLED && (
                        <span className="py-2 px-6 rounded-2xl cancelled text-sm">{order.status}</span>
                      )}
                      {order.status === OrderENUM.CONFIRMED && (
                        <span className="py-2 px-6 rounded-2xl confirmed text-sm">{order.status}</span>
                      )}
                      {order.status === OrderENUM.DELIVERED && (
                        <span className="py-2 px-6 rounded-2xl success text-sm">{order.status}</span>
                      )}
                      {order.status === OrderENUM.SHIPPED && (
                        <span className="py-2 px-6 rounded-2xl pending text-sm">{order.status}</span>
                      )}
                    </td>
                    <td className="px-4 py-4 border-r border-white/40">
                      {order.payment === PaymentENUM.COMPLETED && (
                        <span className="py-2 px-6 rounded-2xl success">{order.payment}</span>
                      )}
                      {order.payment === PaymentENUM.PENDING && (
                        <span className=" py-2 px-6 rounded-2xl pending">{order.payment}</span>
                      )}
                      {order.payment === PaymentENUM.FAILED && (
                        <span className="py-2 px-6 rounded-2xl cancelled">{order.payment}</span>
                      )}
                    </td>
                    <td className="px-4 py-4  border-white/40">
                      {order.address ? `${order.address.street}, ${order.address.city}` : "N/A"}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
