"use client";
import React from "react";
import styles from "./HowToJoin.module.css";

const steps = [
  {
    number: "1",
    title: "Choose Your Plan",
    description: "Select the plan that best fits your learning needs and goals.",
  },
  {
    number: "2",
    title: "Create Account",
    description: "Fill in your details to create your personal learning account.",
  },
  {
    number: "3",
    title: "Make Payment",
    description: "Complete your payment using your preferred payment method.",
  },
  {
    number: "4",
    title: "Start Learning",
    description: "Access your dashboard and begin your educational journey!",
  },
];

export default function HowToJoin() {
  return (
    <section className={styles.joinProcess}>
      <h2>How to Join CrackIt</h2>

      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div className={styles.step} key={index}>
            <div className={styles.stepNumber}>{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.joinNowContainer}>
        <button className={styles.joinNowBtn}>Join Now</button>
      </div>
    </section>
  );
}
