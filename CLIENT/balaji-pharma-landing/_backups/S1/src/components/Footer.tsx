import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { FOOTER_LINKS, LOGO_URL, EMAIL_CONTACT, PHONE_DISPLAY } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CTA Banner */}
        <div className="text-center mb-16 pb-12 border-b border-slate-800">
             <h2 className="text-2xl text-white font-bold mb-2">Ready to Streamline Your Pharma Procurement?</h2>
             <p className="text-slate-400 mb-0 text-sm">Connect with Balaji Pharma today for reliable supply and service in Rajasthan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
               <img 
                  src={LOGO_URL} 
                  alt="Balaji Pharma" 
                  className="h-20 w-auto object-contain bg-white/5 rounded-xl p-1" 
               />
               <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-white leading-none tracking-tight">
                    Balaji Pharma
                  </span>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">
                    Wholesalers & Distributors
                  </span>
               </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
                Your trusted wholesale medical supplier in Bhilwara, ensuring quality healthcare products reach every doorstep since 2008.
            </p>
          </div>

          <div>
             <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
             <ul className="space-y-2 text-sm">
                {FOOTER_LINKS.map((link, idx) => (
                    <li key={idx}>
                        <a href={link.href} className="hover:text-white transition-colors">{link.label}</a>
                    </li>
                ))}
             </ul>
          </div>

          <div>
             <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
             <ul className="space-y-3 text-sm">
                <li>B-27, Fateh Tower, Nagori Garden</li>
                <li>Bhilwara, Rajasthan, 311001</li>
                <li>01482-239078</li>
                <li>{PHONE_DISPLAY}</li>
                <li>{EMAIL_CONTACT}</li>
             </ul>
          </div>

          <div>
             <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Social</h3>
             <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 pt-8 border-t border-slate-800">
             <p>&copy; {new Date().getFullYear()} Balaji Pharma Corp. All rights reserved.</p>
             <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
                <span className="hover:text-slate-400 cursor-pointer">Terms of Use</span>
             </div>
        </div>
      </div>
    </footer>
  );
};