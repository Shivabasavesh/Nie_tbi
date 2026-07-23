import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("leadership").collect();
  },
});

export const getById = query({
  args: { id: v.id("leadership") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("leadership")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
  },
});

// Mutation Stubs
export const create = mutation({
  args: {
    name: v.string(),
    designation: v.string(),
    bio: v.optional(v.string()),
    photo_url: v.optional(v.string()),
    category: v.string(),
    display_order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("leadership", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("leadership"),
    name: v.optional(v.string()),
    designation: v.optional(v.string()),
    bio: v.optional(v.string()),
    photo_url: v.optional(v.string()),
    category: v.optional(v.string()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("leadership") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
