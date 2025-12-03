import React, { useState } from 'react';
import { Button } from './Button';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { PHONE_VALUE, PHONE_DISPLAY, EMAIL_CONTACT } from '../constants';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    orgName: '',
    phone: '',
    email: '',
    city: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Construct Messages
    const whatsappMessage = `*New Inquiry via Website* %0A%0A*Name:* ${formData.name}%0A*Org:* ${formData.orgName}%0A*Phone:* ${formData.phone}%0A*City:* ${formData.city}%0A*Message:* ${formData.message}`;

    // Simulate "sending" then redirect
    setTimeout(() => {
      setStatus('success');
      
      // Open WhatsApp (Primary)
      window.open(`https://wa.me/${PHONE_VALUE}?text=${whatsappMessage}`, '_blank');
      
      // Reset form after delay
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', orgName: '', phone: '', email: '', city: '', message: '' });
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="contact">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-4">
             <Mail size={16} /> Get in Touch
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Streamline Your Pharma Procurement?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
             Connect with Balaji Pharma today. Whether you are a retailer, hospital, or manufacturer, we are here to support your healthcare logistics needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
          
          {/* Left Column: Contact Info */}
          <div className="bg-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <p className="text-slate-300 mb-10 leading-relaxed">
                    Reach out via WhatsApp for the fastest response, or visit our headquarters.
                </p>
                
                <div className="space-y-8">
                    {/* Primary WhatsApp CTA in Sidebar */}
                    <a 
                        href={`https://wa.me/${PHONE_VALUE}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 bg-green-600 hover:bg-green-500 p-4 rounded-xl transition-all shadow-lg hover:shadow-green-900/30 group cursor-pointer border border-green-500/50"
                    >
                        <div className="bg-white p-2 rounded-full text-green-600 group-hover:scale-110 transition-transform">
                            <MessageCircle size={24} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-xs text-green-100 font-semibold uppercase tracking-wider mb-0.5">Recommended</p>
                            <p className="text-lg font-bold text-white">WhatsApp Us</p>
                        </div>
                    </a>

                    <div className="flex items-start gap-4 pt-4">
                        <div className="bg-white/10 p-3 rounded-lg text-blue-400">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">Call Us</p>
                            <a href="tel:01482239078" className="block text-lg font-semibold hover:text-blue-300 transition-colors">01482-239078</a>
                            <a href={`tel:${PHONE_VALUE}`} className="block text-lg font-semibold hover:text-blue-300 transition-colors">{PHONE_DISPLAY}</a>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg text-blue-400">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">Email Us</p>
                            <a href={`mailto:${EMAIL_CONTACT}`} className="block text-lg font-semibold hover:text-blue-300 transition-colors break-all">{EMAIL_CONTACT}</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-white/10 p-3 rounded-lg text-blue-400">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-1">Visit HQ</p>
                            <p className="text-lg font-semibold leading-snug">
                                B-27, Fateh Tower,<br/>
                                Nagori Garden, Bhilwara,<br/>
                                Rajasthan 311001
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Form with Priority WhatsApp Block */}
          <div className="lg:col-span-2 p-10 bg-white flex flex-col h-full">
            
            {/* Priority Action Block */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <MessageCircle className="text-green-600" fill="currentColor" />
                        Get Faster Response
                    </h3>
                    <p className="text-slate-600 text-sm mt-1">Average response time: <span className="font-semibold text-green-700">under 15 minutes</span> during working hours.</p>
                </div>
                <a 
                    href={`https://wa.me/${PHONE_VALUE}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                    Chat on WhatsApp
                </a>
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-4 mb-8">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">Or send a detailed enquiry below</span>
                <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="orgName" className="block text-sm font-medium text-slate-700 mb-2">Pharmacy / Hospital</label>
                        <input 
                            type="text" 
                            id="orgName" 
                            name="orgName" 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                            placeholder="Your Business Name"
                            value={formData.orgName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            required
                            pattern="[0-9]{10}"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">City / District <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        placeholder="e.g. Bhilwara"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        rows={3} 
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brandBlue focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                        placeholder="I am interested in..."
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="pt-2">
                    <Button 
                        type="submit" 
                        variant="white" 
                        className="w-full md:w-auto text-lg px-8 py-3 shadow-sm border-slate-300 text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
                        disabled={status === 'submitting' || status === 'success'}
                    >
                        {status === 'submitting' ? (
                            <>Opening WhatsApp...</>
                        ) : status === 'success' ? (
                            <><CheckCircle2 /> Request Sent!</>
                        ) : (
                            <><Send size={18} /> Send Inquiry via WhatsApp</>
                        )}
                    </Button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};