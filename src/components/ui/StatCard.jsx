import React from 'react'
import { cn } from '../../lib/utils'
import * as Icons from 'lucide-react'

export default function StatCard({ number, label, iconName, className }) {
  const IconComponent = Icons[iconName] || Icons.BarChart
  
  return (
    <div className={cn("bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4", className)}>
      <div className="p-3 bg-blue-50 rounded-lg text-nie-navy">
        <IconComponent className="w-8 h-8" />
      </div>
      <div>
        <h4 className="text-3xl font-heading font-bold text-nie-navy mb-1">{number}</h4>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
      </div>
    </div>
  )
}
