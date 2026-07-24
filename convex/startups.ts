import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("startups").collect();
  },
});

export const getById = query({
  args: { id: v.id("startups") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("startups")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("startups")
      .withIndex("by_is_featured", (q) => q.eq("is_featured", true))
      .collect();
  },
});

export const getGraduated = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("startups")
      .withIndex("by_is_graduated", (q) => q.eq("is_graduated", true))
      .collect();
  },
});

// Mutation Stubs
export const create = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    founder_name: v.string(),
    sector: v.string(),
    description: v.string(),
    logo_url: v.optional(v.string()),
    website_link: v.optional(v.string()),
    is_graduated: v.boolean(),
    is_featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Stub: not connected to frontend yet
    return await ctx.db.insert("startups", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("startups"),
    slug: v.optional(v.string()),
    name: v.optional(v.string()),
    founder_name: v.optional(v.string()),
    sector: v.optional(v.string()),
    description: v.optional(v.string()),
    logo_url: v.optional(v.string()),
    website_link: v.optional(v.string()),
    is_graduated: v.optional(v.boolean()),
    is_featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    // Stub: not connected to frontend yet
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("startups") },
  handler: async (ctx, args) => {
    // Stub: not connected to frontend yet
    return await ctx.db.delete(args.id);
  },
});

// APIs requested in Phase 3 Session 8
export const listStartups = query({
  args: {
    stage: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("startups");
    
    if (args.stage !== undefined) {
      q = q.filter((q) => q.eq(q.field("stage"), args.stage));
    }
    if (args.isPublished !== undefined) {
      q = q.filter((q) => q.eq(q.field("isPublished"), args.isPublished));
    }
    
    return await q.collect();
  },
});

export const getStartupById = query({
  args: { id: v.id("startups") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createStartup = mutation({
  args: {
    name: v.string(),
    sector: v.string(),
    stage: v.string(),
    description: v.string(),
    logoUrl: v.optional(v.string()),
    website: v.optional(v.string()),
    foundedYear: v.optional(v.number()),
    isPublished: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("startups", {
      ...args,
      slug: args.name.toLowerCase().replace(/\s+/g, '-'),
      founder_name: "TBD", // required by existing schema
      is_graduated: args.stage === "graduated",
      is_featured: false,
    });
  },
});

export const deleteStartup = mutation({
  args: { id: v.id("startups") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
