import React from "react";

const SearchBlog = ({
  search,
  handleSearchChange,
  handleSearch,
  placeholder = "Search blogs...", // Default placeholder text
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex items-center bg-[rgb(31,53,88)] shadow-lg p-4 rounded-lg transform hover:scale-105 transition-transform duration-300">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="flex-grow py-3 px-4 mr-4 bg-antiquewhite text-[rgb(31,53,88)] border border-[rgb(133,95,64)] focus:outline-none focus:ring-2 focus:ring-[rgb(133,95,64)] focus:border-[rgb(133,95,64)] rounded-lg transition duration-300"
        aria-label="Search input"
      />
      <button
        onClick={handleSearch}
        className="px-6 py-3 text-antiquewhite bg-[rgb(133,95,64)] rounded-lg shadow-md hover:bg-[rgb(31,53,88)] hover:shadow-lg transition-all duration-300"
        aria-label="Search button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlog;
