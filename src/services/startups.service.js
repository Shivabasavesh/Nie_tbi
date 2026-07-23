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

export const getStartups = async () => {
  try {
    const data = await convex.query(api.startups.getAll);
    return data.map(mapConvexToSupabase).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch startups');
  }
};

export const getFeaturedStartups = async () => {
  try {
    const data = await convex.query(api.startups.getFeatured);
    return data.map(mapConvexToSupabase).slice(0, 3);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch featured startups');
  }
};

export const getBySlug = async (slug) => {
  try {
    const data = await convex.query(api.startups.getBySlug, { slug });
    return mapConvexToSupabase(data);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch startup by slug');
  }
};

export const createStartup = async (newData) => {
  try {
    const id = await convex.mutation(api.startups.create, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to create startup');
  }
};

export const updateStartup = async ({ id, newData }) => {
  try {
    await convex.mutation(api.startups.update, { id, ...newData });
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to update startup');
  }
};

export const deleteStartup = async (id) => {
  try {
    await convex.mutation(api.startups.remove, { id });
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete startup');
  }
};
