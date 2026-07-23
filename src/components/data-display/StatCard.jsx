import React from 'react';

const StatCard = ({ number, label, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {Icon && <div className="text-nie-orange mb-4"><Icon size={32} /></div>}
      <div className="text-4xl font-bold text-nie-navy mb-2">{number}</div>
      <div className="text-sm font-medium text-text-body uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default StatCard;
