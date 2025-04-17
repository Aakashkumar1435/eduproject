"use client";
import { useState } from "react";
import styles from "./SearchBar.module.css";

const dummyData = [
  "Photosynthesis",
  "Newton's Laws",
  "Organic Chemistry",
  "Integration",
  "Cell Division",
  "Thermodynamics",
  "Probability",
  "Acids and Bases",
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const suggestions = dummyData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(suggestions);
    } else {
      setFiltered([]);
    }
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Search topic, chapter, or MCQ..."
        value={query}
        onChange={handleChange}
        className={styles.searchInput}
      />
      {filtered.length > 0 && (
        <ul className={styles.suggestions}>
          {filtered.map((item, index) => (
            <li key={index} className={styles.suggestionItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


