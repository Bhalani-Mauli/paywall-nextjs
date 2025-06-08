import styles from "./paywall.module.css";
import PaywallCard from "./PaywallCard/PaywallCard";

export default function Paywall() {
  return (
    <div className={styles.paywall}>
      <h2 className={styles.title}>Choose your plan</h2>
      <p className={styles.description}>
        Subscribe to access exclusive content and features.
      </p>
      <div className={styles.plans}>
        <PaywallCard
          title="Free"
          price="$0"
          period="forever"
          features={[
            "Access to free courses",
            "Basic community support",
            "Limited course materials",
          ]}
        />
        <PaywallCard
          title="Premium"
          price="$29"
          period="month"
          features={[
            "Access to all courses",
            "Priority community support",
            "Downloadable course materials",
            "Exclusive webinars",
          ]}
        />
        <PaywallCard
          title="Pro"
          price="$299"
          period="year"
          features={[
            "Everything in Premium",
            "1-on-1 mentorship sessionst",
            "Exclusive masterclasses",
            "Career guidance",
          ]}
        />
      </div>
    </div>
  );
}
