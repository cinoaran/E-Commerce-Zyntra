import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(3, {
      message: "Password min. 3 characters!",
    })
    .max(32, {
      message: "Password max. 32 characters!",
    }),
});
