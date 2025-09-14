// src/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  // The state properties are defined here
  recipes: [],

  // Actions to modify the state
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe],
  })),

  setRecipes: (recipes) => set({ recipes }),
}));

export default useRecipeStore;
