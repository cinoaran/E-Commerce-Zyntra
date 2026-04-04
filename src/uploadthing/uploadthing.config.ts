import {createUploadthing, type FileRouter} from "uploadthing/next";
import {ensureSession} from "@/acl/acl";

const f = createUploadthing();

export const ourFileRouter = {
  profilePicture: f({
    image: {maxFileSize: "4MB", maxFileCount: 5},
    video: {maxFileSize: "2GB", maxFileCount: 2},
  })
    .middleware(async ({req}) => {
      // Get session using the request object from the middleware
      const session = await ensureSession({headers: req.headers});

      // If you throw, the user will not be able to upload
      if (!session?.user.id) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {userId: session.user.id};
    })
    .onUploadComplete(async ({metadata, file}) => {
      // This server-side hook runs after the file is uploaded.
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      // The client-side `onClientUploadComplete` will call a server action to update the DB.
      // This keeps the logic for UI feedback and DB updates together, which is cleaner.
      return {uploadedBy: metadata.userId};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
