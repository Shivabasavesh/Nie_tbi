import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,

  site_settings: defineTable({
    site_name: v.string(),
    application_status: v.string(),
  }),

  contact_settings: defineTable({
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
  }),

  startups: defineTable({
    slug: v.string(),
    name: v.string(),
    founder_name: v.string(),
    sector: v.string(),
    description: v.string(),
    logo_url: v.optional(v.string()),
    website_link: v.optional(v.string()),
    is_graduated: v.boolean(),
    is_featured: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_is_featured", ["is_featured"])
    .index("by_is_graduated", ["is_graduated"]),

  events: defineTable({
    slug: v.string(),
    title: v.string(),
    event_start_date: v.string(),
    event_end_date: v.string(),
    description: v.string(),
    banner_url: v.optional(v.string()),
    registration_link: v.optional(v.string()),
    status: v.string(),
    is_featured: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_is_featured", ["is_featured"])
    .index("by_status", ["status"]),

  blogs: defineTable({
    slug: v.string(),
    title: v.string(),
    author: v.string(),
    featured_image: v.optional(v.string()),
    content_md: v.string(),
    meta_title: v.optional(v.string()),
    meta_description: v.optional(v.string()),
    status: v.string(),
    is_featured: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_is_featured", ["is_featured"])
    .index("by_status", ["status"]),

  documents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    file_url: v.string(),
  }).index("by_category", ["category"]),

  leadership: defineTable({
    name: v.string(),
    designation: v.string(),
    bio: v.optional(v.string()),
    photo_url: v.optional(v.string()),
    category: v.string(),
    display_order: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_display_order", ["display_order"]),

  infrastructure: defineTable({
    title: v.string(),
    description: v.string(),
    image_url: v.string(),
    display_order: v.number(),
  }).index("by_display_order", ["display_order"]),

  applications: defineTable({
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
  }).index("by_status", ["status"]),
});
