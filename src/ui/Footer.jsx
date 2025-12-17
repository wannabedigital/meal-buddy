import Link from 'next/link';
import styles from '@styles/footer.module.css';
import { PAGES } from '@config/pages.config';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h3 className={styles.logo}>MealBuddy</h3>
          <p className={styles.description}>
            Вдохновение для вкусных идей каждый день.
          </p>
        </div>

        <nav className={styles.nav}>
          <Link href={PAGES.home.link}>Главная</Link>
          <Link href={PAGES.recipes.link}>Каталог рецептов</Link>
          <Link href={PAGES.addRecipe.link}>Отправить рецепт</Link>
        </nav>

        <div className={styles.right}>
          <p className={styles.copy}>© {new Date().getFullYear()} RecipeHub</p>
          <p className={styles.madeWith}>Сделано с любовью к еде</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
