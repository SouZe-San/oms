import z from "zod";

export const userValidator = z.object({
  userId: z.string().nonempty("User ID is required"), // Ensure userId is a non-empty string
  email: z.string().email("Must be a valid email"),
  role: z.string(),
});

export const protected_reqBody = z.object({
  user: userValidator,
});
