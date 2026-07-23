import React, { useState } from 'react';
import SEOHead from '../../components/system/SEOHead';
import PageHero from '../../components/page-structure/PageHero';
import SectionHeader from '../../components/page-structure/SectionHeader';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '../../components/forms/ContactForm';
import ApplicationForm from '../../components/forms/ApplicationForm';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' or 'apply'

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="Contact Us" description="Get in touch with the NIETBI team or apply for incubation." />
      <PageHero title="Contact & Apply" subtitle="Get in touch with the NIETBI team or apply for incubation" breadcrumb="Home > Contact" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 md:grid-cols-12 gap-16">
        {/* Contact Info & Map */}
        <div className="md:col-span-5">
          <SectionHeader title="Reach Out" />
          <p className="text-text-body mb-8 text-lg">
            Have questions about our incubation programs, partnerships, or events? We're here to help. Reach out to us using the contact details below or fill out the inquiry form.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-orange-100 text-nie-orange rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="font-bold text-nie-navy text-lg">Address</h4>
                <p className="text-text-body mt-1 leading-relaxed">
                  NIE Technology Business Incubator<br />
                  The National Institute of Engineering<br />
                  Manandavadi Road, Mysuru - 570008<br />
                  Karnataka, India
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-orange-100 text-nie-orange rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-bold text-nie-navy text-lg">Phone</h4>
                <p className="text-text-body mt-1">+91 0821-2480475</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-orange-100 text-nie-orange rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold text-nie-navy text-lg">Email</h4>
                <p className="text-text-body mt-1">incubator@nie.ac.in</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 bg-orange-100 text-nie-orange rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-nie-navy text-lg">Working Hours</h4>
                <p className="text-text-body mt-1">Monday - Saturday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden border border-slate-300 flex items-center justify-center">
            <span className="text-slate-500 font-medium flex flex-col items-center">
              <MapPin className="mb-2" size={32} />
              Google Map Placeholder
            </span>
          </div>
        </div>

        {/* Forms UI */}
        <div className="md:col-span-7">
          <div className="flex space-x-2 mb-6 bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'contact' ? 'bg-white text-nie-navy shadow-sm' : 'text-slate-600 hover:text-nie-navy'}`}
            >
              General Inquiry
            </button>
            <button 
              onClick={() => setActiveTab('apply')}
              className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-colors ${activeTab === 'apply' ? 'bg-white text-nie-navy shadow-sm' : 'text-slate-600 hover:text-nie-navy'}`}
            >
              Apply for Incubation
            </button>
          </div>

          {activeTab === 'contact' ? <ContactForm /> : <ApplicationForm />}
        </div>
      </div>
    </div>
  );
};

export default Contact;
