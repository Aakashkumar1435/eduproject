"use client";
import styles from "./StudyCategories.module.css";
import Image from "next/image";

const categories = [
  { title: "Notes", icon: "/notes.png", href: "#" },
  { title: "MCQs", icon: "/mcq.png", href: "#" },
  { title: "FLPs", icon: "/flps.png", href: "#" },
  { title: "Lectures", icon: "/lectures.png", href: "#" },
];

export default function StudyCategories() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Study Categories</h2>
      <div className={styles.grid}>
        {categories.map((item, idx) => (
          <a key={idx} href={item.href} className={styles.card}>
            <Image src={item.icon} alt={item.title} width={40} height={40} />
            <span>{item.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
