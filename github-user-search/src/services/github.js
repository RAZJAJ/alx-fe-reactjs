// src/services/github.js
import axios from "axios";

const token = import.meta.env.VITE_APP_GITHUB_API_KEY; // optional
const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(token ? { Authorization: `token ${token}` } : {})
  },
  timeout: 10000
});

// simple in-memory cache for fetched user details
const userCache = new Map();

export async function getUser(username) {
  if (!username) throw new Error("username required");
  if (userCache.has(username)) return userCache.get(username);
  const res = await github.get(`/users/${encodeURIComponent(username)}`);
  userCache.set(username, res.data);
  return res.data;
}

/**
 * searchUsersAdvanced({ username, location, minRepos, page, per_page })
 * - username: free text (matches login/name)
 * - location: string (city/country)
 * - minRepos: number (minimum public repos)
 * - page, per_page: pagination
 *
 * returns: { total_count, incomplete_results, items: [detailedUserObjects...] }
 */
export async function searchUsersAdvanced({
  username = "",
  location = "",
  minRepos = 0,
  page = 1,
  per_page = 30,
  sort = "",   // optional
  order = "desc"
} = {}) {
  // build query parts
  const qParts = [];
  if (username) qParts.push(username);
  if (location) qParts.push(`location:"${location}"`);
  if (minRepos && Number(minRepos) > 0) qParts.push(`repos:>=${Number(minRepos)}`);

  // default query to find users if no criteria provided
  const q = qParts.length ? qParts.join(" ") : "type:user";

  const params = { q, page, per_page };
  if (sort) params.sort = sort;
  if (order) params.order = order;

  const res = await github.get("/search/users", { params });

  const items = res.data.items || [];

  // fetch detailed info for each returned user (parallel).
  // This gives us public_repos and location.
  // Note: this performs N additional requests per page (tradeoff).
  const detailed = await Promise.all(
    items.map((it) =>
      getUser(it.login).catch((err) => {
        // If fetching details failed, return the item with a flag
        return { ...it, _detailError: true };
      })
    )
  );

  return {
    total_count: res.data.total_count,
    incomplete_results: res.data.incomplete_results,
    items: detailed
  };
}

export function clearUserCache() {
  userCache.clear();
}
