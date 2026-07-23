import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trash2, Plus, Download } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useDocuments, 
  useCreateDocument, 
  useDeleteDocument 
} from '../../hooks/useDocuments';
import { useFileUpload } from '../../hooks/useFileUpload';
import DataTable from '../../components/ui/DataTable';
import SlideOverDrawer from '../../components/ui/SlideOverDrawer';
import ConfirmationModal from '../../components/system/ConfirmationModal';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';

const documentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum(['Policies', 'Reports', 'Templates', 'Forms', 'Guidelines']),
});

const AdminDocuments = () => {
  const queryClient = useQueryClient();
  const { uploadFile, isUploading } = useFileUpload();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      category: 'Policies',
    },
  });

  const { data: documents, isLoading } = useDocuments();
  const createMutation = useCreateDocument(closeDrawer);
  const deleteMutation = useDeleteDocument(() => setDeleteId(null));

  const openDrawer = () => {
    reset({
      title: '',
      description: '',
      category: 'Policies',
    });
    setSelectedFile(null);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/pdf') {
        toast.error('Only PDF files are allowed');
        e.target.value = '';
        return;
      }
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data) => {
    if (!selectedFile) {
      toast.error('Please select a PDF file to upload');
      return;
    }

    try {
      const file_url = await uploadFile(selectedFile, 'policy_documents', 10);
      
      const payload = {
        ...data,
        file_url,
        updated_at: new Date().toISOString(),
      };

      createMutation.mutate(payload);
    } catch (error) {
      // Error handled by hook
    }
  };

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.title}</div>
          {row.description && <div className="text-gray-500 text-xs mt-1">{row.description}</div>}
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
    {
      header: 'File',
      cell: (row) => (
        <a 
          href={row.file_url} 
          target="_blank" 
          rel="noreferrer"
          className="text-nie-navy hover:text-nie-orange flex items-center text-sm font-medium"
        >
          <Download className="h-4 w-4 mr-1" /> View PDF
        </a>
      ),
    },
  ];

  const actions = (row) => (
    <div className="flex justify-end space-x-2">
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
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage downloadable institutional documents.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={openDrawer} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={documents}
        isLoading={isLoading}
        actions={actions}
      />

      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title="Upload Document"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              {...register('category')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            >
              <option value="Policies">Policies</option>
              <option value="Reports">Reports</option>
              <option value="Templates">Templates</option>
              <option value="Forms">Forms</option>
              <option value="Guidelines">Guidelines</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">PDF File (Max 10MB)</label>
            <div className="mt-1">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-nie-navy file:text-white hover:file:bg-nie-navy/90 border p-2 rounded-md border-gray-300"
              />
            </div>
            {selectedFile && <p className="text-sm text-gray-500 mt-2">Selected: {selectedFile.name}</p>}
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" type="button" onClick={closeDrawer} disabled={isSubmitting || isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading || !selectedFile} className="flex items-center">
              {(isSubmitting || isUploading) && <LoadingSpinner className="h-4 w-4 mr-2" />}
              Upload
            </Button>
          </div>
        </form>
      </SlideOverDrawer>

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminDocuments;
