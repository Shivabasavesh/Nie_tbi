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

export const getLeadership = async () => {
  try {
    const data = await convex.query(api.leadership.getAll);
    // Mimicking Supabase order: by category, then by display_order ascending
    return data.map(mapConvexToSupabase).sort((a, b) => {
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;
      return a.display_order - b.display_order;
    });
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch leadership');
  }
};

export const createLeadership = async (newData) => {
  try {
    const id = await convex.mutation(api.leadership.create, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to create leadership');
  }
};

export const updateLeadership = async ({ id, newData }) => {
  try {
    await convex.mutation(api.leadership.update, { id, ...newData });
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to update leadership');
  }
};

export const deleteLeadership = async (id) => {
  try {
    await convex.mutation(api.leadership.remove, { id });
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete leadership');
  }
};

export const reorderLeadership = async ({ id1, order1, id2, order2 }) => {
  try {
    const p1 = convex.mutation(api.leadership.update, { id: id1, display_order: order2 });
    const p2 = convex.mutation(api.leadership.update, { id: id2, display_order: order1 });
    await Promise.all([p1, p2]);
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to reorder leadership');
  }
};
