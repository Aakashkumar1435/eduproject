'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import ModalForm from '@/components/buyForm/BuyForm';

const categories = ['MDCAT', 'ECAT', 'FSC', 'IELTS', 'GAT'];

const offers = {
  MDCAT: [
    { title: 'Basic', price: 9000, description: 'This is the basic MDCAT offer.' },
    { title: 'Premium', price: 9999, description: 'Premium MDCAT includes test series and lectures.' },
  ],
  ECAT: [
    { title: 'ECAT Gold', price: 8500, description: 'ECAT Gold includes past paper discussion.' },
    { title: 'Basics', price: 9000, description: 'Basic ECAT content coverage.' },
    { title: 'Premiums', price: 9999, description: 'Premium ECAT with mentorship.' },
    { title: 'Basicss', price: 9000, description: 'Repeated basic version.' },
    { title: 'Premiumss', price: 9999, description: 'Repeated premium version.' },
  ],
  FSC: [
    { title: 'FSC Pack', price: 7000, description: 'Full FSC content coverage with notes.' },
  ],
  IELTS: [
    { title: 'IELTS Pro', price: 6000, description: 'IELTS Pro includes mock tests and audio training.' },
  ],
  GAT: [
    { title: 'GAT Crash', price: 5000, description: 'Crash course for GAT preparation.' },
  ],
};

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState('MDCAT');
  const [openDescriptions, setOpenDescriptions] = useState({});
  const [selectedOffer, setSelectedOffer] = useState(null); 

  const toggleDescription = (title) => {
    setOpenDescriptions((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header Section */}
      <div className={styles.headerContainer}>
        <div>
          <h2 className={styles.title}>Our Offers</h2>
          <p className={styles.subtitle}>Join in affordable prices</p>
        </div>
        <Link href="/processtojoin" className={styles.joinButton}>
          Process to Join
        </Link>
      </div>

      {/* Category Buttons */}
      <p>Click on the button to see its offers</p>
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.activeCategory : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Offer Cards */}
      <div className={styles.offerScrollWrapper}>
        {offers[selectedCategory]?.map((offer) => (
          <div className={styles.offerCard} key={offer.title}>
            <h3>{offer.title}</h3>
            <p className={styles.price}>PKR {offer.price}</p>
            <div className={styles.cardButtons}>
              <button onClick={() => setSelectedOffer(offer)} className={styles.buyBtn}>Buy</button>
              <button
                className={styles.descBtn}
                onClick={() => toggleDescription(offer.title)}
              >
                {openDescriptions[offer.title] ? 'Hide ▲' : 'Description ▼'}
              </button>
            </div>
            {openDescriptions[offer.title] && (
              <p className={styles.description}>{offer.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Other Courses Section */}
      <h2 className={styles.sectionTitle}>Other Courses</h2>
      <div className={styles.otherCoursesWrapper}>
        {[
          { name: 'Python', image: '/python.png' },
          { name: 'Java', image: '/java.png' },
          { name: 'Web Development', image: '/webdev.png' },
          { name: 'AI Basics', image: '/AI.png' },
          { name: 'Pythonn', image: '/python.png' },
          { name: 'Javaa', image: '/java.png' },
        ].map((course) => (
          <div key={course.name} className={styles.courseCard}>
            <img
              src={course.image}
              alt={course.name}
              className={styles.courseImage}
            />
            <p className={styles.courseTitle}>{course.name}</p>
            <button onClick={() => setSelectedOffer(course)} className={styles.buyBtn}>Buy</button>
          </div>
        ))}
      </div>

      {/* Buy Modal */}
      {selectedOffer && (
        <ModalForm offer={selectedOffer} onClose={() => setSelectedOffer(null)} />
      )}
    </div>
  );
}
