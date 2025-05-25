"use client";

import React from "react";
import { Navbar } from "../../components/Mdcat/Navbar";
import { HeroSection } from "../../components/Mdcat/HeroSection";
import { FeaturesGrid } from "../../components/Mdcat/FeatureSection";
import Footer from "@/app/components/footer/Footer";

function MdcatPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Banner */}
      <div className="mb-16">
        <HeroSection />
      </div>
              <div className="w-full h-px bg-white mb-8"></div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          <span className="text-green-400">Explore</span> Our Features
        </h2>

        {/* Feature Cards */}
        <FeaturesGrid />

        {/* Additional Content Area */}
        <div className="mt-16 p-8 bg-gray-800 rounded-xl border border-green-800 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-green-400">
            Why Choose Our MDCAT Program?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Expert Faculty</h4>
                <p className="text-gray-300">
                  Learn from the best minds in the field with years of
                  experience.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  Comprehensive Study Material
                </h4>
                <p className="text-gray-300">
                  Access to notes, videos, and practice tests all in one place.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">
                  Personalized Learning
                </h4>
                <p className="text-gray-300">
                  Track your progress and focus on areas that need improvement.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Proven Results</h4>
                <p className="text-gray-300">
                  Our students consistently achieve top ranks in MDCAT exams.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MdcatPage;
