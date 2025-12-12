import styles from '@styles/recipeCard.module.css';

const RecipeCard = ({ title, onClick }) => {
  return (
    <article className={styles.recipeCard}>
      <div className={styles.recipePhotoWrapper}>Здесь будет фото</div>
      <h3 className={styles.recipeTitle}>{title}</h3>
      <div className={styles.btnsContainer}>
        <button className={styles.goToRecipe} onClick={onClick}>
          Посмотреть
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;
