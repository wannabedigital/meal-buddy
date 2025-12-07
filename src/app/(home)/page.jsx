import Image from 'next/image';
import styles from '@styles/home.module.css';

export default function Home() {
  return (
    <main className={styles.page}>
      <Image src='/img/logo.svg' alt='logo image' width={362} height={81} />
      <h1>MealBuddy</h1>
      <h2>MealBuddy</h2>
      <h3>MealBuddy</h3>
      <p>MealBuddy</p>
    </main>
  );
}
