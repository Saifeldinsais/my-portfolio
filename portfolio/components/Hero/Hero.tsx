import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Saifeldin</h1>
      <p className={styles.subtitle}>Computer Engineering • Web • ML • Embedded</p>
    </section>
  );
}
