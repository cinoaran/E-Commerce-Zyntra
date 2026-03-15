import {z} from "zod";

export const ProfileSchema = z.object({
  name: z.optional(z.string().min(3, {message: "Name must have 3 characters"})),
  emailVerified: z.optional(z.boolean()),
  banned: z.optional(z.boolean()),
  role: z.enum(["admin", "user", "merchant"]),
});
