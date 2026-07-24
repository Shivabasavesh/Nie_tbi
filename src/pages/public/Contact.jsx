import SEOHead from '../../components/system/SEOHead';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export default function Contact() {
  const sendMessage = useMutation(api.messages.send);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await sendMessage({
        ...formData,
        status: 'new',
        submitted_at: new Date().toISOString()
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('idle');
    }
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', val: 'The National Institute of Engineering, Mysuru — 570 008' },
    { icon: Phone, label: 'Phone', val: '+91-9730020838' },
    { icon: Mail, label: 'Email', val: 'info@tbi.nie.ac.in / ceo@tbi.nie.ac.in' },
    { icon: Clock, label: 'Hours', val: 'Monday – Friday, 9:00 AM – 5:00 PM' }
  ];

  return (
    <div>
      <SEOHead title="Contact | NIETBI" description="Explore Contact at NIE TBI. Learn more about our deep-tech incubation ecosystem." />
      <section style={{
        background: 'linear-gradient(135deg, #0D2B6E 0%, #1A3F9F 60%, #2E5FD9 100%)',
        padding: 'calc(120px + var(--banner-h, 0px)) 24px 60px',
        textAlign: 'center', color: 'white'
      }}>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 16 }}>Home &gt; Contact</div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800 }}>Contact Us</h1>
      </section>

      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60 }}>
          
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: 32, color: 'var(--blue-dark)', marginBottom: 32 }}>Get in Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {contactInfo.map((info, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,130,31,0.18)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <info.icon size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--blue-dark)', fontSize: 14 }}>{info.label}</div>
                    <div style={{ color: 'var(--gray-text)', fontSize: 15 }}>{info.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ background: 'var(--gray-light)', padding: '40px 36px', borderRadius: 24 }}>
            <h3 style={{ fontSize: 24, color: 'var(--blue-dark)', marginBottom: 24 }}>Send a Message</h3>
            {status === 'success' ? (
              <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: 24, borderRadius: 12, textAlign: 'center' }}>
                Thank you! We'll get back within 2 working days.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input required type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                <input required type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                <input type="tel" name="phone" placeholder="Phone (optional)" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg" />
                <textarea required name="message" placeholder="Message*" value={formData.message} onChange={handleChange} rows="4" className="w-full p-3 border rounded-lg"></textarea>
                <button disabled={status === 'submitting'} type="submit" style={{ background: 'linear-gradient(135deg, #F5821F 0%, #FF9A3C 100%)', color: 'white', padding: '14px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </section>

      <div style={{ width: '100%', height: 420 }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.375276228308!2d76.6380!3d12.2872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf700e57202d05%3A0xc48c0a969f6e16bd!2sThe%20National%20Institute%20of%20Engineering%20(NIE)%20-%20South%20Campus!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps"
        />
      </div>
    </div>
  );
}
