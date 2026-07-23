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

export const getBlogs = async () => {
  try {
    const data = await convex.query(api.blogs.getAll);
    return data.map(mapConvexToSupabase).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch blogs');
  }
};

export const getFeaturedBlogs = async () => {
  try {
    const data = await convex.query(api.blogs.getFeatured);
    return data.map(mapConvexToSupabase).slice(0, 3);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch featured blogs');
  }
};

export const getBySlug = async (slug) => {
  try {
    const data = await convex.query(api.blogs.getBySlug, { slug });
    return mapConvexToSupabase(data);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch blog by slug');
  }
};

export const createBlog = async (newData) => {
  try {
    const id = await convex.mutation(api.blogs.create, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to create blog');
  }
};

export const updateBlog = async ({ id, newData }) => {
  try {
    await convex.mutation(api.blogs.update, { id, ...newData });
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to update blog');
  }
};

export const deleteBlog = async (id) => {
  try {
    await convex.mutation(api.blogs.remove, { id });
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete blog');
  }
};
