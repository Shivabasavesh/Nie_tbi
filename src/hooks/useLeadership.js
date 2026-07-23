import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getLeadership, 
  createLeadership, 
  updateLeadership, 
  deleteLeadership,
  reorderLeadership
} from '../services/leadership.service';
import { toast } from 'sonner';

export const useLeadership = () => {
  return useQuery({
    queryKey: ['leadership'],
    queryFn: getLeadership,
  });
};

export const useCreateLeadership = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLeadership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadership'] });
      toast.success('Member added successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add member');
    },
  });
};

export const useUpdateLeadership = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLeadership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadership'] });
      toast.success('Member updated successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update member');
    },
  });
};

export const useDeleteLeadership = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLeadership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadership'] });
      toast.success('Member deleted successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete member');
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};

export const useReorderLeadership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reorderLeadership,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadership'] });
    },
    onError: () => {
      toast.error('Failed to reorder');
    }
  });
};
