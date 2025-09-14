// src/components/FavoritesList.jsx
import React from 'react';
import useRecipeStore from '../recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const { favorites, recipes } = useRecipeStore();
  const favoriteRecipes = favorites.map(id => recipes.find(recipe => recipe.id === id)).filter(Boolean);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>You haven't favorited any recipes yet.</p>
      ) : (
        favoriteRecipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 style={{ fontSize: '1.5rem' }}>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;