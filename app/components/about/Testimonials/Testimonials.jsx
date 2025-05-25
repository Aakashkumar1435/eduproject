"use client";
import React, { useState } from "react";
import Image from "next/image";
import { User, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Lina Torres",
      title: "Pharmacy Student",
      quote:
        "The night before my finals, I discovered a concept I'd missed. The 24/7 tutor support saved me with clear explanations at 2 AM!",
      image: "/student.png",
      rating: 5,
    },
    {
      name: "Ali Hassan",
      title: "MDCAT Topper",
      quote:
        "This platform helped me secure a top score in my MDCAT exam. The practice questions and detailed explanations were invaluable!",
      image: "/student.png",
      rating: 4,
    },
    {
      name: "Areeba Khan",
      title: "FSc Student",
      quote:
        "I love how everything is organized and simple. The subject-wise MCQs helped me boost my confidence before board exams.",
      image: "/student.png",
      rating: 5,
    },
    {
      name: "Ryan Wilson",
      title: "Pharmacy Student",
      quote:
        "The night before my finals, I discovered a concept I'd missed. The 24/7 tutor support saved me with clear explanations at 2 AM!",
      image: "/student.png",
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-gray-900 py-20 px-5 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-green-500 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
      <div className="absolute w-64 h-64 rounded-full bg-green-500 opacity-10 -bottom-32 -left-32"></div>
      <div className="absolute w-64 h-64 rounded-full bg-green-700 opacity-10 -top-32 -right-32"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-center text-white text-4xl font-bold mb-3">
            What Our Students Say
          </h2>
          <span className="block h-1 w-24 bg-green-500"></span>
          <p className="text-gray-300 mt-4 text-center max-w-xl">
            Hear from our students about how our platform helped them achieve academic success
          </p>
        </div>
        
        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border-l-4 border-green-500 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 mb-4">
                  {testimonials[activeIndex].image ? (
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="rounded-full object-cover border-4 border-green-500"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                      <User size={40} className="text-green-500" />
                    </div>
                  )}
                </div>
                <h3 className="text-green-400 text-xl font-bold">{testimonials[activeIndex].name}</h3>
                <p className="text-gray-400">{testimonials[activeIndex].title}</p>
                <div className="flex mt-2">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, index) => (
                    <Star key={index} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - testimonials[activeIndex].rating }).map((_, index) => (
                    <Star key={index} size={16} className="text-gray-600" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center relative px-6 md:px-12">
              <Quote className="text-green-500 opacity-30 absolute top-0 left-0 transform -translate-y-1/2" size={40} />
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic">
                {testimonials[activeIndex].quote}
              </p>
              <Quote className="text-green-500 opacity-30 absolute bottom-0 right-0 transform translate-y-1/2 rotate-180" size={40} />
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 md:-translate-x-12 bg-gray-800 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg focus:outline-none group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 md:translate-x-12 bg-gray-800 hover:bg-green-600 text-white p-3 rounded-full transition-all duration-300 shadow-lg focus:outline-none group"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
        
        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-green-500 w-6" : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;