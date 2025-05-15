"use client";
import React, { useState } from "react";
import styles from "./FAQ.module.css";

const faqData = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, JazzCash, EasyPaisa, and bank transfers.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan anytime. Changes apply next billing cycle.",
  },
  {
    question: "Is there a discount for students?",
    answer:
      "Yes, we offer student discounts. Just provide a valid ID to our support team.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from your dashboard. You'll retain access until your billing period ends.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faq}>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div
          className={`${styles.faqItem} ${
            openIndex === index ? styles.active : ""
          }`}
          key={index}
        >
          <div
            className={styles.faqQuestion}
            onClick={() => toggleFAQ(index)}
          >
            {item.question}
          </div>
          <div className={styles.faqAnswer}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
