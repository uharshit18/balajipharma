import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import AppRoutes from './routes';
import ScrollToTop from './components/ScrollToTop';

import SchemaMarkup from './components/SEO/SchemaMarkup';
import { LOGO_URL, PHONE_DISPLAY, EMAIL_CONTACT } from './constants';

function App() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "WholesaleStore",
    "name": "Balaji Pharma",
    "alternateName": "Balaji Pharmaceuticals",
    "url": "https://balaji-pharma.in",
    "logo": "https://balaji-pharma.in" + LOGO_URL,
    "image": "https://balaji-pharma.in" + LOGO_URL,
    "description": "Leading wholesale medical supplier in Rajasthan, authorized distributor for 100+ top pharma brands.",
    "telephone": PHONE_DISPLAY,
    "email": EMAIL_CONTACT,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-6, Fateh Tower, Nagori Garden",
      "addressLocality": "Bhilwara",
      "addressRegion": "Rajasthan",
      "postalCode": "311001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.3475",
      "longitude": "74.6408"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://facebook.com/balajipharma",
      "https://linkedin.com/company/balajipharma"
    ],
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "GSTIN",
      "value": "08ABLPU9122B1ZT"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <SchemaMarkup schema={orgSchema} />
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
