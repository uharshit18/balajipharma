import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Building2, Stethoscope, Truck, Phone, ArrowRight } from 'lucide-react';
import { PHONE_VALUE } from '../constants';

const CustomerSegmentPage: React.FC = () => {
    const { segment } = useParams<{ segment: string }>();

    // Map URL segment to readable title and content
    const getSegmentData = (seg: string | undefined) => {
        switch (seg) {
            case 'pharmaceutical-wholesale-retailers':
                return {
                    title: 'Wholesale Medicines for Retail Chemists',
                    target: 'Retailers',
                    desc: 'Balaji Pharma is the preferred wholesale partner for retail chemists in Rajasthan. Get best margins, timely delivery, and complete range of ethical and generic medicines.',
                    icon: <Building2 className="w-12 h-12 text-brandBlue mb-4" />
                };
            case 'hospital-pharmaceutical-supply':
                return {
                    title: 'Pharmaceutical Supply for Hospitals',
                    target: 'Hospitals',
                    desc: 'Reliable bulk medicine supply for hospitals and nursing homes. We ensure steady availability of critical care, surgicals, and general medicines at institutional rates.',
                    icon: <Stethoscope className="w-12 h-12 text-brandBlue mb-4" />
                };
            case 'institutional-bulk-medicines':
                return {
                    title: 'Institutional Bulk Medicine Supplier',
                    target: 'Institutions',
                    desc: 'Dedicated supply chain solutions for government institutions, NGOs, and large healthcare facilities. Bulk procurement with certified quality assurance.',
                    icon: <Truck className="w-12 h-12 text-brandBlue mb-4" />
                };
            default:
                return {
                    title: 'Pharmaceutical Wholesale Solutions',
                    target: 'Partners',
                    desc: 'Comprehensive pharmaceutical distribution services for all healthcare providers in Rajasthan.',
                    icon: <Building2 className="w-12 h-12 text-brandBlue mb-4" />
                };
        }
    };

    const data = getSegmentData(segment);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <SEOHead
                title={`${data.title} Rajasthan | Balaji Pharma`}
                description={data.desc}
                keywords={`wholesale medicines for ${data.target}, pharma distributor for ${data.target}, bulk medicine supply rajasthan`}
                canonicalUrl={`https://balajipharma.com/customers-we-serve/${segment}`}
            />

            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="flex justify-center">{data.icon}</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {data.title} <span className="text-blue-400">in Rajasthan</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                        {data.desc}
                    </p>
                    <div className="flex justify-center gap-4">
                        <a href={`https://wa.me/${PHONE_VALUE}?text=Hi, I am representing a ${data.target}. I need a quote.`}
                            className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-green-500/30">
                            <Phone size={20} /> Contact for Supply
                        </a>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Why {data.target} Choose Balaji Pharma</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-3">Best Margins</h3>
                            <p className="text-slate-600">Competitive wholesale rates ensuring higher profitability for your business.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-3">Complete Range</h3>
                            <p className="text-slate-600">One-stop solution for all major companies including Cipla, Sun Pharma, and more.</p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-3">Timely Delivery</h3>
                            <p className="text-slate-600">Reliable logistics network covering Jaipur, Udaipur, and all of Rajasthan.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-brandBlue/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Ready to streamline your medicine supply?</h2>
                    <Link to="/wholesale-medicines-rajasthan" className="inline-flex items-center text-brandBlue font-bold text-lg hover:underline">
                        Browse Our Product Catalog <ArrowRight size={20} className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CustomerSegmentPage;
