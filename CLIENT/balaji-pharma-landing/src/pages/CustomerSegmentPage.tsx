import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Building2, Stethoscope, Truck, Phone, ArrowRight, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import { PHONE_VALUE } from '../constants';

const CustomerSegmentPage: React.FC = () => {
    const { segment } = useParams<{ segment: string }>();

    // Map URL segment to readable title and content
    const getSegmentData = (seg: string | undefined) => {
        switch (seg) {
            case 'pharmaceutical-wholesale-retailers':
                return {
                    title: 'Wholesale Medicines for Retail Chemists',
                    target: 'Retailers',
                    heroImage: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=2074",
                    desc: 'Maximize your pharmacy margins with Balaji Pharma. We are the preferred wholesale partner for 500+ retail chemists in Rajasthan, offering a complete range of ethical and generic medicines.',
                    stats: [
                        { label: "Margins", value: "Best in Market" },
                        { label: "Delivery", value: "24-48 Hrs" },
                        { label: "Brands", value: "100+" }
                    ],
                    benefits: [
                        "Zero-Out-of-Stock Guarantee for Critical Brands",
                        "Transparent Billing & GST Compliance",
                        "Easy Replacement for Expired Goods (as per policy)",
                        "Dedicated Support for Bulk Orders"
                    ],
                    icon: <Building2 className="w-12 h-12 text-brandBlue mb-4" />
                };
            case 'hospital-pharmaceutical-supply':
                return {
                    title: 'Pharmaceutical Supply for Hospitals',
                    target: 'Hospitals',
                    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a255eb47?auto=format&fit=crop&q=80&w=2070",
                    desc: 'Reliable bulk medicine supply for hospitals and nursing homes. We ensure steady availability of critical care, surgicals, and general medicines at special institutional rates.',
                    stats: [
                        { label: "Availability", value: "99.9%" },
                        { label: "Compliance", value: "100%" },
                        { label: "Hospitals", value: "50+" }
                    ],
                    benefits: [
                        "Priority Dispatch for Emergency Drugs",
                        "Cold Chain Maintenance for Injectables",
                        "Rate Contracts for Regular Supplies",
                        "Verified Batches & Long Expiry Stock"
                    ],
                    icon: <Stethoscope className="w-12 h-12 text-brandBlue mb-4" />
                };
            case 'institutional-bulk-medicines':
                return {
                    title: 'Institutional Bulk Medicine Supplier',
                    target: 'Institutions',
                    heroImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=2069",
                    desc: 'Dedicated supply chain solutions for government institutions, NGOs, and large healthcare facilities. We handle bulk procurement with certified quality assurance.',
                    stats: [
                        { label: "Capacity", value: "Bulk Ready" },
                        { label: "Logistics", value: "Pan-Rajasthan" },
                        { label: "Tenders", value: "Supported" }
                    ],
                    benefits: [
                        "Documentation Support for Tenders",
                        "Direct Manufacturer Sourcing",
                        "Logistics for Remote Locations",
                        "Flexible Payment Terms for Verified Bodies"
                    ],
                    icon: <Truck className="w-12 h-12 text-brandBlue mb-4" />
                };
            default:
                return {
                    title: 'Pharmaceutical Wholesale Solutions',
                    target: 'Partners',
                    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
                    desc: 'Comprehensive pharmaceutical distribution services for all healthcare providers in Rajasthan. We connect top manufacturers with the last-mile delivery network.',
                    stats: [
                        { label: "Experience", value: "16+ Years" },
                        { label: "Network", value: "Wide Reach" },
                        { label: "Trust", value: "High" }
                    ],
                    benefits: [
                        "End-to-End Supply Chain Management",
                        "Real-time Stock Updates",
                        "Personalized Account Management",
                        "Market Insights & Trend Analysis"
                    ],
                    icon: <Building2 className="w-12 h-12 text-brandBlue mb-4" />
                };
        }
    };

    const data = getSegmentData(segment);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <SEOHead
                title={`${data.title} Rajasthan | Balaji Pharma`}
                description={data.desc}
                keywords={`wholesale medicines for ${data.target}, pharma distributor for ${data.target}, bulk medicine supply rajasthan`}
                canonicalUrl={`https://balajipharma.com/customers-we-serve/${segment}`}
            />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.heroImage}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6 ring-1 ring-white/20">
                        {React.cloneElement(data.icon as React.ReactElement, { className: "w-6 h-6 text-blue-300 mr-2 mb-0" })}
                        <span className="text-blue-100 font-semibold uppercase tracking-wider text-sm">For {data.target}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                        {data.title}
                    </h1>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
                        {data.desc}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am representing a ${data.target}. I need a quote.`}
                            className="bg-brandBlue hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5">
                            <Phone size={20} /> Partner With Us
                        </a>
                        <Link to="/wholesale-medicines-rajasthan" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all">
                            View Brand Catalog
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-slate-50 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-white rounded-2xl shadow-sm p-8 max-w-5xl mx-auto -mt-24 relative z-20">
                        {data.stats.map((stat, idx) => (
                            <div key={idx} className="p-6 text-center">
                                <span className="block text-4xl font-black text-slate-900 mb-1">{stat.value}</span>
                                <span className="block text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">
                                Tailored solutions for <span className="text-brandBlue">{data.target}</span>
                            </h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                We understand that {data.target.toLowerCase()} have unique requirements. That's why we don't offer a one-size-fits-all service. Our logistics, billing, and inventory management are optimized to solve YOUR specific challenges.
                            </p>

                            <ul className="space-y-4">
                                {data.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-slate-700 font-medium text-lg">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brandBlue to-purple-500 rounded-3xl transform rotate-3 opacity-10"></div>
                            <div className="bg-slate-900 p-8 rounded-3xl relative z-10 text-white">
                                <ShieldCheck className="w-12 h-12 text-blue-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">The Balaji Promise</h3>
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    "We pledge to never compromise on quality. Every strip, bottle, and box that leaves our warehouse is 100% authentic and handled with care."
                                </p>
                                <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
                                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Trusted by 500+</p>
                                        <p className="text-sm text-slate-400">Healthcare Providers in Rajasthan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-brandBlue text-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to upgrade your supply chain?</h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Join the fastest growing pharmaceutical network in Rajasthan. Experience transparency, speed, and reliability.
                    </p>
                    <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am interested in partnering.`} className="inline-flex items-center bg-white text-brandBlue text-lg font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-blue-50 transition-colors">
                        Start Ordering Today <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default CustomerSegmentPage;
