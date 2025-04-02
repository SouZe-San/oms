export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "CANCELLED" | "DELIVERED";

export type PaymentStatus = "PENDING" | "FAILED" | "COMPLETED";

export type orderProduct = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
};

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
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
