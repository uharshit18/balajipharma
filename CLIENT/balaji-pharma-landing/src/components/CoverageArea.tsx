import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, Stethoscope, Truck } from 'lucide-react';

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
                    <div className="h-1.5 w-24 bg-brandBlue mx-auto rounded-full mb-6"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        From our headquarters in Bhilwara, we have established a robust distribution network serving key cities and towns across the state.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* City Links */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-blue-500/30 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <MapPin className="text-brandBlue" /> Major Cities Served
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/pharma-wholesaler-jaipur" className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-brandBlue/20 transition-all">
                                <div className="w-2 h-2 bg-brandBlue rounded-full"></div> Jaipur
                            </Link>
                            <Link to="/pharma-wholesaler-udaipur" className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-brandBlue/20 transition-all">
                                <div className="w-2 h-2 bg-brandBlue rounded-full"></div> Udaipur
                            </Link>
                            <Link to="/pharma-wholesaler-ajmer" className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-brandBlue/20 transition-all">
                                <div className="w-2 h-2 bg-brandBlue rounded-full"></div> Ajmer
                            </Link>
                            <Link to="/pharma-wholesaler-bhilwara" className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-brandBlue/20 transition-all">
                                <div className="w-2 h-2 bg-brandBlue rounded-full"></div> Bhilwara (HQ)
                            </Link>
                            <Link to="/pharma-wholesaler-chittorgarh" className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-brandBlue/20 transition-all">
                                <div className="w-2 h-2 bg-brandBlue rounded-full"></div> Chittorgarh
                            </Link>
                            <Link to="/pharma-wholesaler-nathdwara" className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-brandBlue/20 transition-all">
                                <div className="w-2 h-2 bg-brandBlue rounded-full"></div> Nathdwara
                            </Link>
                        </div>
                    </div>

                    {/* Customer Segments */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-green-500/30 transition-all">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Building2 className="text-green-500" /> Who We Serve
                        </h3>
                        <div className="space-y-4">
                            <Link to="/customers-we-serve/pharmaceutical-wholesale-retailers" className="block p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700 transition-all group">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">Retail Chemists</span>
                                    <Truck size={18} className="text-slate-500 group-hover:text-green-400" />
                                </div>
                                <p className="text-sm text-slate-400">Bulk supply for medical stores with credit options and fast delivery.</p>
                            </Link>

                            <Link to="/customers-we-serve/hospital-pharmaceutical-supply" className="block p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700 transition-all group">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">Hospitals & Nursing Homes</span>
                                    <Stethoscope size={18} className="text-slate-500 group-hover:text-green-400" />
                                </div>
                                <p className="text-sm text-slate-400">Critical care, surgicals, and institutional supply at best rates.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
