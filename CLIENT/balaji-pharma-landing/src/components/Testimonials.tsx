import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Button } from './Button';
import { RajasthanMap } from './RajasthanMap';

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-brandDark py-20 text-white overflow-hidden relative">
      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Map/Network */}
          <div className="relative">
            <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm border border-white/10 h-[500px] flex flex-col">
              <div className="flex-1 bg-brandBlue/20 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/10">
                <RajasthanMap />
              </div>

              <h3 className="text-2xl font-bold mb-2">Connecting Rajasthan's Healthcare</h3>
              <p className="text-blue-100 mb-6 text-sm">Our extensive distribution network ensures life-saving medicines reach every corner of Bhilwara and beyond efficiently.</p>

              <a href="#coverage" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">View Service Areas</Button>
              </a>
            </div>
          </div>

          {/* Right Column: Testimonials */}
          <div>
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4">Partnerships Built on Trust:<br />What Our Clients in Rajasthan Say</h2>
              <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
            </div>

            <div className="space-y-6">
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/5 hover:bg-white/15 transition-colors">
                  <p className="text-blue-50 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.image} alt={testimonial.author} width="40" height="40" className="w-10 h-10 rounded-full object-cover border-2 border-white/20" />
                    <div>
                      <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                      <div className="text-blue-200 text-xs">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="white">Request a Partner Quote</Button>
              <Button variant="outline">Contact Our Sales Team</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};