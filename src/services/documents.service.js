import { convex } from '../lib/convex';
import { api } from '../../convex/_generated/api';

const mapConvexToSupabase = (item) => {
  if (!item) return item;
  const { _id, _creationTime, ...rest } = item;
  return {
    ...rest,
    id: _id,
    created_at: new Date(_creationTime).toISOString(),
  };
};

export const getDocuments = async () => {
  try {
    const data = await convex.query(api.documents.getAll);
    return data.map(mapConvexToSupabase).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch documents');
  }
};

export const createDocument = async (newData) => {
  try {
    const id = await convex.mutation(api.documents.create, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to create document');
  }
};

export const deleteDocument = async (id) => {
  try {
    await convex.mutation(api.documents.remove, { id });
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete document');
  }
};
