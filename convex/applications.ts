import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("applications").collect();
  },
});

export const getById = query({
  args: { id: v.id("applications") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("applications")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

// Mutation Stubs
export const create = mutation({
  args: {
    startup_name: v.string(),
    founder_name: v.string(),
    email: v.string(),
    phone: v.string(),
    startup_stage: v.string(),
    sector: v.string(),
    city: v.string(),
    message: v.string(),
    pitch_deck_url: v.string(),
    link_accessibility_confirmed: v.boolean(),
    admin_notes: v.optional(v.string()),
    status: v.string(),
    submitted_at: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("applications", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("applications"),
    startup_name: v.optional(v.string()),
    founder_name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    startup_stage: v.optional(v.string()),
    sector: v.optional(v.string()),
    city: v.optional(v.string()),
    message: v.optional(v.string()),
    pitch_deck_url: v.optional(v.string()),
    link_accessibility_confirmed: v.optional(v.boolean()),
    admin_notes: v.optional(v.string()),
    status: v.optional(v.string()),
    submitted_at: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("applications") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("applications").order("desc").collect();
  },
});

export const updateApplicationStatus = mutation({
  args: {
    id: v.id("applications"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});
