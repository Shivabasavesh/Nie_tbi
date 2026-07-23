import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getStartups, 
  getFeaturedStartups, 
  createStartup, 
  updateStartup, 
  deleteStartup 
} from '../services/startups.service';
import { toast } from 'sonner';

export const useStartups = () => {
  return useQuery({
    queryKey: ['startups'],
    queryFn: getStartups,
  });
};

export const useFeaturedStartups = () => {
  return useQuery({
    queryKey: ['startups', 'featured'],
    queryFn: getFeaturedStartups,
  });
};

export const useCreateStartup = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStartup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      toast.success('Startup added successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add startup');
    },
  });
};

export const useUpdateStartup = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStartup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      toast.success('Startup updated successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update startup');
    },
  });
};

export const useDeleteStartup = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStartup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      toast.success('Startup deleted successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete startup');
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};
