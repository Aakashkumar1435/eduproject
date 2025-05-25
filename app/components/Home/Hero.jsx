'use client'

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTour = () => {
    router.push('/Mdcat');
  }

  const handleCourse = () => {
    router.push('/pricing');
  }

  return (
    // Added padding-top to accommodate the fixed navbar
    <section className={`bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white pt-24 pb-16 relative overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated background elements - adjusted colors */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-green-500 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-green-400 opacity-20 animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-green-400 opacity-10 animate-ping"></div>
      
      {/* Decorative shapes - adjusted colors */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-green-600 opacity-10"></div>
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-green-700 opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 transform translate-y-0">
            Discover a <span className="text-green-400 relative inline-block">
              Smarter
              <svg className="absolute bottom-0 left-0 w-full h-2 text-green-500 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,0 C25,5 75,5 100,0 L100,10 L0,10 Z" fill="currentColor"></path>
              </svg>
            </span> Way to Learn
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Our immersive learning platform combines interactive content, expert instruction,
            and engaging exercises to make your educational journey exciting and effective.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={handleCourse} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center">
              Explore Courses
              <ChevronRight size={20} className="ml-1" />
            </button>
            <button 
              className="bg-transparent hover:bg-gray-800 text-white border-2 border-green-400 font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
              onClick={handleTour}
            >
              Take a Tour
            </button>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm py-2 px-4 rounded-full flex items-center">
              <span className="block h-3 w-3 rounded-full bg-green-400 mr-2"></span>
              <span className="text-sm">5,000+ Active Learners</span>
            </div>
            <div className="bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm py-2 px-4 rounded-full flex items-center">
              <span className="block h-3 w-3 rounded-full bg-green-400 mr-2"></span>
              <span className="text-sm">200+ Expert Courses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements - adjusted colors */}
      <div className="hidden lg:block absolute -bottom-8 left-12 w-24 h-24 bg-green-200 bg-opacity-10 rounded-lg transform rotate-12 backdrop-filter backdrop-blur-sm"></div>
      <div className="hidden lg:block absolute top-12 right-16 w-16 h-16 bg-green-200 bg-opacity-10 rounded-lg transform -rotate-6 backdrop-filter backdrop-blur-sm"></div>
    </section>
  );
}