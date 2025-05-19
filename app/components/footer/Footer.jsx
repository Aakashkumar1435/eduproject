import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <div className={styles.footerLogoIcon}>CI</div>
              CrackIt
            </div>
            <p className={styles.footerTagline}>
              Our immersive learning platform combines interactive content,
              expert instruction, and engaging exercises to make your
              educational journey exciting and effective.
            </p>
          </div>

          {/* Courses */}
          <div className={styles.footerColumn}>
            <h3>Courses</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#">MDCAT</a></li>
              <li><a href="#">ECAT</a></li>
              <li><a href="#">FSC</a></li>
              <li><a href="#">IELTS</a></li>
              <li><a href="#">GAT</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerColumn}>
            <h3>Company</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.footerColumn}>
            <h3>Support</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Student Resources</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © 2025 CrackIt. All rights reserved. Terms & Privacy Policy
          </div>
          <div className={styles.socialIcons}>
            <img src="/1.png" alt="Facebook" className={styles.socialImage} />
            <img src="/2.png" alt="WhatsApp" className={styles.socialImage} />
            <img src="/3.png" alt="Instagram" className={styles.socialImage} />
            <img src="/4.png" alt="LinkedIn" className={styles.socialImage} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;