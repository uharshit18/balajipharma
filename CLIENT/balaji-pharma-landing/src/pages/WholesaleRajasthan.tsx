import React from 'react';
import OurBrands from '../components/OurBrands';
import SEOHead from '../components/SEOHead';

const WholesaleRajasthan: React.FC = () => {
    return (
        <>
            <SEOHead
                title="Wholesale Medicines Rajasthan | Bulk Pharma Distributor | Balaji Pharma"
                description="Leading wholesale medicines distributor in Rajasthan. We supply Cipla, Sun Pharma, Glenmark, and 100+ brands to retailers and hospitals in Jaipur, Udaipur, and Bhilwara."
                keywords="wholesale medicines rajasthan, bulk pharma distributor, pharmaceutical wholesaler bhilwara, medicine supplier jaipur"
                canonicalUrl="https://balajipharma.com/wholesale-medicines-rajasthan"
            />
            {/* Using the original OurBrands component as the main content for this "Money Page" */}
            <OurBrands />
        </>
    );
};

export default WholesaleRajasthan;
