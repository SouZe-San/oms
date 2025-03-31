export interface CartProduct {
  id: string;
  quantity: number;
  productId: string;
  cartId: string | null;
}
