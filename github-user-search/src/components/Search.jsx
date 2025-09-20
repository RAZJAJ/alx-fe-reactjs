import { useState } from "react";
import { searchUsers } from "../services/githubService";

export default function Search() {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    minRepos: "",
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await searchUsers(formData);
      setResults(data.items || []);
    } catch (err) {
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">GitHub User Search</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
      >
        <input
          type="text"
          name="username"
          placeholder="Search by username..."
          value={formData.username}
          onChange={handleChange}
          className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          name="location"
          placeholder="Filter by location..."
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="number"
          name="minRepos"
          placeholder="Minimum repositories..."
          value={formData.minRepos}
          onChange={handleChange}
          className="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-6">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {results.length > 0 && (
  <div className="grid gap-4 mt-4">
    {results.map((user) => (
      <div
        key={user.id}
        className="bg-gray-100 p-4 rounded-lg flex items-center gap-4 shadow"
      >
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="font-semibold text-lg">{user.name || user.login}</h2>
          <p className="text-sm text-gray-600">
            {user.location || "No location provided"}
          </p>
          <p className="text-sm text-gray-600">
            Public Repos: {user.public_repos}
          </p>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Profile
          </a>
        </div>
      </div>
    ))}
  </div>
)}

       

        {!loading && !error && results.length === 0 && (
          <p className="text-gray-500 mt-4 text-center">
            No results yet. Try searching!
          </p>
        )}
      </div>
    </div>
  );
}
import { searchUsers, getUserDetails } from "../services/githubService";

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setResults([]);

  try {
    const data = await searchUsers(formData);

    // Fetch details for the first 10 users
    const detailedResults = await Promise.all(
      data.items.slice(0, 10).map(async (user) => {
        const details = await getUserDetails(user.login);
        return details;
      })
    );

    setResults(detailedResults);
  } catch (err) {
    setError("Something went wrong. Try again later.");
  } finally {
    setLoading(false);
  }
};
