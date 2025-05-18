"use client";
import React, { useState } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from '../components/footer/Footer';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    rating: "",
    message: "",
    suggestions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Feedback submitted successfully!");
        setFormData({
          name: "",
          email: "",
          service: "",
          rating: "",
          message: "",
          suggestions: "",
        });
      } else {
        alert(`❌ Submission failed: ${data.error}`);
      }
    } catch (err) {
      alert("🚫 Server error. Try again later.");
    }
  };

  return (
    <>
      <Navbar />
    <div className="w-full min-h-screen bg-[#f4faed] py-10 pt-20">
      <div className="max-w-3xl mx-auto px-5">
        <h1 className="text-3xl text-[#1b5e20] text-center mb-10 font-bold relative after:content-[''] after:block after:w-20 after:h-[3px] after:bg-[#1b5e20] after:mx-auto after:mt-2">
          Share Your Feedback
        </h1>

        <div className="relative bg-white rounded-xl p-10 shadow-md border-t-4 border-[#1b5e20]">
          <div className="absolute bottom-0 left-0 w-10 h-10 border-l-[3px] border-b-[3px] border-black rounded-bl-xl"></div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-900">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
              />
            </div>

            {/* Service */}
            <div className="mb-6">
              <label htmlFor="service" className="block mb-2 text-base font-medium text-gray-900">
                Which service did you use?
              </label>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
              >
                <option value="">Select an option</option>
                <option value="mdcat">MDCAT Preparation</option>
                <option value="usmle">USMLE Study Materials</option>
                <option value="nursing">Nursing Exam Prep</option>
                <option value="pharmacy">Pharmacy Board Exams</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <label className="block mb-2 text-base font-medium text-gray-900">
                How would you rate our service?
              </label>
              <div className="flex flex-wrap gap-5 mt-2">
                {["Excellent", "Good", "Average", "Poor", "Very Poor"].map((label, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <input
                      type="radio"
                      id={`rating${5 - index}`}
                      name="rating"
                      value={5 - index}
                      checked={+formData.rating === 5 - index}
                      onChange={handleChange}
                      className="accent-[#1b5e20]"
                    />
                    <label htmlFor={`rating${5 - index}`} className="text-gray-700">
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-base font-medium text-gray-900">
                Your Feedback
              </label>
              <textarea
                name="message"
                required
                placeholder="Please share your experience with us..."
                value={formData.message}
                onChange={handleChange}
                className="w-full min-h-[150px] px-4 py-3 border border-gray-300 rounded-md text-base resize-y focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
              ></textarea>
            </div>

            {/* Suggestions */}
            <div className="mb-6">
              <label htmlFor="suggestions" className="block mb-2 text-base font-medium text-gray-900">
                What can we improve?
              </label>
              <textarea
                name="suggestions"
                placeholder="Any suggestions for how we can better serve your needs?"
                value={formData.suggestions}
                onChange={handleChange}
                className="w-full min-h-[100px] px-4 py-3 border border-gray-300 rounded-md text-base resize-y focus:outline-none focus:ring-2 focus:ring-[#1b5e20]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-[#1b5e20] hover:bg-[#145e28] text-white font-semibold py-3 px-8 rounded-md block mx-auto mt-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Submit Feedback
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-5">
            Thank you for helping us improve our services for future students!
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}
