import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ExternalLink, Mail } from "lucide-react";

const faculty = [
  { name: "Dr. Gurumurthy S R", role: "Professor", qual: "PhD IIT Bombay" },
  { name: "Dr. H Pradeepa", role: "Associate Professor & HOD", qual: "M.Tech, PhD" },
  { name: "Dr. R Chidanandappa", role: "Associate Professor", qual: "M.Tech, PhD" },
  { name: "Dr. Likith Kumar M V", role: "Associate Professor", qual: "M.Tech, PhD" },
  { name: "Dr. Jayasankar V N", role: "Associate Professor", qual: "PhD NITK" },
  { name: "Dr. Rohit K Mathew", role: "Associate Professor", qual: "PhD NIT Calicut" },
  { name: "Ms. Sonaxi B Raikar", role: "Assistant Professor", qual: "M.Tech" },
  { name: "Mr. Neeli Mallikarjuna", role: "Assistant Professor", qual: "M.Tech" },
];

const advisors = [
  { name: "Achutha Bachalli K.", title: "Chairman, Infopine", tags: ["IT", "Software Solutions", "Business Growth"] },
  { name: "Srikanth Nadhamuni", title: "Managing Trustee, eGovernments Foundation", tags: ["Aadhaar Architect", "CPU Design", "Banking Tech"] },
  { name: "Madan Padaki", title: "President, TiE Bangalore", tags: ["23+ Yrs Ecosystem Building", "Entrepreneurship"] },
  { name: "Kiran Bettadapur", title: "Managing Partner, Prudentia Law Chambers", tags: ["Patent Law", "Company Secretary", "Innovation"] },
];

function getInitials(name) {
  return name.split(" ").filter((n) => n.length > 2).slice(0, 2).map((n) => n[0]).join("");
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Leadership() {
  return (
    <div>
      <Helmet>
        <title>Leadership | NIETBI</title>
        <meta name="description" content="Meet the director, faculty, and advisors driving innovation at NIETBI — NIE Technology Business Incubator." />
      </Helmet>

      {/* ── HERO ── */}
      <section style={{ background: "#060E24", padding: "calc(120px + var(--banner-h, 0px)) 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-15%", right: "-8%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,95,217,0.3) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }}
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,130,31,0.2) 0%, transparent 70%)", filter: "blur(70px)", pointerEvents: "none" }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 14, fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}>Home &gt; Leadership</p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.1, margin: "0 0 18px", background: "linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Our Leadership
          </h1>
          <p style={{ color: "#A0AECF", fontSize: 17, maxWidth: 520, margin: "0 auto", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
            The people driving innovation at NIETBI
          </p>
        </div>
      </section>

      {/* ── DIRECTOR ── */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 34px)", margin: 0, background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Director
            </h2>
          </motion.div>
          <div style={{ background: "#060E24", borderRadius: 20, padding: "48px 52px", display: "grid", gridTemplateColumns: "2fr 3fr", gap: 56, alignItems: "center", boxShadow: "0 24px 72px rgba(6,14,36,0.4)" }} className="director-grid">
            <motion.div
              initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src="/assets/director.jpg"
                alt="Mir Amjad Husain — Director, NIEISC"
                loading="eager"
                style={{ width: 260, height: 280, borderRadius: 16, objectFit: "cover", objectPosition: "top center", border: "4px solid rgba(255,255,255,0.18)", boxShadow: "0 12px 48px rgba(0,0,0,0.4)" }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span style={{ display: "inline-block", background: "linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "5px 16px", borderRadius: 100, fontFamily: "var(--font-body)", marginBottom: 18, letterSpacing: "0.04em" }}>
                Chief Innovation Officer
              </span>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", color: "#fff", margin: "0 0 8px" }}>
                Mir Amjad Husain
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, fontFamily: "var(--font-body)", margin: "0 0 22px", lineHeight: 1.6 }}>
                Director, NIEISC — NIE Innovation, Incubation &amp; Startup Center
              </p>
              <div style={{ width: 60, height: 3, background: "linear-gradient(90deg, #F5821F, #FF9A3C)", borderRadius: 2, marginBottom: 22 }} />
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.85, fontFamily: "var(--font-body)", margin: "0 0 28px" }}>
                3 decades of experience in product development, engineering, regulatory compliance, automation, and technology. Leading NIE's innovation ecosystem and bridging the gap between academic research and real-world entrepreneurship.
              </p>
              <a
                href="mailto:amjadhusain@nie.ac.in"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "#fff", fontSize: 14, fontFamily: "var(--font-body)", padding: "10px 20px", borderRadius: 100, textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.16)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                <Mail size={15} style={{ color: "var(--orange)" }} />
                amjadhusain@nie.ac.in
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FACULTY MEMBERS ── */}
      <section style={{ background: "var(--gray-light)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 34px)", margin: "0 0 12px", background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Faculty Members
            </h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, fontFamily: "var(--font-body)" }}>Distinguished faculty guiding NIETBI's innovation programs</p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
            className="faculty-grid"
          >
            {faculty.map((f) => (
              <motion.div
                key={f.name}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(13,43,110,0.14)", borderColor: "var(--blue-light)" }}
                style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E8ECF8", cursor: "default", transition: "border-color 0.25s, box-shadow 0.25s" }}
              >
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-dark)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "var(--font-heading)" }}>{getInitials(f.name)}</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15, color: "var(--blue-dark)", margin: "0 0 6px", lineHeight: 1.4 }}>{f.name}</h4>
                <p style={{ color: "var(--gray-text)", fontSize: 12, fontFamily: "var(--font-body)", margin: "0 0 14px", lineHeight: 1.5 }}>{f.role}</p>
                <span style={{ background: "var(--orange)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 100, fontFamily: "var(--font-body)" }}>{f.qual}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ADVISORS ── */}
      <section style={{ background: "#fff", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 2.5vw, 34px)", margin: "0 0 12px", background: "linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              External Mentors &amp; Advisors
            </h2>
            <p style={{ color: "var(--gray-text)", fontSize: 16, fontFamily: "var(--font-body)" }}>Seasoned industry leaders who guide our ecosystem</p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
            className="advisors-grid"
          >
            {advisors.map((a) => (
              <motion.div
                key={a.name}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } }}
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(13,43,110,0.1)" }}
                style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #E8ECF8", borderLeft: "4px solid var(--orange)", cursor: "default", display: "flex", gap: 20, alignItems: "flex-start", transition: "box-shadow 0.25s" }}
              >
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #F5821F, #FF9A3C)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 18, fontWeight: 700, fontFamily: "var(--font-heading)" }}>{getInitials(a.name)}</span>
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 16, color: "var(--blue-dark)", margin: "0 0 4px" }}>{a.name}</h4>
                  <p style={{ color: "var(--gray-text)", fontSize: 13, fontFamily: "var(--font-body)", margin: "0 0 14px", lineHeight: 1.5 }}>{a.title}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {a.tags.map((tag) => (
                      <span key={tag} style={{ background: "rgba(13,43,110,0.07)", color: "var(--blue-dark)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 100, fontFamily: "var(--font-body)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .director-grid { grid-template-columns: 1fr !important; padding: 32px !important; }
          .director-grid > div:first-child img { width: 200px !important; height: 220px !important; }
        }
        @media (max-width: 768px) {
          .faculty-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .advisors-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
