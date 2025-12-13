import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants';

export const UdaipurCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Udaipur | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma is a leading pharmaceutical distributor serving Udaipur. Supplying 100+ brands to hospitals, medical colleges, and retailers in the City of Lakes." />
                <meta name="keywords" content="Pharmaceutical distributor Udaipur, Wholesale medicine Udaipur, Pharma stockist Udaipur, Medical supplier Udaipur, Medicine distributor Rajasthan" />
                <link rel="canonical" href="https://balajipharma.com/city/udaipur" />
            </Helmet>

            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=2000" alt="Udaipur City" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving Udaipur District
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Trusted Pharmaceutical Distributor in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Udaipur</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Delivering high-quality medicines to the City of Lakes. We support Udaipur's thriving medical infrastructure with timely supplies.
                    </p>
                </div>
            </section>

            {/* Local Stats */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">24h</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Standard Delivery</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">150+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Retailers Served</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">10+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Hospitals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Full</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Range Stockist</div>
                    </div>
                </div>
            </section>

            {/* Areas Covered */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="bg-white p-8 rounded-2xl shadow-xl h-full flex flex-col w-full">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MapPin className="text-red-500" /> Coverage Map
                            </h3>
                            <p className="text-slate-600 mb-6">
                                We cover the entire Udaipur region including Surajpole, Hiran Magri, Sukher, and nearby tehsils.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Trusted Partners in Udaipur</h2>
                    <div className="text-center text-slate-500 italic">
                        "Joining Balaji Pharma's network has improved our stock availability significantly." - Local Partner, Hiran Magri
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UdaipurCity;
