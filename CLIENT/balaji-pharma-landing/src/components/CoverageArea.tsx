import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Stethoscope, Truck, Store } from 'lucide-react';

export const CoverageArea: React.FC = () => {
    return (
        <section className="py-20 bg-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Coverage Areas Across Rajasthan</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Coverage Areas mentions ad ons ople to Rajasthan is oun tre bojney of pares and, conneeld Irsld be tertude.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Major Cities Served */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-green-500/30 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-8">
                            Major Cities Served
                        </h3>
                        <div className="space-y-4">
                            {[
                                { name: 'Bhilwara (Head Office)', path: '/pharma-distributor-bhilwara' },
                                { name: 'Jaipur', path: '/pharma-distributor-jaipur' },
                                { name: 'Udaipur', path: '/pharma-distributor-udaipur' },
                                { name: 'Jodhpur', path: '/pharma-distributor-jodhpur' },
                                { name: 'Kota', path: '/pharma-distributor-kota' },
                                { name: 'Ajmer', path: '/pharma-distributor-ajmer' },
                                { name: 'Chittorgarh', path: '/pharma-distributor-chittorgarh' },
                                { name: 'Kishangarh', path: '/pharma-distributor-kishangarh' },
                                { name: 'Beawar', path: '/pharma-distributor-beawar' },
                                { name: 'Bundi', path: '/pharma-distributor-bundi' }
                            ].map((city, idx) => (
                                <Link key={idx} to={city.path} className="flex items-center gap-4 group">
                                    {/* Circle Icon */}
                                    <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                    </div>
                                    <span className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                        {city.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Who We Serve */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-green-500/30 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-8">
                            Who We Serve
                        </h3>
                        <div className="space-y-8">
                            <Link to="/customers-we-serve/pharmaceutical-wholesale-retailers" className="flex items-start gap-4 group">
                                <div className="mt-1 p-2 border border-green-500/30 rounded-lg text-green-500 group-hover:text-green-400 group-hover:border-green-400 transition-all">
                                    <Store size={32} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                        Retail Chemists
                                    </h4>
                                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                                        Partner with over 500+ retail pharmacies, offering flexible credit terms, fast delivery, and a wide range of products.
                                    </p>
                                </div>
                            </Link>

                            <Link to="/customers-we-serve/hospital-pharmaceutical-supply" className="flex items-start gap-4 group">
                                <div className="mt-1 p-2 border border-green-500/30 rounded-lg text-green-500 group-hover:text-green-400 group-hover:border-green-400 transition-all">
                                    <Building2 size={32} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">
                                        Hospitals & Nursing Homes
                                    </h4>
                                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                                        Dedicated supply chain for institutional buyers, ensuring timely availability of critical care and surgical supplies.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
