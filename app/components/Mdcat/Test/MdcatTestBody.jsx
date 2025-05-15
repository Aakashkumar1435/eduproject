"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function MdcatTests() {
  // Using React Router's navigate function for page navigation
  const router = useRouter();

  // Handler for subject navigation
  const handleSubjectClick = (subject) => {
    router.push(`/Mdcat/${subject}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-gradient-to-r from-emerald-600 to-green-700 rounded-xl shadow-lg p-8 text-white">
        <div className="w-full md:w-3/5 mb-6 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            Diagnostic Test say apni MDCAT ki tayyari ka andaza lagaein
          </h1>
          <button
            onClick={() => router.push("/diagnostic-test")}
            className="bg-amber-500 hover:bg-amber-400 text-emerald-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Take Diagnostic Test
          </button>
        </div>
        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <div className="relative">
            <div className="w-64 h-64 md:w-72 md:h-72 bg-green-400 bg-opacity-30 rounded-full flex items-center justify-center overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-56 h-56 bg-amber-400 bg-opacity-20 rounded-full"></div>
              <div className="absolute -left-2 -top-2 w-48 h-48 bg-emerald-300 bg-opacity-30 rounded-full"></div>
              <div className="z-10 transform rotate-6">
                <svg
                  className="w-32 h-32 text-amber-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topical MCQs and Tests Section */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-emerald-800 mb-6 pl-2 border-l-4 border-emerald-600">
          MDCAT Topical MCQs and Tests
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {/* Biology */}
          <div
            onClick={() => handleSubjectClick("Biology")}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-pink-500 cursor-pointer"
            role="button"
            aria-label="Navigate to Biology"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-center">
              Biology
            </span>
          </div>

          {/* Chemistry */}
          <div
            onClick={() => handleSubjectClick("Chemistry")}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-900 cursor-pointer"
            role="button"
            aria-label="Navigate to Chemistry"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-800 to-indigo-900 flex items-center justify-center mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                ></path>
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-center">
              Chemistry
            </span>
          </div>

          {/* English */}
          <div
            onClick={() => handleSubjectClick("English")}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-pink-500 cursor-pointer"
            role="button"
            aria-label="Navigate to English"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-center">
              English
            </span>
          </div>

          {/* Physics */}
          <div
            onClick={() => handleSubjectClick("Physics")}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-amber-500 cursor-pointer"
            role="button"
            aria-label="Navigate to Physics"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-center">
              Physics
            </span>
          </div>

          {/* Logical Reasoning */}
          <div
            onClick={() => handleSubjectClick("Logical-Reasoning")}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-blue-500 cursor-pointer"
            role="button"
            aria-label="Navigate to Logical Reasoning"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-center">
              Logical Reasoning
            </span>
          </div>
        </div>
      </div>

      {/* MDCAT FLPs Section */}
      <div>
      <h2 className="text-xl font-bold text-emerald-800 mb-6 pl-2 border-l-4 border-emerald-600">MDCAT FLPs</h2>


        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {/* PMDC Grand Tests */}
          <div
            onClick={() => navigate("/pmdc-grand-tests")}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-teal-500 cursor-pointer"
            role="button"
            aria-label="Navigate to PMDC Grand Tests"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-4 shadow-md">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <span className="text-gray-800 font-semibold text-center">
              PMDC Grand Tests
            </span>
          </div>

          {/* Empty slots with subtle styling */}
          <div className="bg-white bg-opacity-50 rounded-xl border border-dashed border-gray-300 p-5 flex flex-col items-center justify-center hover:border-indigo-300 transition-colors duration-300 md:flex">
            <span className="text-gray-400 text-sm">Coming Soon</span>
          </div>

          <div className="bg-white bg-opacity-50 rounded-xl border border-dashed border-gray-300 p-5 flex flex-col items-center justify-center hover:border-indigo-300 transition-colors duration-300 md:flex">
            <span className="text-gray-400 text-sm">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Prepare for success with our comprehensive MDCAT preparation resources
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
            Updated for 2025
          </span>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            PMDC Aligned
          </span>
        </div>
      </div>
    </div>
  );
}
