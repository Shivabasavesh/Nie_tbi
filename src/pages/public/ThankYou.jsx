import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#060E24', padding: 24, textAlign: 'center', position: 'relative', overflow: 'hidden'
    }}>
      <SEOHead title="Thank You | NIETBI" description="Explore Thank You at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,95,217,0.2) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,31,0.15) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 500, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: 32, boxShadow: '0 8px 32px rgba(245,130,31,0.4)' }}
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ fontSize: 'clamp(36px, 6vw, 48px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
          Thank You!
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.6, marginBottom: 40 }}>
          Your submission has been received successfully. We'll be in touch within 2 working days.
        </motion.p>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: 'var(--blue-dark)', padding: '16px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
