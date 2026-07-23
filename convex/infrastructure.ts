import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("infrastructure")
      .withIndex("by_display_order")
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("infrastructure") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation Stubs
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    image_url: v.string(),
    display_order: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("infrastructure", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("infrastructure"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    display_order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("infrastructure") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
