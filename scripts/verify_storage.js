import { ConvexHttpClient } from "convex/browser";
import dotenv from "dotenv";
import { api } from "../convex/_generated/api.js";

dotenv.config({ path: ".env.local" });

const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL);

async function run() {
  console.log("Testing Storage operations against Convex dev server...");

  try {
    // 1. Generate Upload URL
    console.log("Generating upload URL...");
    const uploadUrl = await convex.mutation(api.storage.generateUploadUrl);
    if (!uploadUrl) throw new Error("Did not receive upload URL");
    console.log(`✅ Upload URL generated: ${uploadUrl}`);

    // 2. Upload dummy file
    console.log("Uploading dummy file...");
    const dummyContent = "Hello World Convex Storage!";
    const file = new Blob([dummyContent], { type: "text/plain" });

    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) {
      throw new Error(`Upload failed: ${result.statusText}`);
    }

    const { storageId } = await result.json();
    console.log(`✅ File uploaded. Storage ID: ${storageId}`);

    // 3. Get Public URL
    console.log("Retrieving public URL...");
    const publicUrl = await convex.query(api.storage.getFileUrl, { storageId });
    if (!publicUrl) throw new Error("Failed to get public URL");
    
    console.log(`✅ Public URL retrieved: ${publicUrl}`);

    // Verify download
    const download = await fetch(publicUrl);
    const text = await download.text();
    if (text !== dummyContent) {
      throw new Error(`Content mismatch. Expected '${dummyContent}', got '${text}'`);
    }
    console.log(`✅ Content downloaded successfully and matched!`);

    console.log("🎉 All Storage operations passed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

run();
