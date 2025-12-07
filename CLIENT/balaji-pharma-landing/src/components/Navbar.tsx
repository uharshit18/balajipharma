import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS, LOGO_URL } from '../constants';
import { Button } from './Button';

interface NavbarProps {
  onNavigate?: (view: 'home' | 'about' | 'brands', hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => setIsOpen(false)}>
            <img
              src={LOGO_URL}
              alt="Balaji Pharma"
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
            />
            <div className="flex flex-col justify-center">
              <span className="text-2xl md:text-3xl font-extrabold text-blue-950 leading-none tracking-tight font-sans drop-shadow-sm">
                Balaji Pharma
              </span>
              <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">
                Wholesalers & Distributors
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6 mr-2">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === currentPath || (item.href === '/' && currentPath === '/');
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`font-semibold text-base tracking-wide transition-colors relative group cursor-pointer ${isActive ? 'text-brandBlue' : 'text-slate-600 hover:text-brandBlue'}`}
                  >
                    {item.label}
                    <span className={`absolute inset-x-0 -bottom-1 h-0.5 bg-brandBlue transform transition-transform duration-200 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <a href="tel:+919414372078" className="group flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-full transition-all duration-300">
                <div className="bg-white p-1 rounded-full shadow-sm text-brandBlue group-hover:scale-110 transition-transform">
                  <Phone size={14} fill="currentColor" className="text-brandBlue" />
                </div>
                <span className="font-bold text-brandBlue text-sm">+91 94143-72078</span>
              </a>
              <Link to="/contact-wholesale-pharma">
                <Button variant="primary" className="text-sm px-5 py-2 shadow-md hover:shadow-lg">Partner with Us</Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button & Call Icon */}
          <div className="lg:hidden flex items-center gap-3">
            <a href="tel:+919414372078" className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-50 text-brandBlue shadow-sm">
              <Phone size={18} fill="currentColor" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-brandBlue focus:outline-none p-1.5"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-6 px-6 flex flex-col space-y-4 animate-fade-in-down h-[calc(100vh-5rem)] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`font-bold text-lg block py-3 border-b border-gray-50 last:border-0 ${item.href === currentPath ? 'text-brandBlue' : 'text-slate-700 hover:text-brandBlue'}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <a href="tel:+919414372078" className="flex items-center justify-center gap-2 bg-blue-50 text-brandBlue font-bold py-3.5 rounded-lg w-full shadow-sm active:scale-95 transition-transform">
              <Phone size={20} /> Call Now: +91 94143-72078
            </a>
            <Link to="/contact-wholesale-pharma" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full py-3.5 text-lg shadow-md">Partner with Us</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
