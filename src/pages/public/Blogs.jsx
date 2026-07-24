import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import PageHero from '../../components/page-structure/PageHero';
import BlogCard from '../../components/data-display/BlogCard';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CardSkeleton from '../../components/system/CardSkeleton';
import EmptyState from '../../components/system/EmptyState';
import ErrorState from '../../components/system/ErrorState';

const Blogs = () => {
  const blogs = useQuery(api.posts.listPosts);
  const isLoading = blogs === undefined;
  const isError = false; // useQuery handles error inherently unless wrapped in ErrorBoundary

  return (
    <div className="bg-bg-light min-h-screen pb-20">
      <SEOHead title="News & Insights" description="Read the latest stories, announcements, and articles from our ecosystem." />
      <PageHero title="News & Insights" subtitle="Stories, announcements, and articles from the NIETBI community" breadcrumb="Home > Blogs" />
      
      <div className="max-w-7xl mx-auto px-6 pt-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardSkeleton /><CardSkeleton /><CardSkeleton />
          </div>
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : !blogs || blogs.length === 0 ? (
          <EmptyState title="No articles found" message="We haven't published any articles yet." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard 
                key={blog._id} 
                title={blog.title} 
                author={blog.author} 
                publishDate={new Date(blog.publishedAt).toLocaleDateString()} 
                featuredImage={blog.featured_image} 
                slug={blog.slug}
                featured={blog.is_featured} 
                tags={blog.tags}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
