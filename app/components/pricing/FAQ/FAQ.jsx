"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, JazzCash, EasyPaisa, and bank transfers.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan anytime. Changes apply next billing cycle.",
  },
  {
    question: "Is there a discount for students?",
    answer:
      "Yes, we offer student discounts. Just provide a valid ID to our support team.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from your dashboard. You'll retain access until your billing period ends.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>
      
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            className={`bg-gray-800 rounded-lg overflow-hidden border ${
              openIndex === index ? "border-green-500" : "border-gray-700"
            } transition-all duration-200`}
            key={index}
          >
            <button
              className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-white">{item.question}</span>
              <ChevronDown 
                className={`text-green-500 transition-transform duration-300 ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
                size={20}
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="p-5 pt-0 text-gray-300 border-t border-gray-700">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <p className="text-gray-400">
          Still have questions?{" "}
          <a href="/contact" className="text-green-500 hover:text-green-400 underline transition-colors">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}