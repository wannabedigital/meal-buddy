import Link from 'next/link';
import styles from '@styles/recipeInfo.module.css';

const NutritionalValue = ({
  weight = 0,
  calories = 0,
  proteins = 0,
  fats = 0,
  carbons = 0,
}) => {
  return (
    <div className={styles.nutValContainer}>
      <p className={styles.totalWeight}>
        <strong>Рассчитано на общий вес блюда: </strong>
        {weight}г
      </p>
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
  path,
  weight = 100,
  calories = 0,
  proteins = 0,
  fats = 0,
  carbons = 0,
}) => {
  const roundedWeight = Math.round(weight * 100) / 100;
  const roundedCalories = Math.round(calories * 100) / 100;
  const roundedProteins = Math.round(proteins * 100) / 100;
  const roundedFats = Math.round(fats * 100) / 100;
  const roundedCarbons = Math.round(carbons * 100) / 100;

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
          <NutritionalValue
            weight={roundedWeight}
            calories={roundedCalories}
            proteins={roundedProteins}
            fats={roundedFats}
            carbons={roundedCarbons}
          />
          <div className={styles.btnContiner}>
            <Link href={path} className={styles.goToRecipe}>
              Перейти
            </Link>
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
