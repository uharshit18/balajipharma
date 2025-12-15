import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';
import { Link } from 'react-router-dom';
import { Button } from './UI/Button';

export const Hero: React.FC = () => {
    // Parallax Effect
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden pt-32 pb-32 md:pt-40 md:pb-0">
            {/* Original Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"
                    alt="Pharmaceutical Warehouse"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>

            {/* Abstract Background Shapes - Subtle & Clean */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <motion.div
                    style={{ y: y1, opacity: 0.1 }}
                    className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-brandBlue rounded-full blur-3xl mix-blend-multiply"
                />
                <motion.div
                    style={{ y: y2, opacity: 0.1 }}
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400 rounded-full blur-3xl mix-blend-multiply"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">

                {/* Left: Content */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        All Top pharma brands, supplying across Rajasthan
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
                    >
                        Wholesale Pharmaceuticals <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">in Rajasthan</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-base md:text-xl text-slate-300 mb-8 md:mb-10 leading-relaxed max-w-lg font-medium"
                    >
                        As a premier <strong className="text-blue-200">wholesale medical supplier in Rajasthan</strong>, <strong className="text-blue-200">Balaji Pharma</strong> is dedicated to distributing genuine healthcare products. From our base, we efficiently supply a comprehensive range to retailers and wholesalers across the region.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-4">
                        <Button size="lg" className="shadow-lg shadow-blue-500/25 border-none !bg-brandBlue text-white hover:!bg-blue-600 w-full sm:w-auto">
                            <Link to="/wholesale-medicines-rajasthan" className="flex items-center justify-center">
                                Start Ordering
                            </Link>
                        </Button>
                        <Link to="/wholesale-medicines-rajasthan" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="!bg-white/10 !text-white hover:!bg-white/20 backdrop-blur-sm border-white/10 w-full sm:w-auto">
                                View Catalog
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Trust Badges */}
                    <motion.div variants={fadeInUp} className="mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Pharmacist" className="w-10 h-10 rounded-full border-2 border-slate-900" />
                            ))}
                        </div>
                        <div className="text-sm text-slate-400">
                            <span className="font-bold text-white block mb-0.5">500+ Retailers and Wholesalers</span>
                            Trusted in Rajasthan
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right: Visual / Data Emphasis */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    {/* Floating Cards Composition */}
                    <div className="relative z-10 w-full flex justify-center lg:justify-end">

                        {/* Swift Dispatch Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                            transition={{
                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: 0.5, delay: 0.5 }
                            }}
                            className="absolute -top-6 right-8 md:right-16 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 flex items-center gap-3 z-30"
                        >
                            <div className="bg-orange-50 p-2 rounded-full shrink-0">
                                <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 leading-tight">Swift Dispatch</p>
                                <p className="text-xs text-slate-500 font-medium">Same-day in Bhilwara</p>
                            </div>
                        </motion.div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/40 ring-1 ring-white/10 max-w-lg">
                            <img
                                src="/assets/BANNER-IAMGE.png"
                                alt="Bhilwara Medicine Dispatch"
                                className="w-full h-auto object-contain"
                            />
                            {/* Gradient Fade Envelopes */}
                            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60"></div>
                        </div>

                        {/* Quality Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
                            transition={{
                                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                                opacity: { duration: 0.5, delay: 0.7 }
                            }}
                            className="absolute -bottom-6 left-8 md:left-12 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 flex items-center gap-3 z-30"
                        >
                            <div className="bg-emerald-50 p-2 rounded-full shrink-0">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 leading-tight">Quality Checked</p>
                                <p className="text-xs text-slate-500 font-medium">100% Genuine Stock</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};