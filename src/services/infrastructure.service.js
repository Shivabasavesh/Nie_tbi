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

export const getInfrastructure = async () => {
  try {
    const data = await convex.query(api.infrastructure.getAll);
    return data.map(mapConvexToSupabase).sort((a, b) => a.display_order - b.display_order);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch infrastructure');
  }
};

export const createInfrastructure = async (newData) => {
  try {
    const id = await convex.mutation(api.infrastructure.create, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to create infrastructure');
  }
};

export const updateInfrastructure = async ({ id, newData }) => {
  try {
    await convex.mutation(api.infrastructure.update, { id, ...newData });
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to update infrastructure');
  }
};

export const deleteInfrastructure = async (id) => {
  try {
    await convex.mutation(api.infrastructure.remove, { id });
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete infrastructure');
  }
};

export const reorderInfrastructure = async ({ id1, order1, id2, order2 }) => {
  try {
    const p1 = convex.mutation(api.infrastructure.update, { id: id1, display_order: order2 });
    const p2 = convex.mutation(api.infrastructure.update, { id: id2, display_order: order1 });
    await Promise.all([p1, p2]);
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to reorder infrastructure');
  }
};
