
import { useState } from 'react';
import useRecipeStore from '../recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !description) return;
    addRecipe({ id: Date.now(), title, description });
    setTitle('');
    setDescription('');
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '20px 0',
  };

  const inputStyle = {
    margin: '5px 0',
    padding: '8px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add New Recipe</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        style={inputStyle}
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Recipe Description"
        style={{ ...inputStyle, minHeight: '100px' }}
        required
      />
      <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;