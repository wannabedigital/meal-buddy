import Image from 'next/image';
import styles from '@styles/recipes.module.css';
import CatalogFilter from '@components/CatalogFilter';
import RecipesList from '@components/RecipesList';

export default function Recipes() {
  return (
    <main className={styles.page}>
      <RecipesList />
      <div className={styles.catalog}></div>
    </main>
  );
}
