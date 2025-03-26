import { z } from "zod";

// Sign up schema for validate
export const SignUpSchema = z.object({
  firstName: z.string().max(25, "First Name must be with in 25 chars"),
  lastName: z.string().max(25, "Last Name must be with in 25 chars"),
  email: z.string().email("Email is required"),
  password: z.string().min(8, "minimum password length is 8"),
  primaryMobile: z.string().length(10, "must contain 10 char exactly"),
  date: z.string().date("Format: YYYY-MM-DD"),
  role: z.string().default("CUSTOMER")
});