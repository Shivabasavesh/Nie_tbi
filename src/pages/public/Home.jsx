import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Cpu, Recycle, Globe, Wrench, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div>
      <SEOHead title="Home | NIETBI" description="Explore Home at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      {/* Hero Section */}
      <section style={{
        minHeight: '100dvh', background: '#060E24',
        paddingTop: 'calc(68px + var(--banner-h, 0px))',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Floating Orbs */}
        <motion.div animate={{ y: [0, -24, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: 'absolute', top: '-10%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,95,217,0.35) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,31,0.3) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ position: 'absolute', top: '35%', right: '30%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,74,180,0.25) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, position: 'relative', zIndex: 1, minHeight: 'calc(100vh - 200px)', alignItems: 'center' }}>
          
          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.13 } } }}>
            <motion.div variants={fadeUp} style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', padding: '8px 16px', borderRadius: 20, color: 'white', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
              🏛 TBI 2.0 Programme — Govt. of Karnataka
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
              <span style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Turning Ideas Into </span>
              <span style={{ background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Impact.</span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{ color: '#A0AECF', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
              Empowering deep-tech startups in AgriTech, Clean Energy, Sustainable Technologies and AI & ML from Mysuru and beyond.
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', color: '#fff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 4px 20px rgba(245,130,31,0.4)' }}>
                Apply Now →
              </Link>
              <a href="#stats-section" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15, border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                Learn More
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 380, margin: '0 auto' }}>
            {[
              { value: 'Est. 1946', label: 'NIE Mysuru' },
              { value: '6+', label: 'Focus Sectors' },
              { value: 'TBI 2.0', label: 'Govt. Karnataka' },
              { value: '₹ Funded', label: 'Startup Support' }
            ].map((stat, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '24px 20px', textAlign: 'center', backdropFilter: 'blur(12px)' }}>
                <div style={{ color: 'white', fontWeight: 800, fontSize: 24, marginBottom: 8 }}>{stat.value}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500 }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.4)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Scroll to explore</span>
          <ChevronDown size={18} />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" style={{ background: '#FFFFFF', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, textAlign: 'center' }}>
             {[
               { num: 78, suffix: '+', label: 'Years of NIE Excellence' },
               { num: 6, suffix: '', label: 'Focus Innovation Sectors' },
               { num: 5, suffix: '+', label: 'Facilities & Resources' },
               { val: 'Tier 2', label: 'Region Impact Focus' }
             ].map((s, i) => (
               <motion.div key={i} variants={cardItem} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <div style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, color: 'var(--blue-dark)', borderBottom: '2px solid var(--orange)', paddingBottom: 8, marginBottom: 16 }}>
                   {s.num ? s.num : s.val}{s.suffix}
                 </div>
                 <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--gray-text)', fontWeight: 600, letterSpacing: '0.05em' }}>{s.label}</div>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* Focus Sectors */}
      <section style={{ background: 'var(--gray-light)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 16 }}>Focus Innovation Sectors</h2>
            <p style={{ color: 'var(--gray-text)', fontSize: 16 }}>We specialize in deep-tech domains addressing global challenges.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
            {[
              { icon: Leaf, label: 'AgriTech', c: 'blue' },
              { icon: Zap, label: 'Clean Energy & EV', c: 'orange' },
              { icon: Cpu, label: 'AI & ML', c: 'blue' },
              { icon: Recycle, label: 'Waste to Wealth', c: 'orange' },
              { icon: Globe, label: 'Climate Tech', c: 'blue' },
              { icon: Wrench, label: 'Makerspace', c: 'orange' },
            ].map((sec, i) => (
              <motion.div key={i} variants={cardItem} whileHover={{ y: -8, boxShadow: '0 12px 32px rgba(13,43,110,0.1)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: sec.c === 'blue' ? 'rgba(46,95,217,0.12)' : 'rgba(245,130,31,0.18)', color: sec.c === 'blue' ? 'var(--blue-light)' : 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  <sec.icon size={22} />
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, color: 'var(--blue-dark)' }}>{sec.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, #0D2B6E 0%, #1A3F9F 100%)', padding: '80px 24px', textAlign: 'center', color: 'white' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', color: 'white', marginBottom: 16 }}>Applications Are Now Open</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>Join NIETBI and take your startup from idea to commercialization.</p>
          <Link to="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', color: '#fff', padding: '16px 36px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16, boxShadow: '0 4px 20px rgba(245,130,31,0.4)' }}>
            Apply for Incubation →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
