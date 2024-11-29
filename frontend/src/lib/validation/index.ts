import { z } from "zod";

// User
export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Too short" }),
  contactNumber: z
    .string()
    .refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const UpdateUserValidation = z.object({
  file: z.custom<File | null>(),
  name: z.string().min(2, { message: "Too short!" }),
  email: z.string().email(),
  contactNumber: z
    .string()
    .refine((phone) => /^\+\d{12}$/.test(phone), "Invalid phone number"),
});

// Admin
export const AdminSignUpValidation = z.object({
  username: z.string().min(4, { message: "Too short!" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Passwords must be at least 6 characters long" }),
});

export const AdminSignInValidation = z.object({
  username: z.string().min(4, { message: "Too short!" }),
  password: z
    .string()
    .min(6, { message: "Passwords must be at least 6 characters long" }),
});

export const AdminUpdateValidation = z.object({
  imageUrl: z.custom<File | null>(),
  username: z
    .string()
    .min(1, { message: "Required" })
    .min(4, { message: "Too short!" }),
  email: z.string().email(),
  // password: z
  //   .string()
  //   .min(1, { message: "Required" })
  //   .min(6, { message: "Passwords must be at least 6 characters long" }),
});

// Product
export const ProductAddValidation = z.object({
  productImage: z.custom<File | null>(),
  productVariations: z.custom<File[] | null>(),
  name: z
    .string()
    .min(1, { message: "Required" })
    .min(4, { message: "Too Short!" }),
  desc: z
    .string()
    .min(1, { message: "Required" })
    .min(3, { message: "Too short!" })
    .max(1000, { message: "Description must not exceed to 1000 character(s)" }),
  price: z
    .string()
    .min(1, { message: "Required" })
    .min(4, { message: "Too short" }),
  // sizes: z.string().optional().array(),
  // category: z.string(),
  // subcategory: z.string(),
  // variationsName: z.string().optional().array(),
});

export const ProductEditValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .min(2, { message: "Too short!" }),
  desc: z
    .string()
    .min(1, { message: "Required" })
    .min(3, { message: "Too short!" })
    .max(1000, { message: "Description must not exceed to 1000 character(s)" }),
  price: z
    .string()
    .min(1, { message: "Required" })
    .min(4, { message: "Too short" }),
});
