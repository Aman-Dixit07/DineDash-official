import { z } from "zod";

export const userSignupSchema = z.object({
    fullname: z.string().min(1, "Fullname is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must have atleast 6 characters"),
    contact: z
      .string()
      .min(10, { message: "Contact number should be atleast of 10 digit" })
      .max(10, "contact number atmost 10 digit"),
  });
  
  export type SignupInputState = z.infer<typeof userSignupSchema>;

  export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "password must have atleast 6 characters"),
  });
  
  export type LoginInputState = z.infer<typeof userLoginSchema>;