import { ConvexHttpClient } from "convex/browser";
import dotenv from "dotenv";
import { api } from "../convex/_generated/api.js";

dotenv.config({ path: ".env.local" });

const convex = new ConvexHttpClient(process.env.VITE_CONVEX_URL);

async function run() {
  console.log("Testing CRUD operations against Convex dev server...");
  
  // Test Startups
  const testStartup = {
    slug: "test-startup",
    name: "Test Startup",
    description: "This is a test startup for E2E validation.",
    founder_name: "John Doe",
    sector: "Tech",
    logo_url: "https://example.com/logo.png",
    website_link: "https://example.com",
    is_graduated: false,
    is_featured: false,
  };

  try {
    // Create
    console.log("Creating startup...");
    const startupId = await convex.mutation(api.startups.create, testStartup);
    console.log(`✅ Startup created with ID: ${startupId}`);

    // Read
    console.log("Fetching all startups...");
    const startups = await convex.query(api.startups.getAll);
    if (!startups.find(s => s._id === startupId)) {
      throw new Error("Created startup not found in query results.");
    }
    console.log(`✅ Startup found in queries. Total startups: ${startups.length}`);

    // Update
    console.log("Updating startup...");
    await convex.mutation(api.startups.update, {
      id: startupId,
      sector: "FinTech"
    });
    console.log(`✅ Startup updated.`);

    // Read single
    const updated = await convex.query(api.startups.getBySlug, { slug: "test-startup" }); 
    if (updated.sector !== "FinTech") {
      throw new Error("Update did not apply.");
    }
    console.log(`✅ Update verified.`);

    // Delete
    console.log("Deleting startup...");
    await convex.mutation(api.startups.remove, { id: startupId });
    
    const startupsAfterDelete = await convex.query(api.startups.getAll);
    if (startupsAfterDelete.find(s => s._id === startupId)) {
      throw new Error("Deletion failed. Startup still exists.");
    }
    console.log(`✅ Deletion verified.`);

    console.log("🎉 All CRUD operations passed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

run();
