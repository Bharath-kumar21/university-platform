import React from "react";

function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search by name or location..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
