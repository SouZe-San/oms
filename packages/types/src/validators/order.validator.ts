import z from "zod";
import { userValidator } from "./user.validator";

export const order_reqValidator = z.object({
  user: userValidator,
  id: z.string().uuid().nonempty("Product ID is required"),
  status: z.enum(["CONFIRMED", "SHIPPED", "CANCELLED", "DELIVERED"]),
});

export const createOrder_reqValidator = z.object({
  user: userValidator,
  isOnlinePayment: z.boolean().optional(),
});

export const singleOrder_reqValidator = z.object({
  user: userValidator,
  productId: z.string().uuid().nonempty("Product ID is required"),
  quantity: z.number().int().positive("Quantity must be positive value"),
  isOnlinePayment: z.boolean().optional(),
});
