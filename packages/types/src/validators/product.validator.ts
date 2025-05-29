import { z } from "zod";

export const CategoryEnum = z.enum([
  "MOBILES",
  "LAPTOPS",
  "ELECTRONICS",
  "APPLIANCES",
  "FASHION",
  "BEAUTY",
  "TOYS",
  "SPORTS",
  "BOOKS",
  "MUSICAL_INSTRUMENTS",
  "OTHERS"
], { message: "Please select product category" });

// @alfaarghya
//Validate create product request
export const createProductValidator = z.object({
  name: z.string().nonempty("Product Name is required"),
  description: z.string().optional(),
  price: z
    .number({ message: "Please put product price" })
    .min(0.01, "Price must be greater than 0")
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toFixed(2)), {
      message: "Price must have at most 2 decimal places",
    })
    .transform((value) => parseFloat(value.toFixed(2))), // Ensures 2 decimal places
  stock: z.number({ message: "Please put product stock" }).int().positive("Stock must be positive value"),
  images: z.array(z.object({ url: z.string().url() })),
  category: CategoryEnum,
});
export type CreateProductInput = z.infer<typeof createProductValidator>;

// Validate get products request by adminId
export const getProductsValidator = z.object({
  adminId: z.string().uuid().nonempty("User ID is required"),
  skipCount: z.number().int().nonnegative("skipCount should be >= 0").default(0).optional(),
  takeCount: z.number().int().positive("takeCount must be positive").default(10).optional(),
});

//Validate update product request by adminId & productId
export const updateProductValidator = z.object({
  productId: z.string().uuid().nonempty("Product ID is required"),
  name: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().int().positive("Stock must be positive value").optional(),
  price: z
    .number()
    .min(0.01, "Price must be greater than 0")
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toFixed(2)), {
      message: "Price must have at most 2 decimal places",
    })
    .transform((value) => parseFloat(value.toFixed(2)))
    .optional(),
  category: CategoryEnum.optional(),
});

//Validate delete product request by adminId & productId
export const deleteProductValidator = z.object({
  adminId: z.string().uuid().nonempty("User ID is required"),
  productId: z.string().uuid().nonempty("Product ID is required"),
});

// ! CUSTOMER - PART

// @SouZe-San
// Validate get product request
export const getProduct_reqSchema = z.object({
  skipCount: z.number().int().nonnegative("skipCount should be >= 0").default(0).optional(),
  takeCount: z.number().int().positive("takeCount must be positive").default(10).optional(),
});
