import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
    onNavigate: (view: 'home' | 'about' | 'brands', hash?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    return (
        <section className="relative bg-slate-900 overflow-hidden lg:min-h-[700px] flex items-center group">
            {/* Background Image with Slow Zoom Animation (Ken Burns Effect) */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000"
                    alt="Pharmaceutical Warehouse Bhilwara Rajasthan"
                    className="w-full h-full object-cover opacity-30 animate-zoom-slow"
                />
                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </div>

            {/* Decorative Blur Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandBlue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <div className="max-w-2xl lg:w-1/2 z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6 animate-fade-in-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            All Top pharma brands, supplying across Rajasthan
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight opacity-0 animate-fade-in-up [animation-delay:200ms] fill-mode-forwards">
                            Wholesale Pharmaceuticals <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">in Rajasthan</span>
                        </h1>

                        <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed font-medium opacity-0 animate-fade-in-up [animation-delay:400ms] fill-mode-forwards">
                            As one of the leading <strong className="text-blue-200">pharma distributors in Bhilwara</strong>, we supply genuine healthcare products to retailers & wholesalers, establishing ourselves as a trusted <strong className="text-blue-200">wholesale medical supplier in Rajasthan</strong>.
                        </p>

                        <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up [animation-delay:600ms] fill-mode-forwards">
                            <a
                                href="#contact"
                                className="text-lg px-8 py-3.5 shadow-lg shadow-blue-500/25 border-none bg-brandBlue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                            >
                                Start Ordering
                            </a>
                            <Link
                                to="/wholesale-medicines-rajasthan"
                                className="text-lg px-8 py-3.5 backdrop-blur-sm hover:bg-white/10 border border-white/20 text-white font-bold rounded-lg transition-colors flex items-center justify-center"
                            >
                                View Catalog
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-12 flex items-center gap-8 opacity-0 animate-fade-in-up [animation-delay:800ms] fill-mode-forwards">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Pharmacist" className="w-10 h-10 rounded-full border-2 border-slate-900" />
                                ))}
                            </div>
                            <div className="text-sm text-slate-400">
                                <span className="font-bold text-white block">500+ Retailers and Wholesalers</span>
                                Trusted in Rajasthan
                            </div>
                        </div>
                    </div>
                    {/* Right: Visual Representation (Organized & Professional) */}
                    <div className="lg:w-1/2 relative w-full mt-16 lg:mt-0">

                        {/* Image Container with Gradient Mask */}
                        <div className="relative z-10 rounded-2xl overflow-visible max-w-lg mx-auto lg:max-w-none px-4 lg:px-0">

                            {/* Main Image */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/40 ring-1 ring-white/10">
                                <img
                                    src="/assets/BANNER-IAMGE.png"
                                    alt="Bhilwara Medicine Dispatch"
                                    className="w-full h-auto object-contain"
                                />

                                {/* Gradient Fade Envelopes (Blending) - Subtler */}
                                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60"></div>
                                <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-900/20 to-transparent"></div>
                                <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-900/20 to-transparent"></div>
                            </div>

                            {/* Floating Badge: Fast Turnaround (Top Right - Anchored) */}
                            <div className="absolute -top-6 -right-4 md:-right-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 animate-fade-in-up [animation-delay:800ms] flex items-center gap-4 max-w-[240px]">
                                <div className="bg-orange-50 p-2.5 rounded-full shrink-0">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">Swift Dispatch</p>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">Same-day in Bhilwara</p>
                                </div>
                            </div>

                            {/* Floating Badge: Quality (Bottom Left - Anchored) */}
                            <div className="absolute -bottom-6 -left-4 md:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 animate-fade-in-up [animation-delay:1000ms] flex items-center gap-4 max-w-[240px]">
                                <div className="bg-emerald-50 p-2.5 rounded-full shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 leading-tight">Quality Checked</p>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">100% Genuine Stock</p>
                                </div>
                            </div>

                        </div>

                        {/* Background Splashes for Depth */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section >
    );
};