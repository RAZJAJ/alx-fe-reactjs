import React from "react";
import SearchAdvanced from "./components/SearchAdvanced";

export default function App() {
  return (
    <div className="min-h-screen p-6">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">GitHub User Search</h1>
        <p className="text-sm text-gray-600">Advanced search: username, location and minimum repos.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <SearchAdvanced />
      </main>
    </div>
  );
}
