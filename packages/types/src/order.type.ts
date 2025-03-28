export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "CANCELLED" | "DELIVERED";

export type PaymentStatus = "PENDING" | "FAILED" | "COMPLETED";

export interface Order {
  id?: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt?: Date;
  payment: "PENDING" | "FAILED" | "COMPLETED";
}
