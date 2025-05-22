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
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-muted-foreground text-sm">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: { orderId: string, quantity: number, price: number, date: string, status: string, payment: string, address: any }) => (
                <tr key={order.orderId} className="border-t">
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">${order.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">{order.payment}</td>
                  <td className="px-4 py-2">
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