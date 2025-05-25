import { Product } from "./product.type";

export interface CartProduct {
  id: string;
  quantity: number;
  name: string;
  productId: string;
  userId: string;
  product?: Product;
}

export interface CartProductWithDetails extends CartProduct {
  product: Product;
}

export type Cart = CartProduct[];
