"use server";
import prisma from "@/lib/prisma";
import {z} from "zod";
import {ProfileSchema} from "@/zod-schemas/ProfileSchema";
import {headers} from "next/headers";
import {getSessionOnce} from "@/lib/sessionCache";

export async function UpdateProfile(data: z.infer<typeof ProfileSchema>) {
  const safeProfile = ProfileSchema.safeParse(data);
  if (!safeProfile.success) {
    return {error: "Invalid data"};
  }

  const session = await getSessionOnce({headers: await headers()});

  if (!session) {
    return {error: "Unauthorized"};
  }

  try {
    const user = await prisma.user.update({
      where: {id: session.user.id},
      data: {
        name: safeProfile.data.name,
        role: safeProfile.data.role,
        emailVerified: safeProfile.data.emailVerified,
        banned: safeProfile.data.banned,
      },
    });
    if (!user) {
      return {error: "User not found"};
    }

    return {success: "User updated successfully"};
  } catch (error) {
    console.log(error);
    return {error: "Something went wrong"};
  }
}
