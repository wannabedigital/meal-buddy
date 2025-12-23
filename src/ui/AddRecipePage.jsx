'use client';

import styles from '@styles/addRecipePage.module.css';

const AddRecipePage = () => {
  return (
    <>
      <section className={styles.addRecipeNeedToKnow}>
        <div className={styles.needToKnow}>
          <h1>Что важно знать перед отправкой рецепта?</h1>
          <ul className={styles.needToKnowBody}>
            <li className={styles.needToKnowLabel}>
              При отправке рецепта соблюдайте...
            </li>
            <li className={styles.needToKnowLabel}>
              При отправке рецепта соблюдайте...
            </li>
            <li className={styles.needToKnowLabel}>
              При отправке рецепта соблюдайте...
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.addRecipeForm}></section>
    </>
  );
};

export default AddRecipePage;
