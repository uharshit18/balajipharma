import React from 'react';
import { Helmet } from 'react-helmet-async';


export const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <Helmet>
                <title>Privacy Policy | Balaji Pharma Bhilwara</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="max-w-4xl mx-auto px-4 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none">
                    <p className="mb-4">Last updated: December 14, 2025</p>

                    <h2 className="text-xl font-bold mt-6 mb-3">1. Information We Collect</h2>
                    <p className="mb-4">
                        At Balaji Pharma, we respect your privacy. We collect minimal information required to facilitate our wholesale distribution services,
                        including business names, license numbers (DL/GST), contact numbers, and shipping addresses when you inquire or place an order.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        We use your contact details to communication regarding stock availability, orders, and delivery coordination.
                        We do not sell or rent your personal data to third-party marketing agencies.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">3. Data Security</h2>
                    <p className="mb-4">
                        We implement appropriate security measures to protect your business information.
                        However, no method of transmission over the Internet is 100% secure.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">4. Cookies</h2>
                    <p className="mb-4">
                        Our website may use standard cookies to improve user experience and analyze site traffic.
                        By using our site, you consent to our use of cookies.
                    </p>

                    <h2 className="text-xl font-bold mt-6 mb-3">5. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at our Bhilwara office or via the provided phone numbers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
