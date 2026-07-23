import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Site Settings
export const getSiteSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("site_settings").first();
  },
});

export const updateSiteSettings = mutation({
  args: {
    id: v.id("site_settings"),
    site_name: v.optional(v.string()),
    application_status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Contact Settings
export const getContactSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contact_settings").first();
  },
});

export const updateContactSettings = mutation({
  args: {
    id: v.id("contact_settings"),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
    mobile: v.optional(v.string()),
    email: v.optional(v.string()),
    working_hours: v.optional(v.string()),
    google_map_url: v.optional(v.string()),
    linkedin_url: v.optional(v.string()),
    twitter_url: v.optional(v.string()),
    instagram_url: v.optional(v.string()),
    youtube_url: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

// Initial Setup (Stub for inserting the singleton rows if they don't exist)
export const setup = mutation({
  args: {},
  handler: async (ctx) => {
    const siteSettings = await ctx.db.query("site_settings").first();
    if (!siteSettings) {
      await ctx.db.insert("site_settings", {
        site_name: "NIE Technology Business Incubator",
        application_status: "Closed",
      });
    }

    const contactSettings = await ctx.db.query("contact_settings").first();
    if (!contactSettings) {
      await ctx.db.insert("contact_settings", {
        address: "The National Institute of Engineering, Mysuru",
        email: "info@nietbi.in",
        phone: "+91 0000000000",
      });
    }
  },
});
