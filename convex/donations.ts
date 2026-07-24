import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitDonation = mutation({
  args: {
    donorName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    amount: v.number(),
    reference: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("donations", {
      ...args,
      donatedAt: Date.now(),
      isVerified: false, // requires manual verification usually
    });
  },
});

export const getDonationStats = query({
  args: {},
  handler: async (ctx) => {
    const donations = await ctx.db
      .query("donations")
      .filter((q) => q.eq(q.field("isVerified"), true))
      .collect();
      
    const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    
    return {
      totalDonors: donations.length,
      totalAmount,
    };
  },
});

export const listDonations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("donations").order("desc").collect();
  },
});

export const updateDonationVerified = mutation({
  args: {
    id: v.id("donations"),
    isVerified: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { isVerified: args.isVerified });
  },
});
