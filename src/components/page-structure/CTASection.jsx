import React from 'react';
import { Button } from '../ui/Button';

const CTASection = ({ title, description, primaryText, primaryAction, secondaryText, secondaryAction }) => {
  return (
    <section className="bg-nie-navy text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg opacity-90 mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryText && (
            <Button variant="primary" size="lg" onClick={primaryAction}>
              {primaryText}
            </Button>
          )}
          {secondaryText && (
            <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-nie-navy" onClick={secondaryAction}>
              {secondaryText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
