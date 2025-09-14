// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { recipes, favorites, addFavorite, removeFavorite, deleteRecipe } = useRecipeStore();
  const navigate = useNavigate();

  const recipe = recipes.find(r => r.id === recipeId);
  const isFavorited = favorites.includes(recipeId);

  const handleFavoriteToggle = () => {
    if (isFavorited) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleFavoriteToggle}>
          {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <Link to={`/edit-recipe/${recipe.id}`} style={{ marginLeft: '10px' }}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;