import React from 'react';
import { Helmet } from 'react-helmet-async';

export const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <Helmet>
                <title>Terms of Service | Balaji Pharma Bhilwara</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="max-w-4xl mx-auto px-4 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Terms of Service</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="mb-4">Last updated: December 14, 2025</p>

                    <h2 className="text-xl font-bold mt-6 mb-3">1. Acceptance of Terms</h2>
                    <p className="mb-4">
                        By accessing and using the Balaji Pharma website, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">2. Wholesale Only</h2>
                    <p className="mb-4">
                        Balaji Pharma operates strictly as a B2B pharmaceutical distributor. We do not sell directly to consumers.
                        Valid Drug License (DL) and GST registration are required for account creation and billing.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">3. Pricing and Availability</h2>
                    <p className="mb-4">
                        Prices and stock availability displayed on the website or communicated via other channels are subject to change without notice.
                        We reserve the right to limit quantities.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">4. Deliveries</h2>
                    <p className="mb-4">
                        Delivery timelines are estimates. We strive for same-day delivery in Bhilwara city and 24-48 hours for other districts,
                        but we are not liable for delays caused by external factors.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">5. Liability</h2>
                    <p className="mb-4">
                        Our liability is limited to the value of the goods supplied. We are not liable for any indirect or consequential loss.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
