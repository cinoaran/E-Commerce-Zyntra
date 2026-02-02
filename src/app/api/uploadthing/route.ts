import {createRouteHandler} from "uploadthing/next";
import {ourFileRouter} from "@/uploadthing/uploadthing.config";

export const {GET, POST} = createRouteHandler({
  router: ourFileRouter,
});
