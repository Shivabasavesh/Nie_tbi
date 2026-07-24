import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { 
  useBlogs, 
  useCreateBlog, 
  useUpdateBlog, 
  useDeleteBlog 
} from '../../hooks/useBlogs';
import { useFileUpload } from '../../hooks/useFileUpload';
import DataTable from '../../components/ui/DataTable';
import SlideOverDrawer from '../../components/ui/SlideOverDrawer';
import ConfirmationModal from '../../components/system/ConfirmationModal';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/system/LoadingSpinner';
import MarkdownEditor from '../../components/ui/MarkdownEditor';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  author: z.string().min(1, 'Author is required'),
  content_md: z.string().min(1, 'Content is required'),
  is_featured: z.boolean().default(false),
  status: z.enum(['Draft', 'Published']).default('Draft'),
});

const AdminBlogs = () => {
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
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      is_featured: false,
      status: 'Draft',
    },
  });

  const { data: blogs, isLoading } = useBlogs();
  const createMutation = useCreateBlog(closeDrawer);
  const updateMutation = useUpdateBlog(closeDrawer);
  const deleteMutation = useDeleteBlog(() => setDeleteId(null));

  const openDrawer = (blog = null) => {
    if (blog) {
      setEditingId(blog.id);
      reset({
        title: blog.title,
        slug: blog.slug,
        author: blog.author,
        content_md: blog.content_md,
        is_featured: blog.is_featured,
        status: blog.status,
      });
      setImagePreview(blog.featured_image || '');
    } else {
      setEditingId(null);
      reset({
        title: '',
        slug: '',
        author: '',
        content_md: '',
        is_featured: false,
        status: 'Draft',
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
    let featured_image = imagePreview;

    if (selectedFile) {
      try {
        featured_image = await uploadFile(selectedFile, 'event_banners', 5); // Using event_banners bucket as per PRD for blogs
      } catch (error) {
        return;
      }
    }

    const payload = {
      ...data,
      featured_image,
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
      header: 'Blog',
      cell: (row) => (
        <div className="flex items-center">
          <div className="h-10 w-16 flex-shrink-0">
            {row.featured_image ? (
              <img className="h-10 w-16 rounded object-cover" loading="lazy" width="64" height="40" src={row.featured_image} alt="" />
            ) : (
              <div className="h-10 w-16 rounded bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                IMG
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900 line-clamp-1">{row.title}</div>
            <div className="text-gray-500 text-xs">By {row.author}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            row.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
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
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage announcements, articles, and startup stories.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => openDrawer()} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={blogs}
        isLoading={isLoading}
        actions={actions}
      />

      <SlideOverDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        title={editingId ? 'Edit Blog' : 'Add Blog'}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Featured Image (Max 5MB)</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              {...register('author')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            />
            {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
            <Controller
              name="content_md"
              control={control}
              render={({ field }) => (
                <MarkdownEditor
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.content_md}
                />
              )}
            />
            {errors.content_md && <p className="text-red-500 text-xs mt-1">{errors.content_md.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              {...register('status')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nie-navy focus:ring-nie-navy sm:text-sm p-2 border"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              {...register('is_featured')}
              className="h-4 w-4 text-nie-navy focus:ring-nie-navy border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Featured Blog</label>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <Button variant="ghost" type="button" onClick={closeDrawer} disabled={isSubmitting || isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isUploading} className="flex items-center">
              {(isSubmitting || isUploading) && <LoadingSpinner className="h-4 w-4 mr-2" />}
              Save Blog
            </Button>
          </div>
        </form>
      </SlideOverDrawer>

      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        isDestructive={true}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default AdminBlogs;
