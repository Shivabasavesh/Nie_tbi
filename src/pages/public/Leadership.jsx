import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import PageHero from '../../components/page-structure/PageHero';
import SectionHeader from '../../components/page-structure/SectionHeader';
import LeadershipCard from '../../components/data-display/LeadershipCard';
import { useSupabaseTable } from '../../hooks/useSupabaseData';
import CardSkeleton from '../../components/system/CardSkeleton';
import EmptyState from '../../components/system/EmptyState';
import ErrorState from '../../components/system/ErrorState';

const LeadershipSection = ({ title, category, data }) => {
  const filteredData = data?.filter(item => item.category === category) || [];
  
  if (filteredData.length === 0) return null;
  
  return (
    <div className="mb-20">
      <SEOHead title="Leadership" description="Meet the visionaries, faculty mentors, and advisors guiding our startups." />
      <SectionHeader title={title} align="center" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {filteredData.map(person => (
          <LeadershipCard 
            key={person.id} 
            name={person.name} 
            designation={person.designation} 
            bio={person.bio} 
            photoUrl={person.photo_url} 
          />
        ))}
      </div>
    </div>
  );
};

const Leadership = () => {
  const { data, isLoading, isError, refetch } = useSupabaseTable('leadership', {
    order: { column: 'display_order', ascending: true }
  });

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <PageHero title="Leadership & Management" subtitle="Meet the visionaries guiding the next generation of entrepreneurs" breadcrumb="Home > Leadership" />
      
      <div className="max-w-7xl mx-auto px-6 pt-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : !data || data.length === 0 ? (
          <EmptyState title="No leadership profiles found" />
        ) : (
          <>
            <LeadershipSection title="Executive Leadership" category="CEO" data={data} />
            <LeadershipSection title="Faculty Mentors" category="Faculty" data={data} />
            <LeadershipSection title="Advisory Board" category="Advisor" data={data} />
            <LeadershipSection title="Industry Mentors" category="Mentor" data={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default Leadership;
