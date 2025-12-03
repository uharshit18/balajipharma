import React from 'react';
import { Package, ShieldCheck, Truck } from 'lucide-react';
import { FEATURES } from '../constants';
import { FeatureItem } from '../types';

export const Features: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'box': return <Package className="w-8 h-8 text-brandBlue" />;
      case 'shield': return <ShieldCheck className="w-8 h-8 text-brandBlue" />;
      case 'truck': return <Truck className="w-8 h-8 text-brandBlue" />;
      default: return <Package className="w-8 h-8 text-brandBlue" />;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Us as Your Medical Supplier in Rajasthan?</h2>
          <p className="text-slate-600 max-w-2xl">
            Partner with Balaji Pharma, your dedicated <strong>pharma distributors in Bhilwara</strong>, for uncompromised quality, genuine stock, and seamless service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature: FeatureItem, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed min-h-[80px]">
                {feature.description}
              </p>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                {feature.stats.map((stat, sIdx) => (
                  <div key={sIdx} className={`${sIdx === 1 ? 'text-right' : 'text-left'}`}>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};