import React from 'react';
import { FileSearch } from 'lucide-react';

const EmptyState = ({ title = "No Results Found", message = "We couldn't find any records matching your criteria." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-slate-200 rounded-lg bg-slate-50">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
        <FileSearch size={32} />
      </div>
      <h3 className="text-xl font-bold text-nie-navy mb-2">{title}</h3>
      <p className="text-text-body">{message}</p>
    </div>
  );
};

export default EmptyState;
