import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Startups', path: '/startups' },
    { name: 'Events', path: '/events' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Infrastructure', path: '/infrastructure' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out",
      scrolled ? "bg-white/75 backdrop-blur-xl shadow-premium border-b border-slate-200/50" : "bg-white/40 backdrop-blur-sm border-b border-transparent"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            {/* Replace with actual logo */}
            <div className="w-10 h-10 bg-nie-navy rounded-md flex items-center justify-center text-white font-bold font-heading">
              NIE
            </div>
            <span className="font-heading font-bold text-xl text-nie-navy hidden sm:block">
              Technology Business Incubator
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-8">
            {links.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-nie-orange px-1 py-2",
                  location.pathname === link.path ? "text-nie-orange" : "text-text-body"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-nie-orange"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="xl:hidden p-2 text-nie-navy hover:bg-slate-50 rounded-md focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 top-20 z-40 bg-white/95 backdrop-blur-md xl:hidden flex flex-col h-[calc(100vh-80px)] overflow-y-auto"
        >
          <nav className="flex flex-col p-6 space-y-6">
            {links.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className={cn(
                  "text-2xl font-heading font-semibold transition-colors flex items-center py-2 border-b border-slate-50",
                  location.pathname === link.path ? "text-nie-orange" : "text-nie-navy"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  )
}
