import React from 'react';

const PageHero = ({ title, subtitle, breadcrumb }) => {
  return (
    <div className="bg-nie-navy text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {breadcrumb && <div className="text-sm opacity-80 mb-4">{breadcrumb}</div>}
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-lg opacity-90">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHero;
