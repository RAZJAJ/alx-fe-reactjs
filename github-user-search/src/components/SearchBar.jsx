import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onSearch(q);
  };

  return (
    <form onSubmit={submit} className="search-bar">
      <input
        type="text"
        placeholder="Enter GitHub username (e.g. octocat)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
