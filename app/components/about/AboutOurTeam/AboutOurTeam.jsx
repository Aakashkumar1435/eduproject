"use client";
import React, { useState } from "react";
import Image from "next/image";

const AboutOurTeam = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const team = [
    {
      name: "Engr Aakash Kumar",
      role: "Biology Expert",
      degree: "Ph.D. in Molecular Biology",
      icon: "/Aakash.jpg",
      category: "Science",
      description: "Leading our biology department with expertise in molecular biology and genetics.",
    },
    {
      name: "Mr Hanzla Kalim",
      role: "Chemistry Expert",
      degree: "Ph.D. in Organic Chemistry",
      icon: "/panda.png",
      category: "Science",
      description: "Specializes in organic chemistry with research experience in pharmaceutical applications.",
    },
    {
      name: "Mr. Bakhat Nasar",
      role: "English Expert",
      degree: "Ph.D. in English Literature",
      icon: "/Bakhat.jpeg",
      category: "Humanities",
      description: "Passionate about literature and effective communication strategies.",
    },
    {
      name: "Mr. Muneeb Ur rehman",
      role: "Mathematics Expert",
      degree: "Ph.D. in Applied Mathematics",
      icon: "/Muneeb.jpeg",
      category: "Mathematics",
      description: "Transforms complex mathematical concepts into accessible learning materials.",
    },
    {
      name: "Mr. Abdullah Waqar",
      role: "Expert in physics",
      degree: "Ph.D. in Physics",
      icon: "/Abdullah.jpeg",
      category: "Science",
      description: "Specializes in theoretical physics with a focus on practical applications.",
    },
    {
      name: "Rana Jhanzaib Ali",
      role: "Ethics Expert",
      degree: "Ph.D. in Ethics",
      icon: "/Rana.jpeg",
      category: "Humanities",
      description: "Dedicated to fostering ethical thinking and moral reasoning in education.",
    },
    {
      name: "Mr. Aqib Ali",
      role: "Principal",
      degree: "Everything Expert",
      icon: "/Aqib.jpeg",
      category: "Leadership",
      description: "Visionary leader guiding our institution with expertise across multiple disciplines.",
    },
  ];

  const categories = ["All", "Science", "Mathematics", "Humanities", "Leadership"];
  
  const filteredTeam = activeCategory === "All" 
    ? team 
    : team.filter(member => member.category === activeCategory);

  return (
    <section className="bg-gray-900 py-16 px-5 my-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-green-500 opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Expert Team
            <span className="block h-1 w-20 bg-green-500 mx-auto mt-4"></span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Meet the brilliant minds behind our educational success. Our team of experts is dedicated to providing the highest quality education.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-green-500 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 relative">
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-500 mr-5">
                    <Image
                      src={member.icon}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <h3 className="font-bold text-xl">{member.name}</h3>
                    <p className="text-green-400 font-medium">{member.role}</p>
                    <span className="inline-block bg-gray-700 text-xs text-gray-300 px-2 py-1 rounded mt-1">
                      {member.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600">{member.description}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-500 text-sm">{member.degree}</p>
                  <div className="mt-4 flex justify-between">
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="text-3xl text-green-400 font-bold mb-2">7+</div>
            <div className="text-white font-medium">Expert Teachers</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="text-3xl text-green-400 font-bold mb-2">4+</div>
            <div className="text-white font-medium">Subject Areas</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="text-3xl text-green-400 font-bold mb-2">15+</div>
            <div className="text-white font-medium">Years Experience</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg transform transition-transform hover:-translate-y-1">
            <div className="text-3xl text-green-400 font-bold mb-2">1000+</div>
            <div className="text-white font-medium">Students Taught</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutOurTeam;