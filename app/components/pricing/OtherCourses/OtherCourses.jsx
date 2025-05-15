"use client";
import React, { useEffect, useState } from "react";
import styles from "./OtherCourses.module.css";
import ModalForm from "@/components/pricing/buyForm/BuyForm";

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
    <div className={styles.otherCoursesSection}>
      <h2>Other Courses</h2>
      <p>Explore our specialized courses designed to help you master specific skills</p>

      <div className={styles.coursesContainer}>
        {courses.map((course, index) => (
          <div className={styles.courseCard} key={index}>
            <img src={course.image || "/courses.png"} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className={styles.coursePrice}>PKR {course.price}</div>
            <button
              className={styles.courseBtn}
              onClick={() => setSelectedCourse(course)}
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      {/* Show BuyForm if a course is selected */}
      {selectedCourse && (
        <ModalForm offer={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  );
}
