import HeroSection from "@/components/HeroSection/HeroSection";
import styles from "./page.module.css";
import Paywall from "@/components/Paywall/Paywall";
import WhyChooseUs from "@/components/WhyChooseSection/WhyChooseSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <WhyChooseUs />
        <Paywall />
      </main>
    </div>
  );
}
