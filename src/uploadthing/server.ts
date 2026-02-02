import {UTApi} from "uploadthing/server";

/**
 * This is the server-side API client for UploadThing.
 * It is used to perform actions like deleting files from your storage.
 *
 * The `UTApi` constructor will automatically read the `UPLOADTHING_SECRET`
 * from your environment variables. Make sure you have this set in your `.env` file.
 */
export const utapi = new UTApi();
