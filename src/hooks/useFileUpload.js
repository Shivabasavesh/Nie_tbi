import { useState } from 'react';
import { toast } from 'sonner';
import { uploadFileToStorage } from '../services/storage.service';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file, bucket, maxSizeInMB) => {
    if (!file) return null;

    // Validate size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeInMB) {
      toast.error(`File size must be less than ${maxSizeInMB}MB`);
      throw new Error('File too large');
    }

    setIsUploading(true);
    try {
      const publicUrl = await uploadFileToStorage(file, bucket);
      return publicUrl;
    } catch (error) {
      toast.error(error.message || 'Error uploading file');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
};
