import React from "react";
import styles from "./page.module.css";

export default function SubjectLayout({ children, params }) {
  const { slug } = params;

  // Capitalize the first letter of the subject
  const formattedSubject = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className={styles.subjectWrapper}>
      <div className={styles.header}>
        <h1 className={styles.subjectName}>{formattedSubject}</h1>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

