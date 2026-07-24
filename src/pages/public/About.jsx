import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';
import CountUpPkg from 'react-countup';
const CountUp = CountUpPkg.default || CountUpPkg;


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft  = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const slideRight = { hidden: { opacity: 0, x:  40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function About() {
  return (
    <div>
      <SEOHead title="About | NIETBI" description="Explore About at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      {/* Hero */}
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-20%', right: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,95,217,0.3) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; About</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            About NIETBI
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Empowering innovators and building the startup ecosystem in Mysuru.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slideLeft} style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 24 }}>Who We Are</h2>
            <p style={{ color: 'var(--gray-text)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              NIETBI — NIE Technology Business Incubator — is newly established under the Government of Karnataka TBI 2.0 Programme, supported by the Department of Electronics, IT, BT & S&T. Located at The National Institute of Engineering, Mysuru (Estd. 1946, Autonomous Institution), NIETBI is dedicated to fostering innovation, entrepreneurship, and technology-driven startups.
            </p>
            <p style={{ color: 'var(--gray-text)', fontSize: 16, lineHeight: 1.8 }}>
              We are a not-for-profit organization committed to building a strong, inclusive, and sustainable startup ecosystem in Mysuru and beyond — empowering innovators especially from Tier-2 and Tier-3 regions.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={slideRight} style={{ flex: '1 1 400px' }}>
            <div style={{ background: '#060E24', color: 'white', padding: 40, borderRadius: 24, boxShadow: '0 20px 40px rgba(13,43,110,0.1)' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Quick Facts</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Established', val: '2024' },
                  { label: 'Type', val: 'Not-for-Profit Incubator' },
                  { label: 'Supported by', val: 'Govt. of Karnataka' },
                  { label: 'Programme', val: 'TBI 2.0' },
                  { label: 'Host', val: 'National Institute of Engineering' }
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>{f.label}</span>
                    <span style={{ fontWeight: 600, textAlign: 'right', maxWidth: 200 }}>{f.val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ background: 'var(--gray-light)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(13,43,110,0.12)' }} style={{ background: 'white', borderRadius: 16, padding: 40, borderTop: '4px solid var(--blue-mid)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(46,95,217,0.12)', color: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}><Target size={22} /></div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 16 }}>Mission</h3>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.7 }}>To empower innovators and entrepreneurs with the right mentorship, infrastructure, funding support, and market access needed to scale impactful ventures.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(245,130,31,0.12)' }} style={{ background: 'white', borderRadius: 16, padding: 40, borderTop: '4px solid var(--orange)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(245,130,31,0.12)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}><Eye size={22} /></div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 16 }}>Vision</h3>
            <p style={{ color: 'var(--gray-text)', lineHeight: 1.7 }}>To be the leading technology business incubator in Karnataka, catalyzing deep-tech innovation and building a sustainable startup ecosystem from Mysuru.</p>
          </motion.div>
        </div>
      </section>
      
      {/* India Startup Context */}
      <section style={{ background: 'var(--gray-light)', padding: '80px 24px', borderTop: '1px solid #E8ECF8' }}>
         <div style={{ maxWidth: 1200, margin: '0 auto' }}>
           <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, textAlign: 'center' }}>
              {[
                { num: 112000, suffix: '+', label: 'DPIIT Recognised Startups' },
                { val: '3rd', label: 'Largest Startup Ecosystem' },
                { num: 750, suffix: '+', label: 'HEI-recognised Incubators' },
                { val: '4-Star', label: 'NIE IIC Rating by MoE' }
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} style={{ background: 'white', padding: '32px 24px', borderRadius: 16, border: '1px solid #E8ECF8' }}>
                  <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--orange)', borderBottom: '2px solid var(--orange)', paddingBottom: 8, marginBottom: 16 }}>
                    {s.num ? <CountUp end={s.num} separator="," duration={2.2} enableScrollSpy scrollSpyOnce /> : s.val}{s.suffix}
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--gray-text)', fontWeight: 600 }}>{s.label}</div>
                </motion.div>
              ))}
           </motion.div>
           <div style={{ textAlign: 'center', marginTop: 24, color: 'rgba(85,94,123,0.6)', fontSize: 12 }}>Source: DPIIT, Startup India (2024)</div>
         </div>
      </section>

    </div>
  );
}
