// components/home/Hero.jsx
"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}>CI</div>
          <div className={styles.logoText}>CrackIt</div>
        </div>
        <h1 className={styles.title}>
          Discover a <span className={styles.highlight}>Natural</span> New Way to Learn
        </h1>
        <p className={styles.description}>
          Our immersive learning platform combines interactive content, expert instruction,
          and engaging exercises to make your educational journey exciting and effective.
        </p>
        <div className={styles.buttons}>
          <button className={`${styles.btn} ${styles.primary}`}>Explore Courses</button>
          <button className={`${styles.btn} ${styles.secondary}`}>Take a Tour</button>
        </div>
      </div>
    </section>
  );
}
