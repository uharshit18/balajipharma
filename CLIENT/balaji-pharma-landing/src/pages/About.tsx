import React from 'react';
import SEOHead from '../components/SEOHead';
import { About as AboutComponent } from '../components/About';

const About: React.FC = () => {
    return (
        <>
            <SEOHead
                title="About Balaji Pharma - Wholesale Distributor"
                description="Learn about Balaji Pharma, the leading wholesale medicines supplier in Rajasthan. Reliable B2B Pharmaceutical Partner since 2010."
                canonicalUrl="https://balaji-pharma.in/about"
            />
            <AboutComponent />
        </>
    );
};

export default About;
