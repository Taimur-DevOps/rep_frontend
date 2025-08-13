import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleReset = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by id"
        className="border px-3 py-2 rounded w-64"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Search
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
      >
        Reset
      </button>
    </form>
  );
};

export default SearchBar;
