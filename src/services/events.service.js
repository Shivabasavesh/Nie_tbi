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

export const getEvents = async () => {
  try {
    const data = await convex.query(api.events.getAll);
    return data.map(mapConvexToSupabase).sort((a, b) => new Date(b.event_start_date) - new Date(a.event_start_date));
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch events');
  }
};

export const getUpcomingEvents = async () => {
  try {
    const data = await convex.query(api.events.getUpcoming);
    return data.map(mapConvexToSupabase)
      .sort((a, b) => new Date(a.event_start_date) - new Date(b.event_start_date))
      .slice(0, 3);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch upcoming events');
  }
};

export const getBySlug = async (slug) => {
  try {
    const data = await convex.query(api.events.getBySlug, { slug });
    return mapConvexToSupabase(data);
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch event by slug');
  }
};

export const createEvent = async (newData) => {
  try {
    const id = await convex.mutation(api.events.create, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to create event');
  }
};

export const updateEvent = async ({ id, newData }) => {
  try {
    await convex.mutation(api.events.update, { id, ...newData });
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to update event');
  }
};

export const deleteEvent = async (id) => {
  try {
    await convex.mutation(api.events.remove, { id });
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to delete event');
  }
};
