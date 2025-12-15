import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants';

export const BeawarCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Beawar | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma connects Beawar's chemists and hospitals with top pharmaceutical brands. Reliable wholesale distribution for Beawar City and surrounding areas." />
                <meta name="keywords" content="Pharmaceutical distributor Beawar, Wholesale medicine Beawar, Medicine supplier Agarwal market, Pharma stockist Beawar" />
                <link rel="canonical" href="https://balajipharma.com/city/beawar" />
            </Helmet>

            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1596484552993-9dd118b4fac9?auto=format&fit=crop&q=80&w=2000" alt="Beawar City" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-800/50 border border-amber-600/30 text-amber-200 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Major Trade Hub
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Trusted Wholesaler in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-100">Beawar</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Delivering value and variety to the pharmacies of Beawar.
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
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">Stockist</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Brand Range</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">100+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Customers</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">Safe</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Transport</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">Best</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Market Rates</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* LEFT: Coverage Map Card */}
                        <div className="bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                            <div className="p-6 pb-4">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <MapPin className="text-red-500" size={20} /> Beawar Coverage
                                </h3>
                            </div>

                            {/* Map Container */}
                            <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200 mx-auto max-w-[95%]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14300.998453472488!2d74.31666485!3d26.102591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396984da0e8f0001%3A0x123456789abc!2sBeawar%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625568054321"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Balaji Pharma Beawar"
                                ></iframe>
                            </div>

                            {/* Areas List */}
                            <div className="px-6 pb-6 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Beawar City</h4>
                                        <p className="text-xs text-slate-500 mt-1">Chang Gate, Station Road, Agarwal Market.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Sendra Road</h4>
                                        <p className="text-xs text-slate-500 mt-1">Industrial Area Extension, Residential Sectors.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Nearby Towns</h4>
                                        <p className="text-xs text-slate-500 mt-1">Masuda, Jawaja.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Deeply Rooted Text content */}
                        <div className="sticky top-24 pt-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                Supporting Beawar's Healthcare
                            </h2>
                            <div className="w-20 h-1.5 bg-amber-600 rounded-full mb-8"></div>

                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Beawar is a critical historical node in Rajasthan's trade. Balaji Pharma honors this legacy by ensuring that <strong className="text-slate-900">Chang Gate</strong> markets and modern hospitals in Beawar have access to the same high-quality medicine stocks as metro cities.
                                </p>
                                <p>
                                    We provide consistent supply cycles to retailers in Agarwal Market and nearby tehsils, reducing stockout risks and improving patient care standards.
                                </p>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={`tel:${PHONE_VALUE}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 hover:bg-amber-700 transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Contact for Beawar Supply
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default BeawarCity;
