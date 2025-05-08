import React from 'react';

export default function MdcatLectures() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">MDCAT Lectures</h1>
      
      {/* Subject Selection Pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-400 group">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-gray-600 group-hover:text-gray-900 font-medium">Physics</span>
        </button>
        
        <button className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-600 group">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <span className="text-gray-600 group-hover:text-gray-900 font-medium">Chemistry</span>
        </button>
        
        <button className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-pink-500 group">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-gray-600 group-hover:text-gray-900 font-medium">Biology</span>
        </button>
        
        <button className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-red-400 group">
          <div className="w-8 h-8 rounded-full bg-red-400 flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-gray-600 group-hover:text-gray-900 font-medium">English</span>
        </button>
        
        <button className="flex items-center px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-500 group">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-gray-600 group-hover:text-gray-900 font-medium">Guide To MDCAT</span>
        </button>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-12">
        <div className="h-full w-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
      </div>
      
      {/* Visual Element (instead of image) */}
      <div className="flex justify-center mb-12">
        <div className="relative w-72 h-72">
          {/* Decorative background elements */}
          <div className="absolute w-48 h-48 bg-indigo-100 rounded-full top-4 left-12 z-0"></div>
          <div className="absolute w-32 h-32 bg-amber-100 rounded-full bottom-12 left-4 z-0"></div>
          <div className="absolute w-24 h-24 bg-pink-100 rounded-full bottom-8 right-8 z-0"></div>
          
          {/* Central element */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <div className="text-center">
                <div className="flex space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  ))}
                </div>
                <div className="w-20 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-2"></div>
                <div className="w-16 h-3 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center top-2 right-6 transform -rotate-12 z-20">
            <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="absolute w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center bottom-10 left-0 transform rotate-12 z-20">
            <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Text Message */}
      <div className="text-center mb-6">
        <h2 className="text-xl text-gray-700 font-medium">Please apna subject select kare</h2>
      </div>
    </div>
  );
}