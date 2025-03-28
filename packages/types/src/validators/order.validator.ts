import { z } from "zod";

// Define the Order schema
export const OrderCreate_bodySchema = z.object({
  cartId: z.string().nonempty("User ID is required"), // Ensure userId is a non-empty string
  user: z.object({
    userId: z.string().nonempty("User ID is required"), // Ensure userId is a non-empty string
    email: z.string().email("Must be a valid email"),
    role: z.string(),
  }),
});
