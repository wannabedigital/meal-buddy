import styles from '@styles/recipeCard.module.css';
import FavoriteButton from './FavoriteButton';

const RecipeCard = ({
  title,
  onClick,
  isAuth,
  favorited,
  onLike,
  onDislike,
}) => {
  return (
    <article className={styles.recipeCard}>
      <div className={styles.recipePhotoWrapper}>Здесь будет фото</div>
      <h3 className={styles.recipeTitle}>{title}</h3>
      <div className={styles.btnsContainer}>
        <button className={styles.goToRecipe} onClick={onClick}>
          Посмотреть
        </button>
        <FavoriteButton
          isAuth={isAuth}
          favorited={favorited}
          onLike={onLike}
          onDislike={onDislike}
        />
      </div>
    </article>
  );
};

export default RecipeCard;
