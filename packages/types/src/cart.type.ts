export interface CartProduct {
  id: string;
  quantity: number;
  productId: string;
  cartId: string | null;
}

export interface Cart {
  id: string;
  userId: string;
  cartProducts: CartProduct[];
}
