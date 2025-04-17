import React from 'react'
import styles from "./Footer.module.css";
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div>All rights are reserved by Aakash and Hanzla. &copy;</div>
      <div className={styles.social}>
      <div className={styles.imgContainer}>
        <Image src="/1.png" fill={true} alt="lama dev"/>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/2.png" fill={true} alt="lama dev"/>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/3.png" fill={true} alt="lama dev"/>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/4.png" fill={true} alt="lama dev"/>
      </div>
      </div>
    </div>
  )
}

