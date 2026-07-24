import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Globe, Leaf, Wrench, BookOpen } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function WhatWeOffer() {
  const offers = [
    { icon: Building, title: 'Co-Working Space', border: 'var(--blue-light)', desc: 'Collaborative, fully equipped workspace for your team — high-speed internet, meeting rooms, and dedicated desks.' },
    { icon: Users, title: 'Expert Mentorship', border: 'var(--orange)', desc: 'Industry & academic mentor network for strategic guidance on product, funding, operations, and growth.' },
    { icon: Globe, title: 'Market Connect', border: 'var(--blue-light)', desc: 'Connections to customers, partners, investors, and Karnataka\'s startup ecosystem to accelerate your go-to-market.' },
    { icon: Leaf, title: 'Dedicated Land for Field Trials', border: 'var(--orange)', desc: 'Physical space for AgriTech and CleanTech startups to validate their products in real field conditions.' },
    { icon: Wrench, title: 'Makerspace & Fabrication Lab', border: 'var(--blue-light)', desc: 'State-of-the-art prototyping, fabrication, and product development lab for hardware-first startups.' },
    { icon: BookOpen, title: 'Training Programs', border: 'var(--orange)', desc: 'Bootcamps, workshops, masterclasses, and structured skill development sessions tailored for startup teams.' }
  ];

  return (
    <div>
      <SEOHead title="What We Offer | NIETBI" description="Explore What We Offer at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,95,217,0.3) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; What We Offer</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            What We Offer
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Comprehensive resources to help you build, scale, and succeed.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {offers.map((offer, i) => (
              <motion.div key={i} variants={cardItem} whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(13,43,110,0.12)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', borderLeft: `4px solid ${offer.border}`, padding: '40px 32px' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: offer.border === 'var(--blue-light)' ? 'rgba(46,95,217,0.12)' : 'rgba(245,130,31,0.18)', color: offer.border, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <offer.icon size={22} />
                </div>
                <h3 style={{ fontSize: 22, fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 16 }}>{offer.title}</h3>
                <p style={{ color: 'var(--gray-text)', lineHeight: 1.7 }}>{offer.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
