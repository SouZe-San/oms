import { z } from "zod";

// Sign up schema for validate
export const SignUpSchema = z.object({
  firstName: z.string().max(25, "First Name must be with in 25 chars"),
  lastName: z.string().max(25, "Last Name must be with in 25 chars"),
  email: z.string().email("Email is required"),
  password: z.string().min(8, "minimum password length is 8"),
  primaryMobile: z.string().length(10, "must contain 10 char exactly"),
  dob: z.string().date("Format: YYYY-MM-DD"),
  role: z.string().default("CUSTOMER")
});
export const SignInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, { message: "Identifier must be at least 3 characters" })
    .max(255, { message: "Identifier must not exceed 255 characters" })
    .refine((value: string) => /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value), {
      message: "Must be a valid email or 10-digit phone number",
    }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

