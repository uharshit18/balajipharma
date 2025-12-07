import React from 'react';
import { Building2, CalendarDays, Users, FileBadge, Truck, ThermometerSnowflake, Building, Pill } from 'lucide-react';

export const BusinessDetails: React.FC = () => {
  const details = [
    {
      label: "Business Name",
      value: "Balaji Pharma Corp.",
      icon: Building2,
      subtext: "Pvt. Ltd. Registered Entity"
    },
    {
      label: "Registration Year",
      value: "2008",
      icon: CalendarDays,
      subtext: "Serving for 16+ Years"
    },
    {
      label: "Team Strength",
      value: "50+ Employees",
      icon: Users,
      subtext: "Qualified Pharmacists & Staff"
    },
    {
      label: "G.S.T. Number",
      value: "08AABCU9603R1Z2",
      icon: FileBadge,
      subtext: "Govt. Compliant Enterprise"
    }
  ];

  const services = [
    {
      label: "Wholesale Supply",
      value: "Bulk Distribution",
      icon: Truck,
      subtext: "Serving 500+ Retail Pharmacies"
    },
    {
      label: "Cold Chain",
      value: "Temp. Controlled",
      icon: ThermometerSnowflake,
      subtext: "For Insulin & Vaccines (2-8°C)"
    },
    {
      label: "Institutional Sales",
      value: "Hospital Supply",
      icon: Building,
      subtext: "Direct Procurement for Hospitals"
    },
    {
      label: "Critical Care",
      value: "Life Saving Drugs",
      icon: Pill,
      subtext: "Oncology & Nephrology Range"
    }
  ];

  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background - Technical Lines Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
           style={{
               backgroundImage: `
                 linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,theme(colors.slate.900)_80%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Corporate Profile */}
        <div className="mb-16">
            <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Corporate Profile</h2>
            <div className="h-1 w-16 bg-brandBlue mx-auto rounded-full mb-4"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm">
                Balaji Pharma stands as a top-tier <strong>wholesale medical supplier in Rajasthan</strong>, headquartered in Bhilwara. We bridge the gap between manufacturers and healthcare providers with integrity.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.map((item, index) => (
                <div 
                key={index} 
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
                >
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-slate-700/50 rounded-full text-blue-400 group-hover:bg-brandBlue group-hover:text-white transition-colors duration-300">
                    <item.icon size={28} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {item.label}
                    </h3>
                    <p className="text-lg font-bold text-white mb-1">
                    {item.value}
                    </p>
                    <p className="text-xs text-slate-500">
                        {item.subtext}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800 mb-16"></div>

        {/* Section 2: Our Services */}
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">Our Core Services</h2>
                <div className="h-1 w-16 bg-green-500 mx-auto rounded-full mb-4"></div>
                <p className="text-slate-400 max-w-2xl mx-auto text-sm">
                    We offer comprehensive pharmaceutical logistics, acting as a key <strong>healthcare products supplier in Rajasthan</strong> tailored for chemists and hospitals.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((item, index) => (
                    <div 
                    key={index} 
                    className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/20"
                    >
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-slate-700/50 rounded-full text-green-400 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                        <item.icon size={28} strokeWidth={1.5} />
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-1">
                        {item.value}
                        </h3>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                            {item.label}
                        </p>
                        <p className="text-xs text-slate-500 border-t border-slate-700 pt-3 mt-1 w-full">
                            {item.subtext}
                        </p>
                    </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};