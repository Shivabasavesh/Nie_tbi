import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Rocket, Calendar, FileText, FileDown, Settings, LogOut } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function AdminLayout() {
  const location = useLocation()
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Startups', path: '/admin/startups', icon: Rocket },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Documents', path: '/admin/documents', icon: FileDown },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-nie-navy text-white hidden md:flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="font-heading font-bold text-xl">NIETBI Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive ? "bg-nie-orange text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center px-3 py-2.5 rounded-md text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white h-16 border-b border-slate-200 flex items-center px-4 justify-between">
          <span className="font-heading font-bold text-lg text-nie-navy">NIETBI Admin</span>
          {/* Add mobile menu toggle here if needed */}
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
