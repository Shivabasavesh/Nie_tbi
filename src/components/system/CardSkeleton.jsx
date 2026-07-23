import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6 animate-pulse">
      <div className="w-full h-40 bg-slate-200 rounded-md mb-4"></div>
      <div className="w-3/4 h-6 bg-slate-200 rounded mb-2"></div>
      <div className="w-1/2 h-4 bg-slate-200 rounded mb-4"></div>
      <div className="w-full h-3 bg-slate-200 rounded mb-2"></div>
      <div className="w-full h-3 bg-slate-200 rounded mb-2"></div>
      <div className="w-2/3 h-3 bg-slate-200 rounded"></div>
    </div>
  );
};

export default CardSkeleton;
