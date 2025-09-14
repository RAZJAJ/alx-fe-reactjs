// src/components/RecommendationsList.jsx
import React, { useEffect } from 'react';
import useRecipeStore from '../recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available at the moment.</p>
      ) : (
        recommendations.map(recipe => (
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

export default RecommendationsList;