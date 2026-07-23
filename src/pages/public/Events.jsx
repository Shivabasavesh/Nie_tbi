import SEOHead from '../../components/system/SEOHead';
import React
, { useState } from 'react';
import PageHero from '../../components/page-structure/PageHero';
import EventCard from '../../components/data-display/EventCard';
import { useSupabaseTable } from '../../hooks/useSupabaseData';
import CardSkeleton from '../../components/system/CardSkeleton';
import EmptyState from '../../components/system/EmptyState';
import ErrorState from '../../components/system/ErrorState';

const Events = () => {
  const [status, setStatus] = useState('Upcoming');

  const { data: events, isLoading, isError, refetch } = useSupabaseTable('events', {
    filter: { status: status },
    order: { column: 'event_start_date', ascending: status === 'Upcoming' }
  });

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="Events & Workshops" description="Join our community for upcoming pitchfests, bootcamps, and networking events." />
      <PageHero title="Events" subtitle="Join our community of innovators, investors, and industry experts" breadcrumb="Home > Events" />
      
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex bg-slate-200 p-1 rounded-md w-max mb-10">
          <button 
            className={`px-6 py-2 text-sm font-bold rounded transition-colors ${status === 'Upcoming' ? 'bg-white text-nie-navy shadow-sm' : 'text-slate-600 hover:text-nie-navy'}`}
            onClick={() => setStatus('Upcoming')}
          >
            Upcoming Events
          </button>
          <button 
            className={`px-6 py-2 text-sm font-bold rounded transition-colors ${status === 'Completed' ? 'bg-white text-nie-navy shadow-sm' : 'text-slate-600 hover:text-nie-navy'}`}
            onClick={() => setStatus('Completed')}
          >
            Completed
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : !events || events.length === 0 ? (
          <EmptyState title={`No ${status.toLowerCase()} events found`} message="Check back later for updates." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map(event => (
              <EventCard key={event.id} title={event.title} date={new Date(event.event_start_date).toLocaleDateString()} banner={event.banner_url} description={event.description} status={event.status} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
