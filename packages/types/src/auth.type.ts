import { z } from "zod";
import { Request } from "express";
// Sign up schema for validate
export const SignUpSchema = z.object({
  firstName: z.string().max(25, "First Name must be with in 25 chars"),
  lastName: z.string().max(25, "Last Name must be with in 25 chars"),
  email: z.string().email("Email is required"),
  password: z.string().min(8, "minimum password length is 8"),
  primaryMobile: z.string().length(10, "must contain 10 char exactly"),
  dob: z.string().date("Format: YYYY-MM-DD"),
  role: z.string().default("CUSTOMER"),
});

//Sign in schema for validate
export const SignInSchema = z.object({
  email: z.string().email("Must be a valid email").optional(),
  primaryMobile: z.string().length(10, "must contain 10 char exactly").optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export interface AuthorizedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: "ADMIN" | "CUSTOMER";
  };
}
