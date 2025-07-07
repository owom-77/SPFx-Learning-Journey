import * as React from 'react';
import styles from '../styles/Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.companyInfo}>
          <h3>Your Company</h3>
          <p>Building quality and trust since 2023.</p>
          <p>1234 Commerce St, Business City, Country</p>
          <p>Email: contact@yourcompany.com</p>
          <p>Phone: +1 (234) 567-8901</p>
        </div>

        <div className={styles.quickLinks}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </div>

        <div className={styles.socialSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialLinks}>
            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Twitter"
            >
              🐦
            </a>
            <a
              href="https://facebook.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Facebook"
            >
              📘
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              🔗
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
