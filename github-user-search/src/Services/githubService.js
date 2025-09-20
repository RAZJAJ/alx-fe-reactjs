import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users";
const USER_URL = "https://api.github.com/users";

export const searchUsers = async ({ username, location, minRepos, page = 1, perPage = 10 }) => {
  try {
    let query = "";

    if (username) query += `${username} `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>${minRepos} `;

    const response = await axios.get(`${SEARCH_URL}?q=${encodeURIComponent(query.trim())}&page=${page}&per_page=${perPage}`);
    return response.data; // contains { total_count, items: [...] }
  } catch (error) {
    throw error;
  }
};

// Fetch full details for a single user
export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${USER_URL}/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
