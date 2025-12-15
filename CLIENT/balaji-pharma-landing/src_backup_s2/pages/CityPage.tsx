import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { MapPin, Truck, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { PHONE_VALUE } from '../constants';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

const CityPage: React.FC = () => {
    const { city } = useParams<{ city: string }>();

    // Normalize city name (e.g., "jaipur" -> "Jaipur")
    const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1).toLowerCase() : 'Rajasthan';

    // Dynamic Content based on City
    const title = `Pharmaceutical Wholesaler in ${cityName} | Bulk Medicines | Balaji Pharma`;
    const description = `Balaji Pharma is a licensed pharmaceutical distributor serving ${cityName}. Bulk medicines, competitive pricing, and same-day delivery to ${cityName} retailers and hospitals.`;
    const keywords = `pharma wholesaler ${cityName}, medicine distributor ${cityName}, bulk medicines ${cityName}, pharmaceutical supplier ${cityName}`;

    // Schema for LocalBusiness
    const schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Balaji Pharma",
        "description": `Pharmaceutical wholesaler serving ${cityName}`,
        "areaServed": {
            "@type": "City",
            "name": cityName
        },
        "url": `https://balajipharma.com/pharma-wholesaler-${city}`,
        "telephone": PHONE_VALUE
    });

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <SEOHead
                title={title}
                description={description}
                keywords={keywords}
                canonicalUrl={`https://balajipharma.com/pharma-wholesaler-${city}`}
                schema={schema}
            />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto px-4 relative z-10 text-center"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-brandBlue/20 text-brandBlue px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-brandBlue/30">
                        <MapPin size={14} /> Serving {cityName} & Surrounding Areas
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
                        Pharmaceutical Wholesaler in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">{cityName}</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                        Authorized stockist for Cipla, Sun Pharma, Glenmark, and 100+ top brands.
                        Fast, reliable delivery to all chemists and hospitals in {cityName}.
                    </motion.p>
                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                        <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am a retailer in ${cityName}. I need a price list.`}
                            className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-green-500/30">
                            <Phone size={20} /> WhatsApp Order
                        </a>
                        <Link to="/wholesale-medicines-rajasthan"
                            className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold backdrop-blur-sm transition-all border border-white/10">
                            View All Brands
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* Why Choose Us for City */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                            <Truck className="w-10 h-10 text-brandBlue mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Fast Delivery to {cityName}</h3>
                            <p className="text-slate-600">
                                We have a dedicated logistics network ensuring same-day or next-day delivery to all parts of {cityName}.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                            <CheckCircle2 className="w-10 h-10 text-brandBlue mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Genuine Medicines</h3>
                            <p className="text-slate-600">
                                100% authentic stock directly from companies. We are authorized distributors for major brands in {cityName}.
                            </p>
                        </motion.div>
                        <motion.div variants={fadeInUp} whileHover={{ y: -5 }} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
                            <MapPin className="w-10 h-10 text-brandBlue mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Local Support</h3>
                            <p className="text-slate-600">
                                Our team understands the specific needs of {cityName}'s retail market and provides tailored support.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Brands Available */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-slate-900 mb-12">Major Brands Available in {cityName}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {['Cipla', 'Sun Pharma', 'Glenmark', 'Mankind', 'Alkem', 'Lupin', 'Zydus', 'Abbott'].map((brand, index) => (
                                <motion.div
                                    key={brand}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/wholesale-medicines/pharmaceutical-brands/${brand.toLowerCase().replace(/ /g, '-')}-price-list`}
                                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center font-medium text-slate-700 hover:text-brandBlue hover:scale-105 transform duration-200">
                                        {brand}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-10">
                            <Link to="/wholesale-medicines-rajasthan" className="inline-flex items-center text-brandBlue font-bold hover:underline">
                                View Full Brand List <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CityPage;
