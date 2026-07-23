import SEOHead from '../../components/system/SEOHead';
import React
 from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSupabaseDetail } from '../../hooks/useSupabaseData';
import LoadingSpinner from '../../components/system/LoadingSpinner';
import ErrorState from '../../components/system/ErrorState';
import ImageFallback from '../../components/system/ImageFallback';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: blog, isLoading, isError, refetch } = useSupabaseDetail('blogs', 'slug', slug);

  if (isLoading) return <div className="min-h-screen pt-20"><LoadingSpinner /></div>;
  if (isError || !blog) return <div className="max-w-3xl mx-auto pt-20 px-6"><ErrorState title="Article Not Found" onRetry={refetch} /></div>;

  return (
    <div className="bg-white min-h-screen pb-20 pt-10">
      <SEOHead title={blog.title} description={blog.content_md?.substring(0, 160)} image={blog.featured_image} type="article" />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-sm opacity-80 mb-8 text-slate-600"><Link to="/" className="hover:underline">Home</Link> &gt; <Link to="/blogs" className="hover:underline">Blogs</Link> &gt; <span className="text-nie-navy font-medium">{blog.title}</span></div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-nie-navy mb-6 leading-tight">{blog.title}</h1>
        
        <div className="flex items-center gap-4 text-slate-500 mb-10 py-4 border-y border-slate-100">
          <div className="font-medium text-nie-navy">By {blog.author}</div>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <div>{new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        
        {blog.featured_image && (
          <div className="w-full aspect-[16/9] bg-slate-100 rounded-xl overflow-hidden mb-12 shadow-sm">
            <ImageFallback src={blog.featured_image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="prose prose-lg prose-slate prose-headings:text-nie-navy prose-a:text-nie-orange hover:prose-a:text-orange-600 max-w-none">
          <ReactMarkdown>{blog.content_md || ''}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
