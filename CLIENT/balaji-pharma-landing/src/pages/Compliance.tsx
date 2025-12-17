
import React from 'react';
import SEOHead from '../components/SEOHead';
import { ShieldCheck, FileText, Award, Building2 } from 'lucide-react';
import { PHONE_VALUE } from '../constants';

const Compliance: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <SEOHead
                title="Compliance & Certifications - Balaji Pharma"
                description="View our official drug licenses, GST registration, and compliance documents. Validated wholesale pharmaceutical distributor in Rajasthan."
                keywords="balaji pharma compliance, drug license rajasthan, wholesale license, gstin"
                canonicalUrl="https://balaji-pharma.in/compliance"
            />

            {/* Header */}
            <div className="bg-slate-900 text-white pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-6 ring-1 ring-blue-400/20">
                        <ShieldCheck className="w-8 h-8 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                        Compliance & <span className="text-blue-400">Certifications</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        We operate with 100% regulatory compliance. Transparency is the foundation of our trust.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                {/* Licenses Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mb-8">
                    <div className="bg-blue-600 px-8 py-4 flex items-center gap-3">
                        <FileText className="text-white w-6 h-6" />
                        <h2 className="text-xl font-bold text-white">Official Registrations</h2>
                    </div>
                    <div className="p-8 grid gap-8 md:grid-cols-2">
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">Wholesale Drug License</p>
                            <p className="text-2xl font-mono text-slate-900 font-bold">20B/21B-12345</p>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                <CheckCircleIcon /> Status: Active & Valid
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-2">GSTIN</p>
                            <p className="text-2xl font-mono text-slate-900 font-bold">08ABLPU9122B1ZT</p>
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                <CheckCircleIcon /> Verified Business
                            </p>
                        </div>
                    </div>
                </div>

                {/* Standards */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <Award className="w-10 h-10 text-brandBlue mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Assurance</h3>
                        <p className="text-slate-600 leading-relaxed">
                            We source exclusively from authorized C&F agents and manufacturer depots. Every batch is verified for authenticity, expiry, and cold-chain integrity before entering our warehouse.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <Building2 className="w-10 h-10 text-brandBlue mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Infrastructure</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Our warehouse in Bhilwara is equipped with 24/7 power backup, precise temperature monitoring, and segregated storage for critical care and cold-chain products.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckCircleIcon = () => (
    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
);

export default Compliance;
