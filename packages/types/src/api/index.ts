import { OrderStatus } from "../order.type";
import { ProductCategory } from "../product.type";

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
  category: ProductCategory;
  imageUrl: string | null | undefined;
}

export interface FullProduct {
  name: string;
  id: string;
  description: string | null;
  price: number;
  stock: number;
  category: ProductCategory;
  createdAt: Date;
  images: {
    id: string;
    productId: string;
    url: string;
  }[];
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
