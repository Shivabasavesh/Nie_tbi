import SEOHead from '../../components/system/SEOHead';
import React
, { useState } from 'react';
import PageHero from '../../components/page-structure/PageHero';
import DownloadRow from '../../components/data-display/DownloadRow';
import { useSupabaseTable } from '../../hooks/useSupabaseData';
import CardSkeleton from '../../components/system/CardSkeleton';
import EmptyState from '../../components/system/EmptyState';
import ErrorState from '../../components/system/ErrorState';

const Downloads = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const { data: dbDocuments, isLoading, isError, refetch } = useSupabaseTable('documents', {
    filter: { category: category === 'All' ? '' : category },
    search: search,
    searchColumn: 'title',
    order: { column: 'created_at', ascending: false }
  });

  const staticPolicies = [
    { id: 'static-1', title: 'National Innovation and Startup Policy', description: 'Policy guidelines for innovation and startups.', category: 'Policies', file_url: '/assets/documents/NATIONAL INNOVATION AND STARTUP POLICY.pdf' },
    { id: 'static-2', title: 'NIE Innovation and Startup Policy', description: 'Institutional innovation and startup policy.', category: 'Policies', file_url: '/assets/documents/NIE-Innovation and Startup Policy.pdf' },
    { id: 'static-3', title: 'Intellectual Property Policy', description: 'Policy governing intellectual property rights.', category: 'Policies', file_url: '/assets/documents/intellectial property policy.pdf' },
    { id: 'static-4', title: 'NIE Incubation Policy', description: 'Guidelines and policies for incubation.', category: 'Policies', file_url: '/assets/documents/nie-incubation-policy.pdf' }
  ];

  const allDocuments = [
    ...staticPolicies,
    ...(dbDocuments || [])
  ].filter(doc => {
    if (category && category !== 'All' && doc.category !== category) return false;
    if (search && !doc.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="Downloads" description="Access institutional policies, reports, and templates." />
      <PageHero title="Downloads" subtitle="Institutional policies, reports, and startup resources" breadcrumb="Home > Downloads" />
      
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <input 
            type="text" 
            placeholder="Search documents by title..." 
            className="px-4 py-2 border border-slate-200 rounded-md text-sm w-full md:w-2/3 focus:outline-none focus:border-nie-orange"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="px-4 py-2 border border-slate-200 rounded-md text-sm w-full md:w-1/3 bg-white focus:outline-none focus:border-nie-orange"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Policies">Policies</option>
            <option value="Reports">Reports</option>
            <option value="Templates">Templates</option>
            <option value="Forms">Forms</option>
            <option value="Guidelines">Guidelines</option>
          </select>
        </div>

        {isLoading && !dbDocuments ? (
          <div className="space-y-4">
            <CardSkeleton /><CardSkeleton />
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : allDocuments.length === 0 ? (
          <EmptyState title="No documents found" message="Try adjusting your search or category filter." />
        ) : (
          <div className="space-y-4">
            {allDocuments.map(doc => (
              <DownloadRow 
                key={doc.id} 
                title={doc.title} 
                description={doc.description} 
                category={doc.category} 
                fileUrl={doc.file_url} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;
