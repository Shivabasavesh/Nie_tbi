import { mutation } from "./_generated/server";

const startupsToSeed = [
  { name: "Cognitron Technologies", stage: "graduated", foundedYear: 2018, sector: "DeepTech" },
  { name: "Voyagenious Labs (Mysuru Consulting Group)", stage: "graduated", foundedYear: 2018, sector: "AI & Digital" },
  { name: "D R Technologies", stage: "graduated", foundedYear: 2018, sector: "Manufacturing" },
  { name: "Einston Energy", stage: "graduated", foundedYear: 2018, sector: "Sustainability" },
  { name: "Logic Hive Solution", stage: "graduated", foundedYear: 2019, sector: "AI & Digital" },
  { name: "Entelika Consulting & IT Services", stage: "graduated", foundedYear: 2019, sector: "AI & Digital" },
  { name: "KGK Engineering", stage: "graduated", foundedYear: 2021, sector: "Manufacturing" },
  { name: "SportsKPI", stage: "incubated", foundedYear: 2021, sector: "AI & Digital" },
  { name: "SCE-Safe Controls Engineering", stage: "incubated", foundedYear: 2022, sector: "Manufacturing" },
  { name: "Webberrs Labs Technologies", stage: "graduated", foundedYear: 2022, sector: "AI & Digital" },
  { name: "Sellular Edu Networks", stage: "graduated", foundedYear: 2022, sector: "AI & Digital" },
  { name: "Broomstick Cleantech", stage: "graduated", foundedYear: 2022, sector: "Sustainability" },
  { name: "Access2Justice Technologies & Solutions", stage: "graduated", foundedYear: 2022, sector: "AI & Digital" },
  { name: "Plantek", stage: "graduated", foundedYear: 2022, sector: "Agritech" },
  { name: "Mysuru Renewable Energy Technologies", stage: "graduated", foundedYear: 2023, sector: "Sustainability" },
  { name: "Magnetech Innovations", stage: "graduated", foundedYear: 2023, sector: "DeepTech" },
  { name: "Tattva5 Sustainability Solutions Private Limited", stage: "incubated", foundedYear: 2023, sector: "Sustainability" },
  { name: "Ocknap LLP", stage: "graduated", foundedYear: 2023, sector: "AI & Digital" },
  { name: "Leco Consulting Pvt.Ltd.", stage: "graduated", foundedYear: 2023, sector: "AI & Digital" },
  { name: "Samatha Digital Solutions", stage: "incubated", foundedYear: 2024, sector: "AI & Digital" },
  { name: "Optimum Sync", stage: "incubated", foundedYear: 2024, sector: "AI & Digital" },
  { name: "VS Pro Academy", stage: "incubated", foundedYear: 2024, sector: "AI & Digital" },
  { name: "Orbis Pop Pvt Ltd", stage: "incubated", foundedYear: 2025, sector: "AI & Digital" },
  { name: "Model Aero Sports Private Limited", stage: "incubated", foundedYear: 2025, sector: "Manufacturing" },
];

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    for (const startup of startupsToSeed) {
      // Check if already exists to avoid duplicates if run multiple times
      const slug = startup.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const existing = await ctx.db
        .query("startups")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      
      if (!existing) {
        await ctx.db.insert("startups", {
          slug: slug,
          name: startup.name,
          founder_name: "TBD",
          sector: startup.sector,
          description: "Information coming soon.",
          stage: startup.stage,
          foundedYear: startup.foundedYear,
          isPublished: true,
          is_graduated: startup.stage === "graduated",
          is_featured: false,
        });
      }
    }
  },
});
