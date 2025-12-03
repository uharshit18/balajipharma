import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandShowcase } from './components/BrandShowcase';
import { BusinessDetails } from './components/BusinessDetails';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { ContactForm } from './components/ContactForm';
import { OurBrands } from './components/OurBrands';

function App() {
  const [view, setView] = useState<'home' | 'about' | 'brands'>('home');

  // Initial load check
  useEffect(() => {
    if (window.location.hash === '#about') {
      setView('about');
    } else if (window.location.hash === '#brands') {
      setView('brands');
    }
  }, []);

  const handleNavigation = (newView: 'home' | 'about' | 'brands', hash?: string) => {
    setView(newView);
    
    // Reset scroll if changing views
    if (newView === 'about' || newView === 'brands') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (newView === 'home') {
      if (hash && hash !== '#' && hash !== '#home') {
        // Allow time for DOM to update
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onNavigate={handleNavigation} />
      <main>
        {view === 'home' ? (
          <>
            <div id="home"></div>
            {/* Passed navigation handler to Hero */}
            <Hero onNavigate={handleNavigation} />
            <BrandShowcase />
            <BusinessDetails />
            <div id="network">
               <Features />
            </div>
            <Testimonials />
            <div id="contact">
               <ContactForm />
            </div>
          </>
        ) : view === 'about' ? (
          <About />
        ) : (
          <OurBrands />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;