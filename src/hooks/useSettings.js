import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getSettings, 
  updateSettings 
} from '../services/settings.service';
import { toast } from 'sonner';

export const useSettings = (onSuccessCallback) => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const data = await getSettings();
      if (onSuccessCallback) onSuccessCallback(data);
      return data;
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update settings');
    },
  });
};
