// src/components/SearchAdvanced.jsx
import React, { useState } from "react";
import { searchUsersAdvanced } from "../services/github";

export default function SearchAdvanced() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [perPage, setPerPage] = useState(10);

  const [results, setResults] = useState([]);     // list of user objects (detailed)
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e?.preventDefault();
    setError(null);
    setLoading(true);
    setPage(1);
    setResults([]);
    try {
      const data = await searchUsersAdvanced({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? Number(minRepos) : 0,
        page: 1,
        per_page: perPage
      });
      setResults(data.items || []);
      setTotal(data.total_count || 0);
    } catch (err) {
      console.error(err);
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    setError(null);
    try {
      const data = await searchUsersAdvanced({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? Number(minRepos) : 0,
        page: nextPage,
        per_page: perPage
      });
      setResults((prev) => [...prev, ...(data.items || [])]);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      setError("Looks like we cant find the user");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Username or name</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. octocat or Tom Preston-Werner"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or country"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Min repos</label>
            <input
              type="number"
              min={0}
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g. 10"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Results per page</label>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="ml-2 rounded-md border-gray-300 p-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
            <button
              type="button"
              onClick={() => { setUsername(""); setLocation(""); setMinRepos(""); setResults([]); setTotal(0); setError(null); }}
              className="px-3 py-2 border rounded-md text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* status */}
      <div className="mt-4">
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && results.length === 0 && <p className="text-gray-600">No users found.</p>}
      </div>

      {/* results grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {results.map((user) => (
          <div key={user.login} className="bg-white rounded-lg p-4 shadow-sm flex gap-4 items-start">
            <img className="w-16 h-16 rounded-full object-cover" src={user.avatar_url} alt={user.login} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <a href={user.html_url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600">
                    {user.name ? user.name : user.login}
                  </a>
                  <div className="text-sm text-gray-500">@{user.login}</div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="text-xs text-gray-400">Repos</div>
                  <div className="font-medium">{user.public_repos ?? "—"}</div>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {user.location ? <span className="mr-3">📍 {user.location}</span> : null}
                {user.bio ? <div className="mt-1">{user.bio}</div> : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* load more */}
      {results.length > 0 && results.length < total && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 rounded-md border hover:bg-gray-50"
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : `Load more (${results.length}/${total})`}
          </button>
        </div>
      )}
    </div>
  );
}
