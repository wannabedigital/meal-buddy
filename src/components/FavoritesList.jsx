'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@store/authStore';
import RecipeCard from '@ui/RecipeCard';
import RecipeInfo from '@ui/RecipeInfo';
import Modal from '@ui/Modal';
import styles from '@styles/recipesList.module.css';

const FavoritesList = () => {
  const { isAuth } = useAuthStore();
  const userId = useAuthStore((state) => state.user?.id ?? null);

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
  }, [offset, userId, setRecipes]);

  async function fetchList() {
    try {
      const res = await fetch(
        `/api/profile/favorites?limit=${limit}&offset=${offset}&user_id=${userId}`
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

  async function addFavorite(recipeId) {
    setRecipes((prev) =>
      prev.map((r) =>
        r.recipe_id === recipeId ? { ...r, favorited: true } : r
      )
    );
    setSelectedRecipe((prev) =>
      prev.map((r) =>
        r.recipe_id === recipeId ? { ...r, favorited: true } : r
      )
    );
    try {
      const res = await fetch(`/api/favorites/${recipeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
        }),
      });
      if (!res.ok) {
        return;
      }
    } catch (error) {
      console.error(error);
      setRecipes((prev) =>
        prev.map((r) =>
          r.recipe_id === recipeId ? { ...r, favorited: false } : r
        )
      );
      setSelectedRecipe((prev) =>
        prev.map((r) =>
          r.recipe_id === recipeId ? { ...r, favorited: false } : r
        )
      );
    }
  }

  async function deleteFavorite(recipeId) {
    setRecipes((prev) => prev.filter((r) => r.recipe_id !== recipeId));
    setSelectedRecipe((prev) => prev.filter((r) => r.recipe_id !== recipeId));

    try {
      const res = await fetch(`/api/favorites/${recipeId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId }),
      });

      if (!res.ok) {
        throw new Error('Ошибка удаления');
      }
    } catch (error) {
      console.error(error);
      fetchList();
    }
  }

  return (
    <section className={styles.recipeSection}>
      <div className={styles.favoriteRecipesList}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.recipe_id}
            id={recipe.recipe_id}
            title={recipe.title}
            onClick={() => fetchDetails(recipe.recipe_id)}
            isAuth={isAuth}
            favorited={recipe.favorited}
            onLike={() => addFavorite(recipe.recipe_id)}
            onDislike={() => deleteFavorite(recipe.recipe_id)}
          />
        ))}
      </div>

      {recipes.length > 0 ? (
        <div className={styles.pagination}>
          <button
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0}
            className={styles.favoritePaginationButton}
          >
            Предыдущая
          </button>
          <button
            onClick={() => setOffset(Math.min(offset + limit, recipes.length))}
            disabled={recipes.length < limit}
            className={styles.favoritePaginationButton}
          >
            Следующая
          </button>
        </div>
      ) : (
        <div className={styles.noRecipes}>Добавьте рецепты в избранное</div>
      )}

      {showModal && selectedRecipe && (
        <Modal onClose={toggleModal}>
          <RecipeInfo
            id={selectedRecipe.recipe_id}
            title={selectedRecipe.title}
            description={selectedRecipe.description}
            cookingTime={selectedRecipe.cooking_time}
            difficulty={selectedRecipe.difficulty}
            categories={selectedRecipe.categories}
            tags={selectedRecipe.tags}
            weight={selectedRecipe.total_weight}
            calories={selectedRecipe.total_calories}
            proteins={selectedRecipe.total_proteins}
            fats={selectedRecipe.total_fats}
            carbons={selectedRecipe.total_carbs}
            path={`/recipes/${selectedRecipe.recipe_id}`}
          />
        </Modal>
      )}
    </section>
  );
};

export default FavoritesList;
