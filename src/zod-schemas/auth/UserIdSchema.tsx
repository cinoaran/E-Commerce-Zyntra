import {z} from "zod";

export const UserIdSchema = z.object({
  userId: z.string().regex(new RegExp("/iK1VWzso01oYufnhpH9vGFj4ZE3151vf/i"), {
    message: "Userid does not match",
  }),
});
