import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Truck, ArrowRight } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

const JOURNEY_IMAGES = [
    {
        id: 'collage',
        label: 'Full Journey',
        src: '/assets/journey/collage.png',
        icon: Building2,
        description: 'From city center to warehouse shelves.'
    },
    {
        id: 'exterior',
        label: 'Bhilwara HQ',
        src: '/assets/journey/exterior.png',
        icon: Building2,
        description: 'Our modern multi-storey headquarters in Bhilwara.'
    },
    {
        id: 'office',
        label: 'Office Team',
        src: '/assets/journey/office.jpg',
        icon: Users,
        description: 'Dedicated staff ensuring seamless order processing.'
    },
    {
        id: 'warehouse',
        label: 'Warehouse',
        src: '/assets/journey/warehouse.jpg',
        icon: Truck,
        description: 'Organized inventory ready for rapid dispatch.'
    }
];

export const BalajiJourneySection: React.FC = () => {
    const [activeImageId, setActiveImageId] = useState('collage');
    const activeImage = JOURNEY_IMAGES.find(img => img.id === activeImageId) || JOURNEY_IMAGES[0];

    return (
        <section id="about-journey" className="py-16 lg:py-24 bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">

                    {/* LEFT: Text Story Block */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="relative z-10"
                    >
                        <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 text-brandBlue text-xs font-bold uppercase tracking-wider mb-6 lg:mb-8 shadow-sm">
                            Inside Balaji Pharma
                        </span>

                        <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 lg:mb-8 leading-tight">
                            The Journey of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-blue-500">
                                Your Medicine.
                            </span>
                        </h2>

                        <div className="space-y-4 lg:space-y-6 text-slate-600 text-base lg:text-lg leading-relaxed mb-8 lg:mb-10">
                            <p>
                                From our modern multi-storey headquarters in <strong className="text-slate-900">Bhilwara</strong>, we orchestrate a supply chain that never sleeps. We are the vital link between India's top pharmaceutical manufacturers and the healthcare providers who depend on them.
                            </p>
                            <p>
                                Every day, our <strong className="text-brandBlue">Office Team</strong> processes hundreds of orders with precision, ensuring that our <strong className="text-brandBlue">Warehouse Hub</strong> dispatches critical supplies to reach pharmacies across Rajasthan on time.
                            </p>
                        </div>

                        {/* Interactive Tabs */}
                        <div className="flex flex-col gap-3">
                            {JOURNEY_IMAGES.slice(1).map((img) => (
                                <button
                                    key={img.id}
                                    onClick={() => setActiveImageId(img.id)}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group text-left ${activeImageId === img.id
                                        ? 'bg-blue-50/80 border-blue-200 shadow-md ring-1 ring-blue-100'
                                        : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeImageId === img.id ? 'bg-brandBlue text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-brandBlue'
                                        }`}>
                                        <img.icon size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-bold text-sm ${activeImageId === img.id ? 'text-brandBlue' : 'text-slate-900'}`}>
                                            {img.label}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">{img.description}</p>
                                    </div>
                                    <ArrowRight size={16} className={`ml-auto transition-opacity ${activeImageId === img.id ? 'text-brandBlue opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`} />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: Interactive Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border-4 border-white bg-white ring-1 ring-slate-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeImageId}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    src={activeImage.src}
                                    alt={activeImage.label}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brandBlue/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-lg">
                                    <activeImage.icon size={12} /> {activeImage.label}
                                </span>
                                <p className="text-white/90 text-sm font-medium hidden sm:block">{activeImage.description}</p>
                            </div>
                        </div>

                        {/* Floating Badge (Now Responsive) */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="relative mt-6 md:mt-0 md:absolute md:-bottom-6 md:-left-12 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-full md:max-w-[200px] flex md:block items-center justify-between md:justify-start gap-4"
                        >
                            <div className="flex -space-x-3 mb-0 md:mb-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                                ))}
                            </div>
                            <p className="text-xs font-bold text-slate-800 leading-tight text-right md:text-left">
                                <span className="text-brandBlue">Joined by 50+</span> team members <span className="hidden sm:inline">across Rajasthan</span>
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
