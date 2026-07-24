import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import SEOHead from '../../components/system/SEOHead';
import LoadingSpinner from '../../components/system/LoadingSpinner';
import ErrorState from '../../components/system/ErrorState';
import ImageFallback from '../../components/system/ImageFallback';

const NewsDetail = () => {
  const { slug } = useParams();
  const newsItem = useQuery(api.news.getNewsBySlug, { slug });
  
  const isLoading = newsItem === undefined;

  if (isLoading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;
  if (!newsItem) return <div className="max-w-3xl mx-auto pt-20 px-6"><ErrorState title="Article Not Found" /></div>;

  const formatDate = (ts) => {
    const d = new Date(ts);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${d.getDate().toString().padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="bg-white min-h-screen pb-20 pt-10">
      <SEOHead title={newsItem.title} description={newsItem.body?.substring(0, 160)} image={newsItem.imageUrl} type="article" />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-sm opacity-80 mb-8 text-slate-600">
          <Link to="/" className="hover:underline">Home</Link> &gt; <Link to="/news" className="hover:underline">News</Link> &gt; <span className="text-nie-navy font-medium">{newsItem.title}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-nie-navy mb-6 leading-tight">{newsItem.title}</h1>
        
        <div className="flex items-center gap-4 text-slate-500 mb-10 py-4 border-y border-slate-100">
          <div>{formatDate(newsItem.publishedAt)}</div>
          {newsItem.tags && newsItem.tags.length > 0 && (
            <>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex gap-2">
                {newsItem.tags.map((t, i) => (
                  <span key={i} className="text-nie-orange font-medium text-sm">{t}</span>
                ))}
              </div>
            </>
          )}
        </div>
        
        {newsItem.imageUrl && (
          <div className="w-full aspect-[16/9] bg-slate-100 rounded-xl overflow-hidden mb-12 shadow-sm">
            <ImageFallback src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="prose prose-lg prose-slate prose-headings:text-nie-navy prose-a:text-nie-orange hover:prose-a:text-orange-600 max-w-none whitespace-pre-wrap">
          {newsItem.body}
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link to="/news" className="text-nie-orange font-semibold hover:underline inline-flex items-center gap-2">
            &larr; Back to News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
