import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useFileUpload } from '../../hooks/useFileUpload';
import { 
  useStartups, 
  useCreateStartup, 
  useUpdateStartup, 
  useDeleteStartup 
} from '../../hooks/useStartups';
import DataTable from '../../components/ui/DataTable';
import SlideOverDrawer from '../../components/ui/SlideOverDrawer';
import ConfirmationModal from '../../components/system/ConfirmationModal';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const startupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  founder_name: z.string().min(1, 'Founder Name is required'),
  sector: z.string().min(1, 'Sector is required'),
  description: z.string().min(1, 'Description is required'),
  website_link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  is_graduated: z.boolean().default(false),
  is_featured: z.boolean().default(false),
});

const AdminStartups = () => {
  const queryClient = useQueryClient();
  const { uploadFile, isUploading } = useFileUpload();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      is_graduated: false,
      is_featured: false,
    },
  });

  const { data: startups, isLoading } = useStartups();
  const createMutation = useCreateStartup(closeDrawer);
  const updateMutation = useUpdateStartup(closeDrawer);
  const deleteMutation = useDeleteStartup(() => setDeleteId(null));

  const openDrawer = (startup = null) => {
    if (startup) {
      setEditingId(startup.id);
      reset({
        name: startup.name,
        slug: startup.slug,
        founder_name: startup.founder_name,
        sector: startup.sector,
        description: startup.description,
        website_link: startup.website_link || '',
        is_graduated: startup.is_graduated,
        is_featured: startup.is_featured,
      });
      setLogoPreview(startup.logo_url || '');
    } else {
      setEditingId(null);
      reset({
        name: '',
        slug: '',
        founder_name: '',
        sector: '',
        description: '',
        website_link: '',
        is_graduated: false,
        is_featured: false,
      });
      setLogoPreview('');
    }
    setSelectedFile(null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingId(null);
    setSelectedFile(null);
    setLogoPreview('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    let logo_url = logoPreview;

    if (selectedFile) {
      try {
        logo_url = await uploadFile(selectedFile, 'startup_logos', 2);
      } catch (error) {
        return; // Error is handled by the hook
      }
    }

    const payload = {
      ...data,
      logo_url,
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
      header: 'Startup',
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {row.logo_url ? (
              <img className="h-10 w-10 rounded-full object-cover" src={row.logo_url} alt="" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {row.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-gray-500">{row.sector}</div>
          </div>
        </div>
      ),
    },
    { header: 'Founder', accessorKey: 'founder_name' },
    {
      header: 'Status',
      cell: (row) => (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            row.is_graduated ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}
        >
          {row.is_graduated ? 'Graduated' : 'Incubated'}
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
          <h1 className="text-2xl font-bold text-gray-900">Startups</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage incubated and graduated startups.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => openDrawer()} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Startup
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={startups}
        isLoading={isLoading}
        actions={actions}
      />

      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Startup' : 'Add Startup'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo (Max 2MB)</label>
            <div className="mt-1 flex items-center space-x-4">
              {logoPreview && (
                <img src={logoPreview} alt="Preview" className="h-12 w-12 rounded-full object-cover" />
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-nie-navy file:text-white hover:file:bg-nie-navy/90"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              {...register('slug')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Founder Name</label>
            <input
              {...register('founder_name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.founder_name && <p className="text-red-500 text-xs mt-1">{errors.founder_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sector</label>
            <input
              {...register('sector')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.sector && <p className="text-red-500 text-xs mt-1">{errors.sector.message}</p>}
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
            <label className="block text-sm font-medium text-gray-700">Website Link (Optional)</label>
            <input
              {...register('website_link')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.website_link && <p className="text-red-500 text-xs mt-1">{errors.website_link.message}</p>}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('is_graduated')}
                className="h-4 w-4 text-nie-navy focus:ring-nie-navy border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Graduated</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('is_featured')}
                className="h-4 w-4 text-nie-navy focus:ring-nie-navy border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Featured</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" type="button" onClick={closeDrawer} disabled={isSubmitting || isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading} className="flex items-center">
              {(isSubmitting || isUploading) && <LoadingSpinner className="h-4 w-4 mr-2" />}
              Save Startup
            </Button>
          </div>
        </form>
      </SlideOverDrawer>

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        title="Delete Startup"
        message="Are you sure you want to delete this startup? This action cannot be undone."
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminStartups;
