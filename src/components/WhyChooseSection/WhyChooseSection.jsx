import React from "react";
import styles from "./why-choose-section.module.css";
import { BookOpen, Zap, Trophy } from "lucide-react";

const features = [
  {
    icon: <BookOpen className={styles.icon} />,
    title: "Expert-Led Courses",
    description:
      "Learn from industry professionals with real-world experience in their fields.",
    bgColor: styles.bgBlue,
  },
  {
    icon: <Zap className={styles.icon} />,
    title: "Learn at Your Pace",
    description:
      "Access courses 24/7 and learn on your schedule with lifetime access to content.",
    bgColor: styles.bgGreen,
  },
  {
    icon: <Trophy className={styles.icon} />,
    title: "Certificates & Progress",
    description:
      "Track your progress and earn certificates to showcase your achievements.",
    bgColor: styles.bgPurple,
  },
];

const WhyChooseUs = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose LearnToday?</h2>
          <p className={styles.subtitle}>
            Everything you need to advance your career and skills
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
