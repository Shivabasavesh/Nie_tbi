import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from "framer-motion";
import { Mail, Building2, Users, Target, Eye, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import CountUpPkg from 'react-countup';
const CountUp = CountUpPkg.default || CountUpPkg;

function PageHero({ title, breadcrumb }) {
  return (
    <section style={{
      background: "#060E24",
      padding: "calc(120px + var(--banner-h, 0px)) 24px 60px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,95,217,0.3) 0%, transparent 70%)",
          filter: "blur(60px)", pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}>
          {breadcrumb}
        </p>
        <h1 style={{
          fontFamily: "var(--font-heading)", fontWeight: 800,
          fontSize: "clamp(28px, 4vw, 52px)", margin: 0, lineHeight: 1.15,
          background: "linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {title}
        </h1>
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const journeyItems = [
  { year: "1946", desc: "National Institute of Engineering established in Mysuru — laying the foundation for Karnataka's engineering education." },
  { year: "2024", desc: "NIETBI formally established under the TBI 2.0 Programme by Dept. of Electronics, IT, BT & S&T, Govt. of Karnataka." },
  { year: "2025", desc: "Applications open for the first cohort of startups. Focus on AgriTech, AI & ML, Clean Energy, and more." },
  { year: "Future", desc: "Building Karnataka's leading deep-tech incubation ecosystem — empowering innovators from Tier-2 cities." },
];

export default function About() {
  return (
    <div>
      <Helmet>
        <title>About NIETBI | NIE Technology Business Incubator</title>
        <meta name="description" content="Learn about NIETBI — a not-for-profit incubator at National Institute of Engineering, Mysuru, supported by Govt. of Karnataka." />
      </Helmet>
      <PageHero title="About NIETBI" breadcrumb="Home > About" />

      {/* ── WHO WE ARE ── */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="two-col">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: "clamp(26px, 3vw, 42px)", margin: "0 0 20px",
              background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Who We Are
            </h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, lineHeight: 1.8, marginBottom: 20, fontFamily: "var(--font-body)" }}>
              NIETBI — NIE Technology Business Incubator — is newly established under the Government of Karnataka TBI 2.0 Programme, supported by the Department of Electronics, IT, BT &amp; S&amp;T. Located at The National Institute of Engineering, Mysuru (Estd. 1946, Autonomous Institution), NIETBI is dedicated to fostering innovation, entrepreneurship, and technology-driven startups.
            </p>
            <p style={{ color: "var(--gray-text)", fontSize: 16, lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
              We are a not-for-profit organization committed to building a strong, inclusive, and sustainable startup ecosystem in Mysuru and beyond — empowering innovators especially from Tier-2 and Tier-3 regions.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
            <div style={{ background: "#060E24", borderRadius: 20, padding: 36, color: "#fff", boxShadow: "0 16px 48px rgba(13,43,110,0.2)" }}>
              <div style={{ marginBottom: 28, textAlign: 'left' }}>
                <img src="/assets/nie-shield.png" alt="NIE Shield" style={{ height: 52, marginBottom: 8 }} />
                <div style={{ color: '#fff', fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-body)', opacity: 0.9 }}>
                  National Institute of Engineering
                </div>
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18, marginBottom: 24, color: "var(--orange)" }}>
                Quick Facts
              </h3>
              {[
                { label: "Established", value: "2024" },
                { label: "Type", value: "Not-for-Profit Incubator" },
                { label: "Supported by", value: "Govt. of Karnataka" },
                { label: "Programme", value: "TBI 2.0" },
                { label: "Host", value: "National Institute of Engineering, Mysuru" },
                { label: "Contact", value: "info@tbi.nie.ac.in" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", gap: 12 }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500, flexShrink: 0, fontFamily: "var(--font-body)" }}>{item.label}</span>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, textAlign: "right", fontFamily: "var(--font-body)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section style={{ background: "var(--gray-light)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: "clamp(26px, 3vw, 42px)", margin: "0 0 12px",
              background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Mission &amp; Vision
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="two-col">
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(13,43,110,0.12)" }}
              style={{ background: "#fff", borderRadius: 20, padding: 40, borderTop: "4px solid var(--blue-light)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(46,95,217,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Target size={24} style={{ color: "var(--blue-light)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "var(--blue-dark)", margin: 0 }}>Mission</h3>
              </div>
              <p style={{ color: "var(--gray-text)", fontSize: 15, lineHeight: 1.8, margin: 0, fontFamily: "var(--font-body)" }}>
                To empower innovators and entrepreneurs with the right mentorship, infrastructure, funding support, and market access needed to scale impactful ventures.
              </p>
            </motion.div>
            <motion.div
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(245,130,31,0.12)" }}
              style={{ background: "#fff", borderRadius: 20, padding: 40, borderTop: "4px solid var(--orange)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(245,130,31,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Eye size={24} style={{ color: "var(--orange)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "var(--blue-dark)", margin: 0 }}>Vision</h3>
              </div>
              <p style={{ color: "var(--gray-text)", fontSize: 15, lineHeight: 1.8, margin: 0, fontFamily: "var(--font-body)" }}>
                To be the leading technology business incubator in Karnataka, catalyzing deep-tech innovation and building a sustainable startup ecosystem from Mysuru.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NIEISC OVERVIEW ── */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: "clamp(22px, 2.5vw, 34px)", margin: "0 0 12px",
              background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              NIE Innovation, Incubation &amp; Startup Center
            </h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, fontFamily: "var(--font-body)", maxWidth: 640, margin: "0 auto" }}>
              NIEISC bridges the gap between academic research and real-world entrepreneurship
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }} className="two-col">
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ background: "#060E24", borderRadius: 20, padding: 40 }}
            >
              <div style={{ fontSize: 52, color: "var(--orange)", lineHeight: 1, marginBottom: 12, fontFamily: "Georgia, serif" }}>&ldquo;</div>
              <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 16, lineHeight: 1.85, fontFamily: "var(--font-body)", margin: "0 0 20px", fontStyle: "italic" }}>
                Creation of successful entrepreneurs through translation of knowledge into disruptive market technologies.
              </p>
              <span style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #F5821F, #FF9A3C)",
                color: "#fff", fontSize: 12, fontWeight: 700,
                padding: "5px 16px", borderRadius: 100,
                fontFamily: "var(--font-body)", letterSpacing: "0.04em",
              }}>
                Our Vision
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ background: "var(--gray-light)", borderRadius: 20, padding: 36 }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--blue-dark)", margin: "0 0 24px" }}>
                Our Mission
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  "Foster a culture of innovation and entrepreneurship among students and faculty",
                  "Provide mentorship, infrastructure, and funding to translate ideas into viable ventures",
                  "Bridge academia and industry through technology transfer and collaborative research",
                  "Create an ecosystem that nurtures startups from ideation to market entry",
                ].map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <CheckCircle2 size={20} style={{ color: "var(--orange)", flexShrink: 0, marginTop: 1 }} />
                    <p style={{ color: "var(--gray-text)", fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body)" }}>{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY (TIMELINE) ── */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: "clamp(26px, 3vw, 42px)", margin: "0 0 12px",
              background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Our Journey
            </h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, fontFamily: "var(--font-body)" }}>
              From a premier engineering college to Karnataka's newest tech incubator
            </p>
          </motion.div>
          <div style={{ position: "relative", paddingLeft: 48 }}>
            {/* Vertical gradient line */}
            <div style={{
              position: "absolute", left: 15, top: 0, bottom: 0,
              width: 2, background: "linear-gradient(180deg, var(--blue-light) 0%, var(--orange) 100%)",
              borderRadius: 2,
            }} />
            {journeyItems.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: "easeOut" }}
                style={{ position: "relative", marginBottom: i < journeyItems.length - 1 ? 44 : 0 }}
              >
                {/* Orange dot */}
                <div style={{
                  position: "absolute", left: -41, top: 4,
                  width: 14, height: 14, borderRadius: "50%",
                  background: "var(--orange)",
                  border: "3px solid #fff",
                  boxShadow: "0 0 0 2px var(--orange)",
                }} />
                <div style={{ paddingLeft: 4 }}>
                  <span style={{
                    display: "inline-block",
                    fontFamily: "var(--font-heading)", fontWeight: 800,
                    fontSize: 22, color: "var(--orange)", marginBottom: 6,
                  }}>
                    {item.year}
                  </span>
                  <p style={{ color: "var(--gray-text)", fontSize: 15, lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body)" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVERNMENT SUPPORT ── */}
      <section style={{ background: "var(--gray-light)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 34px)", margin: "0 0 12px",
              background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Government &amp; Institutional Support
            </h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, marginBottom: 48, fontFamily: "var(--font-body)" }}>
              Backed by leading government bodies driving Karnataka's innovation ecosystem
            </p>
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {[
              { img: "/assets/gok-logo.png", name: "Dept. of Electronics IT BT & S&T", sub: "Govt. of Karnataka" },
              { img: "/assets/startup-karnataka.png", name: "Startup Karnataka", sub: "State Startup Ecosystem Initiative" },
              { img: "/assets/ktech-logo.jpeg", name: "K-Tech", sub: "Karnataka Innovation & Technology Society" },
            ].map((org, i) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                style={{
                  background: "#fff", borderRadius: 18, padding: "28px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  minWidth: 200, flex: "1 1 200px", maxWidth: 260,
                  border: "1px solid #E8ECF8", boxShadow: "0 4px 20px rgba(13,43,110,0.06)",
                }}
              >
                <div style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <img src={org.img} alt={org.name} style={{ height: 56, width: "auto", objectFit: "contain" }} />
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--blue-dark)", margin: 0, textAlign: "center" }}>{org.name}</h4>
                <p style={{ color: "var(--gray-text)", fontSize: 13, textAlign: "center", margin: 0, fontFamily: "var(--font-body)" }}>{org.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDIA STARTUP CONTEXT ── */}
      <section style={{ background: "var(--gray-light)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: "clamp(22px, 2.5vw, 34px)", margin: "0 0 12px",
              background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              India's Startup Ecosystem &amp; NIE's Position
            </h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, fontFamily: "var(--font-body)", maxWidth: 600, margin: "0 auto" }}>
              India is the 3rd largest startup ecosystem globally. NIETBI actively contributes to Karnataka's vibrant startup culture.
            </p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
            className="india-stats-grid"
          >
            {[
              { value: 112000, suffix: "+", label: "DPIIT Recognised Startups (India)", isCount: true },
              { display: "3rd", label: "Largest Startup Ecosystem Globally", isCount: false },
              { value: 750, suffix: "+", label: "HEI-recognised Incubators (India)", isCount: true },
              { display: "4-Star", label: "NIE IIC Rating by MoE", isCount: false },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
                style={{ background: "#fff", borderRadius: 20, padding: "36px 24px", textAlign: "center", border: "1px solid #E8ECF8", boxShadow: "0 4px 20px rgba(13,43,110,0.06)" }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1, color: "var(--orange)", marginBottom: 12 }}>
                  {stat.isCount ? (
                    <CountUp end={stat.value} suffix={stat.suffix} separator="," enableScrollSpy scrollSpyOnce duration={2.5} />
                  ) : stat.display}
                </div>
                <div style={{ width: 36, height: 3, background: "linear-gradient(90deg, #F5821F, #FF9A3C)", borderRadius: 2, margin: "0 auto 12px" }} />
                <p style={{ color: "var(--gray-text)", fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: "var(--font-body)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <p style={{ textAlign: "center", color: "rgba(13,43,110,0.35)", fontSize: 12, fontFamily: "var(--font-body)", marginTop: 28 }}>
            Source: DPIIT, Startup India (2024)
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .two-col { grid-template-columns: 1fr !important; }
          .india-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .india-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
