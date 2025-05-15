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
      bgColor: "from-green-500 to-teal-600"
    },
    {
      number: countValues.successRate + "%",
      text: "Success Rate",
      icon: <CheckCircle size={24} />,
      bgColor: "from-emerald-500 to-green-600"
    },
    {
      number: countValues.questions.toLocaleString() + "+",
      text: "Practice Questions",
      icon: <BookOpen size={24} />,
      bgColor: "from-teal-500 to-emerald-600"
    },
    {
      number: countValues.satisfaction + "/5",
      text: "Student Satisfaction",
      icon: <Star size={24} />,
      bgColor: "from-lime-500 to-green-600"
    }
  ];

  return (
    <section className={`impact-section bg-gradient-to-br from-green-900 to-emerald-800 text-white py-20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'} relative overflow-hidden`}>
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-4 border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Impact</h2>
        <p className="text-center text-green-200 max-w-2xl mx-auto mb-12">
          Empowering students with the tools and resources they need for academic excellence
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className={`bg-gradient-to-br ${card.bgColor} rounded-xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-white/20 p-4 rounded-full">
                  {card.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{card.number}</div>
                <div className="text-white/90 font-medium">{card.text}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <a href="#" className="bg-white text-green-800 hover:bg-green-100 transition-colors duration-300 font-bold py-3 px-8 rounded-lg flex items-center group">
            Learn About Our Methods
            <svg className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}