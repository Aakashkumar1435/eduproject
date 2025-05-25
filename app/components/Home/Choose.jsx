'use client'
import { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Trophy, Brain, Rocket, Leaf } from 'lucide-react';

export default function Choose() {
  const [activeCard, setActiveCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => 
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    const cards = document.querySelectorAll('.why-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCardHover = (index) => {
    setActiveCard(index);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'leaf': return <Leaf size={28} />;
      case 'book': return <BookOpen size={28} />;
      case 'trophy': return <Trophy size={28} />;
      case 'brain': return <Brain size={28} />;
      case 'rocket': return <Rocket size={28} />;
      default: return <Leaf size={28} />;
    }
  };

  const cards = [
    {
      icon: 'leaf',
      title: "Personalized Learning",
      desc: "Adaptive curriculum tailored to your pace, strengths, and learning style.",
    },
    {
      icon: 'book',
      title: "Interactive Content",
      desc: "Engaging visuals, quizzes, and real-time explanations for deeper understanding.",
    },
    {
      icon: 'trophy',
      title: "Gamified Experience",
      desc: "Earn rewards, track achievements, and stay motivated throughout your journey.",
    },
    {
      icon: 'brain',
      title: "Smart Analytics",
      desc: "Data-driven insights to identify strengths and areas for improvement.",
    },
    {
      icon: 'rocket',
      title: "Continuous Progress",
      desc: "Structured pathways that ensure steady advancement toward your goals.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-green-500 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-green-400 opacity-20 animate-pulse delay-700"></div>
      
      {/* Decorative shapes */}
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-green-600 opacity-10"></div>
      <div className="absolute -bottom-32 -right-16 w-80 h-80 rounded-full bg-green-700 opacity-10"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose <span className="text-green-400 relative inline-block">
              CrackIt
              <svg className="absolute bottom-0 left-0 w-full h-2 text-green-500 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,0 C25,5 75,5 100,0 L100,10 L0,10 Z" fill="currentColor"></path>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto opacity-90">
            We've reimagined the learning experience to make it more engaging, effective, and enjoyable for students of all levels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              data-index={i}
              className={`why-card bg-gray-800 bg-opacity-60 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border-2 transform transition-all duration-300 ease-in-out ${
                visibleCards.includes(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${activeCard === i ? 'border-green-400 shadow-xl scale-105' : 'border-transparent'}`}
              onMouseEnter={() => handleCardHover(i)}
              onMouseLeave={handleCardLeave}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 text-green-400 transition-all duration-300 ${
                  activeCard === i ? 'bg-green-500 text-white' : 'bg-gray-700'
                }`}>
                  {getIcon(card.icon)}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-300">
                  {card.desc}
                </p>
                <div className={`mt-4 flex items-center text-green-400 font-medium transition-all duration-300 ${
                  activeCard === i ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span>Learn more</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating elements */}
      <div className="hidden lg:block absolute -bottom-8 left-12 w-16 h-16 bg-green-200 bg-opacity-10 rounded-lg transform rotate-12 backdrop-filter backdrop-blur-sm"></div>
      <div className="hidden lg:block absolute top-12 right-16 w-10 h-10 bg-green-200 bg-opacity-10 rounded-lg transform -rotate-6 backdrop-filter backdrop-blur-sm"></div>
    </div>
  );
}