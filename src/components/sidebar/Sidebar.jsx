"use client";
import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Menu</h2>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <span className={styles.activeBar}></span>
            <Link href="/dashboard">Settings</Link>
          </li>
          <li className={styles.navItem}>
            <span className={styles.activeBar}></span>
            <Link href="/help" >Help</Link>
          </li>
          <li className={styles.navItem}>
            <span className={styles.activeBar}></span>
            <Link href="/logout">Sign out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
