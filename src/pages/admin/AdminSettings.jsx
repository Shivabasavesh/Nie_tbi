import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSettings, useUpdateSettings } from '../../hooks/useSettings';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const AdminSettings = () => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm();

  const { data: settings, isLoading } = useSettings(reset);
  const updateMutation = useUpdateSettings();

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <LoadingSpinner className="h-8 w-8 text-nie-orange" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage general website configuration and contact information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Global Settings</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Site Name</label>
              <input
                {...register('site_name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Application Status</label>
              <select
                {...register('application_status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Information</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                {...register('phone')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile</label>
              <input
                {...register('mobile')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Working Hours</label>
              <input
                {...register('working_hours')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
                placeholder="e.g. Mon-Fri, 9:00 AM - 5:00 PM"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Physical Address</label>
              <textarea
                {...register('address')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg p-6 space-y-6">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Social & External Links</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Google Maps Embed URL</label>
              <input
                {...register('google_map_url')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
              <input
                {...register('linkedin_url')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Twitter (X) URL</label>
              <input
                {...register('twitter_url')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
              <input
                {...register('instagram_url')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube URL</label>
              <input
                {...register('youtube_url')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting || !isDirty} 
            className="flex items-center"
          >
            {isSubmitting && <LoadingSpinner className="h-4 w-4 mr-2" />}
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
