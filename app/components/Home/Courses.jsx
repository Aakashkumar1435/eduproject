'use client'
import { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function ExploreCourses() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('popular');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.querySelector('.courses-section');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const courseCategories = {
    popular: [
      { emoji: "🧪", title: "MDCAT", subtitle: "Medical Entry Test", rating: 4.9, students: 8740 },
      { emoji: "⚙️", title: "ECAT", subtitle: "Engineering Entry Test", rating: 4.8, students: 7230 },
      { emoji: "🌎", title: "IELTS", subtitle: "English Proficiency", rating: 4.7, students: 6150 }
    ],
    entrance: [
      { emoji: "🧪", title: "MDCAT", subtitle: "Medical Entry Test", rating: 4.9, students: 8740 },
      { emoji: "⚙️", title: "ECAT", subtitle: "Engineering Entry Test", rating: 4.8, students: 7230 },
      { emoji: "🔍", title: "SAT", subtitle: "Scholastic Assessment Test", rating: 4.6, students: 5180 }
    ],
    secondary: [
      { emoji: "🔬", title: "FSC", subtitle: "Pre-Medical/Engineering", rating: 4.7, students: 9130 },
      { emoji: "📝", title: "Matric", subtitle: "Secondary Education", rating: 4.8, students: 12450 }
    ]
  };

  const getActiveTabCourses = () => {
    return courseCategories[activeTab] || courseCategories.popular;
  };

  return (
    <section className={`courses-section bg-gradient-to-br from-green-50 to-emerald-50 py-20 relative overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-200 rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emerald-200 rounded-tr-full opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-teal-100 rounded-full opacity-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
              Explore Our Courses
            </h1>
            <p className="text-green-700 max-w-xl">
              Designed by experts to help you succeed in your academic journey
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-1 inline-flex">
            {['popular', 'entrance', 'secondary'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === tab 
                  ? 'bg-green-600 text-white shadow-sm' 
                  : 'text-green-700 hover:bg-green-50'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getActiveTabCourses().map((course, idx) => (
            <div 
              key={idx}
              className={`bg-white rounded-xl overflow-hidden transform transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`h-2 bg-gradient-to-r from-green-400 to-emerald-500`}></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{course.emoji}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                      <p className="text-green-600">{course.subtitle}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {course.rating} ★
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-gray-700">24/7 Expert Support</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-gray-700">5,000+ Practice Questions</span>
                  </div>
                  <div className="flex items-center">
                    <Check size={16} className="text-green-500 mr-2" />
                    <span className="text-gray-700">Progress Tracking</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">{course.students.toLocaleString()} students</div>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center">
                    View Course
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold text-green-800 mb-4">Can't find what you're looking for?</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
                Search Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}