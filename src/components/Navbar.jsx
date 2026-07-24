import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Focus Areas', path: '/focus-areas' },
  { name: 'What We Offer', path: '/what-we-offer' },
  { name: 'Who Can Apply', path: '/who-can-apply' },
  { name: 'Leadership', path: '/leadership' },
  { name: 'Contact', path: '/contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useMobile(768);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 'var(--banner-h, 0px)',
        left: 0,
        right: 0,
        height: 68,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(13,43,110,0.10)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px'
      }}>
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
               {/* Replace with actual logo image later */}
               <div style={{ fontWeight: 800, color: 'var(--blue-dark)' }}>NIE</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, color: scrolled ? 'var(--blue-dark)' : 'white' }}>NIETBI</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: scrolled ? 'var(--gray-text)' : 'rgba(255,255,255,0.7)' }}>Incubation Center</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  style={{
                    position: 'relative',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    color: pathname === link.path ? 'var(--orange)' : (scrolled ? 'var(--blue-dark)' : 'white'),
                    transition: 'color 0.2s'
                  }}
                >
                  {link.name}
                  {pathname === link.path && (
                    <motion.div layoutId="underline" style={{ position: 'absolute', bottom: -4, left: 0, right: 0, height: 2, background: 'var(--orange)', borderRadius: 2 }} />
                  )}
                </Link>
              ))}
              <Link to="/apply" style={{
                background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)',
                color: 'white', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
                boxShadow: '0 4px 20px rgba(245,130,31,0.4)', marginLeft: 16
              }}>
                Apply Now
              </Link>
            </nav>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', color: scrolled ? 'var(--blue-dark)' : 'white', cursor: 'pointer' }}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: `calc(68px + var(--banner-h, 0px))`, left: 0, right: 0, bottom: 0,
              background: 'white', zIndex: 999, display: 'flex', flexDirection: 'column', padding: 24
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24 }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.25 }}>
                  <Link to={link.path} style={{ textDecoration: 'none', fontSize: 20, fontWeight: 700, color: pathname === link.path ? 'var(--orange)' : 'var(--blue-dark)' }}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div style={{ marginTop: 'auto', marginBottom: 40 }}>
              <Link to="/apply" style={{
                display: 'block', textAlign: 'center', background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)',
                color: 'white', padding: '16px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16,
                boxShadow: '0 4px 20px rgba(245,130,31,0.4)'
              }}>
                Apply for Incubation →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
