"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from '../components/footer/Footer';
import Swal from 'sweetalert2';
import { Star, Send, ChevronDown, MessageSquare, LightbulbIcon } from "lucide-react";

export default function FeedbackForm() {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    rating: "",
    message: "",
    suggestions: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Redirect if no user ID found
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to submit feedback',
        icon: 'warning',
        confirmButtonColor: '#10B981',
      }).then(() => {
        window.location.href = "/User-Sign-In";
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to submit feedback',
        icon: 'warning',
        confirmButtonColor: '#10B981',
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/feedback/?userId=${userId}`, {
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
      
      setIsLoading(false);
      
      if (res.ok) {
        Swal.fire({
          title: 'Thank You!',
          text: 'Your feedback has been submitted successfully',
          icon: 'success',
          confirmButtonColor: '#10B981',
        });
        
        setFormData({
          service: "",
          rating: "",
          message: "",
          suggestions: "",
        });
      } else {
        Swal.fire({
          title: 'Submission Failed',
          text: data.error || 'There was an error submitting your feedback',
          icon: 'error',
          confirmButtonColor: '#10B981',
        });
      }
    } catch (err) {
      setIsLoading(false);
      Swal.fire({
        title: 'Server Error',
        text: 'Unable to connect to the server. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#10B981',
      });
    }
  };

  // Custom star rating component
  const StarRating = ({ rating, onRatingChange }) => {
    const ratingLabels = {
      1: "Very Poor",
      2: "Poor",
      3: "Average",
      4: "Good", 
      5: "Excellent"
    };
    
    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className="focus:outline-none transition-colors duration-200"
            >
              <Star
                fill={rating >= star ? "#10B981" : "transparent"}
                stroke={rating >= star ? "#10B981" : "#9CA3AF"}
                size={32}
                className={`${rating >= star ? "text-emerald-500" : "text-gray-400"} 
                           ${rating === star ? "scale-110 transition-transform duration-200" : ""}`}
              />
            </button>
          ))}
        </div>
        {rating && (
          <span className="text-emerald-500 font-medium">{ratingLabels[rating]}</span>
        )}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-900 py-10 pt-20">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="text-3xl text-emerald-400 text-center mb-8 font-bold relative">
            Share Your Feedback
            <div className="w-20 h-1 bg-emerald-400 mx-auto mt-2"></div>
          </h1>

          <div className="bg-gray-800 rounded-xl p-8 shadow-xl border-t-4 border-emerald-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service */}
              <div>
                <label htmlFor="service" className="mb-2 text-base font-medium text-gray-200 flex items-center">
                  <MessageSquare size={18} className="mr-2 text-emerald-400" />
                  Which service did you use?
                </label>
                <div className="relative">
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border bg-gray-700 border-gray-600 rounded-md text-white text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                  >
                    <option value="">Select an option</option>
                    <option value="mdcat">MDCAT Preparation</option>
                    <option value="usmle">USMLE Study Materials</option>
                    <option value="nursing">Nursing Exam Prep</option>
                    <option value="pharmacy">Pharmacy Board Exams</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="mb-3 text-base font-medium text-gray-200 flex items-center">
                  <Star size={18} className="mr-2 text-emerald-400" />
                  How would you rate our service?
                </label>
                <StarRating rating={Number(formData.rating)} onRatingChange={handleRatingChange} />
              </div>

              {/* Feedback */}
              <div>
                <label htmlFor="message" className="mb-2 text-base font-medium text-gray-200 flex items-center">
                  <MessageSquare size={18} className="mr-2 text-emerald-400" />
                  Your Feedback
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Please share your experience with us..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full min-h-[150px] px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white text-base resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              {/* Suggestions */}
              <div>
                <label htmlFor="suggestions" className="mb-2 text-base font-medium text-gray-200 flex items-center">
                  <LightbulbIcon size={18} className="mr-2 text-emerald-400" />
                  What can we improve?
                </label>
                <textarea
                  name="suggestions"
                  placeholder="Any suggestions for how we can better serve your needs?"
                  value={formData.suggestions}
                  onChange={handleChange}
                  className="w-full min-h-[100px] px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white text-base resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-md flex items-center justify-center space-x-2 mx-auto mt-6 shadow-md hover:shadow-lg transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>Submit Feedback</span>
                <Send size={18} />
              </button>
            </form>

            <div className="text-center text-sm text-gray-400 mt-8">
              Thank you for helping us improve our services for future students!
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}