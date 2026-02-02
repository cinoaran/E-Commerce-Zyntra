import {z} from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, {message: "Name must have min 3 characters"}),
    email: z.email({message: "Invalid email"}),
    password: z
      .string()
      .min(8, {message: "Password must have min 8 characters"}),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );
