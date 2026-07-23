import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useLeadership, 
  useCreateLeadership, 
  useUpdateLeadership, 
  useDeleteLeadership,
  useReorderLeadership
} from '../../hooks/useLeadership';
import { useFileUpload } from '../../hooks/useFileUpload';
import DataTable from '../../components/ui/DataTable';
import SlideOverDrawer from '../../components/ui/SlideOverDrawer';
import ConfirmationModal from '../../components/system/ConfirmationModal';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const leadershipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  bio: z.string().min(1, 'Bio is required'),
  category: z.enum(['CEO', 'Faculty', 'Advisor', 'Mentor']),
});

const AdminLeadership = () => {
  const queryClient = useQueryClient();
  const { uploadFile, isUploading } = useFileUpload();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(leadershipSchema),
    defaultValues: {
      category: 'Faculty',
    },
  });

  const { data: leadershipMembers, isLoading } = useLeadership();
  const createMutation = useCreateLeadership(closeDrawer);
  const updateMutation = useUpdateLeadership(closeDrawer);
  const deleteMutation = useDeleteLeadership(() => setDeleteId(null));
  const reorderMutation = useReorderLeadership();

  const openDrawer = (member = null) => {
    if (member) {
      setEditingId(member.id);
      reset({
        name: member.name,
        designation: member.designation,
        bio: member.bio,
        category: member.category,
      });
      setPhotoPreview(member.photo_url || '');
    } else {
      setEditingId(null);
      reset({
        name: '',
        designation: '',
        bio: '',
        category: 'Faculty',
      });
      setPhotoPreview('');
    }
    setSelectedFile(null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingId(null);
    setSelectedFile(null);
    setPhotoPreview('');
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    let photo_url = photoPreview;

    if (selectedFile) {
      try {
        photo_url = await uploadFile(selectedFile, 'leadership_photos', 2);
      } catch (error) {
        return;
      }
    }

    const payload = {
      ...data,
      photo_url,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, newData: payload });
    } else {
      const categoryMembers = leadershipMembers?.filter(m => m.category === payload.category) || [];
      const maxOrder = categoryMembers.reduce((max, m) => Math.max(max, m.display_order || 0), 0);
      payload.display_order = maxOrder + 1;
      createMutation.mutate(payload);
    }
  };

  const moveUp = (index, filteredMembers) => {
    if (index === 0) return;
    const current = filteredMembers[index];
    const prev = filteredMembers[index - 1];
    reorderMutation.mutate({
      id1: current.id, order1: current.display_order,
      id2: prev.id, order2: prev.display_order
    });
  };

  const moveDown = (index, filteredMembers) => {
    if (index === filteredMembers.length - 1) return;
    const current = filteredMembers[index];
    const next = filteredMembers[index + 1];
    reorderMutation.mutate({
      id1: current.id, order1: current.display_order,
      id2: next.id, order2: next.display_order
    });
  };

  const filteredMembers = React.useMemo(() => {
    if (!leadershipMembers) return [];
    if (activeCategoryFilter === 'All') return leadershipMembers;
    return leadershipMembers.filter(m => m.category === activeCategoryFilter);
  }, [leadershipMembers, activeCategoryFilter]);

  const columns = [
    {
      header: 'Member',
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {row.photo_url ? (
              <img className="h-10 w-10 rounded-full object-cover" src={row.photo_url} alt="" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {row.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{row.name}</div>
            <div className="text-gray-500 text-xs">{row.designation}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessorKey: 'category',
      cell: (row) => (
        <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-blue-100 text-blue-800">
          {row.category}
        </span>
      ),
    },
  ];

  const actions = (row) => {
    const index = filteredMembers.findIndex(m => m.id === row.id);
    const isFirst = index === 0;
    const isLast = index === filteredMembers.length - 1;
    // Only allow reordering if filtering by specific category
    const canReorder = activeCategoryFilter !== 'All';

    return (
      <div className="flex justify-end space-x-2">
        {canReorder && (
          <>
            <button
              onClick={() => moveUp(index, filteredMembers)}
              disabled={isFirst || reorderMutation.isPending}
              className={`p-1 ${isFirst ? 'text-gray-300' : 'text-gray-500 hover:text-nie-navy'}`}
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => moveDown(index, filteredMembers)}
              disabled={isLast || reorderMutation.isPending}
              className={`p-1 ${isLast ? 'text-gray-300' : 'text-gray-500 hover:text-nie-navy'}`}
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </>
        )}
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
          <h1 className="text-2xl font-bold text-gray-900">Leadership</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage CEO, faculty, advisors, and mentors.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => openDrawer()} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        {['All', 'CEO', 'Faculty', 'Advisor', 'Mentor'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategoryFilter(cat)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeCategoryFilter === cat ? 'bg-nie-navy text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredMembers}
        isLoading={isLoading}
        actions={actions}
      />

      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Member' : 'Add Member'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo (Max 2MB)</label>
            <div className="mt-1 flex items-center space-x-4">
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="h-12 w-12 rounded-full object-cover" />
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
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
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              {...register('designation')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            >
              <option value="CEO">CEO</option>
              <option value="Faculty">Faculty</option>
              <option value="Advisor">Advisor</option>
              <option value="Mentor">Mentor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              {...register('bio')}
              rows={5}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
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
        title="Delete Member"
        message="Are you sure you want to delete this leadership member? This action cannot be undone."
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminLeadership;
