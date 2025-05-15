"use client";
import React from "react";

export default function AboutHeader() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-500 text-white py-16 px-5 text-center">
        <h1 className="text-4xl mb-3">
          <b>About Us</b>
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          We're dedicated to making quality education accessible to all students
          through comprehensive test preparation and subject mastery resources.
        </p>
      </section>

      {/* Our Mission */}
      <section className="w-full py-10 px-5 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10 text-3xl text-green-800">
            <b>Our Mission</b>
          </h2>
          <div className="overflow-x-auto pb-3">
            <div className="grid grid-flow-col auto-cols-min md:auto-cols-fr gap-8 min-w-full py-3">
              {/* Vision */}
              <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
                <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="text-xl">Our Vision</h3>
                </div>
                <div className="p-5">
                  <p>
                    To empower students with access to high-quality educational
                    resources...
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
                <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                  <div className="text-4xl mb-3">💡</div>
                  <h3 className="text-xl">Our Approach</h3>
                </div>
                <div className="p-5">
                  <p>
                    We combine expert teaching with comprehensive materials...
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
                <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                  <div className="text-4xl mb-3">🌟</div>
                  <h3 className="text-xl">Our Values</h3>
                </div>
                <div className="p-5">
                  <p>
                    We believe in accessibility, excellence, and continuous
                    improvement...
                  </p>
                </div>
              </div>

              {/* Future Focus */}
              <div className="w-72 md:w-auto bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white">
                <div className="bg-gradient-to-br from-green-800 to-green-500 text-white p-5 text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="text-xl">Future Focus</h3>
                </div>
                <div className="p-5">
                  <p>
                    We're committed to evolving with technology and helping
                    students stay ahead through AI-integrated learning tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}