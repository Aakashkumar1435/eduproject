"use client";
import React from "react";
import styles from "./AboutHeader.module.css";

export default function AboutHeader() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>
          <b>About Us</b>
        </h1>
        <p>
          We're dedicated to making quality education accessible to all students
          through comprehensive test preparation and subject mastery resources.
        </p>
      </section>

      {/* Our Mission */}
      <section className={styles.container}>
        <h2 className={styles.sectionTitle}>
          <b>Our Mission</b>
        </h2>
          <div className={styles.scrollWrapper}>
            <div className={styles.cardGrid}>
              {/* Vision */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🎯</div>
                  <h3>Our Vision</h3>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    To empower students with access to high-quality educational
                    resources...
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>💡</div>
                  <h3>Our Approach</h3>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    We combine expert teaching with comprehensive materials...
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🌟</div>
                  <h3>Our Values</h3>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    We believe in accessibility, excellence, and continuous
                    improvement...
                  </p>
                </div>
              </div>

              {/* New Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🚀</div>
                  <h3>Future Focus</h3>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    We're committed to evolving with technology and helping
                    students stay ahead through AI-integrated learning tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        
      </section>
    </>
  );
}
