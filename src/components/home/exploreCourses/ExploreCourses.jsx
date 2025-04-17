"use client";
import styles from "./ExploreCourses.module.css";

export default function ExploreCourses() {
  const courses = [
    { emoji: "🧪", title: "MDCAT", subtitle: "Medical Entry Test" },
    { emoji: "⚙️", title: "ECAT", subtitle: "Engineering Entry Test" },
    { emoji: "🌎", title: "IELTS", subtitle: "English Proficiency" },
    { emoji: "🔬", title: "FSC", subtitle: "Pre-Medical/Engineering" },
    { emoji: "📝", title: "Matric", subtitle: "Secondary Education" },
    { emoji: "🧪", title: "MDCAT", subtitle: "Medical Entry Test" },
    { emoji: "⚙️", title: "ECAT", subtitle: "Engineering Entry Test" },
  ];

  return (
    <section className={styles.heroSection}>
      <div className={`${styles.floating} ${styles.one}`}>🎓</div>
      <div className={`${styles.floating} ${styles.two}`}>📚</div>
      <div className={`${styles.floating} ${styles.three}`}>🔍</div>

      <div className={styles.container}>
        <h1 className={styles.headline}>Get Ready to Crack It</h1>

        <div className={styles.coursesContainer}>
          {courses.map((course, idx) => (
            <div className={styles.courseCard} key={idx}>
              <div className={styles.courseIcon}>{course.emoji}</div>
              <h2 className={styles.courseTitle}>{course.title}</h2>
              <div className={styles.courseOverlay}>{course.subtitle}</div>
            </div>
          ))}
        </div>

        <a href="#" className={styles.btnExplore}>Explore Courses</a>
      </div>
    </section>
  );
}
