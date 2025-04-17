"use client";
import styles from "./Impact.module.css";

export default function Impact() {
  const cards = [
    {
      number: "15,000+",
      text: "Students Helped",
      iconPath: "M12 3L1 9l11 6 11-6-11-6zm0 18l-9-4.88v-7.12l9 5 9-5v7.12l-9 4.88z",
    },
    {
      number: "95%",
      text: "Success Rate",
      iconPath:
        "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
    },
    {
      number: "50,000+",
      text: "Practice Questions",
      iconPath: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    },
    {
      number: "4.8/5",
      text: "Student Satisfaction",
      iconPath:
        "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    },
  ];

  return (
    <section className={styles.impact}>
      <h2 className={styles.heading}>Our Impact</h2>
      <div className={styles.container}>
        {cards.map((card, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.cardContent}>
              <div className={styles.number}>{card.number}</div>
              <div className={styles.description}>{card.text}</div>
            </div>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d={card.iconPath} />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
