'use client'

import { useState, useEffect } from 'react';

export default function FoundersSection() {
  // Make all founders visible by default
  const [visibleFounders, setVisibleFounders] = useState([0, 1]);
  
  useEffect(() => {
    // Simplified animation without needing scroll observation
    const founderElements = document.querySelectorAll('.founder-card');
    
    // Animation timing
    founderElements.forEach((el, index) => {
      setTimeout(() => {
        setVisibleFounders(prev => [...prev, index]);
      }, index * 300);
    });
  }, []);

  const founders = [
    {
      name: "Aakash Kumar",
      role: "CEO & Educational Psychologist",
      bio: "With over 15 years of experience in educational psychology, Aakash leads our mission to create learning experiences that adapt to individual needs and learning styles. His innovative approach has helped thousands of students achieve their academic goals.",
      image: "/images/Ak.jpeg",
      socials: [
        { icon: "linkedin", url: "#" },
        { icon: "twitter", url: "#" },
        { icon: "mail", url: "#" }
      ]
    },
    {
      name: "Hanzla Kalim",
      role: "CTO & Learning Technologist",
      bio: "Hanzla combines his passion for technology with educational expertise to develop platforms that make learning accessible, engaging, and effective for all students. His technical vision has shaped our platform into the intuitive learning experience it is today.",
      image: "/images/MyPhoto.jpg",
      socials: [
        { icon: "linkedin", url: "#" },
        { icon: "twitter", url: "#" },
        { icon: "mail", url: "#" }
      ]
    }
  ];

  // Social media icons
  const SocialIcons = {
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.08 10.08 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    mail: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-green-500 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-green-400 opacity-20 animate-pulse delay-700"></div>
      
      {/* Decorative shapes */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-green-600 opacity-10"></div>
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-green-700 opacity-10"></div>

      {/* Floating elements */}
      <div className="hidden lg:block absolute -bottom-8 left-12 w-24 h-24 bg-green-200 bg-opacity-10 rounded-lg transform rotate-12 backdrop-filter backdrop-blur-sm"></div>
      <div className="hidden lg:block absolute top-12 right-16 w-16 h-16 bg-green-200 bg-opacity-10 rounded-lg transform -rotate-6 backdrop-filter backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-gray-700">
            <span className="text-green-400 text-lg font-semibold">Leadership Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet Our <span className="text-green-400 relative inline-block">
              Founders
              <svg className="absolute bottom-0 left-0 w-full h-2 text-green-500 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,0 C25,5 75,5 100,0 L100,10 L0,10 Z" fill="currentColor"></path>
              </svg>
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto opacity-90">
            Passionate educators and innovators committed to transforming the learning
            experience through technology and research-based methodologies.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <div 
              key={index} 
              data-index={index}
              className={`founder-card flex flex-col md:flex-row items-center bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-700 hover:shadow-xl border border-gray-700 hover:border-green-500`}
              style={{ 
                opacity: visibleFounders.includes(index) ? 1 : 0,
                transform: visibleFounders.includes(index) ? 'translateY(0)' : 'translateY(50px)',
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Image container */}
              <div className="md:w-1/4 relative h-full">
                <div className="bg-gradient-to-br from-green-600 to-green-900 absolute inset-0 opacity-20"></div>
                <div className="relative h-full w-full overflow-hidden">
                  <img 
                    src={founder.image || "/api/placeholder/300/300"} 
                    alt={founder.name} 
                    className="object-cover w-full h-full max-h-80 md:max-h-full"
                  />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
                </div>
              </div>
              
              {/* Content container */}
              <div className="md:w-3/4 p-6 md:p-8 flex flex-col">
                <div className="border-b border-gray-700 pb-4 mb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="inline-block text-xs font-medium text-green-400 bg-gray-700 py-1 px-2 rounded mb-2">Founder</span>
                      <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                      <p className="text-green-400 font-medium text-sm">{founder.role}</p>
                    </div>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                      {founder.socials.map((social, i) => (
                        <a 
                          key={i} 
                          href={social.url} 
                          className="bg-gray-700 hover:bg-gray-600 text-green-400 p-2 rounded-full transition-all duration-300 hover:shadow"
                          aria-label={`${founder.name}'s ${social.icon}`}
                        >
                          {SocialIcons[social.icon]}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{founder.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}