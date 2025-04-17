"use client";
import React from "react";
import styles from "./AboutWhatWeOffer.module.css";

export default function AboutWhatWeOffer () {
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}><b>What We Offer</b></h2>
      <div className={styles.scrollWrapper}>
        <div className={styles.cardGrid}>
          {/* Test Preparation */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📚</div>
              <h3>Test Preparation</h3>
            </div>
            <div className={styles.cardBody}>
              <p>
                Comprehensive preparation for MDCAT, ECAT, FSC, IELTS, and GAT
                exams with practice tests and study materials.
              </p>
            </div>
          </div>

          {/* Subject Expertise */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>🧪</div>
              <h3>Subject Expertise</h3>
            </div>
            <div className={styles.cardBody}>
              <p>
                In-depth content for Biology, Physics, Chemistry, and
                Mathematics taught by subject matter experts.
              </p>
            </div>
          </div>

          {/* MCQ Practice */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📝</div>
              <h3>MCQ Practice</h3>
            </div>
            <div className={styles.cardBody}>
              <p>
                Thousands of multiple-choice questions with detailed
                explanations to help you master concepts and test strategies.
              </p>
            </div>
          </div>
          {/* Test Preparation */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>📚</div>
              <h3>Test Preparation</h3>
            </div>
            <div className={styles.cardBody}>
              <p>
                Comprehensive preparation for MDCAT, ECAT, FSC, IELTS, and GAT
                exams with practice tests and study materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
