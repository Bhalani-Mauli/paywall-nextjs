import styles from "./heroSection.module.css";

const HeroSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Learn Skills That <span className={styles.highlight}>Matter</span>
        </h1>
        <p className={styles.subtitle}>
          Access thousands of expert-led courses in technology, business, and
          creativity. Learn at your own pace with our comprehensive learning
          platform.
        </p>
        <div className={styles.buttonGroup}>
          <a href="/auth/signup" className={styles.primaryButton}>
            Start Learning Today
          </a>
          <a href="/courses" className={styles.secondaryButton}>
            Browse Courses
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
