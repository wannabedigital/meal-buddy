'use client';
import { useEffect, useState } from 'react';
import RecipeCard from '@components/RecipeCard';
import RecipeInfo from '@components/RecipeInfo';
import Modal from '@ui/Modal';
import styles from '@styles/recipesList.module.css';

const RecipesList = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const limit = 4;
  const [offset, setOffset] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  async function fetchList() {
    try {
      const res = await fetch(
        `/api/recipes/catalog?limit=${limit}&offset=${offset}`
      );
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchDetails(recipeId) {
    setSelectedRecipe(null);
    try {
      const res = await fetch(`/api/recipes/${recipeId}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setSelectedRecipe(data.recipe);
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={styles.recipeSection}>
      <div className={styles.recipesList}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipe_id}
            title={recipe.title}
            onClick={() => fetchDetails(recipe.recipe_id)}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setOffset(Math.max(0, offset - limit))}
          disabled={offset === 0}
        >
          Предыдущая
        </button>
        <button
          onClick={() => setOffset(Math.min(offset + limit, recipes.length))}
          disabled={offset > recipes.length}
        >
          Следующая
        </button>
      </div>

      {showModal && selectedRecipe && (
        <Modal onClose={toggleModal}>
          <RecipeInfo
            title={selectedRecipe.title}
            description={selectedRecipe.description}
            cookingTime={selectedRecipe.cooking_time}
            difficulty={selectedRecipe.difficulty}
            onClick={toggleModal}
          />
        </Modal>
      )}
    </section>
  );
};

export default RecipesList;
