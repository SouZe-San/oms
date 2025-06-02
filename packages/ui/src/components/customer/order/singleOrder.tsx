import { Order } from "@oms/types/order.type";

import "./style.css";

const SingleOrder = ({ order }: { order: Order }) => {
  return (
    <div className="w-full max-w-6xl mx-auto   shadow-sm product-list-section">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 ">
        <h2 className="text-2xl font-semibold text-white-900 max-sm:hidden">Order Items</h2>
        <p className="text-sm text-white-500 mt-1">Order ID: {order.id}</p>
      </div>

      {/* Table */}
      <div className="mt-8">
        <table className="w-full max-sm:hidden">
          <thead>
            <tr className="border-b border-gray-100/50">
              <th className="text-center py-4 px-6 font-medium text-white-600 text-sm uppercase tracking-wide">
                Index
              </th>
              <th className="text-left py-4 px-6 font-medium text-white-600 text-sm uppercase tracking-wide">
                Product Name
              </th>
              <th className="text-center py-4 px-6 font-medium text-white-600 text-sm uppercase tracking-wide">
                Quantity
              </th>
              <th className="text-right py-4 px-6 font-medium text-white-600 text-sm uppercase tracking-wide">Price</th>
              <th className="w-12 py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {order.orderProducts &&
              order?.orderProducts.map((item, index) => (
                <tr
                  key={item.id}
                  className={` transition-colors ${index === order.orderProducts!.length - 1 ? "" : "under-border"}`}
                >
                  <td className="py-4 px-6 text-white-900 text-md  flex items-center justify-center gap-3">
                    <p className="text-sm text-center flex items-end text-white/50">
                      <span className="text-md text-white/70">[</span> 0{index + 1}{" "}
                      <span className="text-md text-white/70">]</span>
                    </p>
                  </td>
                  <td className="py-4 px-6 text-white-900 text-md">{item.name}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-8  rounded text-sm text-white-700 quantity-box">
                      {item.quantity}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right text-white-900 font-medium">&#x20B9; {item.price.toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <table className="w-full sm:hidden">
          <thead>
            <tr className="border-b border-gray-100/50">
              <th className="text-left py-4 px-6 font-medium text-white-600 text-sm uppercase tracking-wide">
                Product Details
              </th>
              <th className="text-center py-4 px-6 font-medium text-white-600 text-sm uppercase tracking-wide">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {order.orderProducts &&
              order?.orderProducts.map((item, index) => (
                <tr
                  key={item.id}
                  className={` transition-colors ${index === order.orderProducts!.length - 1 ? "" : "under-border"}`}
                >
                  <td className="py-4 px-6 text-white-900 text-md">
                    {item.name}

                    <p className="text-xs text-white/70">
                      Price : <span className="text-sm ">&#x20B9; {item.price.toFixed(2)}</span>
                    </p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-8  rounded text-sm text-white-700 quantity-box">
                      {item.quantity}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100  sm:px-6 px-2 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 sm:gap-4 gap-2 text-sm items-center">
          <div className="flex gap-2 items-center">
            <span className="font-medium text-md text-white-600">Created:</span>
            <div className="text-white-900 text-lg">{new Date(order.createdAt).toLocaleDateString()}</div>
          </div>
          <div>
            <span className="font-medium text-md text-white-600 mr-3">Status:</span>
            <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                order.status === "SHIPPED"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "CONFIRMED"
                    ? "bg-blue-100 text-blue-800"
                    : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-800"
                      : "bg-green-200 text-green-800"
              }`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>
          <div>
            <span className="font-medium text-white-600 mr-3">Payment:</span>
            {order.payment ? (
              <div
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                  order.payment.status === "PENDING"
                    ? "bg-yellow-200 text-yellow-800"
                    : order.payment.status === "FAILED"
                      ? "bg-red-200 text-red-800"
                      : "bg-green-200 text-green-800"
                }`}
              >
                {order.payment.status}
              </div>
            ) : (
              <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 bg-yellow-100 text-yellow-800">
                PENDING
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-medium text-,d text-white-600">Total Items:</span>
            <div className="text-white-900 font-semibold text-lg">
              {order.orderProducts?.reduce((a, b) => a + b.quantity, 0)}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-medium text-md text-white-600">Total Amount:</span>
            <div className="text-white-900 font-bold sm:text-lg text-[16px]">
              {" "}
              &#x20B9;{order.totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
