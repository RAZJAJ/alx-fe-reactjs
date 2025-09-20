import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { getUser } from "./services/githubApi";
import Search from "./components/Search";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await getUser(username);
      setUser(data);
    } catch (err) {
      if (err.response && err.response.status === 404) setError("User not found");
      else if (err.response && err.response.status === 403) setError("API rate limit exceeded");
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      <UserCard user={user} />
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <Search />
    </div>
  );
}
