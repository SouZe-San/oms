export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "CANCELLED" | "DELIVERED";

export type PaymentStatus = "PENDING" | "FAILED" | "COMPLETED";
import { AddressModel } from "./user.type";
export type orderProduct = {
  id: string;
  orderId: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
};

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  shippingAddressId: string;
  shippingAddress?: AddressModel;
  orderProducts?: orderProduct[];
  createdAt: Date;
  payment?: Payment | null;
}

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
}
