import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '../ui/Button';
import { applicationFormSchema } from '../../lib/validations';
import { useSubmitApplication } from '../../hooks/useSubmitApplication';

const ApplicationForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      link_accessibility_confirmed: false,
    }
  });

  const submitApplication = useSubmitApplication();

  const onSubmit = (data) => {
    submitApplication.mutate(data, {
      onSuccess: () => {
        toast.success("Application submitted successfully. We will review it shortly.");
        reset();
      },
      onError: (error) => {
        toast.error("Failed to submit application. Please try again.");
        console.error("Submission error:", error);
      }
    });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-2xl font-bold text-nie-navy mb-6">Apply for Incubation</h3>
      <p className="text-slate-600 mb-8">Please fill out the form below to apply for our startup incubation program. Ensure your pitch deck link is accessible.</p>
      
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Startup Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register('startup_name')}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.startup_name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
              placeholder="Your Startup Inc." 
            />
            {errors.startup_name && <p className="text-red-500 text-sm mt-1">{errors.startup_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Founder Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register('founder_name')}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.founder_name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
              placeholder="Jane Doe" 
            />
            {errors.founder_name && <p className="text-red-500 text-sm mt-1">{errors.founder_name.message}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-500">*</span></label>
            <input 
              type="email" 
              {...register('email')}
              className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
              placeholder="founder@startup.com" 
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Startup Stage</label>
            <select 
              {...register('startup_stage')}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none transition-colors bg-white"
            >
              <option value="">Select Stage...</option>
              <option value="Idea">Idea Stage</option>
              <option value="Prototype">Prototype/MVP</option>
              <option value="Early Revenue">Early Revenue</option>
              <option value="Growth">Growth</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Sector</label>
            <input 
              type="text" 
              {...register('sector')}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none transition-colors" 
              placeholder="e.g. EdTech, FinTech, DeepTech" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
          <input 
            type="text" 
            {...register('city')}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none transition-colors" 
            placeholder="e.g. Mysuru, Bengaluru" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pitch Deck URL <span className="text-red-500">*</span></label>
          <input 
            type="url" 
            {...register('pitch_deck_url')}
            className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.pitch_deck_url ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange'}`} 
            placeholder="Google Drive, OneDrive, or Dropbox link" 
          />
          {errors.pitch_deck_url && <p className="text-red-500 text-sm mt-1">{errors.pitch_deck_url.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Message</label>
          <textarea 
            rows={4} 
            {...register('message')}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-nie-orange focus:ring-1 focus:ring-nie-orange outline-none transition-colors resize-none" 
            placeholder="Tell us a bit more about your startup (optional)"
          ></textarea>
        </div>

        <div className="flex items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div className="flex items-center h-5">
            <input 
              id="accessibility" 
              type="checkbox" 
              {...register('link_accessibility_confirmed')}
              className="w-5 h-5 text-nie-orange bg-white border-slate-300 rounded focus:ring-nie-orange focus:ring-2" 
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="accessibility" className="font-medium text-slate-700">I confirm that the pitch deck link provided is accessible to anyone with the link (No login required).</label>
            {errors.link_accessibility_confirmed && <p className="text-red-500 mt-1">{errors.link_accessibility_confirmed.message}</p>}
          </div>
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          className="w-full" 
          disabled={submitApplication.isPending}
          type="submit"
        >
          {submitApplication.isPending ? 'Submitting Application...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  );
};

export default ApplicationForm;
