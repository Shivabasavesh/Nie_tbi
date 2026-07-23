import React from 'react';
import ImageFallback from '../system/ImageFallback';
import { Link } from 'react-router-dom';

const BlogCard = ({ title, author, publishDate, featuredImage, slug, featured }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative">
      {featured && (
        <div className="absolute top-4 left-4 bg-nie-orange text-white text-xs font-bold px-2 py-1 rounded z-10">
          Featured
        </div>
      )}
      <div className="aspect-[16/9] w-full overflow-hidden">
        <ImageFallback src={featuredImage} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-500 mb-3 space-x-4">
          <span>{publishDate}</span>
          <span>By {author}</span>
        </div>
        <h3 className="text-xl font-bold text-nie-navy mb-3 line-clamp-2 leading-tight">
          <Link to={`/blogs/${slug}`} className="hover:text-nie-orange transition-colors">
            {title}
          </Link>
        </h3>
        <div className="mt-auto pt-4 border-t border-slate-50">
          <Link to={`/blogs/${slug}`} className="text-sm font-semibold text-nie-orange hover:underline inline-flex items-center">
            Read Article &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
