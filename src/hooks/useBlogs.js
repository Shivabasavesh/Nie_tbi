import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from '../services/blogs.service';
import { toast } from 'sonner';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });
};

export const useCreateBlog = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog added successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add blog');
    },
  });
};

export const useUpdateBlog = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog updated successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update blog');
    },
  });
};

export const useDeleteBlog = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog deleted successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete blog');
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};
