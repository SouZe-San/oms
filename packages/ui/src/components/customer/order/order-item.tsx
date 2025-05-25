import "./style.css";
import Image from "next/image";
import done from "../../../assets/icons/order/order-done.svg";
import cancelled from "../../../assets/icons/order/order-cancel.svg";
import pending from "../../../assets/icons/order/order-pending.svg";
import calender from "../../../assets/icons/random/calender.svg";
import Link from "next/link";

const statusIcon = {
  pending: pending,
  completed: done,
  cancelled: cancelled,
};

const OrderItem = ({
  order,
}: {
  order: {
    id: number;
    title: string;
    status: string;
    date: string;
    price: string;
    quantity: number;
  };
}) => {
  const getTypeClass = (type: "pending" | "completed" | "cancelled") => {
    switch (type) {
      case "completed":
        return "success";
      case "cancelled":
        return "cancelled";
      default:
        return "pending";
    }
  };

  return (
    <Link href={`/home/order/${order.id}`} className="no-underline">
      <div className="order-item flex px-4 py-8 justify-between items-center border rounded-xl">
        <div className=" flex items-center gap-6 font-neue">
          <p className="text-xl text-center flex items-end text-white/50">
            <span className="text-4xl text-white/70">[</span> 0{order.id}{" "}
            <span className="text-4xl text-white/70">]</span>
          </p>
          <h1 className="text-4xl ">Order Item {order.title}</h1>
        </div>

        <div className="grid grid-cols-4 gap-8 side-info">
          <div className={`badge ${getTypeClass(order.status as "pending" | "completed" | "cancelled")}`}>
            {" "}
            <Image
              src={statusIcon[order.status as keyof typeof statusIcon]}
              alt="icon"
              className="inline-block w-8 mr-2"
            />
            <span>{order.status}</span>
          </div>
          <div className="flex gap-4 col-span-2 jus">
            <h3>
              {" "}
              <Image src={calender} alt="icon" className="inline-block w-6 mr-2" />
              <span>{order.date} </span>
            </h3>
            <h3>
              <span> &#x20B9;</span> {order.price}
            </h3>
            <h3>
              <span>Quantity :</span> {order.quantity}
            </h3>
          </div>
          <button className="high-btn-bg">View Details</button>
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
