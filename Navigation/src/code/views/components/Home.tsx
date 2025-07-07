import * as React from 'react';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to Your One-Stop E-commerce Store</h1>
        <p className={styles.heroSubtitle}>
          Discover exclusive deals, top-quality products, and a seamless shopping experience crafted just for you.
        </p>
        <button className={styles.ctaButton}>Start Shopping Now</button>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🚚</div>
          <h3 className={styles.featureTitle}>Fast Shipping</h3>
          <p className={styles.featureDesc}>Reliable and quick delivery right to your doorstep.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>💳</div>
          <h3 className={styles.featureTitle}>Secure Payments</h3>
          <p className={styles.featureDesc}>Your information is protected with top-notch security.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>⭐</div>
          <h3 className={styles.featureTitle}>Top Rated Products</h3>
          <p className={styles.featureDesc}>Only the best products curated just for you.</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>About Our Store</h2>
        <div className={styles.aboutContent}>
          <p>
            Established in 2023, our mission is to bring quality and convenience to your fingertips. We partner with trusted suppliers to bring you a curated selection of products across multiple categories. 
          </p>
          <p>
            Our friendly customer support and easy return policies ensure your satisfaction. Shop with confidence and enjoy a modern shopping experience that’s fast, secure, and reliable.
          </p>
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.testimonialTitle}>What Our Customers Say</h2>
        <div className={styles.testimonialCard}>
          <p>"Amazing products and super fast delivery! I love shopping here."</p>
          <div className={styles.testimonialAuthor}>- Sarah K.</div>
        </div>
        <div className={styles.testimonialCard}>
          <p>"The checkout process is so smooth, and customer service helped me instantly."</p>
          <div className={styles.testimonialAuthor}>- James L.</div>
        </div>
      </section>

    </div>
  );
};

export default Home;
