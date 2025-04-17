"use client";
import styles from "./ProgressCards.module.css";

const progressData = [
  { label: "Daily Streak", value: "5d" },
  { label: "Completion", value: "62%" },
];

export default function ProgressCards() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Your Progress</h2>
      <div className={styles.cards}>
        {progressData.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
