import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSupabaseDetail } from '../../hooks/useSupabaseData';
import LoadingSpinner from '../../components/system/LoadingSpinner';
import ErrorState from '../../components/system/ErrorState';
import ImageFallback from '../../components/system/ImageFallback';
import { Button } from '../../components/ui/Button';

const StartupDetail = () => {
  const { slug } = useParams();
  const { data: startup, isLoading, isError, refetch } = useSupabaseDetail('startups', 'slug', slug);

  if (isLoading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;
  if (isError || !startup) return <div className="max-w-4xl mx-auto pt-20 px-6"><ErrorState title="Startup Not Found" onRetry={refetch} /></div>;

  return (
    <div className="bg-bg-light min-h-screen pb-20 pt-10">
      <SEOHead title={startup.name} description={startup.description?.substring(0, 160)} image={startup.logo_url} type="article" />
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-sm opacity-80 mb-8 text-slate-600"><Link to="/" className="hover:underline">Home</Link> &gt; <Link to="/startups" className="hover:underline">Startups</Link> &gt; <span className="text-nie-navy font-medium">{startup.name}</span></div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-48 h-48 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 bg-slate-50">
              <ImageFallback src={startup.logo_url} alt={startup.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{startup.sector}</span>
                {startup.is_graduated && <span className="text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 px-3 py-1 rounded-full">Graduated</span>}
              </div>
              <h1 className="text-4xl font-bold text-nie-navy mb-4">{startup.name}</h1>
              <p className="text-lg text-slate-600 mb-6 font-medium">Founded by: {startup.founder_name || 'N/A'}</p>
              <p className="text-text-body whitespace-pre-wrap leading-relaxed mb-8">{startup.description}</p>
              {startup.website_link && (
                <Button variant="primary" onClick={() => window.open(startup.website_link, '_blank')}>
                  Visit Website
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupDetail;
