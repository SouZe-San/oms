import { z } from "zod";

// @ImanSamantaCoder
// Sign up schema for validate
export const SignUpSchema = z.object({
  firstName: z.string().max(25, "First Name must be with in 25 chars").nonempty("first name can't empty"),
  lastName: z.string().max(25, "Last Name must be with in 25 chars").nonempty("last name can't empty"),
  email: z.string().email("Email is required").nonempty("email can't empty"),
  password: z.string().min(8, "minimum password length is 8").nonempty("password can't empty"),
  primaryMobile: z.string().length(10, "must contain 10 char exactly").nonempty("password can't empty"),
  dob: z.string().date("Format: YYYY-MM-DD").nonempty("DOB can't empty"),
  role: z.enum(["ADMIN", "CUSTOMER"]),
  address: z
    .object({
      type: z.enum(["PERMANENT", "CURRENT", "OTHER"]).default("PERMANENT"),
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      zipCode: z.string(),
    })
    .optional(),
});
export type SignUpInput = z.infer<typeof SignUpSchema>;

//Sign in schema for validate
export const SignInSchema = z.object({
  email: z.string().email("Must be a valid email").optional(),
  primaryMobile: z.string().length(10, "must contain 10 char exactly").optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).nonempty("password can't empty"),
  role: z.enum(["ADMIN", "CUSTOMER"]),
});
export type SignInInput = z.infer<typeof SignInSchema>;
