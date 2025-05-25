
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
    <section className={`bg-gradient-to-br from-gray-900 via-gray-850 to-gray-800 py-20 overflow-hidden transition-all duration-700 relative ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background decorative elements */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-green-600 rounded-full opacity-5"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-500 rounded-full opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
            <div className="px-4 py-2 bg-gray-800 rounded-full text-green-400 font-medium text-sm mb-4 flex items-center">
              <Sparkles size={16} className="mr-2 text-green-400" />
              Trusted by 50,000+ students
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Join thousands of students achieving academic success
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              With our targeted study materials, practice tests, and expert guidance for MDCAT, ECAT, FSC and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 flex items-center">
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </button>
              <button className="bg-transparent hover:bg-gray-700 text-green-400 border-2 border-green-500 font-bold py-3 px-8 rounded-lg transition-all duration-300">
                View Courses
              </button>
            </div>
            
            <div className="mt-10 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(index => (
                  <div key={index} className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-700 overflow-hidden flex items-center justify-center">
                    <div className="bg-green-600 text-white text-xs font-bold w-full h-full flex items-center justify-center">
                      {String.fromCharCode(64 + index)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-4 flex items-center">
                <Award size={16} className="text-yellow-500 mr-1" />
                <span className="text-gray-200 font-medium text-sm">4.9/5 student rating</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Modern floating card design with subject icons */}
              <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 mb-6 transform transition-all duration-500 hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="bg-green-600 rounded-lg p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-white font-bold">MDCAT Prep</h3>
                    <p className="text-gray-400 text-sm">Comprehensive preparation</p>
                  </div>
                </div>
                <div className="bg-gray-700 h-2 rounded-full w-full">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="mt-2 text-right text-gray-400 text-sm">85% Success Rate</div>
              </div>
              
              {/* Floating cards with animation */}
              <div className="absolute right-0 -top-4 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-3 flex items-center transform rotate-3 animate-float" style={{ animationDuration: '4s' }}>
                <div className="bg-green-700 text-white h-8 w-8 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-xl">⚗️</span>
                </div>
                <span className="text-white text-sm font-medium">Chemistry</span>
              </div>
              
              <div className="absolute -left-4 top-24 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-3 flex items-center transform -rotate-6 animate-float" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
                <div className="bg-blue-700 text-white h-8 w-8 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-xl">🧬</span>
                </div>
                <span className="text-white text-sm font-medium">Biology</span>
              </div>
              
              <div className="absolute -right-2 bottom-12 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-3 flex items-center transform rotate-6 animate-float" style={{ animationDuration: '4.5s', animationDelay: '1s' }}>
                <div className="bg-purple-700 text-white h-8 w-8 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-xl">⚛️</span>
                </div>
                <span className="text-white text-sm font-medium">Physics</span>
              </div>
              
              <div className="absolute left-12 -bottom-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-3 flex items-center transform -rotate-3 animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.7s' }}>
                <div className="bg-yellow-600 text-white h-8 w-8 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-xl">🔢</span>
                </div>
                <span className="text-white text-sm font-medium">Mathematics</span>
              </div>
              
              {/* Central design element */}
              <div className="mt-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl border border-gray-700 shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-gray-900 px-3 py-1 rounded-full text-xs text-green-400">Professional Study Plans</div>
                  <div className="text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="logo.png" alt="logo" className="h-16 w-16 rounded-full border-2 border-green-500 object-cover" />
                  <div className="ml-4">
                    <h3 className="text-white font-bold text-lg">CrackIt Study Plans</h3>
                    <p className="text-gray-400">Custom-tailored for your needs</p>
                    <div className="mt-2 text-green-400 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Start learning today
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}