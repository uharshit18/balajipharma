import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, UserCheck, Stethoscope, Building2 } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants';

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
                    <img src="https://images.unsplash.com/photo-1577563821647-37d4051bf65d?auto=format&fit=crop&q=80&w=2000" alt="Bhilwara City" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-sm font-semibold mb-4">
                        <MapPin className="inline w-4 h-4 mr-1 mb-0.5" /> Serving Bhilwara District
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Top Pharmaceutical Distributor in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Bhilwara</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Headquartered in Nagori Garden, we are the backbone of Bhilwara's healthcare supply chain, delivering to every tehsil and village.
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
                        <div className="text-3xl font-bold text-brandBlue">Same Day</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Delivery in City</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">250+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Local Retailers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">20+</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Hospitals Served</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-brandBlue">HQ</div>
                        <div className="text-sm text-slate-500 uppercase font-bold">Nagori Garden</div>
                    </div>
                </div>
            </section>

            {/* Areas Covered */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="bg-white p-8 rounded-2xl shadow-xl h-full flex flex-col">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <MapPin className="text-red-500" /> Coverage Map
                            </h3>
                            {/* Embedded Map */}
                            <div className="w-full h-64 bg-slate-100 rounded-lg overflow-hidden mb-6 border border-slate-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3632.784406180776!2d74.63660331536643!3d25.344485530188985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c23788756f71%3A0x6b42b4759656040e!2sNagori%20Garden%2C%20Bhilwara%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1625567890123!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Balaji Pharma HQ Map"
                                ></iframe>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold">1</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Bhilwara City (Core)</h4>
                                        <p className="text-sm text-slate-600">Nagori Garden, Shastri Nagar, RC Vyas Colony, Gandhi Nagar, Pratap Nagar.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold">2</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Tehsils & Towns</h4>
                                        <p className="text-sm text-slate-600">Shahpura, Jahazpur, Mandal, Asind, Bijolia, Banera, Hurda, Kotri, Raipur, Saha, Suwana.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 font-bold">3</div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">Industrial Areas</h4>
                                        <p className="text-sm text-slate-600">RIICO Industrial Area, Growth Centre, Suzuki Enclave.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Deeply Rooted in Bhilwara</h2>
                        <p className="text-lg text-slate-600 mb-6">
                            Balaji Pharma is not just a distributor; we are a part of Bhilwara's medical infrastructure. From the bustling markets of <strong>Nagori Garden</strong> to the rural medical centers in <strong>Raipur</strong> and <strong>Asind</strong>, our logistics network ensures that no patient waits for critical medicine.
                        </p>
                        <p className="text-lg text-slate-600 mb-8">
                            We are the authorized stockists for <strong>100+ global brands</strong>, ensuring that local hospitals like Brijesh Bangar Memorial and Keshav Porwal Hospital receive 100% authentic stock on time, every time.
                        </p>
                        <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am a retailer in Bhilwara.`} className="inline-flex items-center justify-center px-8 py-3 bg-brandBlue text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                            Join Our Bhilwara Network
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Trusted by Bhilwara's Best</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
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
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
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
                        </div>
                        {/* Testimonial 3 */}
                        <div className="bg-slate-50 p-8 rounded-2xl border border-gray-100">
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BhilwaraCity;
