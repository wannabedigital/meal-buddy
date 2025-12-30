import Image from 'next/image';
import styles from '@styles/recipeCard.module.css';
import FavoriteButton from '@ui/FavoriteButton';

const RecipeCard = ({
  id,
  title,
  onClick,
  isAuth,
  favorited,
  onLike,
  onDislike,
}) => {
  return (
    <article className={styles.recipeCard}>
      <div className={styles.recipePhotoWrapper}>
        <Image
          src={`/img/recipes/${id}.png` || null}
          alt='recipe img'
          fill
          loading='eager'
        />
      </div>
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
