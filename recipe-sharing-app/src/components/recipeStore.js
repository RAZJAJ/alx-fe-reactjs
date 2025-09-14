// src/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [
    { id: '1', title: 'Classic Lasagna', description: 'A delicious Italian dish with layers of pasta, sauce, and cheese.' },
    { id: '2', title: 'Chicken Stir-Fry', description: 'Quick and easy stir-fry with chicken and vegetables in a savory sauce.' },
    { id: '3', title: 'Spaghetti Bolognese', description: 'A classic pasta dish with a rich tomato and meat sauce.' },
    { id: '4', title: 'Vegetable Soup', description: 'A hearty and healthy soup made with a variety of seasonal vegetables.' },
    { id: '5', title: 'Grilled Salmon', description: 'A simple and healthy dish with perfectly grilled salmon and a lemon-dill sauce.' },
    { id: '6', title: 'Chocolate Cake', description: 'A rich, decadent chocolate cake perfect for any celebration.' },
  ],
  searchTerm: '',
  favorites: ['1', '5'], // Initial favorites for demonstration
  recommendations: [],
  
  // Actions to manage recipes
  setSearchTerm: (term) => set({ searchTerm: term }),
  addRecipe: (newRecipe) => set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (recipeId) => set((state) => ({ recipes: state.recipes.filter(recipe => recipe.id !== recipeId) })),
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => recipe.id === updatedRecipe.id ? updatedRecipe : recipe)
  })),

  // Actions for favorites
  addFavorite: (recipeId) => set(state => ({ favorites: [...state.favorites, recipeId] })),
  removeFavorite: (recipeId) => set(state => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),

  // Action for recommendations
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    // Simple recommendation logic: get recipes that are not favorites
    const recommended = recipes.filter(recipe => !favorites.includes(recipe.id));
    set({ recommendations: recommended });
  },
}));

export default useRecipeStore;