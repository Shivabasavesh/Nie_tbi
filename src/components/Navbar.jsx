import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';

const navLinks = [
  { 
    name: 'Home', 
    path: '/',
    subLinks: [
      { name: 'Home', path: '/' },
      { name: 'Achievements', path: '/achievements' }
    ]
  },
  { 
    name: 'About', 
    path: '/about',
    subLinks: [
      { name: 'About NIETBI', path: '/about' },
      { name: 'Infrastructure', path: '/infrastructure' },
      { name: 'Social Cause', path: '/social-cause' },
      { name: 'Policies', path: '/policy' }
    ]
  },
  { name: 'Focus Areas', path: '/focus-areas' },
  { 
    name: 'What We Offer', 
    path: '/what-we-offer',
    subLinks: [
      { name: 'Overview', path: '/what-we-offer' },
      { name: 'Programs', path: '/programs' },
      { name: 'Mentors', path: '/mentors' },
      { name: 'Investors', path: '/investors' }
    ]
  },
  { 
    name: 'Who Can Apply', 
    path: '/who-can-apply',
    subLinks: [
      { name: 'Eligibility', path: '/who-can-apply' },
      { name: 'Startups', path: '/startups' },
      { name: 'Alumni', path: '/alumni' }
    ]
  },
  { 
    name: 'Leadership', 
    path: '/leadership',
    subLinks: [
      { name: 'Leadership Team', path: '/leadership' },
      { name: 'Achievements', path: '/achievements' }
    ]
  },
  { 
    name: 'Contact', 
    path: '/contact',
    subLinks: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Downloads', path: '/downloads' }
    ]
  }
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Desktop
  const [mobileExpanded, setMobileExpanded] = useState({}); // Mobile accordion
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
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMobileSubmenu = (name) => {
    setMobileExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={{ background: 'white', borderRadius: 12, padding: '4px 12px', display: 'flex', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <img src="/assets/nietbi-logo.png" alt="NIETBI Logo" style={{ height: 54, width: 'auto', objectFit: 'contain' }} />
            </div>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {navLinks.map(link => (
                <div 
                  key={link.name} 
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: 14,
                      color: (pathname === link.path || activeDropdown === link.name) ? 'var(--orange)' : (scrolled ? 'var(--blue-dark)' : 'white'),
                      transition: 'color 0.2s',
                      padding: '10px 0'
                    }}
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: activeDropdown === link.name ? 'rotate(180deg)' : 'rotate(0)' }} />}
                    {pathname === link.path && (
                      <motion.div layoutId="underline" style={{ position: 'absolute', bottom: 4, left: 0, right: 0, height: 2, background: 'var(--orange)', borderRadius: 2 }} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.subLinks && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          minWidth: 200,
                          background: 'white',
                          borderRadius: 8,
                          boxShadow: '0 10px 30px rgba(13,43,110,0.15)',
                          padding: '8px 0',
                          zIndex: 100
                        }}
                      >
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            style={{
                              display: 'block',
                              padding: '10px 20px',
                              textDecoration: 'none',
                              color: 'var(--blue-dark)',
                              fontSize: 14,
                              fontWeight: 500,
                              transition: 'background 0.2s, color 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(245,130,31,0.08)';
                              e.currentTarget.style.color = 'var(--orange)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--blue-dark)';
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScSLWU-g-5E-orTRz3CuCWquV6cx79IPGAyVnsixsZabGjCmg/viewform" target="_blank" rel="noopener noreferrer" style={{
                background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)',
                color: 'white', padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14,
                boxShadow: '0 4px 20px rgba(245,130,31,0.4)', marginLeft: 16
              }}>
                Apply Now
              </a>
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
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24, overflowY: 'auto' }}>
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.25 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link to={link.path} style={{ textDecoration: 'none', fontSize: 20, fontWeight: 700, color: pathname === link.path ? 'var(--orange)' : 'var(--blue-dark)' }}>
                      {link.name}
                    </Link>
                    {link.subLinks && (
                      <button 
                        onClick={() => toggleMobileSubmenu(link.name)}
                        style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', color: 'var(--blue-dark)' }}
                      >
                        <ChevronDown size={20} style={{ transition: 'transform 0.2s', transform: mobileExpanded[link.name] ? 'rotate(180deg)' : 'rotate(0)' }} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Submenu Accordion */}
                  <AnimatePresence>
                    {link.subLinks && mobileExpanded[link.name] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        style={{ overflow: 'hidden', paddingLeft: 16, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12, borderLeft: '2px solid rgba(13,43,110,0.1)' }}
                      >
                        {link.subLinks.map(sub => (
                          <Link 
                            key={sub.name} 
                            to={sub.path}
                            style={{ textDecoration: 'none', fontSize: 16, color: pathname === sub.path ? 'var(--orange)' : 'var(--gray-text)', fontWeight: 500 }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>
            <div style={{ marginTop: 'auto', marginBottom: 40 }}>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScSLWU-g-5E-orTRz3CuCWquV6cx79IPGAyVnsixsZabGjCmg/viewform" target="_blank" rel="noopener noreferrer" style={{
                display: 'block', textAlign: 'center', background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)',
                color: 'white', padding: '16px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16,
                boxShadow: '0 4px 20px rgba(245,130,31,0.4)'
              }}>
                Apply for Incubation →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
