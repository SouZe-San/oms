import { z } from "zod";
import { userValidator } from "./user.validator";

// @SouZe-San
// Define req ody schema for the Cart
export const Cart_reqBody = z.object({
  user: userValidator,
  products: z.array(
    z.object({
      name: z.string().nonempty("Product name is required"), // Ensure product name is a non-empty string
      productId: z.string().nonempty("Product ID is required"), // Ensure productId is a non-empty string
      quantity: z.number().int().positive("Quantity must be a positive integer"), // Ensure quantity is a positive integer
    })
  ),
});
