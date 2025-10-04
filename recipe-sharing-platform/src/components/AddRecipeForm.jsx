import { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!title || !ingredients || !steps) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    // Mock "submit"
    setError("");
    setSuccess("Recipe submitted successfully!");

    console.log({
      title,
      ingredients,
      steps,
    });

    // Clear fields
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Add a New Recipe
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Title */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Recipe Title
          </label>
          <input
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Ingredients
          </label>
          <textarea
            placeholder="List ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 outline-none h-32"
          />
        </div>

        {/* Preparation Steps */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Preparation Steps
          </label>
          <textarea
            placeholder="Describe how to prepare the recipe"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 outline-none h-40"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
