import { OrderENUM, PaymentENUM } from "@oms/types/order.type"
import { useMemo, useState } from "react";
interface OrderProps {
  orderId: string,
  quantity: number,
  price: number,
  date: string,
  status: string,
  payment: string,
  address: {
    street: string,
    city: string,
    state: string,
    country: string,
    zip: string
  }
}

const OrderList = ({ orders }: { orders: OrderProps[] }) => {
  const [dateOrder, setDateOrder] = useState<"asc" | "desc">("desc");
  const [paymentFilter, setPaymentFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (paymentFilter !== "ALL") {
      filtered = filtered.filter(o => o.payment === paymentFilter);
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(o => o.status === statusFilter);
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
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-400 text-sm ">
            <thead className="bg-gray-100 text-center">
              <tr>
                <th className="px-4 py-4 border border-gray-400">Order ID</th>
                <th className="px-4 py-4 border border-gray-400">Qty</th>
                <th className="px-4 py-4 border border-gray-400">Price ₹</th>

                {/* Date Sorter */}
                <th className="px-4 py-4 border border-gray-400">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span>Date</span>
                    <button
                      className="text-xs underline hover:decoration-2 cursor-pointer"
                      onClick={() =>
                        setDateOrder(prev => (prev === "asc" ? "desc" : "asc"))
                      }
                    >
                      {dateOrder === "asc" ? "Asce" : "Desc"}
                    </button>
                  </div>
                </th>

                {/* Status Filter */}
                <th className="px-4 py-4 border border-gray-400">
                  <select
                    className="text-xs border rounded px-2 py-1"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    <option value="ALL">Status</option>
                    {Object.values(OrderENUM).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </th>

                {/* Payment Filter */}
                <th className="px-4 py-4 border border-gray-400">
                  <select
                    className="text-xs border rounded px-2 py-1"
                    value={paymentFilter}
                    onChange={e => setPaymentFilter(e.target.value)}
                  >
                    <option value="ALL">Payment</option>
                    {Object.values(PaymentENUM).map(pay => (
                      <option key={pay} value={pay}>{pay}</option>
                    ))}
                  </select>
                </th>

                <th className="px-4 py-4 border border-gray-400">Address</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orders.map((order: { orderId: string, quantity: number, price: number, date: string, status: string, payment: string, address: any }) => (
                <tr key={order.orderId} className="border-t">
                  <td className="px-4 py-4 border border-gray-400">{order.orderId}</td>
                  <td className="px-4 py-4 border border-gray-400">{order.quantity}</td>
                  <td className="px-4 py-4 border border-gray-400">{order.price.toFixed(2)}</td>
                  <td className="px-4 py-4 border border-gray-400">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-4 border border-gray-400">
                    {order.status === OrderENUM.CANCELLED && <span className=" p-2 rounded-2xl bg-red-400">{order.status}
                    </span>}
                    {order.status === OrderENUM.CONFIRMED && <span className=" p-2 rounded-2xl bg-green-400">{order.status}
                    </span>}
                    {order.status === OrderENUM.DELIVERED && <span className=" p-2 rounded-2xl bg-green-300">{order.status}
                    </span>}
                    {order.status === OrderENUM.PENDING && <span className=" p-2 rounded-2xl bg-orange-400">{order.status}
                    </span>}
                    {order.status === OrderENUM.SHIPPED && <span className=" p-2 rounded-2xl bg-blue-400">{order.status}
                    </span>}
                  </td>
                  <td className="px-4 py-4 border border-gray-400">
                    {order.payment === PaymentENUM.COMPLETED && <span className="p-1 rounded-2xl bg-green-400">{order.payment}
                    </span>}
                    {order.payment === PaymentENUM.PENDING && <span className=" p-2 rounded-2xl bg-orange-400">{order.payment}
                    </span>}
                    {order.payment === PaymentENUM.FAILED && <span className="p-1 rounded-2xl bg-red-400">{order.payment}
                    </span>}
                  </td>
                  <td className="px-4 py-4 border border-gray-400">
                    {order.address
                      ? `${order.address.street}, ${order.address.city}`
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
};

export default OrderList;