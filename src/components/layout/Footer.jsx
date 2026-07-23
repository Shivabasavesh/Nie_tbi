import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-nie-navy text-slate-300 pt-16 pb-8 border-t-4 border-nie-orange">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
               <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-nie-navy font-bold font-heading text-lg">
                NIE
              </div>
              <span className="font-heading font-bold text-xl text-white">
                NIETBI
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Fostering innovation and entrepreneurship at The National Institute of Engineering, Mysuru. We support startups with mentoring, infrastructure, and funding access.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-nie-orange transition-colors text-sm">About Us</Link></li>
              <li><Link to="/startups" className="hover:text-nie-orange transition-colors text-sm">Portfolio Startups</Link></li>
              <li><Link to="/events" className="hover:text-nie-orange transition-colors text-sm">Events</Link></li>
              <li><Link to="/downloads" className="hover:text-nie-orange transition-colors text-sm">Downloads & Policies</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Programs</h3>
            <ul className="space-y-3">
              <li><Link to="/programs" className="hover:text-nie-orange transition-colors text-sm">Incubation</Link></li>
              <li><Link to="/programs" className="hover:text-nie-orange transition-colors text-sm">Pre-Incubation</Link></li>
              <li><Link to="/programs" className="hover:text-nie-orange transition-colors text-sm">Funding Opportunities</Link></li>
              <li><Link to="/infrastructure" className="hover:text-nie-orange transition-colors text-sm">Facilities</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-nie-orange flex-shrink-0 mt-0.5" />
                <span className="text-sm">The National Institute of Engineering, Mananthavadi Road, Mysuru - 570008</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-nie-orange flex-shrink-0" />
                <span className="text-sm">+91 00000 00000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-nie-orange flex-shrink-0" />
                <span className="text-sm">info@nietbi.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} NIE Technology Business Incubator. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
