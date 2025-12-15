import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

export const BhilwaraCity: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Pharma Distributor in Bhilwara | Wholesale Medicines | Balaji Pharma</title>
                <meta name="description" content="Balaji Pharma is the leading pharmaceutical distributor in Bhilwara (08ABLPU9122B1ZT). Supplying 100+ brands to Brijesh Bangar, Keshav Porwal, and 500+ retailers. Same-day delivery in Bhilwara." />
                <meta name="keywords" content="Pharmaceutical distributor Bhilwara, Wholesale medicine Bhilwara, Medical supplier Nagori Garden, Pharma stockist Bhilwara, Medicine distributor Raipur, Medicine distributor Mohangarh" />
                <link rel="canonical" href="https://balajipharma.com/city/bhilwara" />
            </Helmet>

            {/* City Hero */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                        src="https://images.unsplash.com/photo-1577563821647-37d4051bf65d?auto=format&fit=crop&q=80&w=2000"
                        alt="Bhilwara City"
                        className="w-full h-full object-cover"
                    />
                </div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative z-10 max-w-7xl mx-auto px-4 text-center"
                >
                    <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving Bhilwara District
                    </motion.span>
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Top Pharmaceutical Distributor in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Bhilwara</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Headquartered in Nagori Garden, we are the backbone of Bhilwara's healthcare supply chain, delivering to every tehsil and village.
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
                            <div className="text-3xl font-bold text-blue-600 mb-1">250+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Local Retailers</div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">20+</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Hospitals Served</div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="text-3xl font-bold text-blue-600 mb-1">HQ</div>
                            <div className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-widest">Nagori Garden</div>
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
                                    <MapPin className="text-red-500" size={20} /> Coverage Map
                                </h3>
                            </div>

                            {/* Map Container */}
                            <div className="w-full h-64 bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200 mx-auto max-w-[95%]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115681.2585250967!2d74.59744030704903!3d25.34078891552554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396882bec9296531%3A0x6a055375a363d509!2sBhilwara%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625567890123!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Balaji Pharma Bhilwara Coverage"
                                ></iframe>
                            </div>

                            {/* Areas List */}
                            <div className="px-6 pb-6 space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Bhilwara City (Core)</h4>
                                        <p className="text-xs text-slate-500 mt-1">Nagori Garden, Shastri Nagar, RC Vyas Colony, Gandhi Nagar, Pratap Nagar.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Tehsils & Towns</h4>
                                        <p className="text-xs text-slate-500 mt-1">Shahpura, Jahazpur, Mandal, Asind, Bijolia, Banera, Hurda, Kotri, Raipur, Saha, Suwana.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">Industrial Areas</h4>
                                        <p className="text-xs text-slate-500 mt-1">RIICO Industrial Area, Growth Centre, Suzuki Enclave.</p>
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
                                Deeply Rooted in Bhilwara
                            </h2>
                            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>

                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Balaji Pharma is not just a distributor; we are a part of Bhilwara's medical infrastructure. From the bustling markets of <strong className="text-slate-900">Nagori Garden</strong> to the rural medical centers in <strong className="text-slate-900">Raipur</strong> and <strong className="text-slate-900">Asind</strong>, our logistics network ensures that no patient waits for critical medicine.
                                </p>
                                <p>
                                    We are the authorized stockists for <strong className="text-slate-900">100+ global brands</strong>, ensuring that local hospitals like Brijesh Bangar Memorial and Keshav Porwal Hospital receive 100% authentic stock on time, every time.
                                </p>
                            </div>

                            <div className="mt-10">
                                <a
                                    href={`tel:${PHONE_VALUE}`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all hover:-translate-y-1 hover:shadow-xl"
                                >
                                    Join Our Bhilwara Network
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center text-slate-900 mb-12"
                    >
                        Trusted by Bhilwara's Best
                    </motion.h2>
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {/* Testimonial 1 */}
                        <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Balaji Pharma has completely stabilized our supply chain for critical cardiac injectables here at Brijesh Bangar. Their response time in emergencies is commendable."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">BB</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Dr. Purchase Officer</p>
                                    <p className="text-slate-500">Brijesh Bangar Memorial Hospital</p>
                                </div>
                            </div>
                        </motion.div>
                        {/* Testimonial 2 */}
                        <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"Genuine stock, transparent pricing, and they understand the local market of Bhilwara perfectly. Best wholesaler in Nagori Garden."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">KP</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Store Manager</p>
                                    <p className="text-slate-500">Keshav Porwal Hospital</p>
                                </div>
                            </div>
                        </motion.div>
                        {/* Testimonial 3 */}
                        <motion.div variants={fadeInUp} className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-1 text-yellow-500 mb-4">
                                {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
                            </div>
                            <p className="text-slate-600 italic mb-6">"For Ramsnehi Chikitsalya, quality is paramount. Balaji Pharma has consistently delivered 100% original batches for the last 10 years."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">RC</div>
                                <div className="text-sm">
                                    <p className="font-bold text-slate-900">Head Pharmacist</p>
                                    <p className="text-slate-500">Ram Snehi Chikitsalya</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BhilwaraCity;
