'use client'

import { useState, useEffect } from 'react';
import { ArrowRight, Award, Sparkles } from 'lucide-react';

export default function Hero2() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className={`bg-gradient-to-br from-green-50 to-emerald-100 py-20 overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="px-4 py-2 bg-green-100 rounded-full text-green-800 font-medium text-sm mb-4 flex items-center">
              <Sparkles size={16} className="mr-2 text-green-600" />
              Trusted by 50,000+ students
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6 leading-tight">
              Join thousands of students achieving academic success
            </h2>
            
            <p className="text-lg text-green-700 mb-8">
              With our targeted study materials, practice tests, and expert guidance for MDCAT, ECAT, FSC and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </button>
              <button className="bg-transparent hover:bg-green-100 text-green-600 border-2 border-green-600 font-bold py-3 px-8 rounded-lg transition-all duration-300">
                View Courses
              </button>
            </div>
            
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(index => (
                  <div key={index} className="w-8 h-8 rounded-full border-2 border-white bg-green-200 overflow-hidden flex items-center justify-center">
                    <div className="bg-green-600 text-white text-xs font-bold w-full h-full flex items-center justify-center">
                      {String.fromCharCode(64 + index)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-4 flex items-center">
                <Award size={16} className="text-yellow-500 mr-1" />
                <span className="text-green-800 font-medium text-sm">4.9/5 student rating</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full opacity-10 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-40"></div>
              <div className="absolute inset-8 bg-white rounded-full shadow-xl flex items-center justify-center">
                <span className="text-6xl">🧑‍🎓</span>
              </div>
              
              {/* Rotating orbiting elements */}
              <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '15s' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                  <span className="text-2xl">🔢</span>
                </div>
              </div>
              
              <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '18s', animationDelay: '1s' }}>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                  <span className="text-2xl">⚛️</span>
                </div>
              </div>
              
              <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '20s', animationDelay: '2s' }}>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                  <span className="text-2xl">⚗️</span>
                </div>
              </div>
              
              <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '17s', animationDelay: '1.5s' }}>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                  <span className="text-2xl">🧬</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-green-400 rounded-full opacity-5"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400 rounded-full opacity-5"></div>
    </section>
  );
}