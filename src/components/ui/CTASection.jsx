import React from 'react'
import Button from './Button'

export default function CTASection({ title, description, buttonText, buttonLink = '#', variant = 'primary' }) {
  const isPrimary = variant === 'primary'
  
  return (
    <section className={`py-16 md:py-24 ${isPrimary ? 'bg-nie-orange text-white' : 'bg-slate-50 text-center'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`text-3xl md:text-4xl font-heading font-bold mb-6 ${!isPrimary && 'text-nie-navy'}`}>
          {title}
        </h2>
        {description && (
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isPrimary ? 'text-white/90' : 'text-text-body'}`}>
            {description}
          </p>
        )}
        {/* Placeholder for link navigation, in real app use Link from react-router-dom inside Button or wrap it */}
        <Button variant={isPrimary ? 'secondary' : 'primary'} size="lg">
          {buttonText}
        </Button>
      </div>
    </section>
  )
}
