"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MCQList.module.css";

const mcqData = [
  {
    chapter: "Introduction to Cell Biology",
    tests: [
      {
        name: "Test 1",
        questions: 50,
        time: 60,
        difficulty: "Easy",
      },
      {
        name: "Test 2",
        questions: 75,
        time: 90,
        difficulty: "Medium",
      },
      {
        name: "Test 3",
        questions: 100,
        time: 120,
        difficulty: "Hard",
      },
    ],
  },
  {
    chapter: "Biological Molecules",
    tests: [
      {
        name: "Test 1",
        questions: 40,
        time: 45,
        difficulty: "Easy",
      },
      {
        name: "Test 2",
        questions: 60,
        time: 60,
        difficulty: "Medium",
      },
    ],
  },
];

export default function MCQList({ subject }) {
  const [openIndex, setOpenIndex] = useState(null);
  const pathname = usePathname();
  const slug = pathname.split("/")[2]; // e.g., 'biology'

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{subject} MCQs</h2>
      <p className={styles.description}>
        Practice chapter-wise MCQ tests to master {subject}.
      </p>

      <div className={styles.chapterBox}>
        {mcqData.map((chapter, idx) => (
          <div key={idx} className={styles.chapterItem}>
            <div className={styles.chapterHeader} onClick={() => toggle(idx)}>
              <span>
                {idx + 1}. {chapter.chapter}
              </span>
              <span className={styles.testCount}>
                {chapter.tests.length} Tests
              </span>
            </div>

            {openIndex === idx && (
              <div className={styles.testList}>
                {chapter.tests.map((test, i) => {
                  const testSlug = test.name.toLowerCase().replace(/\s+/g, "-");

                  return (
                    <Link
                      key={i}
                      href={`/subject/${slug}/mcqs/${testSlug}`}
                      className={styles.testItem}
                    >
                      <strong>{test.name}</strong>
                      <div className={styles.testMeta}>
                        {test.questions} Questions • {test.time} min • {test.difficulty}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
