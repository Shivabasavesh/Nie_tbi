import SEOHead from '../../components/system/SEOHead';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../../components/page-structure/PageHero';
import StartupCard from '../../components/data-display/StartupCard';
import { useSupabaseTable } from '../../hooks/useSupabaseData';
import CardSkeleton from '../../components/system/CardSkeleton';
import EmptyState from '../../components/system/EmptyState';
import ErrorState from '../../components/system/ErrorState';
import { Button } from '../../components/ui/Button';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Startups = () => {
  const [isGraduated, setIsGraduated] = useState(false);
  const [search, setSearch] = useState('');
  const [sector, setSector] = useState('');

  const { data: startups, isLoading, isError, refetch } = useSupabaseTable('startups', {
    filter: { is_graduated: isGraduated, sector: sector === 'All' ? '' : sector },
    search: search,
    searchColumn: 'name',
    order: { column: 'created_at', ascending: false }
  });

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="Startups Portfolio" description="Discover the active and graduated startups supported by NIETBI." />
      <PageHero title="Startups" subtitle="Discover the innovative companies building the future at NIETBI" breadcrumb="Home > Startups" />
      
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex bg-slate-100 p-1 rounded-md">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded ${!isGraduated ? 'bg-white text-nie-navy shadow-sm' : 'text-slate-500'}`}
              onClick={() => setIsGraduated(false)}
            >
              Active Startups
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded ${isGraduated ? 'bg-white text-nie-navy shadow-sm' : 'text-slate-500'}`}
              onClick={() => setIsGraduated(true)}
            >
              Graduated
            </button>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Search by name..." 
              className="px-4 py-2 border border-slate-200 rounded-md text-sm w-full md:w-64 focus:outline-none focus:border-nie-orange"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select 
              className="px-4 py-2 border border-slate-200 rounded-md text-sm bg-white focus:outline-none focus:border-nie-orange"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            >
              <option value="All">All Sectors</option>
              <option value="Agritech">Agritech</option>
              <option value="DeepTech">DeepTech</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Sustainability">Sustainability</option>
              <option value="AI & Digital">AI & Digital</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : !startups || startups.length === 0 ? (
          <EmptyState title="No startups found" message="Try adjusting your search or filter criteria." />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {startups.map(startup => (
              <motion.div key={startup.id} variants={staggerItem}>
                <StartupCard 
                  name={startup.name}
                  logo={startup.logo_url}
                  sector={startup.sector}
                  description={startup.description}
                  websiteLink={startup.website_link}
                  featured={startup.is_featured}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Startups;
