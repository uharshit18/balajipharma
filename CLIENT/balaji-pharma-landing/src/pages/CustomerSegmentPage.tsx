import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Building2, Stethoscope, Truck, Phone, ArrowRight, CheckCircle2, ShieldCheck, Users, Activity } from 'lucide-react';
import { PHONE_VALUE } from '../constants';
import { motion } from 'framer-motion';

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
                        { label: "Margins", value: "Best in Market", icon: <Activity className="w-5 h-5 text-green-400" /> },
                        { label: "Delivery", value: "24-48 Hrs", icon: <Truck className="w-5 h-5 text-blue-400" /> },
                        { label: "Brands", value: "100+", icon: <Building2 className="w-5 h-5 text-purple-400" /> }
                    ],
                    benefits: [
                        "Zero-Out-of-Stock Guarantee for Critical Brands",
                        "Transparent Billing & GST Compliance",
                        "Easy Replacement for Expired Goods (as per policy)",
                        "Dedicated Support for Bulk Orders"
                    ],
                    icon: <StoreIcon className="w-6 h-6" /> // Helper component below
                };
            case 'hospital-pharmaceutical-supply':
                return {
                    title: 'Pharmaceutical Supply for Hospitals',
                    target: 'Hospitals',
                    heroImage: "https://images.unsplash.com/photo-1516549655169-df83a255eb47?auto=format&fit=crop&q=80&w=2070",
                    desc: 'Reliable bulk medicine supply for hospitals and nursing homes. We ensure steady availability of critical care, surgicals, and general medicines at special institutional rates.',
                    stats: [
                        { label: "Availability", value: "99.9%", icon: <CheckCircle2 className="w-5 h-5 text-green-400" /> },
                        { label: "Compliance", value: "100%", icon: <ShieldCheck className="w-5 h-5 text-blue-400" /> },
                        { label: "Hospitals", value: "50+", icon: <Building2 className="w-5 h-5 text-purple-400" /> }
                    ],
                    benefits: [
                        "Priority Dispatch for Emergency Drugs",
                        "Cold Chain Maintenance for Injectables",
                        "Rate Contracts for Regular Supplies",
                        "Verified Batches & Long Expiry Stock"
                    ],
                    icon: <Stethoscope className="w-6 h-6" />
                };
            default:
                // Default fallback
                return {
                    title: 'Pharmaceutical Wholesale Solutions',
                    target: 'Partners',
                    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000",
                    desc: 'Comprehensive pharmaceutical distribution services for all healthcare providers in Rajasthan.',
                    stats: [
                        { label: "Experience", value: "16+ Years", icon: <Activity className="w-5 h-5" /> },
                        { label: "Network", value: "Wide Reach", icon: <Truck className="w-5 h-5" /> },
                        { label: "Trust", value: "High", icon: <ShieldCheck className="w-5 h-5" /> }
                    ],
                    benefits: [
                        "End-to-End Supply Chain Management",
                        "Real-time Stock Updates",
                        "Personalized Account Management",
                        "Market Insights & Trend Analysis"
                    ],
                    icon: <Building2 className="w-6 h-6" />
                };
        }
    };

    const data = getSegmentData(segment);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-300 selection:bg-blue-500/30">
            <SEOHead
                title={`${data.title} Rajasthan | Balaji Pharma`}
                description={data.desc}
                keywords={`wholesale medicines for ${data.target}, pharma distributor for ${data.target}, bulk medicine supply rajasthan`}
                canonicalUrl={`https://balajipharma.com/customers-we-serve/${segment}`}
            />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-24 md:pb-32">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={data.heroImage}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-20 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/40"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/0 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/10 backdrop-blur-md border border-blue-500/20 rounded-full mb-8">
                            {React.cloneElement(data.icon as React.ReactElement, { className: "w-4 h-4 text-blue-400 mr-2" })}
                            <span className="text-blue-300 font-semibold uppercase tracking-widest text-xs">For {data.target}</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
                            {data.title}
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                            {data.desc}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am representing a ${data.target}. I need a quote.`}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-500/25 group">
                                <Phone size={20} className="group-hover:rotate-12 transition-transform" />
                                Partner With Us
                            </a>
                            <Link to="/wholesale-medicines-rajasthan" className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:border-white/20">
                                View Brand Catalog
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section - Floating Glass Cards */}
            <section className="relative z-20 -mt-16 pb-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto"
                    >
                        {data.stats.map((stat, idx) => (
                            <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 text-center hover:border-slate-700 transition-colors group">
                                <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-800/50 mb-4 group-hover:bg-slate-800 transition-colors">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Tailored solutions for <span className="text-blue-500">{data.target}</span>
                            </h2>
                            <div className="h-1 w-20 bg-blue-600 rounded-full mb-8"></div>

                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                We understand that {data.target.toLowerCase()} have unique requirements. That's why we don't offer a one-size-fits-all service. Our logistics, billing, and inventory management are optimized to solve YOUR specific challenges.
                            </p>

                            <ul className="space-y-4">
                                {data.benefits.map((benefit, idx) => (
                                    <li key={idx} className="flex items-start gap-4 group">
                                        <div className="mt-1 p-0.5 rounded-full bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-slate-900 transition-colors">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <span className="text-slate-300 font-medium text-lg group-hover:text-white transition-colors">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl transform rotate-3 opacity-20 blur-xl"></div>
                            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-8 md:p-10 rounded-3xl relative z-10 hover:border-blue-500/30 transition-all duration-500 group">
                                <ShieldCheck className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-2xl font-bold text-white mb-4">The Balaji Promise</h3>
                                <p className="text-slate-400 mb-8 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
                                    "We pledge to never compromise on quality. Every strip, bottle, and box that leaves our warehouse is 100% authentic and handled with care."
                                </p>
                                <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center overflow-hidden">
                                                <Users className="w-5 h-5 text-slate-500" />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">Trusted by 500+</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">Healthcare Providers</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your supply chain?</h2>
                    <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        Join the fastest growing pharmaceutical network in Rajasthan. Experience transparency, speed, and reliability.
                    </p>
                    <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am interested in partnering.`} className="inline-flex items-center bg-white text-blue-900 text-lg font-bold px-10 py-5 rounded-full shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300">
                        Start Ordering Today <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
};

// Helper component since 'Store' was not imported in the original (or maybe it was but I want to be safe)
const StoreIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>
);

export default CustomerSegmentPage;
