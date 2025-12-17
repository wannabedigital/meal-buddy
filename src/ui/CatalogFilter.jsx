'use client';
import styles from '@styles/catalogFilter.module.css';
import { useCatalogFilterStore } from '@store/catalogFilterStore';

const CatalogFilter = ({ categories, tags }) => {
  const {
    selectedCategories,
    selectedTags,
    toggleCategory,
    toggleTag,
    resetFilters,
  } = useCatalogFilterStore();

  if (!categories || !tags) return null;

  return (
    <aside className={styles.filter}>
      <h2>Фильтр</h2>

      <h3>Категории</h3>
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

      <h3>Теги</h3>
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
      <div className={styles.filterReset}>
        <button
          className={styles.filterResetBtn}
          onClick={() => resetFilters()}
        >
          Сбросить
        </button>
      </div>
    </aside>
  );
};

export default CatalogFilter;
