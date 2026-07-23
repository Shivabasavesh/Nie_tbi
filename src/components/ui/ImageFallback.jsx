import React, { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function ImageFallback({ src, alt, className, fallbackText }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className={cn("flex flex-col items-center justify-center bg-slate-100 text-slate-400 w-full h-full min-h-[120px]", className)}>
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        {fallbackText && <span className="text-xs font-medium uppercase tracking-wider">{fallbackText}</span>}
      </div>
    )
  }

  return (
    <img 
      src={src} 
      alt={alt || "Image"} 
      className={cn("object-cover", className)} 
      onError={() => setHasError(true)} 
    />
  )
}
