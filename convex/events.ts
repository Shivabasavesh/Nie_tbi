import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .withIndex("by_is_featured", (q) => q.eq("is_featured", true))
      .collect();
  },
});

export const getUpcoming = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .withIndex("by_status", (q) => q.eq("status", "Upcoming"))
      .collect();
  },
});

// Mutation Stubs
export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    event_start_date: v.string(),
    event_end_date: v.string(),
    description: v.string(),
    banner_url: v.optional(v.string()),
    registration_link: v.optional(v.string()),
    status: v.string(),
    is_featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("events"),
    slug: v.optional(v.string()),
    title: v.optional(v.string()),
    event_start_date: v.optional(v.string()),
    event_end_date: v.optional(v.string()),
    description: v.optional(v.string()),
    banner_url: v.optional(v.string()),
    registration_link: v.optional(v.string()),
    status: v.optional(v.string()),
    is_featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
