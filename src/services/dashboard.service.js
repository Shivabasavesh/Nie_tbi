import { convex } from '../lib/convex';
import { api } from '../../convex/_generated/api';

export const getDashboardStats = async () => {
  try {
    const [startups, events, blogs, docs, applications] = await Promise.all([
      convex.query(api.startups.getAll),
      convex.query(api.events.getAll),
      convex.query(api.blogs.getAll),
      convex.query(api.documents.getAll),
      convex.query(api.applications.getAll),
    ]);

    const pendingApps = applications.filter((app) => app.status === 'Pending');

    return {
      startups: startups.length || 0,
      events: events.length || 0,
      blogs: blogs.length || 0,
      documents: docs.length || 0,
      pendingApplications: pendingApps.length || 0,
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch dashboard stats');
  }
};
