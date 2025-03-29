import { z } from "zod";

// @SouZe-San
// Define the Order schema
export const Cart_reqBody = z.object({
  user: z.object({
    userId: z.string().nonempty("User ID is required"), // Ensure userId is a non-empty string
    email: z.string().email("Must be a valid email"),
    role: z.string(),
  }),
});

export const CartAdvance_req_body = z.object({
  user: z.object({
    userId: z.string().nonempty("User ID is required"), // Ensure userId is a non-empty string
    email: z.string().email("Must be a valid email"),
    role: z.string(),
  }),
  products: z.array(
    z.object({
      productId: z.string().nonempty("Product ID is required"), // Ensure productId is a non-empty string
      quantity: z.number().int().positive("Quantity must be a positive integer"), // Ensure quantity is a positive integer
    })
  ),
});

// @SouZe-San
// @message: Lagbe na monehoi ( jodi cart id na thake)
export const CartUpdate_req_body = z.object({
  user: z.object({
    userId: z.string().nonempty("User ID is required"), // Ensure userId is a non-empty string
    email: z.string().email("Must be a valid email"),
    role: z.string(),
  }),
  cartId: z.string().nonempty("Cart ID is required"), // Ensure cartId is a non-empty string
  products: z.array(
    z.object({
      id: z.string().nonempty("Do u not hve cart ids? ").optional(), // Ensure id is a non-empty string
      productId: z.string().nonempty("Product ID is required"), // Ensure productId is a non-empty string
      quantity: z.number().int().positive("Quantity must be a positive integer"), // Ensure quantity is a positive integer
    })
  ),
});
