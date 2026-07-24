import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { useFileUpload } from '../../hooks/useFileUpload';
import { 
  useInfrastructure, 
  useCreateInfrastructure, 
  useUpdateInfrastructure, 
  useDeleteInfrastructure,
  useReorderInfrastructure
} from '../../hooks/useInfrastructure';
import DataTable from '../../components/ui/DataTable';
import SlideOverDrawer from '../../components/ui/SlideOverDrawer';
import ConfirmationModal from '../../components/system/ConfirmationModal';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const infrastructureSchema = z.object({
  title: z.string().min(1, 'Facility Name is required'),
  description: z.string().min(1, 'Description is required'),
});

const AdminInfrastructure = () => {
  const queryClient = useQueryClient();
  const { uploadFile, isUploading } = useFileUpload();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(infrastructureSchema),
  });

  const { data: infrastructure, isLoading } = useInfrastructure();
  const createMutation = useCreateInfrastructure(closeDrawer);
  const updateMutation = useUpdateInfrastructure(closeDrawer);
  const deleteMutation = useDeleteInfrastructure(() => setDeleteId(null));
  const reorderMutation = useReorderInfrastructure();

  const openDrawer = (item = null) => {
    if (item) {
      setEditingId(item.id);
      reset({
        title: item.title,
        description: item.description,
      });
      setImagePreview(item.image_url || '');
    } else {
      setEditingId(null);
      reset({
        title: '',
        description: '',
      });
      setImagePreview('');
    }
    setSelectedFile(null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingId(null);
    setSelectedFile(null);
    setImagePreview('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    let image_url = imagePreview;

    if (selectedFile) {
      try {
        image_url = await uploadFile(selectedFile, 'infrastructure_images', 5);
      } catch (error) {
        return;
      }
    }

    const payload = {
      ...data,
      image_url,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, newData: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const current = infrastructure[index];
    const prev = infrastructure[index - 1];
    reorderMutation.mutate({
      id1: current.id, order1: current.display_order,
      id2: prev.id, order2: prev.display_order
    });
  };

  const moveDown = (index) => {
    if (index === infrastructure.length - 1) return;
    const current = infrastructure[index];
    const next = infrastructure[index + 1];
    reorderMutation.mutate({
      id1: current.id, order1: current.display_order,
      id2: next.id, order2: next.display_order
    });
  };

  const columns = [
    {
      header: 'Facility',
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-12 w-20 flex-shrink-0">
            {row.image_url ? (
              <img className="h-12 w-20 rounded object-cover" loading="lazy" width="80" height="48" src={row.image_url} alt="" />
            ) : (
              <div className="h-12 w-20 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                IMG
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{row.title}</div>
            <div className="text-gray-500 text-xs line-clamp-1 max-w-xs">{row.description}</div>
          </div>
        </div>
      ),
    },
  ];

  const actions = (row) => {
    if (!infrastructure) return null;
    const index = infrastructure.findIndex(m => m.id === row.id);
    const isFirst = index === 0;
    const isLast = index === infrastructure.length - 1;

    return (
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => moveUp(index)}
          disabled={isFirst || reorderMutation.isPending}
          className={`p-1 ${isFirst ? 'text-gray-300' : 'text-gray-500 hover:text-nie-navy'}`}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
        <button
          onClick={() => moveDown(index)}
          disabled={isLast || reorderMutation.isPending}
          className={`p-1 ${isLast ? 'text-gray-300' : 'text-gray-500 hover:text-nie-navy'}`}
        >
          <ArrowDown className="h-4 w-4" />
        </button>
        <button
          onClick={() => openDrawer(row)}
          className="text-nie-navy hover:text-nie-navy/80 p-1"
        >
          <Edit className="h-5 w-5" />
        </button>
        <button
          onClick={() => setDeleteId(row.id)}
          className="text-red-600 hover:text-red-900 p-1"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Infrastructure</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage infrastructure and facility showcase content.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => openDrawer()} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Facility
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={infrastructure}
        isLoading={isLoading}
        actions={actions}
      />

      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Facility' : 'Add Facility'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Image (Max 5MB)</label>
            <div className="mt-1 flex flex-col space-y-2">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="h-32 w-full object-cover rounded" />
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
            <label className="block text-sm font-medium text-gray-700">Facility Name</label>
            <input
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
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

          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" type="button" onClick={closeDrawer} disabled={isSubmitting || isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading} className="flex items-center">
              {(isSubmitting || isUploading) && <LoadingSpinner className="h-4 w-4 mr-2" />}
              Save
            </Button>
          </div>
        </form>
      </SlideOverDrawer>

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        title="Delete Facility"
        message="Are you sure you want to delete this facility? This action cannot be undone."
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminInfrastructure;
