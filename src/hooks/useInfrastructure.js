import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getInfrastructure, 
  createInfrastructure, 
  updateInfrastructure, 
  deleteInfrastructure,
  reorderInfrastructure
} from '../services/infrastructure.service';
import { toast } from 'sonner';

export const useInfrastructure = () => {
  return useQuery({
    queryKey: ['infrastructure'],
    queryFn: getInfrastructure,
  });
};

export const useCreateInfrastructure = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInfrastructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infrastructure'] });
      toast.success('Facility added successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add facility');
    },
  });
};

export const useUpdateInfrastructure = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateInfrastructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infrastructure'] });
      toast.success('Facility updated successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update facility');
    },
  });
};

export const useDeleteInfrastructure = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInfrastructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infrastructure'] });
      toast.success('Facility deleted successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete facility');
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};

export const useReorderInfrastructure = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderInfrastructure,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['infrastructure'] });
    },
    onError: () => {
      toast.error('Failed to reorder');
    }
  });
};
