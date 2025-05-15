"use client";
import React, { useRef } from "react";
import Image from "next/image";

function Testimonials() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (direction === "left") {
      container.scrollBy({ left: -350, behavior: "smooth" });
    } else {
      container.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

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
      name: "Lina Torres",
      title: "Pharmacy Student",
      quote:
        "The night before my finals, I discovered a concept I'd missed. The 24/7 tutor support saved me with clear explanations at 2 AM!",
      image: "/student.png",
      rating: 5,
    },
  ];

  return (
    <section className="bg-green-50 py-16 px-5 relative">
      <h2 className="text-center mb-8 text-green-800 text-4xl font-bold">What Our Students Say</h2>

      <div className="flex justify-end gap-2 mb-2">
        <button 
          onClick={() => scroll("left")} 
          className="bg-green-500 text-white border-none text-xl py-1 px-3 rounded cursor-pointer"
        >
          ◀
        </button>
        <button 
          onClick={() => scroll("right")} 
          className="bg-green-500 text-white border-none text-xl py-1 px-3 rounded cursor-pointer"
        >
          ▶
        </button>
      </div>

      <div className="overflow-x-auto pb-2 scroll-smooth" ref={scrollRef}>
        <div className="grid grid-flow-col auto-cols-min md:auto-cols-fr gap-8 py-2 min-w-full">
          {testimonials.map((t, i) => (
            <div 
              className="w-[350px] bg-white rounded-2xl p-6 text-gray-700 italic shadow-md flex flex-col justify-between
                       transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:bg-gradient-to-r hover:from-green-50 hover:to-white" 
              key={i}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div className="ml-3 text-left">
                  <p className="font-bold not-italic text-green-500">{t.name}</p>
                  <p className="text-sm text-gray-500 not-italic">{t.title}</p>
                </div>
              </div>

              <div className="text-5xl text-green-500 mb-2 leading-none">"</div>
              <p className="text-lg leading-relaxed mb-5 italic">{t.quote}</p>

              <div className="text-yellow-400 text-lg mt-auto">
                {Array.from({ length: t.rating }).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;