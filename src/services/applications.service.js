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

export const getApplications = async () => {
  try {
    const data = await convex.query(api.applications.getAll);
    return data.map(mapConvexToSupabase).sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at));
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch applications');
  }
};

export const updateApplication = async ({ id, status, admin_notes }) => {
  try {
    await convex.mutation(api.applications.update, { id, status, admin_notes });
    return { id, status, admin_notes }; // Note: In a real app we might refetch or return the whole object, but maintaining the minimum needed to not crash frontend
  } catch (error) {
    throw new Error(error.message || 'Failed to update application');
  }
};

export const createApplication = async (data) => {
  try {
    const newData = {
      startup_name: data.startup_name,
      founder_name: data.founder_name,
      email: data.email,
      phone: data.phone,
      startup_stage: data.startup_stage || "",
      sector: data.sector || "",
      city: data.city || "",
      message: data.message || "",
      pitch_deck_url: data.pitch_deck_url,
      link_accessibility_confirmed: data.link_accessibility_confirmed,
      status: 'Pending',
      submitted_at: new Date().toISOString()
    };
    
    const id = await convex.mutation(api.applications.create, newData);
    return { id, ...newData };
  } catch (error) {
    throw new Error(error.message || 'Failed to submit application');
  }
};
