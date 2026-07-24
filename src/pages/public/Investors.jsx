import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Investors() {
  const reasons = [
    { icon: ShieldCheck, title: 'Curated Deal Flow', desc: 'Access highly vetted deep-tech startups backed by rigorous technical and business diligence.' },
    { icon: TrendingUp, title: 'High Growth Potential', desc: 'Invest in scalable innovations across AgriTech, Clean Energy, and AI domains.' },
    { icon: Users, title: 'Co-Investment Network', desc: 'Join a syndicate of top-tier angel investors, VCs, and Govt. funding initiatives.' }
  ];

  return (
    <div>
      <SEOHead title="Investors | NIETBI" description="Explore Investors at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24', padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Investor Relations</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Investor Relations
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Partner with NIETBI to fund the next generation of deep-tech unicorns.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue-dark)' }}>Why Invest with Us?</h2>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
            {reasons.map((r, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(13,43,110,0.1)' }} style={{ background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', borderTop: '4px solid var(--orange)', padding: 40, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, margin: '0 auto 24px', borderRadius: 16, background: 'rgba(245,130,31,0.1)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <r.icon size={28} />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 16 }}>{r.title}</h3>
                <p style={{ color: 'var(--gray-text)', lineHeight: 1.6 }}>{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#F4F6FB', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--blue-dark)', marginBottom: 16 }}>Portfolio Highlights</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginBottom: 48 }}>
            <div style={{ background: 'white', padding: '24px 40px', borderRadius: 16, border: '1px solid #E8ECF8' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--orange)', marginBottom: 8 }}>₹10Cr+</div>
              <div style={{ color: 'var(--gray-text)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase' }}>Raised by Startups</div>
            </div>
            <div style={{ background: 'white', padding: '24px 40px', borderRadius: 16, border: '1px solid #E8ECF8' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--orange)', marginBottom: 8 }}>3.5x</div>
              <div style={{ color: 'var(--gray-text)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase' }}>Average Valuation Jump</div>
            </div>
          </div>
          
          <div style={{ background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', borderRadius: 24, padding: 48, color: 'white' }}>
            <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Join Our Investor Network</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 32, fontSize: 16 }}>Get exclusive access to our demo days and startup deal rooms.</p>
            <Link to="/contact" style={{ display: 'inline-block', background: 'white', color: 'var(--blue-dark)', padding: '16px 36px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>
              Contact Investor Relations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
