import styles from '@styles/recipes.module.css';
import RecipeInfo from '@ui/RecipeInfo';

const BASE_URL = process.env.BASE_URL;

export default async function Recipe({ params }) {
  const { recipe } = await params;
  const recipeId = Number(recipe);
  const recipeRes = await fetch(`${BASE_URL}/api/recipes/${recipeId}`);
  if (!recipeRes.ok) {
    return;
  }
  const recipeData = await recipeRes.json();
  const recipeInfo = recipeData.recipe;

  const stepsRes = await fetch(`${BASE_URL}/api/recipes/steps/${recipe}`);
  const stepsData = await stepsRes.json();

  const resipeSteps = stepsData.steps;

  return (
    <main className={styles.page}>
      <RecipeInfo
        id={recipeInfo.recipe_id}
        title={recipeInfo.title}
        description={recipeInfo.description}
        cookingTime={recipeInfo.cooking_time}
        difficulty={recipeInfo.difficulty}
        categories={recipeInfo.categories}
        ingredients={recipeInfo.ingredients}
        tags={recipeInfo.tags}
        weight={recipeInfo.total_weight}
        calories={recipeInfo.total_calories}
        proteins={recipeInfo.total_proteins}
        fats={recipeInfo.total_fats}
        carbons={recipeInfo.total_carbs}
      />
      <section className={styles.stepSection}>
        <h2 className={styles.sectionTitle}>Шаги</h2>
        <ol className={styles.stepsList}>
          {resipeSteps.map((step) => (
            <li key={step.step_number} className={styles.stepLi}>
              <h3 className={styles.stepNum}>
                <strong>Шаг: </strong>
                {step.step_number}
              </h3>
              <div className={styles.stepDescription}>{step.description}</div>
              <div className={styles.stepPhotoWrapper}>
                Здесь будет картинка к шагу рецепта
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
