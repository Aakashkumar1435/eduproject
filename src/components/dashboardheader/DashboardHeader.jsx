"use client";
import { useRouter } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import styles from "./DashboardHeader.module.css";

const DashboardHeader = ({ onMenuClick }) => {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.iconContainer}>
        <button onClick={() => router.push("/")}>
        <Bell className={styles.bellIcon} strokeWidth={2.5} />
        </button>
        <button onClick={onMenuClick}>
        <Menu className={styles.menuIcon} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};


export default DashboardHeader;
