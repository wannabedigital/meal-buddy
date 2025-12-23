'use client';
import { useState } from 'react';

import styles from '@styles/addRecipeForm.module.css';

const AddRecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingridients: [],
  });

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

export default AddRecipeForm;
