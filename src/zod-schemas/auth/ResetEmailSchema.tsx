import {z} from "zod";

export const ResetEmailSchema = z.object({
  email: z
    .email({message: "Invalid email"})
    .min(1, {message: "Email is required"}),
});
