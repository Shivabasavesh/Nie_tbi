import SEOHead from '../../components/system/SEOHead';
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Policy() {
  const documents = [
    { name: 'Incubation Policy & Guidelines', date: 'Updated Jan 2024' },
    { name: 'Intellectual Property (IP) Policy', date: 'Updated Feb 2024' },
    { name: 'Code of Conduct for Startups', date: 'Updated Mar 2024' },
    { name: 'Standard Application Form (Offline)', date: 'Updated Apr 2024' },
    { name: 'NIETBI Official Brochure', date: 'Updated May 2024' }
  ];

  return (
    <div>
      <SEOHead title="Policy | NIETBI" description="Explore Policy at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24', padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Policies & Documents</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Policies & Documents
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Important guidelines, frameworks, and resources for our incubation programs.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {documents.map((doc, i) => (
              <motion.div key={i} variants={fadeUp} style={{ background: '#F4F6FB', borderRadius: 12, border: '1px solid #E8ECF8', padding: '24px 32px', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(46,95,217,0.1)', color: 'var(--blue-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 4 }}>{doc.name}</h3>
                    <div style={{ color: 'var(--gray-text)', fontSize: 13 }}>{doc.date}</div>
                  </div>
                </div>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--blue-dark)', border: '2px solid var(--blue-mid)', padding: '10px 20px', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  <Download size={16} /> Download PDF
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
