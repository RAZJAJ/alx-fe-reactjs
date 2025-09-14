// src/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [
    { id: '1', title: 'Classic Lasagna', description: 'A delicious Italian dish made with layers of pasta, sauce, and cheese.' },
    { id: '2', title: 'Chicken Stir-Fry', description: 'Quick and easy stir-fry with chicken and mixed vegetables in a savory sauce.' },
  ],
  
  // Action to add a new recipe
  addRecipe: (newRecipe) => set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  
  // Action to delete a recipe by its ID
  deleteRecipe: (recipeId) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== recipeId),
  })),
  
  // Action to update an existing recipe
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
  })),
}));

export default useRecipeStore;