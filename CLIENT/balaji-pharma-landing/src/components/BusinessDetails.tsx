import React from 'react';
import { Building2, CalendarDays, Users, FileBadge, Truck, ThermometerSnowflake, Building, Pill, TrendingUp, Syringe } from 'lucide-react';

export const BusinessDetails: React.FC = () => {
  const details = [
    {
      label: "Business Name",
      value: "Balaji Pharma",
      icon: Building2,
      subtext: "Wholesalers & Distributors" // Updated from Pvt Ltd
    },
    {
      label: "Registration Year",
      value: "2008",
      icon: CalendarDays,
      subtext: "Serving for 16+ Years"
    },
    {
      label: "Team Strength",
      value: "+50 Employees",
      icon: Users,
      subtext: "For Health & Wellness Daily"
    },
    {
      label: "G.S.T. Number",
      value: "08ABLPU0922B1ZT", // Updated GST
      icon: FileBadge,
      subtext: "Govt. Compliant Intelligence"
    },
    {
      label: "Annual Turnover",
      value: "10 Cr+",
      icon: TrendingUp,
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
              This summary outlines our corporate profile at Balaji Pharma, where we connect the roots of supply to the delivery that enables a healthier life completely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {details.map((item, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/20"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Removed the large circle icon background to match the "clean" image look more, or kept it if it fits. The image (Corporate Profile) has NO icons, just text. 
                     Wait, the image for Corporate Profile has NO icons. It has "BUSINESS NAME", "Balaji Pharma", and small subtext.
                     I should probably REMOVE the icons for Corporate Profile to match the specific design image `uploaded_image_0`.
                   */}
                  {/* Actually looking closely at uploaded_image_0: It has a clean text look. NO ICONS. 
                       I will comment out the icon or remove it for this section to match the image exactly.
                   */}

                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {item.label}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-white mb-2">
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
              Our Core Services include bulk distribution, cold chain logistics, and institutional supply, ensuring medicine reaches everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((item, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/20 h-full"
              >
                <div className="flex flex-col items-center text-center h-full justify-between">
                  {/* The Core Services image (uploaded_image_1) DOES have icons in green circles. */}
                  <div className="mb-6 p-4 rounded-full border-2 border-green-500/30 text-green-500 group-hover:border-green-500 group-hover:text-green-400 transition-all duration-300">
                    <item.icon size={32} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.value}
                    </h3>
                    <p className="text-slate-400 text-xs">
                      {item.label}
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