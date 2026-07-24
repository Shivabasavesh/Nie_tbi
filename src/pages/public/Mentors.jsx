import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Mentors() {
  const isMobile = useMobile();
  const mentors = [
    { name: 'Arjun Desai', title: 'Ex-VP Product', tags: ['AI/ML', 'Product Strategy'] },
    { name: 'Dr. Neha Sharma', title: 'AgriTech Researcher', tags: ['Agriculture', 'Deep Tech'] },
    { name: 'Rahul Verma', title: 'Angel Investor', tags: ['Fundraising', 'B2B SaaS'] },
    { name: 'Priya Kulkarni', title: 'Clean Energy Expert', tags: ['CleanTech', 'Policy'] },
    { name: 'Vikram Joshi', title: 'Growth Hacker', tags: ['GTM', 'Marketing'] },
    { name: 'Ankita Rao', title: 'Hardware Architect', tags: ['IoT', 'Manufacturing'] },
  ];

  return (
    <div>
      <SEOHead title="Mentors | NIETBI" description="Explore Mentors at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24', padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Mentors</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Our Mentors
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Learn from industry veterans and domain experts dedicated to your growth.
          </p>
        </div>
      </section>

      <section style={{ background: '#F4F6FB', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32 }}>
            {mentors.map((m, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(13,43,110,0.1)' }} style={{ background: 'white', border: '1px solid #E8ECF8', borderLeft: '4px solid var(--orange)', borderRadius: 16, padding: '32px 24px', display: 'flex', gap: 24, alignItems: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #F5821F, #FF9A3C)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, flexShrink: 0 }}>
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 4 }}>{m.name}</h3>
                  <div style={{ color: 'var(--gray-text)', fontSize: 14, marginBottom: 16 }}>{m.title}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {m.tags.map(t => (
                      <span key={t} style={{ background: 'rgba(13,43,110,0.06)', color: 'var(--blue-dark)', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
