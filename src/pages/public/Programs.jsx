import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Programs() {
  const programs = [
    { title: 'TBI 2.0 Incubation', duration: '12 - 24 Months', desc: 'Comprehensive support for deep-tech startups including funding access, mentorship, and workspace.' },
    { title: 'Pre-Incubation Program', duration: '3 - 6 Months', desc: 'Designed for students and early innovators to validate their ideas and build minimum viable products.' },
    { title: 'Accelerator', duration: '6 Months', desc: 'Intensive growth-focused program for startups with early revenue looking to scale rapidly.' }
  ];

  return (
    <div>
      <SEOHead title="Programs | NIETBI" description="Explore Programs at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Programs</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Our Programs
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Structured pathways to take your innovation from idea to scale.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {programs.map((prog, i) => (
              <motion.div key={i} variants={cardItem} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(13,43,110,0.1)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', padding: '40px 32px' }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{prog.title}</h3>
                <div style={{ display: 'inline-block', background: 'rgba(245,130,31,0.1)', color: 'var(--orange)', padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 24 }}>{prog.duration}</div>
                <p style={{ color: 'var(--gray-text)', lineHeight: 1.7 }}>{prog.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
