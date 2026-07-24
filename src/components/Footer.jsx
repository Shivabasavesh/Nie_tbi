import React from 'react';
import { Link } from 'react-router-dom';
import { useMobile } from '../hooks/useMobile';

export default function Footer() {
  const isMobile = useMobile();

  return (
    <footer style={{ background: '#060E24', color: 'rgba(255,255,255,0.7)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #F5821F, #FF9A3C)' }} />
      
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 40 }}>
          
          {/* Brand */}
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: 'white', marginBottom: 16 }}>NIETBI</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              Empowering deep-tech startups in AgriTech, Clean Energy, Sustainable Technologies and AI & ML from Mysuru and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: 20 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><Link to="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link to="/what-we-offer" style={{ color: 'inherit', textDecoration: 'none' }}>What We Offer</Link></li>
              <li><Link to="/who-can-apply" style={{ color: 'inherit', textDecoration: 'none' }}>Who Can Apply</Link></li>
              <li><Link to="/leadership" style={{ color: 'inherit', textDecoration: 'none' }}>Leadership</Link></li>
            </ul>
          </div>

          {/* Focus Areas */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: 20 }}>Focus Areas</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li><Link to="/focus-areas" style={{ color: 'inherit', textDecoration: 'none' }}>AgriTech</Link></li>
              <li><Link to="/focus-areas" style={{ color: 'inherit', textDecoration: 'none' }}>Clean Energy & EV</Link></li>
              <li><Link to="/focus-areas" style={{ color: 'inherit', textDecoration: 'none' }}>AI & ML</Link></li>
              <li><Link to="/focus-areas" style={{ color: 'inherit', textDecoration: 'none' }}>Waste to Wealth</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: 20 }}>Contact Us</h4>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>
              The National Institute of Engineering, Mysuru — 570 008, Karnataka, India
            </p>
            <p style={{ fontSize: 14, marginBottom: 8 }}>Email: info@tbi.nie.ac.in</p>
            <p style={{ fontSize: 14 }}>Phone: +91-9730020838</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          marginTop: 60, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between',
          alignItems: 'center', gap: 16, fontSize: 13
        }}>
          <div>© {new Date().getFullYear()} NIETBI. All rights reserved.</div>
          <div>The National Institute of Engineering, Mysuru</div>
        </div>
      </div>
    </footer>
  );
}
