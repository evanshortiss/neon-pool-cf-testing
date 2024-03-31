import { generateReactHelpers } from "@uploadthing/react";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi, UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs"
import clerkClient from '@clerk/clerk-sdk-node';


const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, }) => {
      // This code runs on your server before upload
      const { user } = auth();
      const a = await clerkClient.sessions.getSession("")

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const utapi = new UTApi();

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();


export const useMe = () => {
  const a = useUploadThing("imageUploader", {
    onUploadProgress(p) {

    },
  })
  a.startUpload([],)
  return a
}
