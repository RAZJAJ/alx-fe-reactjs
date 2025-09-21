import React, { useState } from "react";
import SearchBar from "./SearchBar";
import UserCard from "./UserCard";
import { searchUsers } from "../services/github";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (q) => {
    if (!q) {
      setResults([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // q can be something like "tom" or "tom+in:login"
      const data = await searchUsers(q);
      setResults(data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <SearchBar onSearch={handleSearch} />
      {loading && <p style={{ marginTop: 12 }}>Loading…</p>}
      {error && <p style={{ marginTop: 12, color: "red" }}>{error}</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 12,
        marginTop: 16
      }}>
        {results.map(user => <UserCard key={user.id} user={user} />)}
      </div>
    </section>
  );
}
