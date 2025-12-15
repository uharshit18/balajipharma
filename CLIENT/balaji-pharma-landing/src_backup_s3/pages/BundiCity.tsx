import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants';

export const BundiCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Bundi | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma supplies high-quality medicines to Bundi. Supporting the Hadoti region with consistent pharmaceutical distribution." />
                <meta name="keywords" content="Pharmaceutical distributor Bundi, Wholesale medicine Bundi, Hadoti pharma supplier, Medicine stockist Bundi" />
                <link rel="canonical" href="https://balajipharma.com/city/bundi" />
            </Helmet>

            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1518002171953-a080ee802e12?auto=format&fit=crop&q=80&w=2000" alt="Bundi Fort" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-800/50 border border-blue-600/30 text-blue-200 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Hadoti Region
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Quality Medicines in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Bundi</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Bringing professional pharmaceutical distribution to the historic city of Bundi.
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
                            <div className="text-3xl font-bold text-indigo-600 mb-1">Direct</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Supply</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-indigo-600 mb-1">Genuine</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Products</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-indigo-600 mb-1">Wide</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Network</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-indigo-600 mb-1">Trust</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Since 2008</div>
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
                                    <MapPin className="text-red-500" size={20} /> Bundi Coverage
                                </h3>
                            </div>

                            {/* Map Container */}
                            <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200 mx-auto max-w-[95%]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14352.568453472488!2d75.64596485!3d25.436891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f7c8ec2372e91%3A0xc638841da509355!2sBundi%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625568098765"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Balaji Pharma Bundi"
                                ></iframe>
                            </div>

                            {/* Areas List */}
                            <div className="px-6 pb-6 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Bundi City</h4>
                                        <p className="text-xs text-slate-500 mt-1">Lanka Gate, Khoja Gate, Main Market.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Hadoti Belt</h4>
                                        <p className="text-xs text-slate-500 mt-1">Key connector to Kota and Tonk routes.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 text-indigo-600 font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Medical Hubs</h4>
                                        <p className="text-xs text-slate-500 mt-1">District Hospital Area, Private Nursing Home Zones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Deeply Rooted Text content */}
                        <div className="sticky top-24 pt-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                Reliable Supply in Bundi
                            </h2>
                            <div className="w-20 h-1.5 bg-indigo-600 rounded-full mb-8"></div>

                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Known for its stepwells, Bundi is now taking steps towards better healthcare. Balaji Pharma is proud to serve the medical community of Bundi, ensuring consistent availability of both chronic and acute care medicines in <strong className="text-slate-900">Lanka Gate</strong> and beyond.
                                </p>
                                <p>
                                    Our distribution channels are optimized for the Hadoti terrain, guaranteeing that shipments reach on schedule.
                                </p>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={`tel:${PHONE_VALUE}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Join Our Bundi Network
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default BundiCity;
