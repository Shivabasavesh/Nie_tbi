import React from 'react'
import { cn } from '../../lib/utils'

export default function SectionHeader({ title, description, className, align = 'left' }) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', align === 'right' && 'text-right', className)}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-nie-navy mb-4">
        {title}
      </h2>
      <div className={cn("h-1 w-20 bg-nie-orange mb-6", align === 'center' && 'mx-auto', align === 'right' && 'ml-auto')} />
      {description && (
        <p className="text-lg text-text-body max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
