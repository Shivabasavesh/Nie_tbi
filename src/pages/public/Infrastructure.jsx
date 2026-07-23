import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import PageHero from '../../components/page-structure/PageHero';
import InfrastructureCard from '../../components/data-display/InfrastructureCard';
import { useSupabaseTable } from '../../hooks/useSupabaseData';
import CardSkeleton from '../../components/system/CardSkeleton';
import EmptyState from '../../components/system/EmptyState';
import ErrorState from '../../components/system/ErrorState';

const Infrastructure = () => {
  const { data, isLoading, isError, refetch } = useSupabaseTable('infrastructure', {
    order: { column: 'display_order', ascending: true }
  });

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="Infrastructure" description="World-class facilities including IDEA Lab and co-working spaces." />
      <PageHero title="Infrastructure" subtitle="World-class facilities designed for rapid prototyping and scaling" breadcrumb="Home > Infrastructure" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : !data || data.length === 0 ? (
          <EmptyState title="No infrastructure details found" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.map(facility => (
              <InfrastructureCard 
                key={facility.id} 
                title={facility.title} 
                description={facility.description} 
                image={facility.image_url} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Infrastructure;
