import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Leadership() {
  const director = {
    name: 'Dr. Rohini Nagapadma', role: 'Principal, NIE & Director, NIETBI',
    bio: 'Guiding the vision of NIETBI to build a thriving innovation ecosystem in Mysuru.',
    img: 'https://nie.ac.in/wp-content/uploads/2023/11/Principal-Dr.-Rohini-Nagapadma-2.jpg'
  };

  const faculty = [
    { name: 'Dr. Kuzhalvaimozhi', role: 'CEO', dept: 'NIETBI' },
    { name: 'Dr. S. Kuzhalvaimozhi', role: 'Head (IIC)', dept: 'Information Science' }, // assuming duplicated names in dummy data
    { name: 'Dr. K. R. Prakash', role: 'Faculty Coordinator', dept: 'Mechanical Engineering' },
    { name: 'Dr. C. Vidya Raj', role: 'Faculty Coordinator', dept: 'Computer Science' },
    { name: 'Dr. P. Devaki', role: 'Faculty Coordinator', dept: 'Information Science' },
    { name: 'Dr. H. Pradeepa', role: 'Faculty Coordinator', dept: 'Electrical & Electronics' },
    { name: 'Dr. S. R. Ramesh', role: 'Faculty Coordinator', dept: 'Electronics & Communication' },
    { name: 'Mr. Suhas', role: 'Incubation Manager', dept: 'NIETBI' }
  ];

  const advisors = [
    { name: 'Sanjiv Narayan', role: 'VP, Board of Management', org: 'NIE' },
    { name: 'Udaya Shankar S', role: 'Hon. Secretary', org: 'NIE' },
    { name: 'R. K. Bharat', role: 'Member', org: 'NIE Foundation' },
    { name: 'Industry Experts', role: 'Mentors', org: 'Global Tech Network' }
  ];

  const Card = ({ item, isDirector = false }) => (
    <motion.div variants={fadeUp} whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(13,43,110,0.1)' }} style={{
      background: 'white', borderRadius: 16, border: '1px solid #E8ECF8', padding: isDirector ? '40px' : '24px',
      display: 'flex', flexDirection: isDirector ? 'row' : 'column', gap: 24, alignItems: isDirector ? 'center' : 'flex-start',
      gridColumn: isDirector ? '1 / -1' : 'auto', flexWrap: isDirector ? 'wrap' : 'nowrap'
    }}>
      {isDirector && (
        <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'var(--gray-light)', overflow: 'hidden', flexShrink: 0, border: '4px solid white', boxShadow: '0 8px 24px rgba(13,43,110,0.1)' }}>
          <img src={item.img} alt={item.name} loading={isDirector ? 'eager' : 'lazy'} width="160" height="160" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
        </div>
      )}
      <div>
        <h3 style={{ fontSize: isDirector ? 28 : 18, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 4 }}>{item.name}</h3>
        <div style={{ color: 'var(--orange)', fontWeight: 600, fontSize: isDirector ? 16 : 13, marginBottom: 8 }}>{item.role}</div>
        {item.dept && <div style={{ color: 'var(--gray-text)', fontSize: 13 }}>{item.dept}</div>}
        {item.org && <div style={{ color: 'var(--gray-text)', fontSize: 13 }}>{item.org}</div>}
        {item.bio && <p style={{ color: 'var(--gray-text)', lineHeight: 1.6, marginTop: 16, maxWidth: 600 }}>{item.bio}</p>}
      </div>
    </motion.div>
  );

  return (
    <div>
      <SEOHead title="Leadership | NIETBI" description="Explore Leadership at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Leadership</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Our Leadership
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Guided by visionaries and industry experts dedicated to fostering innovation.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--gray-light)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          <h2 style={{ fontSize: 24, color: 'var(--blue-dark)', marginBottom: 32, borderBottom: '2px solid #E8ECF8', paddingBottom: 16 }}>Board of Directors</h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 80 }}>
            <Card item={director} isDirector={true} />
          </motion.div>

          <h2 style={{ fontSize: 24, color: 'var(--blue-dark)', marginBottom: 32, borderBottom: '2px solid #E8ECF8', paddingBottom: 16 }}>Faculty Coordinators</h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 80 }}>
            {faculty.map((member, i) => <Card key={i} item={member} />)}
          </motion.div>

          <h2 style={{ fontSize: 24, color: 'var(--blue-dark)', marginBottom: 32, borderBottom: '2px solid #E8ECF8', paddingBottom: 16 }}>Advisory Board</h2>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {advisors.map((advisor, i) => <Card key={i} item={advisor} />)}
          </motion.div>

        </div>
      </section>
    </div>
  );
}
