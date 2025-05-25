"use client";
import React from "react";

export default function AboutHeader() {
  return (
    <>
      {/* Hero Section with animated accent */}
      <section className="bg-gray-900 text-white py-20 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500 opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          {/* Left side with text */}
          <div className="md:w-1/2 text-left md:pr-10 mb-10 md:mb-0">
            <h1 className="text-5xl font-bold mb-6 text-white relative">
              About Us
              <span className="block h-1 w-16 bg-green-400 mt-4"></span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're dedicated to making quality education accessible to all students
              through comprehensive test preparation and subject mastery resources.
            </p>
            <div className="mt-8">
              <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 mr-4">
                Learn More
              </button>
              <button className="border border-white hover:bg-white hover:text-gray-900 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300">
                Our Programs
              </button>
            </div>
          </div>
          
          {/* Right side with geometric pattern */}
          <div className="md:w-1/2 relative">
            <div className="relative h-64 md:h-96 w-full flex items-center justify-center">
              <div className="absolute w-48 h-48 rounded-full bg-green-500 opacity-20 top-0 right-0"></div>
              <div className="absolute w-32 h-32 rounded-full bg-green-700 opacity-20 bottom-10 left-10"></div>
              <div className="absolute w-40 h-40 rounded-full border-4 border-green-500 opacity-30 top-10 left-20"></div>
              <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg z-10 max-w-sm">
                <h3 className="text-xl font-bold mb-3 text-green-400">Our Impact</h3>
                <p className="text-gray-300">
                  Over 50,000 students helped across 120 countries with a 94% success rate in improving test scores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission - Timeline approach - Now with dark theme */}
      <section className="w-full py-16 px-5 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-16 text-3xl text-white font-bold relative">
            Our Journey & Mission
            <span className="block h-1 w-20 bg-green-500 mx-auto mt-4"></span>
          </h2>
          
          {/* Timeline structure */}
          <div className="relative">
            {/* Center line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700"></div>
            
            {/* Timeline items */}
            <div className="space-y-16">
              {/* Vision - Left side */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500 transition-all duration-300 hover:shadow-xl">
                    <h3 className="text-2xl font-bold mb-3 text-green-400 flex md:justify-end items-center">
                      <span>Our Vision</span>
                      <span className="ml-3 text-3xl">🎯</span>
                    </h3>
                    <p className="text-gray-300">
                      To empower students with access to high-quality educational
                      resources regardless of their background or location, breaking
                      down barriers to educational success.
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 shadow"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-16 md:invisible"></div>
              </div>
              
              {/* Approach - Right side */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:invisible md:pr-16"></div>
                
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 shadow"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-16 mb-8 md:mb-0">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500 transition-all duration-300 hover:shadow-xl">
                    <h3 className="text-2xl font-bold mb-3 text-green-400 flex items-center">
                      <span className="mr-3 text-3xl">💡</span>
                      <span>Our Approach</span>
                    </h3>
                    <p className="text-gray-300">
                      We combine expert teaching methodologies with comprehensive 
                      materials designed for maximum student engagement and retention.
                      Our techniques are research-backed and continuously refined.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Values - Left side */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:text-right">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500 transition-all duration-300 hover:shadow-xl">
                    <h3 className="text-2xl font-bold mb-3 text-green-400 flex md:justify-end items-center">
                      <span>Our Values</span>
                      <span className="ml-3 text-3xl">🌟</span>
                    </h3>
                    <p className="text-gray-300">
                      We believe in accessibility, excellence, and continuous 
                      improvement in all aspects of our educational offerings.
                      We maintain the highest standards and ethical practices.
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 shadow"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-16 md:invisible"></div>
              </div>
              
              {/* Future Focus - Right side */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:invisible md:pr-16"></div>
                
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 shadow"></div>
                </div>
                
                <div className="md:w-1/2 md:pl-16">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500 transition-all duration-300 hover:shadow-xl">
                    <h3 className="text-2xl font-bold mb-3 text-green-400 flex items-center">
                      <span className="mr-3 text-3xl">🚀</span>
                      <span>Future Focus</span>
                    </h3>
                    <p className="text-gray-300">
                      We're committed to evolving with technology and helping
                      students stay ahead through AI-integrated learning tools
                      and innovative educational approaches that prepare them
                      for tomorrow's challenges.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-20 bg-gray-800 rounded-lg p-8 text-center text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-green-500 opacity-10"></div>
            <h3 className="text-2xl font-bold mb-4">Ready to join our mission?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Discover how our educational resources can help you achieve your academic goals.
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-medium transition-colors duration-300">
              Explore Programs
            </button>
          </div>
        </div>
      </section>
    </>
  );
}