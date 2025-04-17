"use client";
import React, { useRef } from "react";
import styles from "./Testimonials.module.css";
import Image from "next/image";

function Testimonials ()  {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (direction === "left") {
      container.scrollBy({ left: -350, behavior: "smooth" });
    } else {
      container.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const testimonials = [
    {
      name: "Lina Torres",
      title: "Pharmacy Student",
      quote:
        "The night before my finals, I discovered a concept I'd missed. The 24/7 tutor support saved me with clear explanations at 2 AM!",
      image: "/student.png",
      rating: 5,
    },
    {
      name: "Ali Hassan",
      title: "MDCAT Topper",
      quote:
        "This platform helped me secure a top score in my MDCAT exam. The practice questions and detailed explanations were invaluable!",
        image: "/student.png",
      rating: 4,
    },
    {
      name: "Areeba Khan",
      title: "FSc Student",
      quote:
        "I love how everything is organized and simple. The subject-wise MCQs helped me boost my confidence before board exams.",
        image: "/student.png",
      rating: 5,
    },
    {
        name: "Lina Torres",
        title: "Pharmacy Student",
        quote:
          "The night before my finals, I discovered a concept I'd missed. The 24/7 tutor support saved me with clear explanations at 2 AM!",
        image: "/student.png",
        rating: 5,
      },
  ];

  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.sectionTitle}><b>What Our Students Say</b></h2>

      <div className={styles.arrowControls}>
        <button onClick={() => scroll("left")} className={styles.arrow}>
          ◀
        </button>
        <button onClick={() => scroll("right")} className={styles.arrow}>
          ▶
        </button>
      </div>

      <div className={styles.scrollWrapper} ref={scrollRef}>
        <div className={styles.testimonialRow}>
          {testimonials.map((t, i) => (
            <div className={styles.testimonialCard} key={i}>
              <div className={styles.profile}>
                <Image
                  src={t.image}
                  alt={t.name}
                  width={50}
                  height={50}
                  className={styles.avatar}
                />
                <div className={styles.userInfo}>
                  <p className={styles.name}>{t.name}</p>
                  <p className={styles.title}>{t.title}</p>
                </div>
              </div>

              <div className={styles.quoteIcon}>“</div>
              <p className={styles.quote}>{t.quote}</p>

              <div className={styles.stars}>
                {Array.from({ length: t.rating }).map((_, index) => (
                  <span key={index}>⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
