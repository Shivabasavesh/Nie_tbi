import SEOHead from '../../components/system/SEOHead';
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, ClipboardList, Mic2, Rocket, Download } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useMobile } from '../../hooks/useMobile';

export default function Apply() {
  const isMobile = useMobile(768);
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.4 });
  
  const createApplication = useMutation(api.applications.create);
  
  const [formData, setFormData] = useState({
    founder_name: '', email: '', phone: '', startup_name: '', 
    sector: 'AgriTech', startup_stage: 'Idea', city: '',
    pitch_deck_url: '', message: '', link_accessibility_confirmed: false
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await createApplication({
        ...formData,
        status: 'pending',
        submitted_at: new Date().toISOString()
      });
      setStatus('success');
      setFormData({
        founder_name: '', email: '', phone: '', startup_name: '', 
        sector: 'AgriTech', startup_stage: 'Idea', city: '',
        pitch_deck_url: '', message: '', link_accessibility_confirmed: false
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const steps = [
    { id: 1, icon: FileText, title: 'Scan & Apply', desc: 'Complete the form and submit your pitch deck' },
    { id: 2, icon: ClipboardList, title: 'Screening', desc: 'Expert panel evaluates your application' },
    { id: 3, icon: Mic2, title: 'Pitch & Interview', desc: 'Present your idea to the selection committee' },
    { id: 4, icon: Rocket, title: 'Onboarding', desc: 'Begin your incubation journey at NIETBI' }
  ];

  return (
    <div>
      <SEOHead title="Apply | NIETBI" description="Explore Apply at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: '#060E24',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Apply</div>
          <h1 style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #A8C4FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 16 }}>
            Apply for Incubation
          </h1>
          <p style={{ color: '#A0AECF', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>
            Four simple steps to join NIETBI and start building the future
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }} ref={lineRef}>
          {!isMobile && (
            <>
              <div style={{ position: 'absolute', top: 27, left: '12.5%', right: '12.5%', height: 2, background: '#E8ECF8', zIndex: 0 }} />
              <motion.div initial={{ scaleX: 0 }} animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                style={{ position: 'absolute', top: 27, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, #2E5FD9, #F5821F)', transformOrigin: 'left', zIndex: 1 }} />
            </>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 40 : 24, position: 'relative', zIndex: 2 }}>
            {steps.map((step, i) => (
              <motion.div key={step.id} initial={{ opacity: 0, y: 30 }} animate={lineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: i * 0.2, duration: 0.5 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--orange)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, boxShadow: '0 4px 16px rgba(245,130,31,0.35)', marginBottom: 16 }}>
                  {step.id}
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-dark)', marginBottom: 16 }}>
                  <step.icon size={22} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue-dark)', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ color: 'var(--gray-text)', fontSize: 14 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section style={{ background: 'var(--gray-light)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', background: 'white', borderRadius: 24, padding: isMobile ? 32 : 48, boxShadow: '0 20px 40px rgba(13,43,110,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)', color: 'var(--blue-dark)', marginBottom: 16 }}>Ready to Apply?</h2>
            <p style={{ color: 'var(--gray-text)' }}>Take the first step towards building your startup with NIETBI's world-class support system.</p>
          </div>
          
          {status === 'success' ? (
            <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: 24, borderRadius: 12, textAlign: 'center' }}>
              <h3 style={{ fontSize: 20, marginBottom: 8 }}>Application Submitted!</h3>
              <p>Thank you for applying. Our team will review your application and get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>
                <div><label>Founder Name*</label><input required type="text" name="founder_name" value={formData.founder_name} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" /></div>
                <div><label>Startup Name*</label><input required type="text" name="startup_name" value={formData.startup_name} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" /></div>
                <div><label>Email*</label><input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" /></div>
                <div><label>Phone*</label><input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" /></div>
                <div><label>Sector*</label>
                  <select name="sector" value={formData.sector} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1">
                    <option>AgriTech</option><option>Clean Energy & EV</option><option>AI & ML</option><option>Waste to Wealth</option><option>Climate Tech</option><option>Makerspace</option>
                  </select>
                </div>
                <div><label>Stage*</label>
                  <select name="startup_stage" value={formData.startup_stage} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1">
                    <option>Idea</option><option>Prototype</option><option>Early Revenue</option><option>Scaling</option>
                  </select>
                </div>
              </div>
              <div><label>City*</label><input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" /></div>
              <div><label>Pitch Deck URL*</label><input required type="url" name="pitch_deck_url" value={formData.pitch_deck_url} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" placeholder="Google Drive, Dropbox, etc." /></div>
              <div><label>Brief Description*</label><textarea required name="message" value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-lg mt-1" rows="4"></textarea></div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <input required type="checkbox" name="link_accessibility_confirmed" checked={formData.link_accessibility_confirmed} onChange={handleChange} />
                <label style={{ fontSize: 14 }}>I confirm the pitch deck link is publicly accessible.</label>
              </div>
              <button disabled={status === 'submitting'} type="submit" style={{ background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', color: 'white', padding: '16px', borderRadius: 8, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', opacity: status === 'submitting' ? 0.7 : 1 }}>
                {status === 'submitting' ? 'Submitting...' : 'Apply Online →'}
              </button>
              {status === 'error' && <p style={{ color: 'red', textAlign: 'center' }}>Error submitting application. Please try again.</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
