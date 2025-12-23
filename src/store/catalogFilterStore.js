import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCatalogFilterStore = create(
  persist((set) => ({
    selectedCategories: [],
    selectedTags: [],
    selectedIngredients: [],

    toggleCategory: (id) =>
      set((state) => ({
        selectedCategories: state.selectedCategories.includes(id)
          ? state.selectedCategories.filter((c) => c !== id)
          : [...state.selectedCategories, id],
      })),

    toggleTag: (id) =>
      set((state) => ({
        selectedTags: state.selectedTags.includes(id)
          ? state.selectedTags.filter((t) => t !== id)
          : [...state.selectedTags, id],
      })),

    toggleIngredient: (id) =>
      set((state) => ({
        selectedIngredients: state.selectedIngredients.includes(id)
          ? state.selectedIngredients.filter((t) => t !== id)
          : [...state.selectedIngredients, id],
      })),

    resetFilters: () =>
      set({
        selectedCategories: [],
        selectedTags: [],
        selectedIngredients: [],
      }),
  })),
  {
    name: 'filter-catalog-storage',
    storage: createJSONStorage(() => localStorage),
  }
);
