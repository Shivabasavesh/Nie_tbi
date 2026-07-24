import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhoCanApply() {
  const eligibility = [
    "Startups & Entrepreneurs with AI-driven innovations across focus sectors",
    "Student Innovators & Tech Teams from colleges and universities",
    "Early-stage Startups in AgriTech, CleanTech, EV, Waste-to-Wealth, AI & ML",
    "Deep-tech & Research Spinoffs seeking commercialisation support",
    "Climate & Sustainability focused ventures with scalable solutions"
  ];

  const focusPreview = [
    { label: "AgriTech", color: "var(--blue-mid)" },
    { label: "Energy (Clean Energy & EV)", color: "var(--orange)" },
    { label: "Artificial Intelligence (AI & ML)", color: "var(--blue-light)" }
  ];

  return (
    <div>
      <SEOHead title="Who Can Apply | NIETBI" description="Explore Who Can Apply at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,95,217,0.3) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Who Can Apply</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Who Can Apply
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            We are looking for passionate innovators solving real-world challenges.
          </p>
        </div>
      </section>

      <section className="two-col" style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'start' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', color: 'var(--blue-dark)', marginBottom: 32 }}>Eligibility Criteria</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {eligibility.map((item, i) => (
                <motion.li key={i} variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } } }} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <CheckCircle2 color="var(--orange)" size={24} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: 'var(--gray-text)', fontSize: 16, lineHeight: 1.7 }}>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ background: 'var(--gray-light)', borderRadius: 24, padding: 40, border: '1px solid #E8ECF8' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 24 }}>Key Focus Domains</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {focusPreview.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'white', padding: '16px 20px', borderRadius: 12, borderLeft: `4px solid ${f.color}` }}>
                  <span style={{ fontWeight: 600, color: 'var(--blue-dark)' }}>{f.label}</span>
                </div>
              ))}
            </div>
            
            <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 16 }}>Application Brochure</h3>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.6, marginBottom: 24 }}>
              Download our complete incubation program brochure to learn more about eligibility, process, and expectations.
            </p>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--blue-dark)', padding: '12px 24px', borderRadius: 8, border: '2px solid var(--blue-mid)', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 24 }}>
              <Download size={18} /> Download Brochure
            </button>
            <div style={{ borderTop: '1px solid #E8ECF8', paddingTop: 24 }}>
              <Link to="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--orange)', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
                Start Your Application <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
