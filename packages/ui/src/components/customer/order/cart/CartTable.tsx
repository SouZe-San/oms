import { CartProduct } from "@oms/types/cart.type";
import Image from "next/image";
import trash from "../../../../assets/icons/random/delete.svg";
import "../style.css";
import { createOrder, updateCart } from "@oms/utils/api.customer";
import { toast } from "sonner";
import { CartUpdateBody } from "@oms/types/api.type";
import { axiosErrorHandler } from "@oms/utils/handlers";
import { useRouter } from "next/navigation";
const CartTable = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  totalAmount,
  totalItems,
}: {
  cart: CartProduct[];
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  totalItems: number;
  totalAmount: number;
}) => {
  const handleQuantityChange = (itemId: string, change: number) => {
    const item = cart.find((item) => item.id === itemId);
    if (item && onUpdateQuantity) {
      const newQuantity = Math.max(1, Math.min(item?.product!.stock, item.quantity + change));
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  const router = useRouter();

  const updateCartHandler = async () => {
    try {
      const cartBody: CartUpdateBody = {
        products: cart.map((item) => ({
          name: item.name,
          productId: item.product!.id!,
          quantity: item.quantity,
        })),
      };

      await updateCart(cartBody);
      toast.success("Cart updated successfully!");
    } catch (error) {
      axiosErrorHandler(error, "Update Cart");
      toast.error("Failed to update cart. Please try again.");
    }
  };
  const cartOrderHandler = async () => {
    try {
      await createOrder();
      toast.success("Ordered successfully!");
      router.push("/");
    } catch (error) {
      axiosErrorHandler(error, "Update Cart");
      toast.error("Failed to Order. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto shadow-sm product-list-section min-h-[60vh]">
      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full max-sm:hidden">
          <thead>
            <tr className="border-b border-gray-100 ">
              <th className="text-center py-4 px-6 font-medium text-white-600 text-sm uppercase tracking-wide">
                Index
              </th>
              <th className="text-left py-4 px-6 font-medium  text-sm uppercase tracking-wide  ">Product Name</th>
              <th className="text-center py-4 px-4 font-medium  text-sm uppercase tracking-wide  ">Stock</th>
              <th className="text-center py-4 px-4 font-medium  text-sm uppercase tracking-wide  ">Quantity</th>
              <th className="text-right py-4 px-6 font-medium  text-sm uppercase tracking-wide  ">Price</th>
              <th className="text-center py-4 px-4 font-medium  text-sm uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody className="py-4">
            {cart.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-25 transition-colors ${index === cart.length - 1 ? "" : "under-border"}`}
              >
                <td className="py-4 px-6 text-white-900 text-md  flex items-center justify-center gap-3">
                  <p className="text-sm text-center flex items-end text-white/50">
                    <span className="text-md text-white/70">[</span> 0{index + 1}{" "}
                    <span className="text-md text-white/70">]</span>
                  </p>
                </td>
                <td className="py-4 px-6 text-white text-md  ">{item.name}</td>
                <td className="py-4 px-4 text-center  ">
                  <span className="text-sm ">{item.product?.stock}</span>
                </td>
                <td className="py-4 px-4 text-center  ">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 p-0 bg-white  hover:bg-white/70 font-black text-black rounded-lg cursor-pointer"
                    >
                      {/* <Minus size={14} /> */} &#45;
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center text-sm text-white-700 quantity-box">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      disabled={item.quantity >= item.product!.stock}
                      className="h-8 w-8 p-0 bg-white  hover:bg-white/70 text-black font-black rounded-lg cursor-pointer"
                    >
                      {/* <Plus size={14} />  */} +
                    </button>
                  </div>
                </td>
                <td className="py-4 px-6 text-right  font-medium  ">&#x20B9; {item.product!.price.toFixed(2)}</td>
                <td className="py-4 px-4 text-center">
                  {onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-20 text-xs border rounded-lg bg-red-600/40 border-transparent hover:border-red-500 hover:ed-400 hover:text-red-600"
                    >
                      <Image src={trash} alt="Remove Item" width={14} height={14} className="inline-block mr-1" />
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="w-full sm:hidden">
          <thead>
            <tr className="border-b border-gray-100/50 ">
              <th className="text-left py-4 px-6 font-medium  text-sm uppercase tracking-wide  ">Product Details</th>

              <th className="text-center py-4 px-4 font-medium  text-sm uppercase tracking-wide  "></th>
            </tr>
          </thead>
          <tbody className="py-4">
            {cart.map((item, index) => (
              <tr
                key={item.id}
                className={`hover:bg-gray-25 transition-colors ${index === cart.length - 1 ? "" : "under-border"}`}
              >
                <td className="py-4 px-6 text-white text-md ">
                  <span className="text-lg">{item.name}</span>
                  <p className="text-xs text-white/70">
                    Stoke : <span className="text-xs ">{item.product?.stock}</span>
                  </p>
                  <p className="text-xs text-white/70">
                    Price : <span className="text-sm ">&#x20B9; {item.product!.price.toFixed(2)}</span>
                  </p>
                </td>

                <td className="py-4 px-4 text-end">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 p-0 bg-white  hover:bg-white/70 font-black text-black rounded-lg cursor-pointer"
                    >
                      {/* <Minus size={14} /> */} &#45;
                    </button>
                    <div className="w-12 h-8 flex items-center justify-center text-sm text-white-700 quantity-box">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      disabled={item.quantity >= item.product!.stock}
                      className="h-8 w-8 p-0 bg-white  hover:bg-white/70 text-black font-black rounded-lg cursor-pointer"
                    >
                      {/* <Plus size={14} />  */} +
                    </button>
                  </div>

                  {onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 px-3 text-xs border rounded-lg bg-red-600/20 border-transparent hover:border-red-500 hover:ed-400 hover:text-red-600 mt-4"
                    >
                      <Image src={trash} alt="Remove Item" width={14} height={14} className="inline-block mr-1" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t  px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="font-medium text-md text-white-600">
            Total Items: <span className="font-semibold text-lg">{totalItems}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="font-medium text-md text-white-600">Total Amount:</span>
            <div className="text-white-900 font-bold text-lg">&#x20B9; {totalAmount.toFixed(2)}</div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button className="px-6 bg-white text-black  btn" onClick={updateCartHandler}>
            Save Cart
          </button>
          <button className="px-6 high-btn-bg btn" onClick={cartOrderHandler}>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
