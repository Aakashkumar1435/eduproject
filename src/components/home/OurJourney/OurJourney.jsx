"use client";
import styles from "./OurJourney.module.css";

export default function OurJourney() {
  const timeline = [
    {
      icon: "💡",
      date: "January 2025",
      title: "The Initial Spark",
      desc: "It all began with a simple observation: students needed better resources to prepare for competitive exams. Our founder envisioned a platform that would bridge this gap.",
    },
    {
      icon: "🔍",
      date: "February 2025",
      title: "Research & Planning",
      desc: "We spent months researching educational needs, conducting surveys, and consulting with experts to understand what students truly needed.",
    },
    {
      icon: "👥",
      date: "March 2025",
      title: "Building Our Team",
      desc: "We assembled a team of passionate educators and tech experts who shared our vision of transforming education through accessible resources.",
    },
    {
      icon: "🚀",
      date: "April 2025",
      title: "Launch Day",
      desc: "Today, we're proud to launch our platform, offering comprehensive resources for MDCAT, ECAT, IELTS, FSC, and Matric students across the country.",
    },
  ];

  const cards = [
    {
      icon: "🌟",
      title: "Our Mission",
      desc: "To provide high-quality, accessible educational resources that empower students to achieve their academic goals and unlock their full potential.",
    },
    {
      icon: "🔭",
      title: "Our Vision",
      desc: "To become the leading educational platform that transforms how students prepare for critical exams, creating a community of confident, successful learners.",
    },
    {
      icon: "🤝",
      title: "Our Values",
      desc: "Excellence, accessibility, innovation, and student-centered learning guide everything we do. We believe education should be available to everyone.",
    },
  ];

  return (
    <section className={styles.journeySection}>
      <div className={`${styles.decoration} ${styles.decoration1}`}>📚</div>
      <div className={`${styles.decoration} ${styles.decoration2}`}>🎓</div>

      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Our Journey</h2>
        </div>

        <div className={styles.storyIntro}>
          <p>
            From a <span className={styles.highlight}>simple idea</span> to a comprehensive educational platform.
            We're just beginning our mission to make quality education accessible to all.
            Join us as we embark on this exciting <span className={styles.highlight}>journey of growth and learning</span>.
          </p>
        </div>

        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <div className={styles.timelineItem} key={i}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineIcon}>{item.icon}</div>
                <div className={styles.timelineDate}>{item.date}</div>
                <h3 className={styles.timelineTitle}><b>{item.title}</b></h3>
                <p className={styles.timelineDescription}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.visionContainer}>
          {cards.map((card, i) => (
            <div className={styles.visionCard} key={i}>
              <div className={styles.visionIcon}>{card.icon}</div>
              <h3 className={styles.visionTitle}><b>{card.title}</b></h3>
              <p className={styles.visionDescription}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <a href="#" className={styles.ctaButton}>Join Our Community</a>
        </div>
      </div>
    </section>
  );
}
