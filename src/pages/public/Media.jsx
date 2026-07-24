import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Media() {
  const articles = [
    { pub: 'The Times of India', date: 'October 12, 2024', title: 'NIE Mysuru launches TBI 2.0 to support local startups' },
    { pub: 'Deccan Herald', date: 'November 05, 2024', title: 'AgriTech innovation gets a boost at NIETBI' },
    { pub: 'Startup Story', date: 'December 20, 2024', title: 'How Tier-2 incubators like NIETBI are shaping India’s deep-tech landscape' },
    { pub: 'YourStory', date: 'January 15, 2025', title: 'NIETBI announces ₹2 Cr fund pool for clean energy startups' }
  ];

  return (
    <div>
      <SEOHead title="Media | NIETBI" description="Explore Media at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24', padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Media & Press</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Media & Press
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Latest news, announcements, and press coverage of NIETBI and our startups.
          </p>
        </div>
      </section>

      <section style={{ background: '#F4F6FB', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gap: 24 }}>
            {articles.map((a, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(13,43,110,0.08)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E8ECF8', paddingBottom: 16 }}>
                  <span style={{ fontWeight: 700, color: 'var(--blue-mid)' }}>{a.pub}</span>
                  <span style={{ color: 'var(--gray-text)', fontSize: 13 }}>{a.date}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-dark)', lineHeight: 1.4 }}>{a.title}</h3>
                <div>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--orange)', fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                    Read Article <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
