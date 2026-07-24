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

export default function SocialCause() {
  const initiatives = [
    { title: 'Rural Innovation', desc: 'Supporting technologies that uplift rural communities and improve agricultural yields.' },
    { title: 'Women in Tech', desc: 'Special incubation tracks and grants designed to support female founders.' },
    { title: 'Sustainability', desc: 'Promoting circular economy startups focused on waste reduction and clean energy.' }
  ];

  return (
    <div>
      <SEOHead title="Social Cause | NIETBI" description="Explore Social Cause at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Social Cause</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Social Cause
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Driving impact beyond profits to build a better, sustainable future.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {initiatives.map((item, i) => (
              <motion.div key={i} variants={cardItem} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(13,43,110,0.1)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', padding: '40px 32px' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 16 }}>{item.title}</h3>
                <p style={{ color: 'var(--gray-text)', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
