import { z } from "zod";

export const createProductValidator = z.object({
  adminId: z.string().uuid().nonempty("User ID is required"),
  name: z.string().nonempty("Product Name is required"),
  description: z.string().optional(),
  price: z.number()
    .min(0.01, "Price must be greater than 0")
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value.toFixed(2)), {
      message: "Price must have at most 2 decimal places",
    })
    .transform((value) => parseFloat(value.toFixed(2))), // Ensures 2 decimal places
  stock: z.number().int().positive("Stock must be positive value")
});

// ! CUSTOMER - PART

export const getProduct_reqSchema = z.object({
  skipCount: z.number().int().nonnegative("skipCount should be >= 0").default(0).optional(),
  takeCount: z.number().int().positive("takeCount must be positive").default(10).optional(),
});
