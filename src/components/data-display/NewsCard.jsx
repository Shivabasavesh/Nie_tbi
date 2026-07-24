import React from 'react';
import ImageFallback from '../system/ImageFallback';
import { Link } from 'react-router-dom';

const NewsCard = ({ title, publishDate, imageUrl, slug, tags }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow relative">
      <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
        <ImageFallback src={imageUrl} alt={title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-500 mb-3">
          <span>{publishDate}</span>
        </div>
        <h3 className="text-xl font-bold text-nie-navy mb-3 line-clamp-2 leading-tight">
          <Link to={`/news/${slug}`} className="hover:text-nie-orange transition-colors">
            {title}
          </Link>
        </h3>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto pt-4 border-t border-slate-50">
          <Link to={`/news/${slug}`} className="text-sm font-semibold text-nie-orange hover:underline inline-flex items-center">
            Read More &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
