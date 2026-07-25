import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, TrendingUp, Users, Cpu, ShieldCheck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Achievements() {
  const keyAchievements = [
    {
      category: 'STARTUP',
      title: 'SportsKPI',
      desc: 'Leading analytics and live broadcasting platform for Indian sports — streaming and production services.',
      icon: <TrendingUp size={24} color="#3B82F6" />
    },
    {
      category: 'AWARD',
      title: 'VS PRO TRADING ACADEMY',
      desc: 'Received "Innovative Startup of the Year 2024-25" from Karnataka Governor at Global India Business Forum.',
      icon: <Award size={24} color="#EAB308" />
    },
    {
      category: 'HACKATHON',
      title: 'Smart India Hackathon',
      desc: 'Served as nodal center (2023-24) with direct interaction from PM Narendra Modi.',
      icon: <Cpu size={24} color="#10B981" />
    },
    {
      category: 'PROGRAM',
      title: 'National Boot Camp 2023',
      desc: 'Mentoring program for early-stage startups and student entrepreneurs.',
      icon: <Users size={24} color="#8B5CF6" />
    }
  ];

  return (
    <div>
      <SEOHead title="Achievements | NIETBI" description="Explore Achievements at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      
      {/* Hero Section */}
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 80px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        {/* Background glow effects */}
        <div style={{ position: 'absolute', top: '-20%', left: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(46,95,217,0.15) 0%, rgba(6,14,36,0) 70%)', borderRadius: '50%' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Home &gt; Achievements</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em' }}>
            Our Achievements
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 'clamp(16px, 2vw, 18px)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Milestones that define our journey, the excellence of our institution, and the success of our startups.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ background: '#F4F6FB', padding: '100px 24px', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          {/* IIC Rating Highlight Section */}
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
            style={{ 
              background: '#FFFFFF', 
              borderRadius: 24, 
              padding: 'clamp(30px, 5vw, 60px)', 
              boxShadow: '0 20px 40px rgba(13,43,110,0.06)',
              marginBottom: 80,
              border: '1px solid rgba(13, 43, 110, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
            {/* Decorative background element for IIC card */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'linear-gradient(to left, rgba(250,235,215,0.4) 0%, rgba(255,255,255,0) 100%)', zIndex: 0 }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #FFF8E7 0%, #FFEFC2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(234,179,8,0.15)' }}>
                  <Star size={32} color="#EAB308" fill="#EAB308" />
                </div>
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Innovation Council</h2>
                  <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>Institution's Innovation Council (IIC)</h3>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 40 }}>
                <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>4-Star</div>
                  <div style={{ color: '#64748B', fontSize: 14, fontWeight: 500 }}>IIC Rating (2022-23)</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>142</div>
                  <div style={{ color: '#64748B', fontSize: 14, fontWeight: 500 }}>4-Star institutions nationally</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>17</div>
                  <div style={{ color: '#64748B', fontSize: 14, fontWeight: 500 }}>In South West region</div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Hosted inter/intra-institutional hackathons in AI/ML and Clean Energy',
                  'Smart India Hackathon nodal center with PM interaction',
                  'Regular innovation workshops, idea challenges, and mentorship programs'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: '#334155', fontSize: 16, lineHeight: 1.6 }}>
                    <ShieldCheck size={20} color="#2E5FD9" style={{ flexShrink: 0, marginTop: 4 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Key Achievements Grid */}
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
             <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#0F172A', marginBottom: 16, letterSpacing: '-0.02em' }}>Key Highlights</h2>
             <p style={{ color: '#64748B', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>Celebrating the successes of our incubated startups, awards, and major events.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}
          >
            {keyAchievements.map((item, i) => (
              <motion.div 
                key={i} 
                variants={cardItem} 
                whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(13,43,110,0.12)' }} 
                style={{ 
                  background: 'white', 
                  borderRadius: 20, 
                  border: '1px solid #E8ECF8', 
                  padding: 32, 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div style={{ padding: 10, background: '#F4F6FB', borderRadius: 12 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', color: '#64748B' }}>{item.category}</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 16, lineHeight: 1.3, margin: 0 }}>{item.title}</h3>
                <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, flexGrow: 1, margin: 0, marginTop: 16 }}>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
