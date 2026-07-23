import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("blogs").collect();
  },
});

export const getById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_is_featured", (q) => q.eq("is_featured", true))
      .collect();
  },
});

export const getPublished = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_status", (q) => q.eq("status", "Published"))
      .collect();
  },
});

// Mutation Stubs
export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    author: v.string(),
    featured_image: v.optional(v.string()),
    content_md: v.string(),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    status: v.string(),
    is_featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("blogs", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("blogs"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    author: v.optional(v.string()),
    featured_image: v.optional(v.string()),
    content_md: v.optional(v.string()),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    status: v.optional(v.string()),
    is_featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
