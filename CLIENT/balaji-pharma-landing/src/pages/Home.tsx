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

    // Schema for Organization
    const organizationSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Balaji Pharma",
        "url": "https://balajipharma.com",
        "logo": "https://balajipharma.com/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9876543210",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Nagori Garden",
            "addressLocality": "Bhilwara",
            "addressRegion": "Rajasthan",
            "postalCode": "311001",
            "addressCountry": "IN"
        }
    });

    return (
        <div className="min-h-screen bg-white">
            <SEOHead
                title="Wholesale Pharmaceuticals in Rajasthan | Balaji Pharma"
                description="Leading wholesale medicine supplier in Rajasthan. Authorized distributor for Cipla, Sun Pharma, and 100+ brands. Serving Jaipur, Udaipur, Bhilwara with bulk medicines."
                keywords="wholesale pharmaceuticals rajasthan, medicine distributor bhilwara, bulk medicine supplier jaipur, pharma stockist rajasthan"
                canonicalUrl="https://balajipharma.com/"
                schema={organizationSchema}
            />

            {/* Original Design Components */}
            <Hero onNavigate={handleNavigation} />

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
