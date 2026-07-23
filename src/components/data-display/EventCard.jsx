import React from 'react';
import ImageFallback from '../system/ImageFallback';
import { Button } from '../ui/Button';

const EventCard = ({ title, date, banner, description, status }) => {
  const isUpcoming = status === 'Upcoming';
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col h-full hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-300 ease-out group">
      <div className="aspect-video w-full relative overflow-hidden">
        <ImageFallback src={banner} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded text-white ${isUpcoming ? 'bg-nie-orange' : 'bg-slate-500'}`}>
          {status}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-sm text-nie-orange font-medium mb-2">{date}</div>
        <h3 className="text-xl font-bold text-nie-navy mb-3 line-clamp-2">{title}</h3>
        <p className="text-text-body text-sm line-clamp-3 mb-6 flex-grow">
          {description}
        </p>
        {isUpcoming && (
          <Button variant="outline" className="w-full mt-auto">
            Register Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
