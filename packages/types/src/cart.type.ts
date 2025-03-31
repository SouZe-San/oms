import { Product } from "./product.type";

export interface CartProduct {
  id: string;
  quantity: number;
  productId: string;
  userId: string;
}

export interface CartProductWithDetails extends CartProduct {
  product: Product;
}
