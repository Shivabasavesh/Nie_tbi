import React from 'react';

const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-12 ${className}`}>
      <div className="w-10 h-10 border-4 border-slate-200 border-t-nie-orange rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
