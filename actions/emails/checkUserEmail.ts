"use server";

import prisma from "@/lib/prisma";

export const checkUserEmail = async (email: string): Promise<boolean> => {
  if (!email) {
    throw new Error("Email is required.");
  }

  const user = await prisma.user.findUnique({
    where: {email},
  });

  return !!user; // Return true if user exists, false otherwise
};
