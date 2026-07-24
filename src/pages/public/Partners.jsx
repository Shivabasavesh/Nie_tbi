import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Partners() {
  const academics = Array(6).fill('Academic Partner');
  const industry = Array(8).fill('Industry Partner');

  return (
    <div>
      <SEOHead title="Partners | NIETBI" description="Explore Partners at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24', padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Partners</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Our Partners
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Collaborating with ecosystem enablers to accelerate startup success.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 32 }}>Academic Partners</h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 24, marginBottom: 80 }}>
            {academics.map((p, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(13,43,110,0.1)' }} style={{ background: '#F4F6FB', border: '1px solid #E8ECF8', height: 120, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 16 }}>
                <span style={{ color: 'var(--gray-text)', fontSize: 13, fontWeight: 600 }}>{p} Logo</span>
              </motion.div>
            ))}
          </motion.div>

          <h2 style={{ fontSize: 24, fontWeight: 700, background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 32 }}>Industry Partners</h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 24 }}>
            {industry.map((p, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(13,43,110,0.1)' }} style={{ background: '#F4F6FB', border: '1px solid #E8ECF8', height: 120, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 16 }}>
                <span style={{ color: 'var(--gray-text)', fontSize: 13, fontWeight: 600 }}>{p} Logo</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#F4F6FB', padding: '80px 24px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue-dark)', marginBottom: 16 }}>Become a Partner</h2>
          <p style={{ color: 'var(--gray-text)', fontSize: 16, marginBottom: 32 }}>Join hands with NIETBI to support the next generation of deep-tech innovators.</p>
          <Link to="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', color: 'white', padding: '16px 36px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>
            Contact Us Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
