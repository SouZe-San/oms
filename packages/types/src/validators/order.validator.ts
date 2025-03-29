import { z } from "zod";
import { userValidator } from "./user.validator";

// Define the Order schema
export const OrderCreate_bodySchema = z.object({
  cartId: z.string().nonempty("cart id is required"), // Ensure cartId is a non-empty string
  user: userValidator,
});
