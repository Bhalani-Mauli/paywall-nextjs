import Link from "next/link";
import styles from "./subscription-card.module.css";

export default function SubscriptionCard({ user }) {
  return (
    <div className={`${styles.card} `}>
      <h3 className={styles.title}>Subscription Status</h3>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.label}>Current Plan</p>
          <p className={styles.planName}>{user.subscription?.plan || "Free"}</p>
          {user.subscription?.endDate && (
            <p className={styles.expiry}>
              Expires:{" "}
              {new Date(user.subscription.endDate).toLocaleDateString()}
            </p>
          )}
        </div>
        {user.subscription?.plan === "free" && (
          <Link href="/subscription" className={styles.upgradeButton}>
            Upgrade Now
          </Link>
        )}
      </div>
    </div>
  );
}
