import React from 'react';
import SEOHead from '../../components/system/SEOHead';
import PageHero from '../../components/page-structure/PageHero';

const NotFound = () => {
  return (
    <div>
      <PageHero title="NotFound" subtitle="Placeholder subtitle for NotFound" breadcrumb="Home > NotFound" />
      <div className="max-w-7xl mx-auto py-12 px-6">
        <p className="text-text-body">Placeholder content section for NotFound</p>
      </div>
    </div>
  );
};

export default NotFound;
