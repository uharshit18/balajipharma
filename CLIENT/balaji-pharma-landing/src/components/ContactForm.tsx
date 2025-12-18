import React, { useState } from 'react';
import { Button } from './Button';
import { Phone, Mail, MapPin, Send, MessageCircle, Building2, ShoppingBag, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PHONE_VALUE, PHONE_DISPLAY, EMAIL_CONTACT, EMAILJS_CONFIG } from '../constants';
import emailjs from '@emailjs/browser';

type Segment = 'retailer' | 'brand' | null;
type SubmissionMethod = 'whatsapp' | 'email' | null;

export const ContactForm: React.FC = () => {
    const [activeSegment, setActiveSegment] = useState<Segment>(null);
    const [submissionMethod, setSubmissionMethod] = useState<SubmissionMethod>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [formData, setFormData] = useState({
        // Common
        name: '',
        phone: '',
        email: '',
        city: '',
        message: '',

        // Retailer Specific
        businessName: '',
        drugLicense: 'yes', // yes, no, applied

        // Brand Specific
        companyName: '',
        website: '',
        productCategory: 'generic' // generic, ethical, otc, surgical
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!submissionMethod) return;

        setStatus('submitting');

        // Construct Message Body
        let messageBody = "";
        let subject = "";

        if (activeSegment === 'retailer') {
            subject = `[New Retailer Order] ${formData.businessName} - ${formData.city}`;
            messageBody = `
*New Retailer/Hospital Inquiry*
--------------------------------
*Name:* ${formData.name}
*Business:* ${formData.businessName}
*City:* ${formData.city}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Drug License:* ${formData.drugLicense.toUpperCase()}
--------------------------------
*Message:*
${formData.message}
            `;
        } else {
            subject = `[New Partner Proposal] ${formData.companyName}`;
            messageBody = `
*New Brand Partnership Proposal*
--------------------------------
*Name:* ${formData.name}
*Company:* ${formData.companyName}
*Website:* ${formData.website}
*Category:* ${formData.productCategory.toUpperCase()}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
--------------------------------
*Message:*
${formData.message}
            `;
        }

        if (submissionMethod === 'whatsapp') {
            // WhatsApp Logic
            setTimeout(() => {
                setStatus('success');
                const encodedMessage = encodeURIComponent(messageBody);
                window.open(`https://wa.me/${PHONE_VALUE}?text=${encodedMessage}`, '_blank');
                resetForm();
            }, 1000);
        } else {
            // EmailJS Logic
            try {
                // If keys are placeholders, mock success to prevent crash
                if (EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
                    console.warn("EmailJS Keys are placeholders. Simulating success.");
                    setTimeout(() => {
                        setStatus('success');
                        resetForm();
                    }, 1500);
                    return;
                }

                await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    {
                        subject: subject,
                        message: messageBody,
                        from_name: formData.name,
                        reply_to: formData.email,
                        to_email: EMAIL_CONTACT
                    },
                    EMAILJS_CONFIG.PUBLIC_KEY
                );
                setStatus('success');
                resetForm();
            } catch (error: any) {
                console.error("EmailJS Error:", error);
                setErrorMessage(error.text || error.message || "Unknown Error");
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        }
    };

    const resetForm = () => {
        setTimeout(() => {
            setStatus('idle');
            setFormData({
                name: '', phone: '', email: '', city: '', message: '',
                businessName: '', drugLicense: 'yes',
                companyName: '', website: '', productCategory: 'generic'
            });
            setActiveSegment(null);
            setSubmissionMethod(null);
        }, 5000);
    };

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="contact">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Partner with Balaji Pharma</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Select your profile to get started with the most relevant inquiry process.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">

                    {/* Left Sidebar: Contact Info */}
                    <div className="bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6">Quick Contact</h3>
                            <div className="space-y-6">
                                <a href={`https://wa.me/${PHONE_VALUE}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                                    <MessageCircle className="text-green-400" size={24} />
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-semibold">WhatsApp Support</p>
                                        <p className="text-lg font-bold">{PHONE_DISPLAY}</p>
                                    </div>
                                </a>
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-blue-400 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-slate-400">Headquarters</p>
                                        <p className="font-medium">Nagori Garden, Bhilwara, Rajasthan</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Mail className="text-blue-400 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-slate-400">Email Us</p>
                                        <p className="font-medium">{EMAIL_CONTACT}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Progressive Form */}
                    <div className="lg:col-span-2 p-8 md:p-12 bg-white flex flex-col h-full transition-all">

                        {/* Step 1: Segment Selection */}
                        {!activeSegment ? (
                            <div className="flex flex-col h-full justify-center">
                                <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">How can we help you today?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button
                                        onClick={() => setActiveSegment('retailer')}
                                        className="group p-8 border-2 border-slate-100 rounded-2xl hover:border-brandBlue hover:bg-blue-50/50 transition-all text-left flex flex-col gap-4 relative overflow-hidden"
                                    >
                                        <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-brandBlue mb-2 group-hover:scale-110 transition-transform">
                                            <ShoppingBag size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">I am a Retailer / Hospital</h4>
                                            <p className="text-slate-600 text-sm">Looking to procure medicines at wholesale rates.</p>
                                        </div>
                                        <ArrowRight className="absolute bottom-8 right-8 text-brandBlue opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                                    </button>

                                    <button
                                        onClick={() => setActiveSegment('brand')}
                                        className="group p-8 border-2 border-slate-100 rounded-2xl hover:border-purple-500 hover:bg-purple-50/50 transition-all text-left flex flex-col gap-4 relative overflow-hidden"
                                    >
                                        <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                                            <Building2 size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">I am a Pharma Brand</h4>
                                            <p className="text-slate-600 text-sm">Looking to expand distribution network in Rajasthan.</p>
                                        </div>
                                        <ArrowRight className="absolute bottom-8 right-8 text-purple-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Step 2: Form Fields
                            <form onSubmit={handleSubmit} className="flex flex-col h-full animate-fadeIn">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                    <h3 className="text-xl font-bold text-slate-800">
                                        {activeSegment === 'retailer' ? 'Retailer / Hospital Inquiry' : 'Brand Partnership Inquiry'}
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSegment(null)}
                                        className="text-sm text-slate-500 hover:text-brandBlue flex items-center gap-1"
                                    >
                                        <ArrowLeft size={16} /> Change
                                    </button>
                                </div>

                                <div className="space-y-6 flex-grow">
                                    {/* Common Fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Your Name *</label>
                                            <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                                            <input required name="phone" type="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none" placeholder="+91..." />
                                        </div>
                                    </div>

                                    {/* Segment Specific Fields */}
                                    {activeSegment === 'retailer' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Pharmacy / Hospital Name *</label>
                                                <input required name="businessName" value={formData.businessName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none" placeholder="e.g. City Life Pharmacy" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">City *</label>
                                                <input required name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none" placeholder="e.g. Bhilwara" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Drug License Status</label>
                                                <select name="drugLicense" value={formData.drugLicense} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none">
                                                    <option value="yes">Available</option>
                                                    <option value="no">Not Available</option>
                                                    <option value="applied">Applied For</option>
                                                </select>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                                                <input required name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none" placeholder="e.g. Zenith Healthcare" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Product Category</label>
                                                <select name="productCategory" value={formData.productCategory} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none">
                                                    <option value="generic">Generic Medicines</option>
                                                    <option value="ethical">Ethical / Branded</option>
                                                    <option value="otc">OTC / Consumer Health</option>
                                                    <option value="surgical">Surgical / Devices</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Website (Optional)</label>
                                                <input name="website" value={formData.website} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none" placeholder="https://..." />
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Message (Optional)</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none resize-none" placeholder="Any specific requirements..."></textarea>
                                    </div>

                                    {/* Email Field if submitting via Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                                        <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue outline-none" placeholder="official@company.com" />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        type="submit"
                                        onClick={() => setSubmissionMethod('whatsapp')}
                                        disabled={status === 'submitting' || status === 'success'}
                                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <MessageCircle size={20} />
                                        {status === 'submitting' && submissionMethod === 'whatsapp' ? 'Opening...' : 'Send via WhatsApp'}
                                    </button>

                                    <button
                                        type="submit"
                                        onClick={() => setSubmissionMethod('email')}
                                        disabled={status === 'submitting' || status === 'success'}
                                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        <Mail size={20} />
                                        {status === 'submitting' && submissionMethod === 'email' ? 'Sending...' : 'Send via Email'}
                                    </button>
                                </div>

                                {status === 'success' && (
                                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 border border-green-200 animate-fadeIn">
                                        <CheckCircle2 size={20} />
                                        <p className="font-medium">Thank you! Your inquiry has been sent successfully.</p>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 animate-fadeIn">
                                        <p className="font-medium">Something went wrong. Please try WhatsApp instead.</p>
                                        {errorMessage && <p className="text-sm mt-1 opacity-75">Error: {errorMessage}</p>}
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};