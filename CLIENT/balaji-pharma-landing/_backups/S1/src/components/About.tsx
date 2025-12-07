import React from 'react';
import { Button } from './Button';
import { Calendar, TrendingUp, Users, ShieldCheck, Truck, HeartHandshake, Quote, Play } from 'lucide-react';
import { RajasthanMap } from './RajasthanMap';
import { BrandShowcase } from './BrandShowcase';

export const About: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in-up">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&q=80&w=2000" 
            alt="Medical Warehouse" 
            className="w-full h-full object-cover opacity-20 animate-zoom-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold text-sm uppercase tracking-wider backdrop-blur-sm">
            Our Journey
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Delivering Health,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Building Trust Since 2008.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium">
            From a local Bhilwara store to Rajasthan's trusted pharmaceutical partner. We bridge the gap between world-class manufacturers and the healthcare providers who serve our communities.
          </p>
        </div>
      </section>

      {/* 2. Key Metrics */}
      <section className="py-12 bg-white relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {[
                    { label: "Years of Service", value: "16+" },
                    { label: "Partner Brands", value: "75+" },
                    { label: "Active Clients", value: "500+" },
                    { label: "Districts Covered", value: "All Raj." }
                ].map((stat, i) => (
                    <div key={i} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-brandBlue mb-1">{stat.value}</div>
                        <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. The Balaji Pharma Growth Story (Redesigned) */}
      <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="mb-20 max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              The Balaji Journey
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              From humble beginnings in 2008 to becoming Rajasthan’s trusted pharmaceutical supply network, our story is defined by resilience and reliability.
            </p>
            <div className="h-1.5 w-24 bg-brandBlue rounded-full mt-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            
            {/* Left Column: Video Story (40%) */}
            <div className="lg:col-span-2 sticky top-24">
              <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all duration-500 transform hover:-translate-y-1">
                 {/* Video Thumbnail Placeholder */}
                 <div className="aspect-[4/5] bg-slate-900 relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=800" 
                      alt="Balaji Pharma Success Story" 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 p-8">
                        <h3 className="text-white text-2xl font-bold mb-2">Building Trust</h3>
                        <p className="text-slate-300 text-sm">Watch how we deliver promises, one box at a time.</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column: Modern Timeline (60%) */}
            <div className="lg:col-span-3 relative">
                {/* Timeline Track */}
                <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-brandBlue via-cyan-400 to-slate-200 hidden md:block rounded-full"></div>

                <div className="space-y-12">
                    {[
                        { 
                            year: "2008", 
                            title: "Inception & Local Focus", 
                            icon: Calendar,
                            desc: "Started in Nagori Garden, Bhilwara with a small team. We focused on serving just a few local pharmacies, establishing a reputation for absolute reliability.",
                            color: "bg-blue-600"
                        },
                        { 
                            year: "2012", 
                            title: "Expansion Phase", 
                            icon: TrendingUp,
                            desc: "Through consistent service, we expanded our logistics network beyond Bhilwara town to cover nearby tehsils, adding our first fleet of delivery vehicles.",
                            color: "bg-cyan-500"
                        },
                        { 
                            year: "2018", 
                            title: "Infrastructure Growth", 
                            icon: Truck,
                            desc: "Inaugurated our modern warehouse facility with cold-chain capabilities, allowing us to stock sensitive critical-care medicines.",
                            color: "bg-indigo-500"
                        },
                        { 
                            year: "Present", 
                            title: "Pan-Rajasthan Leader", 
                            icon: Users,
                            desc: "Now a stockist for 75+ reputed brands, serving 500+ retailers and hospitals across the entire state of Rajasthan.",
                            color: "bg-brandBlue"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="relative pl-0 md:pl-24 group">
                            {/* Connector Dot (Desktop) */}
                            <div className={`absolute left-[26px] top-8 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 hidden md:block transition-colors duration-300 ${item.color}`}></div>
                            
                            {/* Card */}
                            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                                {/* Hover Accent Line */}
                                <div className={`absolute top-0 left-0 w-1 h-full ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    {/* Icon Box */}
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${item.color} bg-opacity-10 flex flex-col items-center justify-center text-center`}>
                                        <item.icon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')} mb-1`} />
                                        <span className={`text-xs font-bold ${item.color.replace('bg-', 'text-')}`}>{item.year}</span>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brandBlue transition-colors">{item.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Director's Note */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 relative">
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg transform rotate-[-2deg] border-4 border-white">
                            <img 
                                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" 
                                alt="Harshit Upadhyay - Director" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-brandBlue text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                            <p className="font-bold text-lg">Harshit Upadhyay</p>
                            <p className="text-blue-200 text-xs uppercase tracking-wide">Founder & Director</p>
                        </div>
                    </div>
                    <div className="md:col-span-8">
                        <Quote className="text-blue-200 w-20 h-20 mb-6 opacity-50" fill="currentColor" />
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">From Vision to Reality</h2>
                        <div className="prose prose-lg text-slate-600 mb-8 leading-relaxed">
                            <p className="mb-6">
                                "When we started Balaji Pharma in 2008, the vision was simple: to ensure that no patient in our region suffers due to the unavailability of quality medicines. Healthcare is not just a business; it's a responsibility."
                            </p>
                            <p>
                                "Over the years, we have built our reputation brick by brick on the foundation of trust. We don't just supply boxes; we deliver promises—promises of purity, authenticity, and timeliness. I am proud of what our team has achieved and excited for the future of healthcare infrastructure in Rajasthan."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 5. Company Fundamentals (Values) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Why We Are Different</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Our core values define who we are and how we serve our partners.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: "Reliability", icon: Truck, desc: "Consistent delivery schedules you can plan your business around." },
                    { title: "Integrity", icon: ShieldCheck, desc: "100% genuine products sourced directly from manufacturers." },
                    { title: "Reach", icon: TrendingUp, desc: "An extensive network covering the entire state of Rajasthan." },
                    { title: "Partnership", icon: HeartHandshake, desc: "Strong, long-term relationships with 75+ top pharma brands." }
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                        <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="text-brandBlue w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 6. Expanding Network Map */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Expanding Across Rajasthan</h2>
                <p className="text-blue-200 max-w-2xl mx-auto">
                    From our headquarters in Bhilwara, we now serve districts across the entire state.
                </p>
            </div>
            <div className="h-[500px] w-full bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                <RajasthanMap />
            </div>
        </div>
      </section>

      {/* 7. Partner Brands */}
      <div className="py-12 bg-slate-50">
          <BrandShowcase />
      </div>

      {/* 8. CTA Section */}
      <section className="py-20 bg-brandBlue text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Partner with Us?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                Join our network of over 500+ satisfied retailers and experience the difference of working with Rajasthan's premier medical supplier.
            </p>
            <Button variant="white" className="text-lg px-8 py-4 shadow-xl text-brandBlue hover:bg-blue-50" onClick={() => window.location.hash = '#contact'}>
                Contact Us Today
            </Button>
        </div>
      </section>
    </div>
  );
};