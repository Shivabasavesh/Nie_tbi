import SEOHead from '../../components/system/SEOHead';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../../components/page-structure/PageHero';
import SectionHeader from '../../components/page-structure/SectionHeader';
import { Heart, Building, CheckCircle2 } from 'lucide-react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from '../../components/ui/Button';

const Donate = () => {
  const navigate = useNavigate();
  const stats = useQuery(api.donations.getDonationStats);
  const submitDonation = useMutation(api.donations.submitDonation);

  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({ donorName: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000];

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(Number(e.target.value) || 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    
    setIsSubmitting(true);
    try {
      await submitDonation({
        donorName: formData.donorName,
        email: formData.email,
        phone: formData.phone || undefined,
        amount: amount
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="Donate" description="Support student entrepreneurship through donations and 80G tax exemptions." />
      <PageHero title="Support Innovation" subtitle="Contribute to the growth of student entrepreneurship and technological advancements" breadcrumb="Home > Donate" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Donation Form Area */}
        <div className="md:col-span-7">
          <SectionHeader title="Make a Contribution" />
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 mb-8">
            {stats && (
              <div className="flex gap-8 mb-8 pb-8 border-b border-slate-100">
                <div>
                  <div className="text-3xl font-bold text-nie-navy mb-1">{stats.totalDonors}</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Supporters</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-nie-orange mb-1">₹{stats.totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Raised So Far</div>
                </div>
              </div>
            )}

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="text-center py-12 flex flex-col items-center"
              >
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle2 className="text-green-500 w-24 h-24 mb-6" />
                </motion.div>
                <h3 className="text-2xl font-bold text-nie-navy mb-2">Thank you for supporting NIETBI!</h3>
                <p className="text-slate-500">Redirecting you shortly...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Select Amount (₹)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {presetAmounts.map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => handleAmountSelect(preset)}
                        className={`py-3 rounded-lg border font-bold transition-colors ${amount === preset && !customAmount ? 'bg-nie-orange border-nie-orange text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-nie-orange hover:text-nie-orange'}`}
                      >
                        ₹{preset}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-200 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none transition-shadow"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input required type="text" value={formData.donorName} onChange={e => setFormData({...formData, donorName: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone (Optional)</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none" />
                  </div>
                </div>

                <Button type="submit" variant="primary" className="w-full py-3 text-lg" disabled={isSubmitting || !amount || amount <= 0}>
                  {isSubmitting ? 'Processing...' : `Donate ₹${amount || 0}`}
                </Button>
              </form>
            )}
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
