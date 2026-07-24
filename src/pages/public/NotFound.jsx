import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#060E24', padding: 24, textAlign: 'center', position: 'relative', overflow: 'hidden'
    }}>
      <SEOHead title="Not Found | NIETBI" description="Explore Not Found at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,95,217,0.2) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '10%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,31,0.15) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ position: 'relative', zIndex: 1, maxWidth: 500 }}>
        <h1 style={{ fontSize: 'clamp(80px, 15vw, 160px)', fontWeight: 800, background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, margin: 0 }}>
          404
        </h1>
        <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginTop: 16, marginBottom: 16 }}>Page Not Found</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6, marginBottom: 40 }}>
          The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #0D2B6E 0%, #2E5FD9 100%)', color: 'white', padding: '14px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
