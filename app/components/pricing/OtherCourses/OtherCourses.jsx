"use client";
import React, { useEffect, useState } from "react";
import ModalForm from "@/app/components/pricing/buyForm/BuyForm";

export default function OtherCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to load courses:", err));
  }, []);

  return (
    <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-green-400">Other Courses</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our specialized courses designed to help you master specific skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image || "/courses.png"} 
                  alt={course.title}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-400">{course.title}</h3>
                <p className="text-gray-400 mb-4 h-20 overflow-hidden">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-green-500 font-bold">PKR {course.price}</div>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show BuyForm if a course is selected */}
      {selectedCourse && (
        <ModalForm offer={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
}