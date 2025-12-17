import Image from 'next/image';
import styles from '@styles/recipes.module.css';
import RecipesList from '@components/RecipesList';

export default function Recipes() {
  return (
    <main className={styles.page}>
      <RecipesList />
      <div className={styles.catalog}></div>
    </main>
  );
}
