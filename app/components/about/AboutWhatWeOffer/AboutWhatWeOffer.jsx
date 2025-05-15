"use client";
import React from "react";

export default function AboutWhatWeOffer() {
  return (
    <section className="w-full bg-green-50 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-10 text-green-800 text-4xl font-bold">What We Offer</h2>
        
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col auto-cols-min md:auto-cols-fr gap-8 py-2 min-w-full">
            {/* Test Preparation */}
            <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
              <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                <div className="text-4xl mb-2">📚</div>
                <h3 className="text-xl font-medium">Test Preparation</h3>
              </div>
              <div className="p-5">
                <p>
                  Comprehensive preparation for MDCAT, ECAT, FSC, IELTS, and GAT
                  exams with practice tests and study materials.
                </p>
              </div>
            </div>

            {/* Subject Expertise */}
            <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
              <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                <div className="text-4xl mb-2">🧪</div>
                <h3 className="text-xl font-medium">Subject Expertise</h3>
              </div>
              <div className="p-5">
                <p>
                  In-depth content for Biology, Physics, Chemistry, and
                  Mathematics taught by subject matter experts.
                </p>
              </div>
            </div>

            {/* MCQ Practice */}
            <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
              <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                <div className="text-4xl mb-2">📝</div>
                <h3 className="text-xl font-medium">MCQ Practice</h3>
              </div>
              <div className="p-5">
                <p>
                  Thousands of multiple-choice questions with detailed
                  explanations to help you master concepts and test strategies.
                </p>
              </div>
            </div>
            
            {/* Additional Test Preparation Card */}
            <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
              <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                <div className="text-4xl mb-2">📚</div>
                <h3 className="text-xl font-medium">Test Preparation</h3>
              </div>
              <div className="p-5">
                <p>
                  Comprehensive preparation for MDCAT, ECAT, FSC, IELTS, and GAT
                  exams with practice tests and study materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}