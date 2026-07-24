import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#0D2B6E',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '40px', letterSpacing: '0.08em', margin: 0 }}>
              <span style={{ color: 'white' }}>NIE</span>
              <span style={{ color: '#F5821F' }}>TBI</span>
            </h1>
            <div style={{
              height: '3px',
              width: '100%',
              background: 'linear-gradient(90deg, #2E5FD9, #F5821F)',
              marginTop: '4px',
              marginBottom: '12px'
            }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              NIE Technology Business Incubator
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
