import React from 'react';
import { motion } from 'framer-motion';

export default function StepCard({ number, title, description, icon: Icon }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%', background: 'var(--orange)',
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22,
        boxShadow: '0 4px 16px rgba(245,130,31,0.35)', marginBottom: 16
      }}>
        {number}
      </div>
      {Icon && (
        <div style={{
          width: 44, height: 44, borderRadius: 8, background: 'var(--gray-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--orange)', marginBottom: 16
        }}>
          <Icon size={22} />
        </div>
      )}
      <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: 'var(--blue-dark)', marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ color: 'var(--gray-text)', fontSize: '15px', lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}
