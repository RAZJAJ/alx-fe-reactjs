import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required.";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required.";
    if (!steps.trim()) newErrors.steps = "Preparation steps are required.";

    const ingredientList = ingredients.split(",").map((item) => item.trim());
    if (ingredientList.length < 2)
      newErrors.ingredients = "Please include at least two ingredients (separated by commas).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newRecipe = { id: Date.now(), title, ingredients, steps };
      console.log("New Recipe Submitted:", newRecipe);
      alert("Recipe submitted successfully!");
      setTitle("");
      setIngredients("");
      setSteps("");
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-md md:max-w-2xl"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Add a New Recipe
        </h2>

    
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-300" : "focus:ring-green-300"
            }`}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        
        <div className="mb-5">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Ingredients
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.ingredients ? "border-red-500 focus:ring-red-300" : "focus:ring-green-300"
            }`}
            rows="3"
            placeholder="List ingredients, separated by commas"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

  
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">
            Preparation Steps
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.steps ? "border-red-500 focus:ring-red-300" : "focus:ring-green-300"
            }`}
            rows="4"
            placeholder="Describe how to prepare the recipe"
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

       
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 md:py-3 px-4 rounded-lg hover:bg-green-600 transition duration-200 text-sm md:text-base"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
