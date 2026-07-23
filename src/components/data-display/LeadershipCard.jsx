import React from 'react';
import ImageFallback from '../system/ImageFallback';

const LeadershipCard = ({ name, designation, bio, photoUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden flex flex-col items-center text-center p-8 hover:shadow-md transition-shadow">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 shadow-sm">
        <ImageFallback src={photoUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold text-nie-navy mb-1">{name}</h3>
      <div className="text-sm font-semibold text-nie-orange mb-4">{designation}</div>
      <p className="text-sm text-text-body line-clamp-4">
        {bio}
      </p>
    </div>
  );
};

export default LeadershipCard;
