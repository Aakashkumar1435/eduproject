"use client";
import React, { useEffect, useState } from "react";
import BuyForm from "@/app/components/pricing/buyForm/BuyForm";

const testTabs = ["All Courses", "MDCAT", "ECAT", "FSC", "IELTS", "GAT"];

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  const [activeTab, setActiveTab] = useState("All Courses");
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null); 

  useEffect(() => {
    fetch("http://localhost:5000/api/pricing")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  const filteredPlans = plans.filter((plan) => {
    if (activeTab === "All Courses") return plan.category === "All";
    return plan.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Choose the plan that suits your learning needs. All plans include
            access to our learning platform and expert support.
          </p>
        </header>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                billing === "monthly" 
                ? "bg-green-600 text-white shadow-lg" 
                : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                billing === "annual" 
                ? "bg-green-600 text-white shadow-lg" 
                : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setBilling("annual")}
            >
              Annual
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {testTabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-nowrap overflow-x-auto pb-6 gap-6 mask-fade scrollbar-hide">
          {filteredPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full md:w-80 rounded-xl overflow-hidden border ${
                plan.isPopular
                  ? "border-green-500 relative shadow-lg shadow-green-900/30"
                  : "border-gray-700"
              } bg-gray-800`}
            >
              {plan.isPopular && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
                <div className="text-3xl font-bold mb-1 text-white">
                  PKR {billing === "monthly" ? plan.prices.monthly : plan.prices.annual}
                  <span className="text-base font-normal text-gray-400"> /{billing === "monthly" ? "mo" : "yr"}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {billing === "monthly" ? "Billed monthly" : "Billed annually"}
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    plan.isPopular
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                  onClick={() =>
                    setSelectedPlan({
                      title: plan.title,
                      category: plan.category,
                    })
                  }
                >
                  Buy {plan.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Satisfaction Guarantee */}
        <div className="mt-16 bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-2xl mx-auto text-center">
          <div className="inline-flex justify-center items-center bg-green-900/30 p-3 rounded-full mb-4">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">100% Satisfaction Guarantee</h3>
          <p className="text-gray-300">
            Not satisfied with our platform? We offer a 7-day money-back guarantee.
            No questions asked.
          </p>
        </div>
      </div>

      {/* BuyForm Modal */}
      {selectedPlan && (
        <BuyForm offer={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}