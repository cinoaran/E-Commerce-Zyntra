import {z} from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, {message: "Password must have 8 characters"}),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
