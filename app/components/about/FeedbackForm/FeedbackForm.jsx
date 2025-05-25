"use client";
import React from "react";

export default function FeedbackForm() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-16">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-4xl text-green-800 text-center mb-12 font-bold relative 
                     drop-shadow-sm">
          Share Your Feedback
          <span className="block w-24 h-1 bg-green-700 mx-auto mt-3 rounded-full shadow-sm"></span>
        </h1>

        <div className="bg-white rounded-2xl p-10 shadow-xl border-t-4 border-green-800 
                      relative transform transition-all duration-300 hover:translate-y-[-5px] 
                      hover:shadow-2xl">
          {/* 3D Corner Effects */}
          <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 
                        border-gray-900 rounded-bl-2xl opacity-70"></div>
          <div className="absolute top-0 right-0 w-24 h-1 bg-gray-900 rounded-tr-2xl"></div>
          
          {/* Shadow overlay for depth */}
          <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none"></div>

          <form className="relative z-10">
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-base font-semibold text-gray-800">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base 
                         focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                         shadow-sm transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-base font-semibold text-gray-800">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base 
                         focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                         shadow-sm transition-all duration-300"
              />
            </div>

            {/* Service Selection */}
            <div className="mb-6">
              <label htmlFor="course" className="block mb-2 text-base font-semibold text-gray-800">
                Which service did you use?
              </label>
              <div className="relative">
                <select
                  id="course"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base 
                           appearance-none focus:outline-none focus:ring-2 focus:ring-green-600
                           focus:border-transparent shadow-sm transition-all duration-300"
                >
                  <option value="">Select an option</option>
                  <option value="mdcat">MDCAT Preparation</option>
                  <option value="usmle">USMLE Study Materials</option>
                  <option value="nursing">Nursing Exam Prep</option>
                  <option value="pharmacy">Pharmacy Board Exams</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block mb-3 text-base font-semibold text-gray-800">
                How would you rate our service?
              </label>
              <div className="flex flex-wrap gap-6 mt-2">
                {["Excellent", "Good", "Average", "Poor", "Very Poor"].map((label, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <input
                      type="radio"
                      id={`rating${5 - index}`}
                      name="rating"
                      value={5 - index}
                      className="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer"
                    />
                    <label htmlFor={`rating${5 - index}`} className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-base font-semibold text-gray-800">
                Your Feedback
              </label>
              <textarea
                id="message"
                required
                placeholder="Please share your experience with us..."
                className="w-full min-h-[150px] px-4 py-3 border border-gray-300 rounded-lg text-base 
                         resize-y focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                         shadow-sm transition-all duration-300"
              ></textarea>
            </div>

            {/* Suggestions */}
            <div className="mb-8">
              <label htmlFor="improvements" className="block mb-2 text-base font-semibold text-gray-800">
                What can we improve?
              </label>
              <textarea
                id="improvements"
                placeholder="Any suggestions for how we can better serve your needs?"
                className="w-full min-h-[100px] px-4 py-3 border border-gray-300 rounded-lg text-base 
                         resize-y focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                         shadow-sm transition-all duration-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-b from-green-700 to-green-800 hover:from-green-600 hover:to-green-700
                       text-white font-bold py-4 px-10 rounded-lg block mx-auto mt-8
                       shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                       active:translate-y-0 active:shadow-md"
            >
              Submit Feedback
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-6">
            Thank you for helping us improve our services for future students!
          </div>
        </div>
      </div>
    </div>
  );
}