// src/components/RecipeList.jsx
import React from 'react';
import useRecipeStore from '../recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const { recipes, searchTerm } = useRecipeStore();

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>All Recipes</h2>
      {filteredRecipes.length === 0 && searchTerm !== '' ? (
        <p>No matching recipes found.</p>
      ) : filteredRecipes.length === 0 ? (
        <p>No recipes added yet.</p>
      ) : (
        filteredRecipes.map(recipe => (
          <Link to={`/recipes/${recipe.id}`} key={recipe.id} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description.substring(0, 100)}...</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default RecipeList;