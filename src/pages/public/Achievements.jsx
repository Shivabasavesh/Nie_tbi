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

export default function Achievements() {
  const achievements = [
    { metric: '50+', label: 'Startups Supported' },
    { metric: '₹10Cr+', label: 'Funds Raised by Portfolios' },
    { metric: '20+', label: 'Patents Filed' },
    { metric: '500+', label: 'Jobs Created' }
  ];

  return (
    <div>
      <SEOHead title="Achievements | NIETBI" description="Explore Achievements at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Achievements</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Our Achievements
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Milestones that define our journey and the success of our startups.
          </p>
        </div>
      </section>

      <section style={{ background: '#F4F6FB', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
            {achievements.map((item, i) => (
              <motion.div key={i} variants={cardItem} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(13,43,110,0.1)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', padding: '40px 32px', textAlign: 'center' }}>
                <h3 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>{item.metric}</h3>
                <p style={{ color: 'var(--gray-text)', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
