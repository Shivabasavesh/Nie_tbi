import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getDocuments, 
  createDocument, 
  deleteDocument 
} from '../services/documents.service';
import { toast } from 'sonner';

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  });
};

export const useCreateDocument = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document uploaded successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to upload document');
    },
  });
};

export const useDeleteDocument = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Document deleted successfully');
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete document');
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};
