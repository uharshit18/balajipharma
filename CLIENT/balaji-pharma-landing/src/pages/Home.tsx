import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { BrandShowcase } from '../components/BrandShowcase';
import { BusinessDetails } from '../components/BusinessDetails';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { ContactForm } from '../components/ContactForm';
import { CoverageArea } from '../components/CoverageArea';
import SEOHead from '../components/SEOHead';

import { GoogleReviewsBadge } from '../components/GoogleReviewsBadge';

const Home: React.FC = () => {
    const location = useLocation();

    // Handle hash navigation (e.g., #contact)
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleNavigation = (view: 'home' | 'about' | 'brands', hash?: string) => {
        // Legacy handler, mostly for the Hero button if it still uses it.
        // In the new Hero, we use Links, but we keep this for type compatibility if needed.
        if (hash) {
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // WebSite Schema for "Site Name"
    const websiteSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Balaji Pharma",
        "alternateName": "Balaji Pharma",
        "url": "https://balaji-pharma.in/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://balaji-pharma.in/wholesale-medicines-rajasthan?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    });

    return (
        <div className="min-h-screen bg-white">
            <SEOHead
                title="Balaji Pharma | Wholesale Medicines & Stockist in Rajasthan"
                description="Balaji Pharma is Rajasthan's leading wholesale medicine supplier. Authorized distributor for Cipla, Sun Pharma, and 100+ brands. Bulk delivery to Jaipur, Udaipur, and Bhilwara."
                keywords="wholesale pharmaceuticals rajasthan, medicine distributor bhilwara, bulk medicine supplier jaipur, pharma stockist rajasthan, Balaji Pharma"
                canonicalUrl="https://balaji-pharma.in"
                schema={websiteSchema}
            />

            {/* Original Design Components */}
            <Hero />

            {/* Google Reviews Trust Badge */}
            <GoogleReviewsBadge className="relative z-20" />

            <BrandShowcase />

            <BusinessDetails />

            {/* New SEO Section: Coverage Areas & Customer Segments */}
            <CoverageArea />

            <div id="network">
                <Features />
            </div>

            <Testimonials />

            <div id="contact">
                <ContactForm />
            </div>
        </div>
    );
};

export default Home;
