import { ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

if (!convexUrl) {
  console.error("VITE_CONVEX_URL is not set");
}

// Exporting ConvexReactClient allows us to use it imperatively in services 
// while also providing it to ConvexAuthProvider in main.jsx to sync auth state.
export const convex = new ConvexReactClient(convexUrl);
