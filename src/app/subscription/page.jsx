import Paywall from "@/components/Paywall/Paywall";
import styles from "./subscription.module.css";

export default function CoursesPage() {
  return (
    <div className={styles.container}>
      <Paywall />
    </div>
  );
}
