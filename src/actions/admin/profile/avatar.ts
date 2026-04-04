"use server";
import {revalidatePath} from "next/cache";
import {ensureSession} from "@/acl/acl";
import prisma from "@/lib/prisma";
import {utapi} from "../../../uploadthing/server";
import {headers} from "next/headers";

/**
 * Server action to update or delete the user's profile image.
 * It also handles deleting the old image from the storage provider (UploadThing).
 *
 * @param data - An object containing the new image URL.
 *               - If `data.url` is a string, it will be set as the new image URL.
 *               - If `data.url` is `null`, the existing image will be deleted.
 */
export async function avatar(data: {url: string | null}) {
  const session = await ensureSession({headers: await headers()});
  if (!session?.user?.id) {
    return {error: "Unauthorized"};
  }

  const userId = session.user.id;
  const newImageUrl = data.url;

  try {
    // 1. Get the current user to find the old image URL
    const user = await prisma.user.findUnique({
      where: {id: userId},
      select: {image: true},
    });

    if (!user) {
      return {error: "User not found"};
    }

    const oldImageUrl = user.image;

    // 2. If an old image exists, delete it from UploadThing.
    // This runs when updating to a new image or deleting the current one.
    if (oldImageUrl) {
      try {
        // Extract the file key from the full URL
        const fileKey = oldImageUrl.substring(oldImageUrl.lastIndexOf("/") + 1);
        await utapi.deleteFiles(fileKey);
      } catch (error) {
        console.error("Failed to delete old image from UploadThing:", error);
        // This is a non-blocking error. Log it and continue, so the user's
        // profile is still updated even if the old file can't be deleted.
      }
    }

    // 3. Update the user's image URL in the database with the new URL (or null)
    await prisma.user.update({
      where: {id: userId},
      data: {image: newImageUrl},
    });

    revalidatePath("/dashboard"); // Revalidate a relevant path
    return {success: true};
  } catch (error) {
    console.error("Error updating profile:", error);
    return {error: "Failed to update profile."};
  }
}
