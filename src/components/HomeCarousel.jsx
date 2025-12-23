'use client';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import RecipeCard from '@ui/RecipeCard';
import RecipeInfo from '@ui/RecipeInfo';
import Modal from '@ui/Modal';
import { useAuthStore } from '@store/authStore';
import styles from '@styles/homeCarousel.module.css';

const HomeCarousel = () => {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: false },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const { isAuth } = useAuthStore();
  const userId = useAuthStore((state) => state.user?.id ?? null);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const limit = 4;
  const offset = 0;
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, setRecipes]);

  const fetchList = async () => {
    const params = new URLSearchParams({
      limit,
      offset,
    });
    if (userId) params.append('user_id', userId);

    try {
      const res = await fetch(`/api/home/new?${params.toString()}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDetails = async (recipeId) => {
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
      <h2 className={styles.title}>Самые свежие рецепты</h2>
      <div className={styles.recipesContainer}>
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {recipes.map((recipe) => (
              <div className={styles.emblaSlide} key={recipe.recipe_id}>
                <RecipeCard
                  id={recipe.recipe_id}
                  title={recipe.title}
                  onClick={() => fetchDetails(recipe.recipe_id)}
                  isAuth={isAuth}
                  favorited={recipe.favorited}
                  onLike={() => addFavorite(recipe.recipe_id)}
                  onDislike={() => deleteFavorite(recipe.recipe_id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
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

export default HomeCarousel;
