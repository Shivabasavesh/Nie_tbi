import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ title, description, image, type = 'website' }) => {
  const { pathname } = useLocation();
  const siteName = "NIETBI - NIE Technology Business Incubator";
  const defaultDesc = "Fostering innovation and supporting technology startups at The National Institute of Engineering.";
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDesc = description || defaultDesc;
  const canonicalUrl = `https://nietbi.in${pathname}`;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Helper to update or create meta tags
    const setMetaTag = (attr, key, content) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Meta Description
    setMetaTag('name', 'description', finalDesc);
    
    // Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', finalDesc);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:site_name', siteName);
    if (image) setMetaTag('property', 'og:image', image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [fullTitle, finalDesc, canonicalUrl, image, type]);

  return null;
};

export default SEOHead;
