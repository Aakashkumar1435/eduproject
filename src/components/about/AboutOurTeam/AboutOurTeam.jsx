"use client";
import React from "react";
import styles from "./AboutOurTeam.module.css";
import Image from "next/image";

const AboutOurTeam = () => {
  const team = [
    {
      name: "Engr Aakash",
      role: "Biology Expert",
      degree: "Ph.D. in Molecular Biology",
      icon: "/Aakash.jpg",
    },
    {
      name: "Mr Panda",
      role: "Chemistry Expert",
      degree: "Ph.D. in Organic Chemistry",
      icon: "/panda.png",
    },
    {
      name: "Dr. Khalid",
      role: "Physics Expert",
      degree: "Ph.D. in Theoretical Physics",
      icon: "/Aakash.jpg",
    },
    {
      name: "Dr. Fatima",
      role: "Mathematics Expert",
      degree: "Ph.D. in Applied Mathematics",
      icon: "/panda.png",
    },
    {
      name: "Dr. Zain",
      role: "AI in Education",
      degree: "Ph.D. in Computer Science",
      icon: "/Aakash.jpg",
    },
  ];

  return (
    <section className={styles.teamSection}>
      <h2 className={styles.sectionTitle}><b>Our Team</b></h2>
      <div className={styles.scrollWrapper}>
        <div className={styles.teamRow}>
          {team.map((member, index) => (
            <div className={styles.teamCard} key={index}>
              <div className={styles.teamPhoto}>
                {" "}
                <Image
                  src={member.icon}
                  alt={member.name}
                  width={120}
                  height={120}
                  className={styles.teamImage}
                />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p className={styles.degree}>{member.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutOurTeam;
