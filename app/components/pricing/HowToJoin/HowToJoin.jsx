"use client";
import React from "react";

const steps = [
  {
    number: "1",
    title: "Choose Your Plan",
    description: "Select the plan that best fits your learning needs and goals.",
  },
  {
    number: "2",
    title: "Create Account",
    description: "Fill in your details to create your personal learning account.",
  },
  {
    number: "3",
    title: "Make Payment",
    description: "Complete your payment using your preferred payment method.",
  },
  {
    number: "4",
    title: "Start Learning",
    description: "Access your dashboard and begin your educational journey!",
  },
];

export default function HowToJoin() {
  return (
    <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
          How to Join CrackIt
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-6 text-center transition-transform duration-300 hover:transform hover:scale-105 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-400">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
              
              {/* Connecting line between steps (except the last one) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-600"></div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg shadow-lg hover:shadow-xl">
            Join Now
          </button>
        </div>
      </div>
    </section>
  );
}