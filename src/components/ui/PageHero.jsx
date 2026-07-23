import React from 'react'
import Breadcrumb from './Breadcrumb'

export default function PageHero({ title, subtitle }) {
  return (
    <div className="bg-nie-navy text-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-6" />
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
