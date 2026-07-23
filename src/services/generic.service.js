import { getStartups, getBySlug as getStartupBySlug } from './startups.service';
import { getEvents, getBySlug as getEventBySlug } from './events.service';
import { getBlogs, getBySlug as getBlogBySlug } from './blogs.service';
import { getLeadership } from './leadership.service';
import { getInfrastructure } from './infrastructure.service';
import { getDocuments } from './documents.service';

const getTableService = (tableName) => {
  switch (tableName) {
    case 'startups': return getStartups;
    case 'events': return getEvents;
    case 'blogs': return getBlogs;
    case 'leadership': return getLeadership;
    case 'infrastructure': return getInfrastructure;
    case 'documents': return getDocuments;
    default: throw new Error(`Unknown table: ${tableName}`);
  }
};

export const fetchTableData = async (tableName, queryOptions = {}, customQuery = null) => {
  const serviceFetch = getTableService(tableName);
  let data = await serviceFetch();
  
  if (customQuery) {
    // If it's a supabase-specific query, we might break, but UI usually passes queryOptions
    // For now we will return all data and let UI handle, or throw a warning
    console.warn("customQuery is not supported in Convex migration yet for", tableName);
  } else {
    if (queryOptions.filter) {
      Object.entries(queryOptions.filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          data = data.filter(item => item[key] === value);
        }
      });
    }
    if (queryOptions.search && queryOptions.searchColumn) {
      const term = queryOptions.search.toLowerCase();
      data = data.filter(item => {
        const val = item[queryOptions.searchColumn];
        return val && typeof val === 'string' && val.toLowerCase().includes(term);
      });
    }
    if (queryOptions.order) {
      data = data.sort((a, b) => {
        let valA = a[queryOptions.order.column];
        let valB = b[queryOptions.order.column];
        
        if (valA < valB) return queryOptions.order.ascending ? -1 : 1;
        if (valA > valB) return queryOptions.order.ascending ? 1 : -1;
        return 0;
      });
    }
    if (queryOptions.limit) {
      data = data.slice(0, queryOptions.limit);
    }
  }
  
  return data;
};

export const fetchDetailData = async (tableName, slugColumn, slugValue) => {
  if (!slugValue) return null;
  
  if (slugColumn === 'slug') {
    switch (tableName) {
      case 'startups': return await getStartupBySlug(slugValue);
      case 'events': return await getEventBySlug(slugValue);
      case 'blogs': return await getBlogBySlug(slugValue);
    }
  }
  
  // Fallback if not using a mapped slug method
  const serviceFetch = getTableService(tableName);
  const data = await serviceFetch();
  const match = data.find(item => item[slugColumn] === slugValue);
  if (!match) throw new Error("Not found");
  return match;
};
