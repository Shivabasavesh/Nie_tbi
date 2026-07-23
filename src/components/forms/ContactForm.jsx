import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { contactFormSchema } from '../../lib/validations';
import { useSubmitContact } from '../../hooks/useSubmitContact';

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactFormSchema),
  });

  const submitContact = useSubmitContact();

  const onSubmit = (data) => {
    submitContact.mutate(data, {
      onSuccess: () => {
        toast.success("Thank you for contacting NIETBI. Our team will get back to you shortly.");
        reset();
      },
      onError: (error) => {
        toast.error("Failed to send your message. Please try again later.");
        console.error("Submission error:", error);
      }
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-2xl font-bold text-nie-navy mb-6">Send an Inquiry</h3>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            {...register('fullName')}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
            placeholder="John Doe" 
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
              placeholder="john@example.com" 
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              {...register('phone')}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
              placeholder="+91 9876543210" 
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
          <select 
            {...register('subject')}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none transition-colors bg-white"
          >
            <option value="">Select a subject...</option>
            <option value="incubation">Incubation Inquiry</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="events">Events & Workshops</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Message <span className="text-red-500">*</span></label>
          <textarea 
            rows={5} 
            {...register('message')}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
            placeholder="How can we help you? (Minimum 20 characters)"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          className="w-full" 
          disabled={submitContact.isPending}
          type="submit"
        >
          {submitContact.isPending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
