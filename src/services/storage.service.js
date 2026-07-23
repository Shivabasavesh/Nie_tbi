import { convex } from '../lib/convex';
import { api } from '../../convex/_generated/api';

export const uploadFileToStorage = async (file, bucket) => {
  try {
    // 1. Generate an upload URL from Convex
    const uploadUrl = await convex.mutation(api.storage.generateUploadUrl);

    // 2. Upload the file to Convex via a POST request
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) {
      throw new Error(`Upload failed: ${result.statusText}`);
    }

    const { storageId } = await result.json();

    // 3. Immediately resolve the storageId into a public URL
    // so existing front-end components and DB entries work perfectly
    const publicUrl = await convex.query(api.storage.getFileUrl, { storageId });

    if (!publicUrl) {
      throw new Error("Failed to generate public URL for uploaded file.");
    }

    return publicUrl;
  } catch (error) {
    throw new Error(error.message || "File upload failed");
  }
};
