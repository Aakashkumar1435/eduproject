import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => (
  <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-500 to-teal-400">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-300 via-green-400 to-transparent opacity-30"></div>
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-800 via-emerald-600 to-transparent opacity-20"></div>
    
    {/* Decorative elements */}
    <div className="absolute left-0 bottom-0 w-full h-64 bg-gradient-to-t from-green-900 to-transparent opacity-10"></div>
    <div className="absolute top-20 left-20 w-24 h-24 rounded-full bg-white opacity-10"></div>
    <div className="absolute bottom-20 right-40 w-16 h-16 rounded-full bg-white opacity-10"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block px-4 py-1 bg-green-800 bg-opacity-50 text-emerald-100 rounded-full text-sm font-medium mb-4">
            Join our 2025 Preparation Course
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            <span>92% PASSING GRADE IN JUST</span>
            <br />
            <span className="text-emerald-200">2.5 HOURS A DAY!</span>
          </h1>
          <p className="mt-4 text-emerald-100 text-lg">
            Our focused study methodology gets results. Limited seats available.
          </p>
          <div className="mt-8 flex space-x-4">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-emerald-800 bg-white hover:bg-emerald-50 shadow-lg transition-all duration-200"
            >
              Admissions Open <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-full text-white hover:bg-emerald-800 hover:bg-opacity-30 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-emerald-900 p-6 rounded-2xl border-4 border-emerald-300 shadow-xl transform rotate-2 backdrop-blur">
            <div className="text-center">
              <div className="mb-2 inline-block px-3 py-1 bg-emerald-800 rounded-lg text-emerald-200 text-sm font-medium">
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                <span className="text-emerald-300">MDCAT</span>
              </h2>
              <p className="text-2xl md:text-3xl font-bold text-white">BATCH 2025</p>
              <div className="mt-4 bg-emerald-300 py-2 px-6 rounded-lg shadow-inner">
                <p className="text-2xl font-black text-emerald-900">BRAVO</p>
              </div>
              <div className="mt-4 flex justify-between items-center text-emerald-100">
                <div className="text-left">
                  <p className="text-sm font-medium">Classes Start</p>
                  <p className="font-bold">May 15</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Seats Left</p>
                  <p className="font-bold">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;