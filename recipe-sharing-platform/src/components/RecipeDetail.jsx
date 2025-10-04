import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams(); // get recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(foundRecipe);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading recipe...</p>
      </div>
    );
  }

  // For now, let’s mock ingredients and instructions
  const ingredients = [
    "1 tbsp olive oil",
    "2 cloves garlic, minced",
    "1 cup chopped tomatoes",
    "Salt and pepper to taste",
  ];
  const instructions = [
    "Heat olive oil in a pan.",
    "Add garlic and sauté until fragrant.",
    "Add tomatoes and cook for 10 minutes.",
    "Season with salt and pepper and serve hot.",
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Home
      </Link>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">🧂 Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">👩‍🍳 Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              {instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
