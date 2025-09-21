import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input
        placeholder="Search GitHub users (username or name)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          flex: 1,
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #ddd",
          fontSize: 14
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 14px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          background: "#0366d6",
          color: "#fff"
        }}
      >
        Search
      </button>
    </form>
  );
}
