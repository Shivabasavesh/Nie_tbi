import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Cpu, Recycle, Globe, Wrench } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FocusAreas() {
  const sectors = [
    {
      num: '01', icon: Leaf, title: 'AgriTech', c: 'blue',
      desc: 'AI-driven precision farming, crop intelligence, and smart agriculture solutions for sustainable food production.',
      tags: ['Precision Farming', 'Crop Intelligence', 'AI in Agriculture']
    },
    {
      num: '02', icon: Zap, title: 'Clean Energy & EV', c: 'orange',
      desc: 'Solar energy, electric vehicles, battery storage systems, and clean technology for a sustainable future.',
      tags: ['Solar', 'EV', 'Energy Storage', 'Clean Tech']
    },
    {
      num: '03', icon: Cpu, title: 'Artificial Intelligence & ML', c: 'blue',
      desc: 'Deep learning, NLP, generative AI, and computer vision solutions transforming industries.',
      tags: ['Deep Learning', 'NLP', 'GenAI', 'Computer Vision']
    },
    {
      num: '04', icon: Recycle, title: 'Waste to Wealth', c: 'orange',
      desc: 'Circular economy innovations, resource recovery, and sustainable waste management solutions.',
      tags: ['Circular Economy', 'Resource Recovery', 'Sustainability']
    },
    {
      num: '05', icon: Globe, title: 'Climate & Sustainable Tech', c: 'blue',
      desc: 'SDG-aligned environmental innovations and climate-resilient technologies for a greener planet.',
      tags: ['SDG', 'Climate Tech', 'Green Innovation']
    },
    {
      num: '06', icon: Wrench, title: 'Incubation & Makerspace', c: 'orange',
      desc: 'Hands-on product development, fabrication, and rapid prototyping lab for hardware startups.',
      tags: ['Prototyping', 'Fabrication', 'Product Dev']
    }
  ];

  return (
    <div>
      <SEOHead title="Focus Areas | NIETBI" description="Explore Focus Areas at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,95,217,0.3) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Focus Areas</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Our Focus Areas
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            We specialize in supporting startups across high-growth, high-impact sectors driven by technology and research.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--gray-light)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>
            {sectors.map((sec, i) => (
              <motion.div key={i} variants={cardItem} whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(13,43,110,0.12)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', padding: '40px 32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 20, right: 24, fontSize: 48, fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'rgba(13,43,110,0.04)', pointerEvents: 'none', lineHeight: 1 }}>
                  {sec.num}
                </div>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: sec.c === 'blue' ? 'rgba(46,95,217,0.12)' : 'rgba(245,130,31,0.18)', color: sec.c === 'blue' ? 'var(--blue-light)' : 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <sec.icon size={22} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 16 }}>{sec.title}</h3>
                <p style={{ color: 'var(--gray-text)', lineHeight: 1.7, marginBottom: 24 }}>{sec.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {sec.tags.map((tag, j) => (
                    <span key={j} style={{ background: sec.c === 'blue' ? 'rgba(46,95,217,0.08)' : 'rgba(245,130,31,0.08)', color: sec.c === 'blue' ? 'var(--blue-dark)' : 'var(--orange)', padding: '6px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
