import React from 'react';
import SEOHead from '../components/SEOHead';
import { ContactForm } from '../components/ContactForm';

const Contact: React.FC = () => {
    return (
        <>
            <SEOHead
                title="Contact Wholesale Pharma"
                description="Contact Balaji Pharma for bulk orders and distributor inquiries."
                canonicalUrl="https://balaji-pharma.in/contact"
            />
            <div className="pt-8">
                <ContactForm />
            </div>
        </>
    );
};

export default Contact;
