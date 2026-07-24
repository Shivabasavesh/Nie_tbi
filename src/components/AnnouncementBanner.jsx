import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';
import { Link } from 'react-router-dom';

export default function AnnouncementBanner() {
  const isMobile = useMobile();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('nieTbiBannerDismissed');
    if (!dismissed) {
      // Delay showing it slightly for smooth entry
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.documentElement.style.setProperty('--banner-h', '44px');
    } else {
      document.documentElement.style.setProperty('--banner-h', '0px');
    }
  }, [visible]);

  const handleDismiss = () => {
    sessionStorage.setItem('nieTbiBannerDismissed', '1');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 44, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } }}
          exit={{ height: 0, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            background: 'linear-gradient(90deg, #F5821F 0%, #FF9A3C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            overflow: 'hidden'
          }}
        >
          <div style={{
            maxWidth: 1200, width: '100%', padding: '0 40px 0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>
              {isMobile ? "Applications Now Open — NIETBI 2025" : "🎉 Applications are now open for NIETBI Incubation Program 2025"}
            </p>
            <Link to="/apply" style={{
              color: 'white', textDecoration: 'underline', fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap'
            }}>
              Apply Now →
            </Link>
          </div>
          <button
            onClick={handleDismiss}
            style={{ position: 'absolute', right: '12px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
