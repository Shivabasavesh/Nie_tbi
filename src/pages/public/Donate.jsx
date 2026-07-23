import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import PageHero from '../../components/page-structure/PageHero';
import SectionHeader from '../../components/page-structure/SectionHeader';
import { Heart, Building, CheckCircle2 } from 'lucide-react';

const Donate = () => {
  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="Donate" description="Support student entrepreneurship through donations and 80G tax exemptions." />
      <PageHero title="Support Innovation" subtitle="Contribute to the growth of student entrepreneurship and technological advancements" breadcrumb="Home > Donate" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Impact Overview */}
        <div className="md:col-span-7">
          <SectionHeader title="Your Impact" />
          <p className="text-text-body text-lg mb-8 leading-relaxed">
            By donating to NIETBI, you are directly supporting the next generation of engineers, scientists, and entrepreneurs. Your contributions help fund early-stage prototyping, student incubation grants, and necessary infrastructural upgrades.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex items-start">
              <div className="bg-orange-100 p-2 rounded-lg text-nie-orange mr-4 mt-1"><Heart size={24} /></div>
              <div>
                <h4 className="font-bold text-nie-navy mb-1">Student Grants</h4>
                <p className="text-sm text-text-body">Seed funding for student-led hardware and software projects.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg text-nie-navy mr-4 mt-1"><Building size={24} /></div>
              <div>
                <h4 className="font-bold text-nie-navy mb-1">Lab Equipment</h4>
                <p className="text-sm text-text-body">Procurement of advanced 3D printers, IoT kits, and CNC machines.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bank & Tax Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-nie-navy text-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-6">Bank Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-70 mb-1">Account Name</p>
                <p className="font-semibold text-lg">NIE Technology Business Incubator</p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">Account Number</p>
                <p className="font-mono text-lg">0000 1111 2222 3333</p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">IFSC Code</p>
                <p className="font-mono text-lg">SBIN000XXXX</p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">Bank Name & Branch</p>
                <p className="font-semibold text-lg">State Bank of India, NIE Campus Branch</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-nie-navy mb-4">UPI Transfer</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 border border-slate-200">QR Code</div>
              <div>
                <p className="text-sm text-text-body mb-1">Scan the QR code to donate via any UPI app or use the ID below:</p>
                <p className="font-mono font-bold text-nie-navy">nietbi@sbi</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-200 flex items-start">
            <CheckCircle2 className="text-green-600 mr-4 flex-shrink-0" size={24} />
            <div>
              <h4 className="font-bold text-green-900 mb-1">80G Tax Exemption</h4>
              <p className="text-sm text-green-800">All donations made to NIETBI are eligible for tax deduction under Section 80G of the Income Tax Act.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
