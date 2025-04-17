'use client';

import styles from './page.module.css';

const steps = [
  {
    step: 1,
    text: <>Click the <strong>Buy</strong> button for the offer you want to avail.</>,
  },
  {
    step: 2,
    text: <>Fill out the form and upload a screenshot of your payment.</>,
  },
  {
    step: 3,
    text: <>Submit the form.</>,
  },
  {
    step: 4,
    text: <>You will get access to the course within <strong>3 working days.</strong></>,
  },
  {
    step: 5,
    text: <>In case of any delay, contact our team. Contact details are given below.</>,
  },
];

export default function HowToJoinPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>How to Join</h1>

      <div className={styles.stepsWrapper}>
        {steps.map(({ step, text }) => (
          <div key={step} className={styles.stepCard}>
            <div className={styles.stepNumber}>{step}</div>
            <div className={styles.stepText}>{text}</div>
          </div>
        ))}
      </div>

      <p className={styles.contactNote}>
        If you have any questions, please <span className={styles.contactLink}>contact our team</span>.
      </p>
    </div>
  );
}
