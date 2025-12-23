'use client';
import { useState } from 'react';

import styles from '@styles/catalogFilter.module.css';
import { useCatalogFilterStore } from '@store/catalogFilterStore';
import { FilterIcon, Close } from '@ui/Icons';

const CatalogFilter = ({ categories, tags, ingredients }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen((prev) => !prev);
  };

  const {
    selectedCategories,
    selectedTags,
    selectedIngredients,
    toggleCategory,
    toggleTag,
    toggleIngredient,
    resetFilters,
  } = useCatalogFilterStore();

  if (!categories && !tags && !ingredients) return null;

  return (
    <>
      <button className={styles.mobileFilterBtn} onClick={toggleFilter}>
        <h2>Фильтр</h2>
        <div className={styles.mobileFilterWrapper}>
          <FilterIcon />
        </div>
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`${styles.filter} ${
          isOpen ? styles.filterMobileOpen : styles.filterMobile
        }`}
      >
        <div className={styles.header}>
          <h2>Фильтр</h2>
          <button className={styles.closeFilterBtn} onClick={toggleFilter}>
            <Close />
          </button>
        </div>

        {categories && (
          <details className={styles.filterDetails}>
            <summary className={styles.filterSummary}>Категории</summary>
            <div className={styles.filterList}>
              {categories.map((category) => (
                <label key={category.id} className={styles.checkboxLabel}>
                  <input
                    className={styles.checkboxInput}
                    type='checkbox'
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                  />
                  <span className={styles.customCheckbox} />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </details>
        )}

        {tags && (
          <details className={styles.filterDetails}>
            <summary className={styles.filterSummary}>Теги</summary>
            <div className={styles.filterList}>
              {tags.map((tag) => (
                <label key={tag.id} className={styles.checkboxLabel}>
                  <input
                    className={styles.checkboxInput}
                    type='checkbox'
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => toggleTag(tag.id)}
                  />
                  <span className={styles.customCheckbox} />
                  <span>{tag.name}</span>
                </label>
              ))}
            </div>
          </details>
        )}

        {ingredients && (
          <details className={styles.filterDetails}>
            <summary className={styles.filterSummary}>Ингредиенты</summary>
            <div className={styles.filterList}>
              {ingredients.map((ingredient) => (
                <label key={ingredient.id} className={styles.checkboxLabel}>
                  <input
                    className={styles.checkboxInput}
                    type='checkbox'
                    checked={selectedIngredients.includes(ingredient.id)}
                    onChange={() => toggleIngredient(ingredient.id)}
                  />
                  <span className={styles.customCheckbox} />
                  <span>{ingredient.name}</span>
                </label>
              ))}
            </div>
          </details>
        )}
        <div className={styles.filterReset}>
          <button
            className={styles.filterResetBtn}
            onClick={() => resetFilters()}
          >
            Сбросить
          </button>
        </div>
        <div className={styles.filterSet}>
          <button className={styles.filterSetBtn} onClick={toggleFilter}>
            Применить
          </button>
        </div>
      </aside>
    </>
  );
};

export default CatalogFilter;
