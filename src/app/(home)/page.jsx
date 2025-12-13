import Image from 'next/image';
import styles from '@styles/page.module.css';
import RecipesList from '@components/RecipesList';

export default function Home() {
  return (
    <main className={styles.page}>
      <RecipesList />
      <div className={styles.catalog}></div>
    </main>
  );
}
