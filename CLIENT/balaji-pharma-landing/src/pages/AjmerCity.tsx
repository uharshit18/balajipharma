import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin } from 'lucide-react';
import { PHONE_VALUE } from '../constants';

export const AjmerCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Ajmer | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma is a leading pharmaceutical distributor in Ajmer. Servicing Kishangarh, Beawar, Pushkar, and Nasirabad with 100% genuine medicines." />
                <meta name="keywords" content="Pharmaceutical distributor Ajmer, Wholesale medicine Ajmer, Medical supplier Kishangarh, Pharma stockist Beawar" />
                <link rel="canonical" href="https://balajipharma.com/city/ajmer" />
            </Helmet>



            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb80b5?auto=format&fit=crop&q=80&w=2000" alt="Ajmer Sharif" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Heart of Rajasthan
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Wholesale Medicine Supply in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Ajmer</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Connecting the central trade hub of Rajasthan with top-tier pharmaceutical brands. Reliable supply for Kishangarh, Beawar, and beyond.
                    </p>
                </div>
            </section>

            {/* Local Stats */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Fast</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Logistics</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">300+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Partners</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">20+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Hospitals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">100%</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Genuine</div>
                    </div>
                </div>
            </section>

            {/* Areas Covered */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <div className="bg-white p-8 rounded-2xl shadow-xl h-full flex flex-col">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <MapPin className="text-red-500" /> Coverage Map
                                </h3>
                                {/* Embedded Map - Ajmer Center */}
                                <div className="w-full h-64 bg-slate-100 rounded-lg overflow-hidden mb-6 border border-slate-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114313.79364966709!2d74.56958434772186!3d26.467479707431227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be6d8fcb7cd2f%3A0x536cf438c5cfcf41!2sAjmer%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625567890123!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        title="Balaji Pharma Ajmer Coverage"
                                    ></iframe>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold">1</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Ajmer City</h4>
                                            <p className="text-sm text-slate-600">Vaishali Nagar, Civil Lines, Ramganj, Adarsh Nagar.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold">2</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Marble Belt</h4>
                                            <p className="text-sm text-slate-600">Kishangarh, Makrana, Roopangarh.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold">3</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Key Towns</h4>
                                            <p className="text-sm text-slate-600">Beawar, Nasirabad, Pushkar, Kekri.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Centralized Distribution Hub</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                Ajmer's strategic location makes it a vital node in our network. We serve the bustling marble market of <strong>Kishangarh</strong> and the cantonment town of <strong>Nasirabad</strong> with equal efficiency.
                            </p>
                            <p className="text-lg text-slate-600 mb-8">
                                Local chemists trust Balaji Pharma to keep their shelves stocked with essential medicines from big brands like Aristo, Intas, and Mankind.
                            </p>
                            <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am a retailer in Ajmer.`} className="inline-flex items-center justify-center px-8 py-3 bg-brandBlue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                Join Our Ajmer Network
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Voices from Ajmer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Fastest delivery in Kishangarh. We never face out-of-stock issues for critical items."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">RG</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Rishabh Garg</p>
                                    <p className="text-slate-500">Garg Pharmacy (Kishangarh)</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Balaji Pharma has helped us streamline our procurement at Mittal Hospital."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">MH</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Manager</p>
                                    <p className="text-slate-500">Mittal Hospital (Ajmer)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};
