import styles from '@styles/recipeInfo.module.css';

const NutritionalValue = ({
  calories = 0,
  proteins = 0,
  fats = 0,
  carbons = 0,
}) => {
  return (
    <div className={styles.nutValGrid}>
      <div className={styles.value}>
        <p className={styles.valName}>К</p>
        <span>{calories}</span>
      </div>
      <div className={styles.value}>
        <p className={styles.valName}>Б</p>
        <span>{proteins}</span>
      </div>
      <div className={styles.value}>
        <p className={styles.valName}>Ж</p>
        <span>{fats}</span>
      </div>
      <div className={styles.value}>
        <p className={styles.valName}>У</p>
        <span>{carbons}</span>
      </div>
    </div>
  );
};

const StarRating = ({ rating = 0 }) => {
  const rounded = Math.round(rating);
  return (
    <span className={styles.starRaiting}>
      {'★'.repeat(rounded)}
      {'☆'.repeat(5 - rounded)}
    </span>
  );
};

const RecipeInfo = ({
  title,
  description,
  cookingTime,
  difficulty,
  onClick,
  calories = 1000,
  proteins = 1000,
  fats = 2000,
  carbons = 3000,
}) => {
  const nutrition = { calories, proteins, fats, carbons };

  return (
    <div className={styles.recipeInfo}>
      <div className={styles.header}>
        <div className={styles.recipePhotoWrapper}></div>
        <div className={styles.recipeName}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.rightContainer}>
          <NutritionalValue {...nutrition} />
          <div className={styles.btnContiner}>
            <button className={styles.goToRecipe} onClick={onClick}>
              Перейти
            </button>
          </div>
        </div>
        <div className={styles.leftContainer}>
          <div className={styles.specs}>
            <p>
              <strong>Время готовки: </strong>
              {cookingTime} мин
            </p>
          </div>
          <div className={styles.specs}>
            <p>
              <strong>Сложность: </strong>
              <StarRating rating={difficulty} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;
