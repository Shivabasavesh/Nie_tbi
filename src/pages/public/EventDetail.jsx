import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSupabaseDetail } from '../../hooks/useSupabaseData';
import LoadingSpinner from '../../components/system/LoadingSpinner';
import ErrorState from '../../components/system/ErrorState';
import ImageFallback from '../../components/system/ImageFallback';
import { Button } from '../../components/ui/Button';

const EventDetail = () => {
  const { slug } = useParams();
  const { data: event, isLoading, isError, refetch } = useSupabaseDetail('events', 'slug', slug);

  if (isLoading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;
  if (isError || !event) return <div className="max-w-4xl mx-auto pt-20 px-6"><ErrorState title="Event Not Found" onRetry={refetch} /></div>;

  return (
    <div className="bg-bg-light min-h-screen pb-20 pt-10">
      <SEOHead title={event.title} description={event.description?.substring(0, 160)} image={event.banner_url} type="event" />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-sm opacity-80 mb-8 text-slate-600"><Link to="/" className="hover:underline">Home</Link> &gt; <Link to="/events" className="hover:underline">Events</Link> &gt; <span className="text-nie-navy font-medium">{event.title}</span></div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="w-full aspect-[21/9] bg-slate-100">
            <ImageFallback src={event.banner_url} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${event.status === 'Upcoming' ? 'bg-nie-orange text-white' : 'bg-slate-200 text-slate-700'}`}>
                {event.status}
              </span>
              <span className="text-nie-navy font-medium">
                {new Date(event.event_start_date).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-nie-navy mb-6">{event.title}</h1>
            <div className="prose prose-slate max-w-none mb-10 whitespace-pre-wrap">
              {event.description}
            </div>
            {event.status === 'Upcoming' && event.registration_link && (
              <Button variant="primary" size="lg" onClick={() => window.open(event.registration_link, '_blank')}>
                Register Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
