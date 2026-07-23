import React from 'react'
import { AlertCircle, X } from 'lucide-react'
import Button from '../ui/Button'

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  isLoading = false
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 backdrop-blur-sm p-4 md:p-0">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-nie-navy'}`}>
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="pt-1">
              <h3 className="text-lg font-heading font-semibold text-nie-navy mb-2">{title}</h3>
              <p className="text-sm text-slate-500">{message}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 px-6 py-4 rounded-b-xl flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button 
            variant={isDestructive ? 'primary' : 'secondary'} 
            onClick={onConfirm} 
            isLoading={isLoading}
            className={isDestructive ? "bg-red-600 hover:bg-red-700 focus:ring-red-600" : ""}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}
