"use client";
import React, { useState } from "react";

export default function AboutWhatWeOffer() {
  const [activeTab, setActiveTab] = useState("test-prep");
  
  const offeringCategories = [
    {
      id: "test-prep",
      title: "Test Preparation",
      icon: "🎯"
    },
    {
      id: "subjects",
      title: "Subject Expertise",
      icon: "🧪"
    },
    {
      id: "practice",
      title: "Practice Resources",
      icon: "📝"
    },
    {
      id: "support",
      title: "Student Support",
      icon: "🤝"
    }
  ];
  
  const offeringDetails = {
    "test-prep": [
      {
        title: "MDCAT Preparation",
        description: "Comprehensive strategies and practice materials specifically designed for medical college admission tests.",
        icon: "🏥",
        features: ["Practice exams", "Video lectures", "Question banks"]
      },
      {
        title: "ECAT Courses",
        description: "Engineering college admission test preparation with focus on mathematics, physics, and analytical reasoning.",
        icon: "⚙️",
        features: ["Problem solving", "Mock tests", "Concept reviews"]
      },
      {
        title: "FSC Exam Ready",
        description: "Complete preparation for Federal Science College exams covering all required subjects and topics.",
        icon: "🔬",
        features: ["Study guides", "Past papers", "Expert coaching"]
      },
      {
        title: "IELTS & GAT Training",
        description: "English language and general aptitude test preparation with proven strategies for high scores.",
        icon: "🌐",
        features: ["Speaking practice", "Writing feedback", "Test techniques"]
      }
    ],
    "subjects": [
      {
        title: "Biology Excellence",
        description: "In-depth biology courses covering molecular biology, genetics, anatomy, and ecological concepts.",
        icon: "🧬",
        features: ["Lab simulations", "Diagrams", "Memory techniques"]
      },
      {
        title: "Physics Mastery",
        description: "Comprehensive physics curriculum from mechanics to modern physics with problem-solving approaches.",
        icon: "⚛️",
        features: ["Formula guides", "Numerical practice", "Conceptual clarity"]
      },
      {
        title: "Chemistry Focus",
        description: "Organic, inorganic, and physical chemistry courses taught with practical applications and examples.",
        icon: "🧪",
        features: ["Reaction mechanisms", "Periodic trends", "Equation balancing"]
      },
      {
        title: "Mathematics Solutions",
        description: "From algebra to calculus, our comprehensive mathematics programs build strong foundations.",
        icon: "➗",
        features: ["Step-by-step solutions", "Visual proofs", "Application problems"]
      }
    ],
    "practice": [
      {
        title: "MCQ Collections",
        description: "Thousands of multiple-choice questions with detailed explanations arranged by topic and difficulty level.",
        icon: "📊",
        features: ["Timed quizzes", "Difficulty progression", "Performance tracking"]
      },
      {
        title: "Practice Tests",
        description: "Full-length practice examinations simulating actual test conditions and question types.",
        icon: "📝",
        features: ["Real-time scoring", "Time management tools", "Detailed analysis"]
      },
      {
        title: "Problem Banks",
        description: "Curated collections of challenging problems designed to strengthen critical thinking and application skills.",
        icon: "💡",
        features: ["Varied difficulty", "Categorized problems", "Solution strategies"]
      },
      {
        title: "Digital Flashcards",
        description: "Interactive digital flashcards for quick review and memory reinforcement of key concepts.",
        icon: "🔄",
        features: ["Spaced repetition", "Custom decks", "Mobile access"]
      }
    ],
    "support": [
      {
        title: "1-on-1 Tutoring",
        description: "Personalized tutoring sessions with subject matter experts tailored to individual learning needs.",
        icon: "👨‍🏫",
        features: ["Flexible scheduling", "Customized focus", "Progress reports"]
      },
      {
        title: "Study Groups",
        description: "Facilitated study groups for collaborative learning and peer support in a structured environment.",
        icon: "👥",
        features: ["Weekly sessions", "Peer teaching", "Group problem solving"]
      },
      {
        title: "Career Guidance",
        description: "Professional guidance for educational and career pathways in science, technology, and healthcare fields.",
        icon: "🧭",
        features: ["College applications", "Interview prep", "Field selection"]
      },
      {
        title: "Mental Wellness",
        description: "Resources and support for managing academic stress and maintaining mental wellness during exam preparation.",
        icon: "🧠",
        features: ["Stress management", "Time organization", "Mindfulness techniques"]
      }
    ]
  };

  return (
    <section className="w-full bg-gray-900 py-16 px-5 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-green-500 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-white mb-4">
            What We Offer
            <span className="block h-1 w-24 bg-green-500 mx-auto mt-4"></span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Comprehensive educational resources and support designed to help students excel in their academic journey and beyond.
          </p>
        </div>
        
        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {offeringCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center ${
                activeTab === category.id
                  ? "bg-green-500 text-white shadow-lg transform -translate-y-1"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>
        
        {/* Content area */}
        <div className="relative">
          {Object.keys(offeringDetails).map((tabId) => (
            <div 
              key={tabId}
              className={`transition-all duration-500 ${
                activeTab === tabId ? "opacity-100" : "opacity-0 absolute top-0 left-0 pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offeringDetails[tabId].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 text-center relative">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-gray-900 text-3xl mb-3">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 opacity-50"></div>
                    </div>
                    
                    <div className="p-5">
                      <p className="text-gray-700 mb-4">
                        {item.description}
                      </p>
                      <ul className="space-y-2">
                        {item.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="px-5 pb-5">
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-3 flex items-center justify-center">
                        <span>Learn More</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Statistics band */}
        <div className="mt-16 bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-3">
              <div className="text-green-400 text-4xl font-bold mb-2">95%</div>
              <div className="text-white font-medium">Success Rate</div>
              <p className="text-gray-400 text-sm mt-1">Of our students achieve their target scores</p>
            </div>
            <div className="p-3">
              <div className="text-green-400 text-4xl font-bold mb-2">20+</div>
              <div className="text-white font-medium">Programs</div>
              <p className="text-gray-400 text-sm mt-1">Specialized test preparation courses</p>
            </div>
            <div className="p-3">
              <div className="text-green-400 text-4xl font-bold mb-2">15k+</div>
              <div className="text-white font-medium">Practice Questions</div>
              <p className="text-gray-400 text-sm mt-1">Across all subjects and difficulty levels</p>
            </div>
            <div className="p-3">
              <div className="text-green-400 text-4xl font-bold mb-2">24/7</div>
              <div className="text-white font-medium">Support</div>
              <p className="text-gray-400 text-sm mt-1">Online resources and assistance</p>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-10 text-center">
          <button className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-medium transition-colors duration-300">
            <span>Explore All Offerings</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}