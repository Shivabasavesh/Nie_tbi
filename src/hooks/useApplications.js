import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getApplications, 
  updateApplication 
} from '../services/applications.service';
import { toast } from 'sonner';

export const useApplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  });
};

export const useUpdateApplication = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast.success('Application updated successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update application');
    },
  });
};
