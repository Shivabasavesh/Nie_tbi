import React, { useState } from 'react';
import SEOHead from '../../components/system/SEOHead';
import PageHero from '../../components/page-structure/PageHero';
import NewsCard from '../../components/data-display/NewsCard';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CardSkeleton from '../../components/system/CardSkeleton';
import EmptyState from '../../components/system/EmptyState';
import { Button } from '../../components/ui/Button';

const News = () => {
  const news = useQuery(api.news.listNews);
  const isLoading = news === undefined;
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const totalPages = news ? Math.ceil(news.length / itemsPerPage) : 0;
  const currentNews = news ? news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const formatDate = (ts) => {
    const d = new Date(ts);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="News & Announcements" description="Latest updates and news from NIETBI." />
      <PageHero title="News & Announcements" subtitle="Stay updated with the latest happenings at NIETBI" breadcrumb="Home > News" />
      
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : !news || news.length === 0 ? (
          <EmptyState title="No news found" message="Check back later for updates." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {currentNews.map(item => (
                <NewsCard 
                  key={item._id} 
                  title={item.title} 
                  publishDate={formatDate(item.publishedAt)} 
                  imageUrl={item.imageUrl} 
                  slug={item.slug}
                  tags={item.tags}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <Button variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
                  Previous
                </Button>
                <span className="text-sm font-medium text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button variant="outline" onClick={handleNext} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default News;
