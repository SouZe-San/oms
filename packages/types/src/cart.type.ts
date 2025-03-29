export interface CartProducts {
  id: string;
  quantity: number;
  productId: string;
  cartId: string | null;
  orderId: string | null;
}

export interface Carts {
  id: string;
  userId: string;
  cartProducts: CartProducts[];
}
