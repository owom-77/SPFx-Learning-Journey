import * as React from 'react';
import styles from '../styles/About.module.scss';

const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>About Us</h1>
      <p>
        Welcome to Your Company! We are committed to delivering the highest quality products and services
        to our customers worldwide. Our mission is to innovate and lead the market with dedication and
        passion.
      </p>
      <section className={styles.section}>
        <h2>Our History</h2>
        <p>
          Founded in 2023, Your Company has rapidly grown from a small startup into a trusted leader in the
          industry. Our journey began with a vision to revolutionize e-commerce with customer-first
          solutions.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Our Values</h2>
        <ul>
          <li>Integrity: We operate with honesty and transparency.</li>
          <li>Innovation: Continuously improving and adapting to new challenges.</li>
          <li>Customer Focus: Putting our customers at the heart of everything we do.</li>
          <li>Quality: Delivering products that exceed expectations.</li>
          <li>Teamwork: Collaborating to achieve our shared goals.</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>Meet the Team</h2>
        <p>
          Our diverse team of experts work tirelessly to create the best experience possible.
          From development to support, everyone contributes to our success.
        </p>
      </section>
      <section className={styles.section}>
        <h2>Contact Us</h2>
        <p>If you have any questions or want to learn more, feel free to reach out to us!</p>
      </section>
    </div>
  );
};

export default About;
