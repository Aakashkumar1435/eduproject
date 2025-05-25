'use client'

import { useState, useEffect } from 'react';

export default function OurJourney() {
  const [activeStep, setActiveStep] = useState(3); // Set to the total number of steps to show all by default
  const [visibleCards, setVisibleCards] = useState([0, 1, 2]); // Show all cards by default

  useEffect(() => {
    // Animate timeline on component mount rather than waiting for scroll
    const animateTimeline = () => {
      setActiveStep(0); // Reset to start animation from beginning
      
      const interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev < timeline.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 800);
      
      return () => clearInterval(interval);
    };
    
    // Start animation after a short delay
    const timeoutId = setTimeout(animateTimeline, 500);
    
    // Make all vision cards visible
    const cards = document.querySelectorAll('.vision-card');
    const indices = Array.from(cards).map((_, index) => index);
    setVisibleCards(indices);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const timeline = [
    {
      icon: "💡",
      date: "January 2025",
      title: "The Initial Spark",
      desc: "It all began with a simple observation: students needed better resources to prepare for competitive exams. Our founder envisioned a platform that would bridge this gap.",
    },
    {
      icon: "🔍",
      date: "February 2025",
      title: "Research & Planning",
      desc: "We spent months researching educational needs, conducting surveys, and consulting with experts to understand what students truly needed.",
    },
    {
      icon: "👥",
      date: "March 2025",
      title: "Building Our Team",
      desc: "We assembled a team of passionate educators and tech experts who shared our vision of transforming education through accessible resources.",
    },
    {
      icon: "🚀",
      date: "April 2025",
      title: "Launch Day",
      desc: "Today, we're proud to launch our platform, offering comprehensive resources for MDCAT, ECAT, IELTS, FSC, and Matric students across the country.",
    },
  ];

  const cards = [
    {
      icon: "🌟",
      title: "Our Mission",
      desc: "To provide high-quality, accessible educational resources that empower students to achieve their academic goals and unlock their full potential.",
    },
    {
      icon: "🔭",
      title: "Our Vision",
      desc: "To become the leading educational platform that transforms how students prepare for critical exams, creating a community of confident, successful learners.",
    },
    {
      icon: "🤝",
      title: "Our Values",
      desc: "Excellence, accessibility, innovation, and student-centered learning guide everything we do. We believe education should be available to everyone.",
    },
  ];

  return (
    <section className="py-20 bg-emerald-50 relative overflow-hidden">
      {/* Improved decorative elements */}
      <div className="absolute top-20 right-10 text-6xl opacity-10 animate-bounce" style={{ animationDuration: '6s' }}>🌱</div>
      <div className="absolute bottom-20 left-10 text-6xl opacity-10 animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>🌿</div>
      <div className="absolute top-40 left-20 text-5xl opacity-10 animate-pulse" style={{ animationDuration: '8s' }}>📚</div>
      <div className="absolute bottom-40 right-20 text-5xl opacity-10 animate-pulse" style={{ animationDuration: '9s' }}>🎓</div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 px-4 py-2 rounded-full mb-4">
            <h2 className="text-green-800 text-lg font-semibold">Our Growth Story</h2>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700">
              From a <span className="text-emerald-600 font-medium">simple idea</span> to a comprehensive educational platform.
              We're just beginning our mission to make quality education accessible to all.
              Join us as we embark on this exciting <span className="text-emerald-600 font-medium">journey of growth and learning</span>.
            </p>
          </div>
        </div>

        <div className="timeline-container max-w-4xl mx-auto mb-20 relative">
          {/* Vertical line with improved styling */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-emerald-200 transform -translate-x-1/2"></div>
          
          {timeline.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center mb-16 transition-all duration-700 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} ${
                i <= activeStep ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {/* Timeline bullet with improved styling */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  i <= activeStep ? 'bg-emerald-600 text-white scale-100' : 'bg-white text-gray-400 scale-75'
                } border-4 border-white shadow-lg`}>
                  {i < activeStep ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-lg">{item.icon}</span>
                  )}
                </div>
              </div>
              
              {/* Content box with improved styling - no transform to ensure visibility */}
              <div className={`w-5/12 transition-all duration-700 opacity-100`}>
                <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 ${
                  i <= activeStep ? 'border-emerald-500' : 'border-gray-300'
                }`}>
                  <div className="flex items-center mb-3">
                    <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="text-emerald-700 font-medium">{item.date}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
              
              {/* Date display for alternate timeline items */}
              <div className={`w-5/12 px-4 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                {i <= activeStep && (
                  <div className="text-emerald-700 font-medium opacity-75">{item.date}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 mb-16">
          <div className="text-center mb-12">
            <div className="inline-block bg-green-100 px-4 py-2 rounded-full mb-4">
              <h3 className="text-green-800 text-lg font-semibold">What Drives Us</h3>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-800">
              Our Foundation
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <div 
                key={i} 
                className="vision-card bg-white p-8 rounded-2xl shadow-lg transition-all duration-700 border-t-4 border-emerald-500 transform hover:shadow-xl hover:-translate-y-1"
                data-index={i}
                style={{ 
                  transitionDelay: `${i * 200}ms`,
                  opacity: 1, // Always visible
                  transform: 'translateY(0)' // Always in final position
                }}
              >
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center text-4xl mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 inline-flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-green-500 opacity-10 animate-ping"></div>
          </div>
          <a 
            href="#" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
          >
            Join Our Community
          </a>
          <p className="text-gray-600 mt-4 max-w-md mx-auto">
            Become part of our growing community of learners and educators dedicated to making education accessible for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}