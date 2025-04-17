"use client";
import styles from "./Hero2.module.css";

export default function Hero2() {
  return (
    <section className={styles.hero2}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Join thousands of students achieving academic success
          </h2>
          <p className={styles.description}>
            with our targeted study materials, practice tests, and expert guidance for MDCAT, ECAT, FSC and more.
          </p>
          <div className={styles.buttons}>
            <button className={`${styles.btn} ${styles.primary}`}>Get Started</button>
            <button className={`${styles.btn} ${styles.secondary}`}>View More</button>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.circle}>
            <div className={styles.centerEmoji}>🧑‍🎓</div>
            <div className={`${styles.icon} ${styles.topLeft}`}>🔢</div>
            <div className={`${styles.icon} ${styles.topRight}`}>⚗️</div>
            <div className={`${styles.icon} ${styles.bottomLeft}`}>⚛️</div>
            <div className={`${styles.icon} ${styles.bottomRight}`}>🧬</div>
          </div>
        </div>
      </div>
    </section>
  );
}
