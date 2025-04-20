// ✅ File: /app/subject/[slug]/mcqs/[testId]/page.jsx

"use client";
import { useEffect, useState } from "react";
import styles from "./TestPage.module.css";

export default function TestPage({ params }) {
  const { slug } = params;

  const hardcodedTestId = "6803a92d4397cd370b261739"; // replace with a real testId from your DB

  const [testData, setTestData] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/all/detailedFLPTests?subjectName=${slug}`);
        const data = await res.json();

        const found = data.tests.find((item) => item.testId === hardcodedTestId);
        setTestData(found);
      } catch (err) {
        console.error("Failed to fetch test:", err);
      }
    };

    fetchTest();
  }, [slug]);

  if (!testData) return <div>Loading test...</div>;

  const current = testData.mcqs[currentQ];
  const totalQuestions = testData.mcqs.length;

  const handleOptionClick = (index) => {
    setSelectedOptions({ ...selectedOptions, [currentQ]: index });
  };

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) setCurrentQ(currentQ + 1);
  };

  const handlePrevious = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1);
  };

  const attempted = Object.keys(selectedOptions).length;
  const progress = Math.round((attempted / totalQuestions) * 100);

  return (
    <div className={styles.wrapper}>
      {/* Header Info */}
      <div className={styles.header}>
        <div className={styles.pathInfo}>
          <span className={styles.chapter}>Chapter: {slug}</span>
          <span className={styles.test}>Test: {testData.name}</span>
          <span className={styles.qNumber}>Q-{currentQ + 1}</span>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Question */}
      <div className={styles.questionBox}>
        <h3>{current.question}</h3>
        <ul className={styles.options}>
          {current.options.map((opt, i) => (
            <li
              key={i}
              className={`${styles.option} ${
                selectedOptions[currentQ] === i ? styles.selected : ""
              }`}
              onClick={() => handleOptionClick(i)}
            >
              {opt}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.statBtn}>📊 View Statistics</button>

        <div className={styles.navControls}>
          <button
            onClick={handlePrevious}
            className={styles.navBtn}
            disabled={currentQ === 0}
          >
            &lt; Previous
          </button>
          <span className={styles.counter}>
            {currentQ + 1} / {totalQuestions}
          </span>
          <button
            onClick={handleNext}
            className={styles.navBtn}
            disabled={currentQ === totalQuestions - 1}
          >
            Next &gt;
          </button>
        </div>

        <div className={styles.progress}>{progress}%</div>
      </div>
    </div>
  );
}
