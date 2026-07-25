import { mutation } from "./_generated/server";

const startupUpdates = {
  "Cognitron Technologies": "Cognitron Technologies is an early-stage technology startup based in Mysuru, specializing in AI and ML-integrated ERP and CRM solutions to automate business processes. They have also developed innovative educational technology platforms.",
  "Voyagenious Labs (Mysuru Consulting Group)": "Also operating as Mysuru Consulting Group (MCG), this AI research and strategy consulting firm specializes in applied artificial intelligence, probabilistic machine learning, deep learning, and advanced data science solutions.",
  "D R Technologies": "D R Technologies is a technical service provider operating from the NIE Eicher Center. They specialize in 3D printing services, rapid prototyping, 3D CAD designing, and custom modeling for industrial and engineering applications.",
  "Einston Energy": "Einston Energy is an emerging startup focused on developing sustainable energy solutions and contributing to the growing green technology ecosystem.",
  "Logic Hive Solution": "Logic Hive Solution specializes in smart automation and product engineering. They focus on delivering technology solutions spanning IoT, artificial intelligence, and digital integrations for modern businesses.",
  "Entelika Consulting & IT Services": "Entelika Consulting & IT Services provides specialized IT consulting, software development, and digital transformation services to help organizations scale their technology infrastructure.",
  "KGK Engineering": "Founded in 2014 by industry veteran Ashok Rao, KGK Engineering is a manufacturing-focused company that has grown into an established technology partner in the automotive and industrial sectors in Mysuru.",
  "SportsKPI": "Founded in 2015, SportsKPI is a Bengaluru-based sports technology and analytics startup providing end-to-end data-driven insights, scouting analysis, and high-definition livestreaming services for professional sports teams and federations.",
  "SCE-Safe Controls Engineering": "SCE-Safe Controls Engineering Consultancy provides expert services in Process Safety Management, Risk Assessment, and Engineering Design, primarily catering to the Upstream Oil & Gas, refining, and petrochemical industries.",
  "Webberrs Labs Technologies": "Webberrs Labs Technologies is an IT and software services startup that focuses on computer-related activities, custom software solutions, and digital consulting.",
  "Sellular Edu Networks": "Based near the NIE Campus in Mysuru, Sellular Edu Networks is an educational technology startup dedicated to building innovative software solutions and digital networks for the education sector.",
  "Broomstick Cleantech": "Broomstick Cleantech is an innovative startup renowned for its 'Smart Mop' technology. Recognized by DPIIT and featured on Shark Tank India, they focus on delivering efficient, tech-driven home cleaning solutions.",
  "Access2Justice Technologies & Solutions": "Access2Justice Technologies & Solutions is a DIPP-recognized startup that leverages data science and artificial intelligence to provide service-oriented business solutions and optimize operations.",
  "Plantek": "Plantek Automations is a specialty engineering startup specializing in customized automation and robotic solutions. They focus on industrial automation, robotics, and IIOT-based process development for Industry 4.0.",
  "Mysuru Renewable Energy Technologies": "Also known as Mysuru Green Tech (MRET), this startup specializes in product design, engineering, and renewable energy installations including solar and wind, alongside smart agriculture and IoT devices.",
  "Magnetech Innovations": "Magnetech Innovations is a DPIIT-recognized startup specializing in the design and manufacturing of high-performance BLDC motors for drones, robotics, aerospace, defense, and agricultural applications.",
  "Tattva5 Sustainability Solutions Private Limited": "Operating out of the NIE Center for Incubation, Tattva5 Sustainability Solutions focuses on developing innovative services and technologies aimed at promoting environmental sustainability and green practices.",
  "Ocknap LLP": "Ocknap LLP is an early-stage startup exploring new business avenues and technology commercialization within the local entrepreneurial ecosystem.",
  "Leco Consulting Pvt.Ltd.": "Leco Consulting is a business services firm providing strategic business consulting, tailored business solutions, and support services to help organizations streamline their operations.",
  "Samatha Digital Solutions": "Samatha Digital Solutions is an IT company known for developing MincApp™, a digital solution designed to help financial institutions track real-time transactions and manage field operations efficiently.",
  "Optimum Sync": "Optimum Sync is an active software startup providing a suite of digital services including web and application development, digital marketing, and artificial intelligence solutions.",
  "VS Pro Academy": "VS Pro Academy is an educational and professional training startup focused on skill development, offering specialized courses and mentorship to prepare individuals for competitive industry roles.",
  "Orbis Pop Pvt Ltd": "Incorporated in 2024, Orbis Pop is an emerging software startup focusing on the writing, modification, and testing of specialized computer programs and tech solutions.",
  "Model Aero Sports Private Limited": "Model Aero Sports is an aerospace engineering startup providing UAV design, manufacturing, and aviation consultancy services across defense, agriculture, education, and healthcare sectors."
};

export const update = mutation({
  args: {},
  handler: async (ctx) => {
    for (const [name, description] of Object.entries(startupUpdates)) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const existing = await ctx.db
        .query("startups")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      
      if (existing) {
        await ctx.db.patch(existing._id, { description });
      }
    }
  },
});
