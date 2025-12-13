import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants';

export const JodhpurCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Jodhpur | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma connects Jodhpur's medical network with top-tier pharmaceutical supplies. Serving the Sun City with integrity and speed." />
                <meta name="keywords" content="Pharmaceutical distributor Jodhpur, Wholesale medicine Jodhpur, Pharma stockist Jodhpur, Medical supplier Jodhpur" />
                <link rel="canonical" href="https://balajipharma.com/city/jodhpur" />
            </Helmet>

            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1595822340386-35db6fde383b?auto=format&fit=crop&q=80&w=2000" alt="Jodhpur City" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving Jodhpur Division
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Reliable Medicine Distribution in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Jodhpur</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Powering the pharmacies and hospitals of Jodhpur with consistent stock availability and genuine products.
                    </p>
                </div>
            </section>

            {/* Local Stats */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Next Day</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Delivery</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">200+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Clients</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Certified</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Wholesaler</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Wide</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Coverage</div>
                    </div>
                </div>
            </section>

            {/* Areas Covered */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Serving the Blue City</h3>
                        <p className="text-slate-600">
                            Our network extends to Sardarpura, Paota, Shastri Nagar, and industrial zones of Jodhpur.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Clients in Jodhpur</h2>
                    <div className="text-center text-slate-500 italic">
                        "Reliable service for bulk generic medicines." - Pharmacy Owner, Sardarpura
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JodhpurCity;
