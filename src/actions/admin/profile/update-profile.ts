"use server";
import prisma from "@/lib/prisma";
import {z} from "zod";
import {ProfileSchema} from "@/zod-schemas/ProfileSchema";
import {headers} from "next/headers";
import {ensureAndRequire} from "@/acl/acl";
import type {Session as AuthSession} from "@/lib/auth";

export async function UpdateProfile(data: z.infer<typeof ProfileSchema>) {
  const safeProfile = ProfileSchema.safeParse(data);
  if (!safeProfile.success) {
    return {error: "Invalid data"};
  }

  let session: AuthSession;
  try {
    // Only admins (or roles with user:manage) may update profile fields like role/banned
    session = await ensureAndRequire({headers: await headers()}, "user:manage");
  } catch (err) {
    return {error: err instanceof Error ? err.message : "Forbidden"};
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
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
