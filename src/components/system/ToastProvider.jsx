import React from 'react'
import { Toaster } from 'sonner'

export default function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right"
      toastOptions={{
        className: 'font-sans',
        style: {
          background: 'white',
          border: '1px solid #e2e8f0',
          color: '#334155',
        },
      }}
    />
  )
}
