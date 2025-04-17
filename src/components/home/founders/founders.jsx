"use client";
import styles from "./founders.module.css";

export default function FoundersSection() {
  const founders = [
    {
      name: "Aakash Kumar",
      role: "CEO & Educational Psychologist",
      bio: "With over 15 years of experience in educational psychology, Sarah leads our mission to create learning experiences that adapt to individual needs and learning styles.",
      image: "/ak.jpeg",
    },
    {
      name: "Hanzla Kalim",
      role: "CTO & Learning Technologist",
      bio: "Hanzla combines his passion for technology with educational expertise to develop platforms that make learning accessible, engaging, and effective for all students.",
      image: "/hanzla.jpeg",
    },
    // {
    //   name: "Olivia Martinez",
    //   role: "Chief Content Strategist",
    //   bio: "Olivia's background in curriculum development guides our content creation process, ensuring all materials are engaging, effective, and aligned with modern educational standards.",
    //   image: "/api/placeholder/400/500",
    // },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <h2>
          Meet Our <span>Founders</span>
        </h2>
        <p>
          Passionate educators and innovators committed to transforming the learning
          experience through technology and research-based methodologies.
        </p>
      </div>

      <div className={styles.foundersGrid}>
        {founders.map((founder, index) => (
          <div className={styles.founderCard} key={index}>
            <div className={styles.founderImage}>
              <img src={founder.image} alt={founder.name} />
            </div>
            <div className={styles.founderInfo}>
              <h3 className={styles.founderName}>{founder.name}</h3>
              <p className={styles.founderRole}><b>{founder.role}</b></p>
              <p className={styles.founderBio}>{founder.bio}</p>
              <div className={styles.socialLinks}>
                <a href="#"><i>in</i></a>
                <a href="#"><i>tw</i></a>
                <a href="#"><i>em</i></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
