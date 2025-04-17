"use client";
import styles from "./WhyChoose.module.css";
import { useState } from "react";

export default function WhyChoose() {
  const [activeCard, setActiveCard] = useState(null);

  const handleMouseLeave = (index) => {
    setActiveCard(index);
    setTimeout(() => {
      setActiveCard(null);
    }, 2000); // Keep green for 2s
  };

  const cards = [
    {
      icon: "🌱",
      title: "Personalized Learning",
      desc: "Adaptive platform tailored to your pace, strengths, and weaknesses.",
    },
    {
      icon: "📚",
      title: "Interactive Content",
      desc: "Engaging visuals, quizzes, and real-time explanations for every topic.",
    },
    {
      icon: "🏆",
      title: "Gamified Experience",
      desc: "Earn rewards, track progress, and stay motivated with every step.",
    },
    {
      icon: "🧠",
      title: "Smart Analytics",
      desc: "See where you excel and what to improve instantly.",
    },
    {
        icon: "🌱",
        title: "Personalize Learning",
        desc: "Adaptive platform tailored to your pace, strengths, and weaknesses.",
      },
  ];

  return (
    <section className={styles.why}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2>Why Choose <span>CrackIt</span></h2>
          <p>
            We’ve reimagined the learning experience to make it more engaging, effective, and enjoyable.
          </p>
        </div>

        <div className={styles.cards}>
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${styles.card} ${activeCard === i ? styles.leaveGreen : ""}`}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className={styles.icon}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
