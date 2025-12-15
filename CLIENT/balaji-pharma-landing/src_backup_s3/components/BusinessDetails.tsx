import React from 'react';
import { Truck, ThermometerSnowflake, Building, Pill, Syringe } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/animations';

export const BusinessDetails: React.FC = () => {
  const details = [
    { label: "Business Name", value: "Balaji Pharma", subtext: "Wholesale & Dist." },
    { label: "Est. Year", value: "2008", subtext: "16+ Years Serving" },
    { label: "Team", value: "50+", subtext: "Dedicated Staff" },
    { label: "GST No", value: "08ABLPU0922B1ZT", subtext: "Govt. Compliant" },
    { label: "Ann. Turnover", value: "10 Cr+", subtext: "Consistent Growth" }
  ];

  const services = [
    { label: "Wholesale", value: "Bulk Supply", icon: Truck },
    { label: "Cold Chain", value: "Temp. Control", icon: ThermometerSnowflake },
    { label: "Institutional", value: "Hospital Supply", icon: Building },
    { label: "Critical Care", value: "Life Saving", icon: Pill },
    { label: "Wide Range", value: "Generic Meds", icon: Syringe }
  ];

  return (
    <section className="relative py-12 md:py-20 bg-[#0B1120] overflow-hidden">
      {/* Background - Technical Lines Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B1120_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section 1: Corporate Profile - Compact Grid */}
        <div className="mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Corporate Profile</h2>
            <div className="h-1 w-16 bg-brandBlue mx-auto rounded-full mb-4"></div>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Connecting supply roots to delivery in Rajasthan for over 16 years.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6"
          >
            {details.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 md:p-6 hover:bg-slate-800/80 hover:border-brandBlue/30 transition-all duration-300 text-center flex flex-col justify-center items-center ${index === details.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
              >
                <h3 className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 md:mb-2 group-hover:text-brandBlue transition-colors">
                  {item.label}
                </h3>
                <p className="text-lg md:text-xl font-bold text-white mb-1 break-all leading-tight">
                  {item.value}
                </p>
                <p className="text-[10px] md:text-xs font-medium text-slate-500">
                  {item.subtext}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent my-8 md:my-12"></div>

        {/* Section 2: Our Services - Compact Cards */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Core Services</h2>
            <div className="h-1 w-16 bg-emerald-500 mx-auto rounded-full mb-4"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6"
          >
            {services.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-4 md:p-6 hover:bg-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-center text-center ${index === services.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="mb-3 md:mb-4 p-3 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <item.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm md:text-base font-bold text-white mb-1 leading-tight">
                  {item.value}
                </h3>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};