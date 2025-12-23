'use client';
import { useEffect, useState } from 'react';
import CatalogFilter from '@ui/CatalogFilter';
import RecipeCard from '@ui/RecipeCard';
import RecipeInfo from '@ui/RecipeInfo';
import Modal from '@ui/Modal';
import { useAuthStore } from '@store/authStore';
import { useCatalogFilterStore } from '@store/catalogFilterStore';
import styles from '@styles/recipesList.module.css';

const RecipesList = () => {
  const { isAuth } = useAuthStore();
  const userId = useAuthStore((state) => state.user?.id ?? null);
  const { selectedCategories, selectedTags, selectedIngredients } =
    useCatalogFilterStore();

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const limit = 4;
  const [offset, setOffset] = useState(0);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [totalRecipes, setTotalRecipes] = useState(0);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    offset,
    userId,
    setRecipes,
    selectedCategories,
    selectedTags,
    selectedIngredients,
  ]);

  const fetchFilters = async () => {
    try {
      const res = await fetch('/api/recipes/filters');
      if (!res.ok) return;
      const data = await res.json();
      setCategories(data.categories);
      setTags(data.tags);
      setIngredients(data.ingredients);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchList = async () => {
    const params = new URLSearchParams({
      limit,
      offset,
    });
    if (userId) params.append('user_id', userId);
    if (selectedCategories.length)
      params.append('categories', selectedCategories.join(','));
    if (selectedTags.length) params.append('tags', selectedTags.join(','));
    if (selectedIngredients.length)
      params.append('ingredients', selectedIngredients.join(','));

    try {
      const res = await fetch(`/api/recipes/catalog?${params.toString()}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setRecipes(data.recipes || []);
      setTotalRecipes(data.totalRecipes || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDetails = async (recipeId) => {
    setSelectedRecipe(null);
    try {
      const res = await fetch(`/api/recipes/${recipeId}?user_id=${userId}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setSelectedRecipe(data.recipe);
      toggleModal();
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = async (recipeId) => {
    setRecipes((prev) =>
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
    }
  };

  const deleteFavorite = async (recipeId) => {
    setRecipes((prev) =>
      prev.map((r) =>
        r.recipe_id === recipeId ? { ...r, favorited: false } : r
      )
    );
    try {
      const res = await fetch(`/api/favorites/${recipeId}`, {
        method: 'DELETE',
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
    }
  };

  return (
    <section className={styles.recipeSection}>
      <div className={styles.fullCatalog}>
        <CatalogFilter
          categories={categories}
          tags={tags}
          ingredients={ingredients}
        />
        {totalRecipes > 0 ? (
          <div className={styles.recipesList}>
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
        ) : (
          <div className={styles.noRecipes}>
            Рецепты не найдены попробуйте сбросить фильтры
          </div>
        )}
      </div>

      {totalRecipes > 0 && (offset > 0 || offset + limit < totalRecipes) && (
        <div className={styles.pagination}>
          <button
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={!(offset > 0)}
          >
            Предыдущая
          </button>
          <button
            onClick={() => setOffset(Math.min(offset + limit, recipes.length))}
            disabled={!(offset + limit < totalRecipes)}
          >
            Следующая
          </button>
        </div>
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
            ingredients={selectedRecipe.ingredients}
            weight={selectedRecipe.total_weight}
            calories={selectedRecipe.total_calories}
            proteins={selectedRecipe.total_proteins}
            fats={selectedRecipe.total_fats}
            carbons={selectedRecipe.total_carbs}
            path={`/recipes/${selectedRecipe.recipe_id}`}
            isAuth={isAuth}
            favorited={selectedRecipe.favorited}
            onLike={() => addFavorite(selectedRecipe.recipe_id)}
            onDislike={() => deleteFavorite(selectedRecipe.recipe_id)}
          />
        </Modal>
      )}
    </section>
  );
};

export default RecipesList;
