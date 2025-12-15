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
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">Next Day</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Delivery</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">150+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Retailers</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">15+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Hospitals</div>
                        </div>
                        <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-amber-600 mb-1">Wide</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Reach</div>
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
                                    <MapPin className="text-red-500" size={20} /> Chittorgarh Coverage
                                </h3>
                            </div>

                            {/* Map Container */}
                            <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200 mx-auto max-w-[95%]">
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

                            {/* Areas List */}
                            <div className="px-6 pb-6 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Chittorgarh City</h4>
                                        <p className="text-xs text-slate-500 mt-1">Senti, Pratap Nagar, Kumbha Nagar, Gandhi Nagar.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Industrial Towns</h4>
                                        <p className="text-xs text-slate-500 mt-1">Nimbahera, Rawatbhata, Chanderiya.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100/50">
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600 font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Tehsils</h4>
                                        <p className="text-xs text-slate-500 mt-1">Kapasan, Begun, Dungla.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Deeply Rooted Text content */}
                        <div className="sticky top-24 pt-8">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                Deeply Rooted in Chittorgarh
                            </h2>
                            <div className="w-20 h-1.5 bg-amber-600 rounded-full mb-8"></div>

                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Chittorgarh's mix of industry and heritage requires a versatile medical supply partner. Balaji Pharma delivers both. We ensure that the workers in <strong className="text-slate-900">Nimbahera's</strong> cement belt have access to proper healthcare facilities through our retailer network.
                                </p>
                                <p>
                                    In the city, we supply major nursing homes in <strong className="text-slate-900">Pratap Nagar</strong> with prompt, same-day delivery.
                                </p>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={`tel:${PHONE_VALUE}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 hover:bg-amber-700 transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Join Our Chittorgarh Network
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChittorgarhCity;
