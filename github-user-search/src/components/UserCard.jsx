import React from "react";

export default function UserCard({ user }) {
  return (
    <div style={{
      border: "1px solid #e6e6e9",
      borderRadius: 8,
      padding: 12,
      display: "flex",
      gap: 12,
      alignItems: "center",
      background: "#fff"
    }}>
      <img
        src={user.avatar_url}
        alt={user.login}
        style={{ width: 56, height: 56, borderRadius: "50%" }}
      />
      <div>
        <a href={user.html_url} target="_blank" rel="noreferrer" style={{ fontWeight: 700, color: "#0366d6" }}>
          {user.login}
        </a>
        <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
          {user.type} • {user.score ? `score ${Math.round(user.score)}` : null}
        </div>
      </div>
    </div>
  );
}
