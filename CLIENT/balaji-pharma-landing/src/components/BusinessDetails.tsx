import React from 'react';
import { Building2, CalendarDays, Users, FileBadge, Truck, ThermometerSnowflake, Building, Pill, TrendingUp, Syringe } from 'lucide-react';

export const BusinessDetails: React.FC = () => {
  const details = [
    {
      label: "Business Name",
      value: "Balaji Pharma",
      subtext: "Wholesalers & Distributors"
    },
    {
      label: "Registration Year",
      value: "2008",
      subtext: "Serving for 16+ Years"
    },
    {
      label: "Team Strength",
      value: "50 Employees", // Removed + as requested
      subtext: "For Health & Wellness Daily"
    },
    {
      label: "G.S.T. Number",
      value: "08ABLPU0922B1ZT",
      subtext: "Govt. Compliant Intelligence"
    },
    {
      label: "Annual Turnover",
      value: "10 Cr+",
      subtext: "Consistent Growth"
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
    },
    {
      label: "Wide Range",
      value: "Generic Supplier",
      icon: Syringe,
      subtext: "High Quality Generic Medicines"
    }
  ];

  return (
    <section className="relative py-24 bg-[#0B1120] overflow-hidden">
      {/* Background - Technical Lines Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
               `,
          backgroundSize: '40px 40px'
        }}>
      </div>

      {/* Radial Gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B1120_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section 1: Corporate Profile */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Corporate Profile</h2>
            <div className="h-1.5 w-24 bg-brandBlue mx-auto rounded-full mb-8"></div>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed font-light">
              This summary outlines our corporate profile at Balaji Pharma, where we connect the roots of supply to the delivery that enables a healthier life completely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-center">
            {details.map((item, index) => (
              <div
                key={index}
                className="group relative bg-[#0F172A]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 hover:bg-[#1E293B] hover:border-brandBlue/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brandBlue/10 flex flex-col justify-center items-center h-full min-h-[220px]"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 group-hover:text-brandBlue/80 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">
                    {item.value}
                  </p>
                  <p className="text-xs font-medium text-slate-500 group-hover:text-slate-400 transition-colors">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-24 opacity-50"></div>

        {/* Section 2: Our Services */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Core Services</h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full mb-8"></div>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed font-light">
              Our Core Services include bulk distribution, cold chain logistics, and institutional supply, ensuring medicine reaches everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((item, index) => (
              <div
                key={index}
                className="group relative bg-[#0F172A]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-8 hover:bg-[#1E293B] hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col items-center h-full min-h-[280px]"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center text-center h-full justify-between w-full">
                  <div className="mb-6 p-5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 group-hover:border-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.6)]">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {item.value}
                    </h3>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">
                      {item.label}
                    </p>
                    <div className="w-12 h-0.5 bg-slate-700 mx-auto mb-4 group-hover:bg-emerald-500/50 transition-colors"></div>
                    <p className="text-slate-500 text-xs w-full leading-relaxed">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};