import { Check } from "lucide-react";
import styles from "./paywall-card.module.css";
import Button from "@/components/atoms/Button/Button";
import Link from "next/link";

export default function PaywallCard({
  title,
  price,
  period,
  features,
  isPremium = false,
  buttonVariant,
  onSubscribe = () => {},
  buttonText,
}) {
  return (
    <div className={`${isPremium && styles.premiumStyles} ${styles.card}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.priceSection}>
        <span className={styles.price}>{price}</span>
        <span className={styles.period}>/{period}</span>
      </div>
      <ul className={styles.featureList}>
        {features.map((feature, index) => (
          <li className={styles.featureItem} key={index}>
            <Check className={styles.icon} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button onClick={() => onSubscribe(title)} variant={buttonVariant}>
        {buttonText}
      </Button>
    </div>
  );
}
