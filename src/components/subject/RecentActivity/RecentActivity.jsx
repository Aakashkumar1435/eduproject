"use client";
import styles from "./RecentActivity.module.css";

const activityList = [
  { title: "Chapter 3 Notes", time: "10 mins ago" },
  { title: "Biology MCQs", time: "1 hour ago" },
];

export default function RecentActivity() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Recent Activity</h2>
      <div className={styles.grid}>
        {activityList.map((activity, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.title}>{activity.title}</div>
            <div className={styles.time}>{activity.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
