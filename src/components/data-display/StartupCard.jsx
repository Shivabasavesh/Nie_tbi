import React from 'react';
import ImageFallback from '../system/ImageFallback';

const StartupCard = ({ name, logo, sector, description, websiteLink, featured, foundedYear, isGraduated }) => {
  const getInitials = (n) => n ? n.substring(0, 2).toUpperCase() : 'ST';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col h-[380px] hover:shadow-premium-hover hover:-translate-y-1.5 transition-all duration-300 ease-out relative group">
      {featured && !isGraduated && (
        <div className="absolute top-4 right-4 bg-nie-orange text-white text-xs font-bold px-2 py-1 rounded">
          Featured
        </div>
      )}
      {isGraduated && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          Alumni
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col items-center text-center">
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border border-slate-100 flex-shrink-0 flex items-center justify-center bg-orange-100 text-nie-orange text-2xl font-bold">
          {logo ? (
            <ImageFallback src={logo} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            getInitials(name)
          )}
        </div>
        <h3 className="text-lg font-bold text-nie-navy mb-1">{name}</h3>
        <div className="flex flex-wrap gap-2 justify-center items-center mb-3">
          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {sector}
          </span>
          {foundedYear && (
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
              Est. {foundedYear}
            </span>
          )}
        </div>
        <p className="text-sm text-text-body line-clamp-3 text-left w-full mt-2">
          {description}
        </p>
      </div>
      {websiteLink && (
        <div className="p-4 border-t border-slate-100 mt-auto text-center">
          <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="text-sm text-nie-orange font-medium hover:underline">
            Visit Website &rarr;
          </a>
        </div>
      )}
    </div>
  );
};

export default StartupCard;
