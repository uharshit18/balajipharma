import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { PHONE_VALUE } from '../constants';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

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
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        src="https://images.unsplash.com/photo-1599661046289-e318d6d4deed?auto=format&fit=crop&q=80&w=2000"
                        alt="Jaipur City"
                        className="w-full h-full object-cover"
                    />
                </div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative z-10 max-w-7xl mx-auto px-4 text-center"
                >
                    <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-pink-900/50 border border-pink-500/30 text-pink-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving the Pink City
                    </motion.span>
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Top Pharmaceutical Distributor in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">Jaipur</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Delivering excellence to Rajasthan's capital. From MI Road to Mansarovar, we power Jaipur's pharmacies with genuine medicines.
                    </motion.p>
                    <motion.div variants={fadeInUp} className="mt-8">
                        <Link to="/wholesale-medicines-rajasthan" className="inline-block bg-brandBlue text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1">
                            Check Our Catalog
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Local Stats */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        <motion.div variants={fadeInUp} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">Same Day</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Delivery in City</div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">400+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Retailers Served</div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">50+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Hospitals</div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">Full</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Range Stockist</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* LEFT: Coverage Map Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
                        >
                            <div className="p-6 pb-4">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <MapPin className="text-red-500" size={20} /> Jaipur Network
                                </h3>
                            </div>

                            {/* Map Container - Jaipur */}
                            <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200 mx-auto max-w-[95%]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.0389366661!2d75.71714396068735!3d26.91240366606015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625567950123!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Balaji Pharma Jaipur Coverage"
                                ></iframe>
                            </div>

                            {/* Areas List */}
                            <div className="px-6 pb-6 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Jaipur City Center</h4>
                                        <p className="text-xs text-slate-500 mt-1">MI Road, C-Scheme, Pink City, Raja Park, Bani Park.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Major Suburbs</h4>
                                        <p className="text-xs text-slate-500 mt-1">Mansarovar, Vaishali Nagar, Malviya Nagar, Jagatpura.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Industrial Hubs</h4>
                                        <p className="text-xs text-slate-500 mt-1">VKI Area, Sitapura Industrial Area, Bagru.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>


                        {/* RIGHT: Deeply Rooted Text content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="sticky top-24 pt-8"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                                Deeply Rooted in Jaipur
                            </h2>
                            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>

                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    As Rajasthan's capital expands, so does our commitment. Balaji Pharma provides a critical supply line to the densest medical markets of <strong className="text-slate-900">MI Road</strong> and the sprawling residential hubs of <strong className="text-slate-900">Mansarovar</strong> and <strong className="text-slate-900">Vaishali Nagar</strong>.
                                </p>
                                <p>
                                    We understand the high volume demands of Jaipur's hospitals and the diverse stock requirements of its chemists. With our extensive catalog of <strong className="text-slate-900">100+ global brands</strong>, we act as the central warehouse for many leading pharmacies in the city.
                                </p>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={`tel:${PHONE_VALUE}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Join Our Jaipur Network
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
};
