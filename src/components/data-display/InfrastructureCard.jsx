import React from 'react';
import ImageFallback from '../system/ImageFallback';

const InfrastructureCard = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="aspect-video w-full overflow-hidden">
        <ImageFallback src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-nie-navy mb-2">{title}</h3>
        <p className="text-text-body text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfrastructureCard;
