import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { PHONE_VALUE } from '../constants';

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
                            <div className="text-3xl font-bold text-blue-600 mb-1">Next Day</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Delivery</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">200+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Clients</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">Certified</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Wholesaler</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">Wide</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Coverage</div>
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
                                    <MapPin className="text-red-500" size={20} /> Sun City Network
                                </h3>
                            </div>

                            {/* Map Container */}
                            <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200 mx-auto max-w-[95%]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114545.9678887625!2d72.93922880056637!3d26.27096645318532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c4e50527383%3A0xf0b86a116962f3a6!2sJodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625567999888"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Balaji Pharma Jodhpur Coverage"
                                ></iframe>
                            </div>

                            {/* Areas List */}
                            <div className="px-6 pb-6 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Core Jodhpur</h4>
                                        <p className="text-xs text-slate-500 mt-1">Sardarpura, Ratanada, Paota.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Medical Corridors</h4>
                                        <p className="text-xs text-slate-500 mt-1">Jalori Gate, MDM Hospital Area.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Outer Ring</h4>
                                        <p className="text-xs text-slate-500 mt-1">Mandore, Boranada Industrial Area.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Deeply Rooted Text content */}
                        <div className="sticky top-24 pt-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                Deeply Rooted in Jodhpur
                            </h2>
                            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>

                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Jodhpur is the gateway to the Thar, and we serve as the gateway for premium medicines into the region. Balaji Pharma maintains robust stock levels to serve the high-demand markets of <strong className="text-slate-900">Sardarpura</strong> and <strong className="text-slate-900">Jalori Gate</strong>.
                                </p>
                                <p>
                                    Our logistics ensure that even in the extreme heat of the Sun City, temperature-sensitive vaccines and insulin reach hospitals safely and potently.
                                </p>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={`tel:${PHONE_VALUE}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Join Our Jodhpur Network
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default JodhpurCity;
