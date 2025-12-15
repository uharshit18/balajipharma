import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Store } from 'lucide-react';
import { motion } from 'framer-motion';

export const CoverageArea: React.FC = () => {
    return (
        <section id="coverage" className="py-12 md:py-20 bg-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Coverage Network</h2>
                    <div className="h-1 w-16 bg-green-500 mx-auto rounded-full mb-4"></div>
                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Extensive pharmaceutical distribution network covering all major districts of Rajasthan.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                    {/* Major Cities Served - Compact Pill Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Major Cities Served
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { name: 'Bhilwara (HQ)', path: '/pharma-distributor-bhilwara' },
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
                                <Link key={idx} to={city.path}>
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-block px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:border-green-500 hover:bg-green-500/10 transition-all cursor-pointer"
                                    >
                                        {city.name}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Who We Serve - Compact Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 md:p-8 flex flex-col justify-center"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Client Segments
                        </h3>
                        <div className="space-y-4">
                            <Link to="/customers-we-serve/pharmaceutical-wholesale-retailers">
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-green-500/30 transition-all group"
                                >
                                    <div className="p-2.5 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                        <Store size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-white group-hover:text-green-400 transition-colors">
                                            Retail Chemists
                                        </h4>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            500+ pharmacies, flexible credit & fast delivery.
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>

                            <Link to="/customers-we-serve/hospital-pharmaceutical-supply">
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <Building2 size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                                            Hospitals & Nursing Homes
                                        </h4>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            Dedicated supply chain for institutional buyers.
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
