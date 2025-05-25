import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => (
  <div className="bg-gray-900 text-white">
    <div className="container mx-auto px-4 py-16">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-20">
        <div className="h-64 w-64 rounded-full bg-green-500 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-20">
        <div className="h-64 w-64 rounded-full bg-green-700 blur-3xl"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Join our 2025 Preparation Course
          </h1>
          <h2 className="text-3xl font-bold text-green-400">
            92% PASSING GRADE IN JUST <br />
            <span className="text-green-300">2.5 HOURS A DAY!</span>
          </h2>
          <p className="text-lg text-gray-200">
            Our focused study methodology gets results. Limited seats available.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all">
              Admissions Open
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white border border-green-500 font-medium px-6 py-3 rounded-lg flex items-center gap-2 transition-all">
              Learn More
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-800 border border-green-600 rounded-xl p-6 shadow-lg shadow-green-900/20">
            <div className="mb-4">
              <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Limited Time Offer
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              MDCAT
            </h3>
            <h4 className="text-xl font-bold text-green-400 mb-1">
              BATCH 2025
            </h4>
            <h4 className="text-3xl font-bold text-green-300 mb-6">
              BRAVO
            </h4>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-green-800">
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-1">
                  Classes Start
                </p>
                <p className="text-xl font-bold text-white">
                  May 15
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-1">
                  Seats Left
                </p>
                <p className="text-xl font-bold text-green-400">
                  12
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;