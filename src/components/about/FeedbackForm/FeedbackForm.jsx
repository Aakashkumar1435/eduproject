"use client";
import React from "react";
import styles from "./FeedbackForm.module.css";

export default function FeedbackForm  () {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.heading}><b>Share Your Feedback</b></h1>

        <div className={styles.formCard}>
          <div className={styles.cornerAccent}></div>

          <form>
            {/* Name */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className={styles.inputField}
                required
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={styles.inputField}
                required
              />
            </div>

            {/* Service Selection */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="course">Which service did you use?</label>
              <select id="course" className={styles.selectField} required>
                <option value="">Select an option</option>
                <option value="mdcat">MDCAT Preparation</option>
                <option value="usmle">USMLE Study Materials</option>
                <option value="nursing">Nursing Exam Prep</option>
                <option value="pharmacy">Pharmacy Board Exams</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Rating */}
            <div className={styles.formGroup}>
              <label className={styles.label}>How would you rate our service?</label>
              <div className={styles.ratingContainer}>
                {["Excellent", "Good", "Average", "Poor", "Very Poor"].map((label, index) => (
                  <div className={styles.ratingOption} key={index}>
                    <input
                      type="radio"
                      id={`rating${5 - index}`}
                      name="rating"
                      value={5 - index}
                      className={styles.radioInput}
                    />
                    <label htmlFor={`rating${5 - index}`}>{label}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Message */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">Your Feedback</label>
              <textarea
                id="message"
                className={styles.textareaField}
                placeholder="Please share your experience with us..."
                required
              ></textarea>
            </div>

            {/* Suggestions */}
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="improvements">What can we improve?</label>
              <textarea
                id="improvements"
                className={styles.textareaField}
                placeholder="Any suggestions for how we can better serve your needs?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitBtn}>Submit Feedback</button>
          </form>

          <div className={styles.formFooter}>
            Thank you for helping us improve our services for future students!
          </div>
        </div>
      </div>
    </div>
  );
};

