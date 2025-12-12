import styles from '@styles/catalogFilter.module.css';

const CatalogFilter = () => {
  return (
    <aside className={styles.filter}>
      <h2>Фильтр</h2>
      <div className={styles.filtersList}>
        <label className={styles.filterCheckboxLabel}>
          <input className={styles.checkboxInput} type='checkbox' />
          <span className={styles.customCheckbox} />
          <span className={styles.filterCheckboxSpan}>category</span>
        </label>
      </div>
    </aside>
  );
};

export default CatalogFilter;
