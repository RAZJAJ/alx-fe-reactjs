// src/components/RecipeDetails.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const recipes = useRecipeStore(state => state.recipes);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const recipe = recipes.find(r => r.id === recipeId);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <div style={{ marginTop: '20px' }}>
        <Link to={`/edit-recipe/${recipe.id}`} style={{ marginRight: '10px' }}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default RecipeDetails;