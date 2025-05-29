export interface Product {
  id?: string;
  adminId: string;
  name: string;
  description: string | null;
  category: ProductCategory;
  images?: {
    id: string;
    productId: string;
    url: string;
  }[];
  price: number;
  stock: number;
  updatedAt: Date | string;
  createdAt: Date | string;
}

export type ProductCategory =
  | "MOBILES"
  | "LAPTOPS"
  | "ELECTRONICS"
  | "FASHION"
  | "APPLIANCES"
  | "BOOKS"
  | "BEAUTY"
  | "SPORTS"
  | "TOYS"
  | "MUSICAL_INSTRUMENTS"
  | "OTHERS";
