export interface Product {
  id?: string;
  adminId: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  updatedAt: Date;
  createdAt: Date;
}
