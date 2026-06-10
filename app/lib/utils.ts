import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(100, { message: "Full name is too long" }),

  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain an uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain a lowercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain a number",
    }),

  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms and Conditions",
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" }),

  password: z.string().min(1, { message: "Password is required" }),
});
