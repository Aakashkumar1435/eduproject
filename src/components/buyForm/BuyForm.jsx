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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted for:', offer.title);
    console.log('Form data:', formData);
    alert('Form submitted! (simulated)');
    onClose();
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
          <button type="button" onClick={onClose} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
