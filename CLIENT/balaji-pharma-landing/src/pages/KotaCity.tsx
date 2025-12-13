import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants';

export const KotaCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Kota | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma extends its distribution network to Kota. Supplying authentic pharmaceutical products to the educational hub of Rajasthan." />
                <meta name="keywords" content="Pharmaceutical distributor Kota, Wholesale medicine Kota, Pharma stockist Kota, Medical supplier Kota" />
                <link rel="canonical" href="https://balajipharma.com/city/kota" />
            </Helmet>

            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1596484552993-9dd118b4fac9?auto=format&fit=crop&q=80&w=2000" alt="Kota City" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving Kota Region
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Premier Pharma Wholesaler in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Kota</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        We ensure that medical supplies in Kota reach pharmacies and hospitals efficiently.
                    </p>
                    <div className="mt-8">
                        <Link to="/wholesale-medicines-rajasthan" className="inline-block bg-brandBlue text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1">
                            Check Our Catalog
                        </Link>
                    </div>
                </div>
            </section>

            {/* Local Stats */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Express</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Logistics</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Growing</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Network</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Trusted</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Quality</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Support</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">24/7</div>
                    </div>
                </div>
            </section>

            {/* Areas Covered */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white p-8 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Coverage in Kota</h3>
                        <p className="text-slate-600">
                            Supplying to Talwandi, Kunhari, Dadabari, and other key areas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Feedback from Kota</h2>
                    <div className="text-center text-slate-500 italic">
                        "Great to have Balaji Pharma services in Kota." - Medical Shop Owner, Talwandi
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KotaCity;
