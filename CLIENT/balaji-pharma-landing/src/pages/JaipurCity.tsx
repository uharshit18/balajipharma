import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin } from 'lucide-react';
import { PHONE_VALUE } from '../constants';

export const JaipurCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Jaipur | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma is a trusted pharmaceutical distributor in Jaipur. Supplying 100+ brands to top hospitals like SMS and Fortis, and 1000+ retailers across the Pink City." />
                <meta name="keywords" content="Pharmaceutical distributor Jaipur, Wholesale medicine Jaipur, Medical supplier MI Road, Pharma stockist Jaipur, Medicine distributor Mansarovar" />
                <link rel="canonical" href="https://balajipharma.com/city/jaipur" />
            </Helmet>



            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1599661046289-e318d6d4deed?auto=format&fit=crop&q=80&w=2000" alt="Jaipur City" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-pink-900/50 border border-pink-500/30 text-pink-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving the Pink City
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Top Pharmaceutical Distributor in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">Jaipur</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Delivering excellence to Rajasthan's capital. From MI Road to Mansarovar, we power Jaipur's pharmacies with genuine medicines.
                    </p>
                </div>
            </section>

            {/* Local Stats */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">24 Hrs</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Turnaround</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">1000+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Jaipur Retailers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">50+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Hospitals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Full</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Coverage</div>
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
                                {/* Embedded Map - Jaipur Center */}
                                <div className="w-full h-64 bg-slate-100 rounded-lg overflow-hidden mb-6 border border-slate-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.07722776326!2d75.75338661642846!3d26.915457639537127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3857e4d825f%3A0x2424b5a27845f3c5!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625567890123!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        title="Balaji Pharma Jaipur Coverage"
                                    ></iframe>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold">1</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Old City & MI Road</h4>
                                            <p className="text-sm text-slate-600">Johari Bazar, Chaura Rasta, C-Scheme, Bani Park.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold">2</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Greater Jaipur</h4>
                                            <p className="text-sm text-slate-600">Mansarovar, Vaishali Nagar, Malviya Nagar, Raja Park, Jagatpura.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600 font-bold">3</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Surrounding Towns</h4>
                                            <p className="text-sm text-slate-600">Chomu, Sanganer, Bagru, Bassi, Chaksu.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Powering the Capital's Healthcare</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                As the capital city, Jaipur demands speed and precision. Balaji Pharma rises to the challenge, ensuring that high-volume pharmacies in <strong>Mansarovar</strong> and critical care units on <strong>JLN Marg</strong> never run out of stock.
                            </p>
                            <p className="text-lg text-slate-600 mb-8">
                                We pride ourselves on our relationships with institutions. Whether it's a bulk order for a multispecialty hospital or a daily restock for a colony chemist, our service remains consistently top-tier.
                            </p>
                            <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am a retailer in Jaipur.`} className="inline-flex items-center justify-center px-8 py-3 bg-brandBlue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                Partner with Us in Jaipur
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Building Trust in Jaipur</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Inventory management used to be a headache until we switched to Balaji Pharma. Their fulfillment rate for Jaipur retailers is unmatched."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">VS</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Vikram Singh</p>
                                    <p className="text-slate-500">Owner, Singh Medicos (Vaishali Nagar)</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"We need consistent cold chain supply for our diabetic patients. Balaji Pharma delivers efficiently, even in the peak summer heat of Jaipur."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">AJ</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Anil Jain</p>
                                    <p className="text-slate-500">Jain Pharmacy (Raja Park)</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Connecting us to brands like Cipla and Sun Pharma directly has improved our margins significantly."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">RM</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Rajesh Meena</p>
                                    <p className="text-slate-500">Meena Medicals (Sanganer)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};
