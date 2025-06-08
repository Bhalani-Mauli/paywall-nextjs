import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>Main Page</main>
      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}
