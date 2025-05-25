'use client';

import { useState } from 'react';
import styles from './BuyForm.module.css';

export default function ModalForm({ offer, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("screenshot", formData.screenshot);
    form.append("offerTitle", offer.title);
    if (offer.category) form.append("category", offer.category);

    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        body: form,
      });

      const resBody = await res.json();

      if (res.ok) {
        alert("Form submitted successfully!");
        onClose();
      } else {
        alert(resBody.error || "Failed to submit form");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Server error");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.heading}><b>{offer.title}</b></h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            required
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="screenshot"
            type="file"
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Submit</button>
          <button
            type="button"
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
