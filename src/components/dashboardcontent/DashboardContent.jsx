"use client";
import Link from "next/link";
import styles from "./DashboardContent.module.css";

const DashboardContent = () => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2 className={styles.heading}>Subjects Enrolled</h2>
        <div className={styles.cardGrid}>
          <Card title="Biology" link="subject/biology" imgSrc="/biology.png" />
          <Card title="Physics" link="subject/physics" imgSrc="/physics.png" />
          <Card title="Chemistry" link="subject/chemistry" imgSrc="/chemistry.png" />
          <Card title="Math" link="subject/math" imgSrc="/math.png" />
          <Card title="Education News" link="subject/news" imgSrc="/news.png" />
          <Card title="MCQ" link="subject/mcq" imgSrc="/mcqs.png" />
          <Card title="Educations" link="subject/news" imgSrc="/news.png" />
          <Card title="MCQs" link="subject/mcq" imgSrc="/mcqs.png" />
          <Card title="Biology" link="subject/biology" imgSrc="/biology.png" />
          <Card title="Physics" link="subject/physics" imgSrc="/physics.png" />
          <Card title="Chemistry" link="subject/chemistry" imgSrc="/chemistry.png" />
          <Card title="Math" link="subject/math" imgSrc="/math.png" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Important</h2>
        <div className={styles.cardGrid}>
          <Card title="Education News" link="/news" imgSrc="/news.png" />
          <Card title="MCQ" link="/mcq" imgSrc="/mcqs.png" />
          
        </div>
      </section>
    </div>
  );
};

const Card = ({ title, link, imgSrc }) => (
    <Link href={link} className={styles.card}>
      <div className={styles.cardImage} style={{ backgroundImage: `url(${imgSrc})` }}></div>
      <span className={styles.cardText}>{title}</span>
    </Link>
  );
  

export default DashboardContent;
