import { useQuery } from '@tanstack/react-query';
import { fetchTableData, fetchDetailData } from '../services/generic.service';

// Generic fetcher
export const useSupabaseTable = (tableName, queryOptions = {}, customQuery = null) => {
  return useQuery({
    queryKey: [tableName, queryOptions],
    queryFn: async () => await fetchTableData(tableName, queryOptions, customQuery),
    retry: 1, // Don't retry too much if no db exists
  });
};

export const useSupabaseDetail = (tableName, slugColumn, slugValue) => {
  return useQuery({
    queryKey: [tableName, 'detail', slugValue],
    queryFn: async () => await fetchDetailData(tableName, slugColumn, slugValue),
    enabled: !!slugValue,
    retry: 1,
  });
};
