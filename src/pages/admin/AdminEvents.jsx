import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useFileUpload } from '../../hooks/useFileUpload';
import { 
  useEvents, 
  useCreateEvent, 
  useUpdateEvent, 
  useDeleteEvent 
} from '../../hooks/useEvents';
import DataTable from '../../components/ui/DataTable';
import SlideOverDrawer from '../../components/ui/SlideOverDrawer';
import ConfirmationModal from '../../components/system/ConfirmationModal';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  event_start_date: z.string().min(1, 'Start Date is required'),
  event_end_date: z.string().min(1, 'End Date is required'),
  description: z.string().min(1, 'Description is required'),
  registration_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
  status: z.enum(['Upcoming', 'Completed']).default('Upcoming'),
});

const AdminEvents = () => {
  const queryClient = useQueryClient();
  const { uploadFile, isUploading } = useFileUpload();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      is_featured: false,
      status: 'Upcoming',
    },
  });

  const { data: events, isLoading } = useEvents();
  const createMutation = useCreateEvent(closeDrawer);
  const updateMutation = useUpdateEvent(closeDrawer);
  const deleteMutation = useDeleteEvent(() => setDeleteId(null));

  const openDrawer = (event = null) => {
    if (event) {
      setEditingId(event.id);
      reset({
        title: event.title,
        slug: event.slug,
        event_start_date: new Date(event.event_start_date).toISOString().slice(0, 16),
        event_end_date: new Date(event.event_end_date).toISOString().slice(0, 16),
        description: event.description,
        registration_link: event.registration_link || '',
        is_featured: event.is_featured,
        status: event.status,
      });
      setBannerPreview(event.banner_url || '');
    } else {
      setEditingId(null);
      reset({
        title: '',
        slug: '',
        event_start_date: '',
        event_end_date: '',
        description: '',
        registration_link: '',
        is_featured: false,
        status: 'Upcoming',
      });
      setBannerPreview('');
    }
    setSelectedFile(null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingId(null);
    setSelectedFile(null);
    setBannerPreview('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    let banner_url = bannerPreview;

    if (selectedFile) {
      try {
        banner_url = await uploadFile(selectedFile, 'event_banners', 5);
      } catch (error) {
        return;
      }
    }

    const payload = {
      ...data,
      event_start_date: new Date(data.event_start_date).toISOString(),
      event_end_date: new Date(data.event_end_date).toISOString(),
      banner_url,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, newData: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const columns = [
    {
      header: 'Event',
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-16 flex-shrink-0">
            {row.banner_url ? (
              <img className="h-10 w-16 rounded object-cover" src={row.banner_url} alt="" />
            ) : (
              <div className="h-10 w-16 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                IMG
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{row.title}</div>
            <div className="text-gray-500 text-xs">
              {new Date(row.event_start_date).toLocaleDateString()}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            row.status === 'Completed' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: 'Featured',
      cell: (row) => (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            row.is_featured ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.is_featured ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  const actions = (row) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={() => openDrawer(row)}
        className="text-nie-navy hover:text-nie-navy/80"
      >
        <Edit className="h-5 w-5" />
      </button>
      <button
        onClick={() => setDeleteId(row.id)}
        className="text-red-600 hover:text-red-900"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage upcoming and completed events.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => openDrawer()} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={events}
        isLoading={isLoading}
        actions={actions}
      />

      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Event' : 'Add Event'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Banner Image (Max 5MB)</label>
            <div className="mt-1 flex flex-col space-y-2">
              {bannerPreview && (
                <img src={bannerPreview} alt="Preview" className="h-32 w-full object-cover rounded" />
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-nie-navy file:text-white hover:file:bg-nie-navy/90"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              {...register('slug')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="datetime-local"
                {...register('event_start_date')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
              {errors.event_start_date && <p className="text-red-500 text-xs mt-1">{errors.event_start_date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="datetime-local"
                {...register('event_end_date')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
              />
              {errors.event_end_date && <p className="text-red-500 text-xs mt-1">{errors.event_end_date.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Link (Optional)</label>
            <input
              {...register('registration_link')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.registration_link && <p className="text-red-500 text-xs mt-1">{errors.registration_link.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              {...register('is_featured')}
              className="h-4 w-4 text-nie-navy focus:ring-nie-navy border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Featured Event</label>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" type="button" onClick={closeDrawer} disabled={isSubmitting || isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading} className="flex items-center">
              {(isSubmitting || isUploading) && <LoadingSpinner className="h-4 w-4 mr-2" />}
              Save Event
            </Button>
          </div>
        </form>
      </SlideOverDrawer>

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminEvents;
