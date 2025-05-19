'use client'

import { useState, useEffect } from 'react';
import { Users, CheckCircle, BookOpen, Star } from 'lucide-react';

export default function Impact() {
  const [isVisible, setIsVisible] = useState(false);
  const [countValues, setCountValues] = useState({
    students: 0,
    successRate: 0,
    questions: 0,
    satisfaction: 0
  });

  const targetValues = {
    students: 15000,
    successRate: 95,
    questions: 50000,
    satisfaction: 4.8
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          startCountAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.querySelector('.impact-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);
  
  const startCountAnimation = () => {
    const duration = 2000;
    const frameRate = 30;
    const totalFrames = duration / (1000 / frameRate);
    let frame = 0;
    
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      if (frame <= totalFrames) {
        setCountValues({
          students: Math.round(targetValues.students * progress),
          successRate: Math.round(targetValues.successRate * progress),
          questions: Math.round(targetValues.questions * progress),
          satisfaction: parseFloat((targetValues.satisfaction * progress).toFixed(1))
        });
      } else {
        clearInterval(interval);
        setCountValues(targetValues);
      }
    }, 1000 / frameRate);
  };

  const cards = [
    {
      number: countValues.students.toLocaleString() + "+",
      text: "Students Helped",
      icon: <Users size={24} />,
      bgColor: "from-gray-800 to-gray-700"
    },
    {
      number: countValues.successRate + "%",
      text: "Success Rate",
      icon: <CheckCircle size={24} />,
      bgColor: "from-gray-800 to-gray-700"
    },
    {
      number: countValues.questions.toLocaleString() + "+",
      text: "Practice Questions",
      icon: <BookOpen size={24} />,
      bgColor: "from-gray-800 to-gray-700"
    },
    {
      number: countValues.satisfaction + "/5",
      text: "Student Satisfaction",
      icon: <Star size={24} />,
      bgColor: "from-gray-800 to-gray-700"
    }
  ];

  return (
    <section className={`impact-section bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white py-20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-500 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-green-400 opacity-20 animate-pulse delay-700"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-green-400 opacity-10 animate-ping"></div>
      
      {/* Decorative shapes */}
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-green-600 opacity-10"></div>
      <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full bg-green-700 opacity-10"></div>

      {/* Floating elements */}
      <div className="hidden lg:block absolute -bottom-8 right-12 w-24 h-24 bg-green-200 bg-opacity-10 rounded-lg transform rotate-12 backdrop-filter backdrop-blur-sm"></div>
      <div className="hidden lg:block absolute top-12 left-16 w-16 h-16 bg-green-200 bg-opacity-10 rounded-lg transform -rotate-6 backdrop-filter backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our <span className="text-green-400 relative inline-block">
          Impact
          <svg className="absolute bottom-0 left-0 w-full h-2 text-green-500 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0,0 C25,5 75,5 100,0 L100,10 L0,10 Z" fill="currentColor"></path>
          </svg>
        </span></h2>
        <p className="text-center text-gray-300 opacity-90 max-w-2xl mx-auto mb-12">
          Empowering students with the tools and resources they need for academic excellence
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className={`bg-gradient-to-br ${card.bgColor} rounded-xl p-6 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-700 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-green-500`}
              style={{ animationDelay: `${i * 150}ms`, transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-green-500 bg-opacity-20 p-4 rounded-full text-green-400">
                  {card.icon}
                </div>
                <div className="text-4xl font-bold mb-2 text-green-400">{card.number}</div>
                <div className="text-white font-medium">{card.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}