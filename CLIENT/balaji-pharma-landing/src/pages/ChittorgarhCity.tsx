import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { PHONE_VALUE } from '../constants';

export const ChittorgarhCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Chittorgarh | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma is a premier pharmaceutical distributor in Chittorgarh. Supplying medicines to Nimbahera, Kapasan, and Rawatbhata. Trusted by local hospitals and retailers." />
                <meta name="keywords" content="Pharmaceutical distributor Chittorgarh, Wholesale medicine Chittorgarh, Medical supplier Nimbahera, Pharma stockist Rawatbhata" />
                <link rel="canonical" href="https://balajipharma.com/city/chittorgarh" />
            </Helmet>



            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1598887142487-3c8247833054?auto=format&fit=crop&q=80&w=2000" alt="Chittorgarh Fort" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-900/50 border border-amber-500/30 text-amber-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving the Land of Valor
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Reliable Pharma Supply in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Chittorgarh</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        From the historic fort city to the industrial hubs of Nimbahera, Balaji Pharma ensures steady medical supplies across the district.
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
                        <div className="text-3xl font-bold text-brandBlue">Next Day</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Delivery</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">150+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Retailers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">15+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Hospitals</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">Wide</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Reach</div>
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
                                {/* Embedded Map - Chittorgarh Center */}
                                <div className="w-full h-64 bg-slate-100 rounded-lg overflow-hidden mb-6 border border-slate-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115133.00767252277!2d74.55743841642953!3d24.8799513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968a3068e42f9e7%3A0xcbe8d86e90264151!2sChittorgarh%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625567890123!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={true}
                                        loading="lazy"
                                        title="Balaji Pharma Chittorgarh Coverage"
                                    ></iframe>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold">1</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Chittorgarh City</h4>
                                            <p className="text-sm text-slate-600">Senti, Pratap Nagar, Kumbha Nagar, Gandhi Nagar.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold">2</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Industrial Towns</h4>
                                            <p className="text-sm text-slate-600">Nimbahera, Rawatbhata, Chanderiya.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold">3</div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">Tehsils</h4>
                                            <p className="text-sm text-slate-600">Kapasan, Begun, Bari Sadri, Bhadesar.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Serving the Industrial Belt</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                The Chittorgarh district, with its mix of cement industries and heritage tourism, requires a robust supply chain. Balaji Pharma connects the remote areas like <strong>Rawatbhata</strong> with high-quality healthcare products.
                            </p>
                            <p className="text-lg text-slate-600 mb-8">
                                We specialize in bulk hospital supplies and regular pharmacy restocking, ensuring that the people of Chittorgarh have access to the same quality medicines as larger metros.
                            </p>
                            <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am a retailer in Chittorgarh.`} className="inline-flex items-center justify-center px-8 py-3 bg-brandBlue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                                Contact for Chittorgarh Supply
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Feedback from Chittorgarh</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Operating in Nimbahera, we need a supplier who understands industrial demands. Balaji Pharma is spot on."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold">AT</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Arun Trivedi</p>
                                    <p className="text-slate-500">Trivedi Pharmacy (Nimbahera)</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Reliable service for our hospital. They handle bulk orders very professionally."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold">DH</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Dr. H.L. Gupta</p>
                                    <p className="text-slate-500">District Hospital Chittorgarh (Civil)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
};
