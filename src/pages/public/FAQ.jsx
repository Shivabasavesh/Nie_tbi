import SEOHead from '../../components/system/SEOHead';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { section: 'General', items: [
      { q: 'What is NIETBI?', a: 'NIETBI is a technology business incubator at NIE Mysuru, supported by the Govt. of Karnataka under TBI 2.0.' },
      { q: 'Where are you located?', a: 'We are situated within the South Campus of The National Institute of Engineering, Mysuru.' },
      { q: 'Do you take equity in startups?', a: 'Equity arrangements are evaluated on a case-by-case basis depending on the funding and support provided.' }
    ]},
    { section: 'Application', items: [
      { q: 'Who is eligible to apply?', a: 'Students, researchers, and early-stage startups working in deep-tech, AgriTech, CleanTech, and AI.' },
      { q: 'Is there an application fee?', a: 'No, applying to NIETBI is completely free of charge.' },
      { q: 'How long does the selection process take?', a: 'The typical screening and interview process takes 2-4 weeks after the application deadline.' }
    ]},
    { section: 'Incubation', items: [
      { q: 'What is the duration of the incubation program?', a: 'The core incubation program runs for 12 to 24 months depending on the startup stage.' },
      { q: 'Do I get a dedicated workspace?', a: 'Yes, incubated startups get access to our co-working space, meeting rooms, and lab facilities.' },
      { q: 'Do I need to relocate to Mysuru?', a: 'While we encourage physical presence, we also offer virtual incubation for select startups.' }
    ]},
    { section: 'Funding', items: [
      { q: 'Do you provide seed funding?', a: 'Yes, we facilitate seed funding through Govt. grants and our network of angel investors.' },
      { q: 'What is the maximum grant available?', a: 'Grants vary based on the scheme, typically ranging from ₹5 Lakhs to ₹25 Lakhs for prototyping and scaling.' },
      { q: 'Do you help with venture capital connections?', a: 'Absolutely, we organize demo days and investor meetups to connect you with prominent VCs.' }
    ]}
  ];

  let globalIndex = 0;

  return (
    <div>
      <SEOHead title="F A Q | NIETBI" description="Explore F A Q at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24', padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; FAQ</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {faqs.map((group, gIdx) => (
            <motion.div key={gIdx} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 24, paddingBottom: 8, borderBottom: '2px solid #E8ECF8' }}>{group.section}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {group.items.map((item, i) => {
                  const currentIndex = globalIndex++;
                  const isOpen = openIndex === currentIndex;
                  return (
                    <div key={i} style={{ background: '#F4F6FB', borderRadius: 12, border: '1px solid #E8ECF8', overflow: 'hidden' }}>
                      <button onClick={() => setOpenIndex(isOpen ? null : currentIndex)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--blue-dark)', fontWeight: 600, fontSize: 16 }}>
                        {item.q}
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={20} color="var(--orange)" /></motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ padding: '0 24px 24px', color: 'var(--gray-text)', lineHeight: 1.6 }}>{item.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
