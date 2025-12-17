import React from 'react';
import { Star, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_VALUE } from '../constants'; // Ensure we use the global phone constant

interface GoogleReviewsBadgeProps {
    className?: string;
}

export const GoogleReviewsBadge: React.FC<GoogleReviewsBadgeProps> = ({ className = "" }) => {
    return (
        <div className={`w-full bg-white border-y border-gray-100 shadow-sm ${className}`}>
            <div className="container mx-auto px-4 py-4 md:py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 max-w-5xl mx-auto">

                    {/* Left Side: Rating */}
                    <div className="flex items-center gap-6">
                        {/* Google Logo (Simulated for speed/no-assets) */}
                        <div className="text-2xl md:text-3xl font-bold tracking-tighter select-none">
                            <span className="text-[#4285F4]">G</span>
                            <span className="text-[#EA4335]">o</span>
                            <span className="text-[#FBBC05]">o</span>
                            <span className="text-[#4285F4]">g</span>
                            <span className="text-[#34A853]">l</span>
                            <span className="text-[#EA4335]">e</span>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-slate-800">4.8</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-5 h-5 ${star <= 5 ? 'fill-[#FBBC05] text-[#FBBC05]' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <a
                                href="https://share.google/tScfngwy6qG28r6lN"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-slate-500 hover:text-brandBlue underline decoration-slate-300 hover:decoration-brandBlue transition-all"
                            >
                                See our reviews
                            </a>
                        </div>
                    </div>

                    {/* Divider on desktop */}
                    <div className="hidden md:block w-px h-12 bg-gray-200"></div>

                    {/* Right Side: Contact */}
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <Phone className="w-6 h-6 text-brandBlue animate-pulse" />
                        </div>
                        <div>
                            <a href={`tel:${PHONE_VALUE}`} className="text-xl md:text-2xl font-bold text-slate-800 hover:text-brandBlue transition-colors font-mono">
                                {PHONE_DISPLAY}
                            </a>
                            <p className="text-xs md:text-sm text-slate-500 font-medium">Call for Bulk Orders</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
