import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createNews = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    body: v.string(),
    imageUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    publishedAt: v.number(),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("news", args);
  },
});

export const listNews = query({
  args: {},
  handler: async (ctx) => {
    // Return published news ordered by publishedAt desc
    return await ctx.db
      .query("news")
      .withIndex("by_publishedAt")
      .order("desc")
      .filter((q) => q.eq(q.field("isPublished"), true))
      .collect();
  },
});

export const getNewsBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("news")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});
