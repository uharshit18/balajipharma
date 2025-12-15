import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import AppRoutes from './routes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <ScrollToTop />
      {/* Navbar now handles navigation via Links */}
      <Navbar />

      <main className="flex-grow">
        {/* AppRoutes handles the routing for /, /about, etc. using the new pages */}
        <AppRoutes />
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}

export default App;
