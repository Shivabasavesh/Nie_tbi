import { convex } from '../lib/convex';
import { api } from '../../convex/_generated/api';

const mapConvexToSupabase = (item) => {
  if (!item) return item;
  const { _id, _creationTime, ...rest } = item;
  return {
    ...rest,
    id: _id,
    created_at: new Date(_creationTime).toISOString(),
    updated_at: new Date(_creationTime).toISOString(),
  };
};

export const getSettings = async () => {
  try {
    const [siteRes, contactRes] = await Promise.all([
      convex.query(api.settings.getSiteSettings),
      convex.query(api.settings.getContactSettings)
    ]);
  
    return {
      ...(mapConvexToSupabase(siteRes) || {}),
      ...(mapConvexToSupabase(contactRes) || {})
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch settings');
  }
};

export const updateSettings = async (data) => {
  try {
    const sitePayload = {
      site_name: data.site_name,
      application_status: data.application_status,
    };
  
    const contactPayload = {
      address: data.address,
      phone: data.phone,
      mobile: data.mobile,
      email: data.email,
      working_hours: data.working_hours,
      google_map_url: data.google_map_url,
      linkedin_url: data.linkedin_url,
      twitter_url: data.twitter_url,
      instagram_url: data.instagram_url,
      youtube_url: data.youtube_url,
    };
  
    const [siteObj, contactObj] = await Promise.all([
      convex.query(api.settings.getSiteSettings),
      convex.query(api.settings.getContactSettings)
    ]);
  
    const promises = [];

    if (siteObj && siteObj._id) {
      promises.push(convex.mutation(api.settings.updateSiteSettings, { id: siteObj._id, ...sitePayload }));
    }
  
    if (contactObj && contactObj._id) {
      promises.push(convex.mutation(api.settings.updateContactSettings, { id: contactObj._id, ...contactPayload }));
    }
    
    await Promise.all(promises);
    
    return true;
  } catch (error) {
    throw new Error(error.message || 'Failed to update settings');
  }
};
