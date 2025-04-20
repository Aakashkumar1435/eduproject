"use client";
import styles from "./StudyCategories.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Get the current subject slug from the URL
const categories = [
  { title: "Notes", icon: "/notes.png", href: "notes" },
  { title: "MCQs", icon: "/mcq.png", href: "mcqs" },
  { title: "FLPs", icon: "/flps.png", href: "flps" },
  { title: "Lectures", icon: "/lectures.png", href: "lectures" },
];

export default function StudyCategories() {
  const pathname = usePathname();
  const subjectSlug = pathname.split("/")[2]; 

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Study Categories</h2>
      <div className={styles.grid}>
        {categories.map((item, idx) => (
          <Link
            key={idx}
            href={`/subject/${subjectSlug}/${item.href}`}
            className={styles.card}
          >
            <Image src={item.icon} alt={item.title} width={40} height={40} />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
