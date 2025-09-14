// src/components/EditRecipeForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const EditRecipeForm = () => {
  const { recipeId } = useParams();
  const recipes = useRecipeStore(state => state.recipes);
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const navigate = useNavigate();

  const recipeToEdit = recipes.find(r => r.id === recipeId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Use useEffect to synchronize local state with the Zustand store
  useEffect(() => {
    if (recipeToEdit) {
      setTitle(recipeToEdit.title);
      setDescription(recipeToEdit.description);
    }
  }, [recipeToEdit]); 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (!title || !description || !recipeToEdit) return;

    updateRecipe({ ...recipeToEdit, title, description });
    navigate(`/recipes/${recipeId}`);
  };

  if (!recipeToEdit) {
    return <div>Recipe not found for editing.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ display: 'block', margin: '10px 0' }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ display: 'block', margin: '10px 0' }}
        />
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate(`/recipes/${recipeId}`)} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
