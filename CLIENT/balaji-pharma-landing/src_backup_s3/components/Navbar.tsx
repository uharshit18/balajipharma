import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS, LOGO_URL } from '../constants';
import { Button } from './UI/Button'; // Updated path

interface NavbarProps {
  onNavigate?: (view: 'home' | 'about' | 'brands', hash?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={() => setIsOpen(false)}>
            <img
              src={LOGO_URL}
              alt="Balaji Pharma"
              className={`transition-all duration-300 object-contain drop-shadow-sm group-hover:scale-105 ${scrolled || isOpen ? 'h-12' : 'h-16'}`}
            />
            <div className={`flex flex-col justify-center transition-opacity duration-300 ${scrolled || isOpen ? 'opacity-100' : 'opacity-90'}`}>
              <span className={`font-extrabold leading-none tracking-tight font-sans drop-shadow-sm transition-colors duration-300 ${scrolled || isOpen ? 'text-xl text-blue-950' : 'text-2xl md:text-3xl text-white'}`}>
                Balaji Pharma
              </span>
              <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 transition-colors duration-300 ${scrolled || isOpen ? 'text-blue-600' : 'text-blue-200'}`}>
                Wholesalers & Distributors
              </span>
            </div>
          </Link>

          {/* Desktop Menu - Creada Style */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className={`flex items-center space-x-1 p-1 rounded-full backdrop-blur-sm border transition-all duration-300 ${scrolled ? 'bg-slate-100/50 border-white/20' : 'bg-white/10 border-white/10'}`}>
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === currentPath || (item.href === '/' && currentPath === '/');
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                      ? 'text-brandBlue bg-white shadow-sm'
                      : scrolled
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pl-4">
              <a
                href="tel:+911482239078"
                className={`hidden xl:flex items-center gap-2 font-medium text-sm transition-colors ${scrolled ? 'text-slate-600 hover:text-brandBlue' : 'text-white/90 hover:text-white'}`}
              >
                <Phone size={16} />
                <span>+91 1482-239078</span>
              </a>
              <Link to="/contact">
                <Button variant="primary" size="md" className="shadow-lg shadow-blue-500/20">
                  Enquire Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            <a href="tel:+911482239078" className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm transition-colors ${scrolled || isOpen ? 'bg-blue-50 text-brandBlue' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
              <Phone size={20} fill="currentColor" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-2 rounded-lg backdrop-blur-sm transition-colors ${scrolled || isOpen ? 'text-slate-700 hover:text-brandBlue bg-white/50' : 'text-white hover:bg-white/20'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Slide In */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col pt-24 px-6"
          >
            <div className="flex flex-col space-y-6">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`text-3xl font-bold tracking-tight ${item.href === currentPath ? 'text-brandBlue' : 'text-slate-800'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto mb-10 space-y-4"
            >
              <div className="h-px bg-slate-100 w-full mb-6"></div>
              <p className="text-slate-500 text-sm uppercase tracking-wider font-semibold">Get in Touch</p>
              <a href="tel:+911482239078" className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <Phone className="text-brandBlue" /> +91 1482-239078
              </a>
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <Button fullWidth size="lg" className="mt-4">
                  Start Enquiry
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

