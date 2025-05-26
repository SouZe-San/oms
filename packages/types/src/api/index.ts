import { OrderStatus } from "../order.type";

export interface CartUpdateBody {
  products: {
    name: string;
    productId: string;
    quantity: number;
  }[];
}

export interface ProductsResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date | string;
}

export interface OrderResponse {
  userId: string;
  status: OrderStatus;
  id: string;
  createdAt: string;
  shippingAddressId: string;
  totalAmount: number;
  totalItems: number;
}
