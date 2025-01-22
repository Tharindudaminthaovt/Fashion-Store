import React, { useState } from "react";
import { useFetchBlogsQuery } from "../../reducers/blogs/blogsApi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState({ search: "", category: "" });

  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleSearch = () => setQuery({ search, category });

  return (
    <div className="mt-16 container mx-auto px-4">
      {/* Search and Filter Section */}
      
      
      
      {/*<div className="flex flex-col md:flex-row items-center gap-2 bg-[rgb(31,53,88)] p-4 rounded-lg shadow-md text-antiquewhite">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={handleSearchChange}
          className="border rounded p-2 flex-1 text-[rgb(31,53,88)] bg-antiquewhite shadow-sm focus:outline-none"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border rounded p-2 flex-1 md:flex-none text-[rgb(31,53,88)] bg-antiquewhite shadow-sm focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-[rgb(133,95,64)] text-antiquewhite py-2 px-4 rounded hover:bg-[rgb(31,53,88)] hover:scale-105 transform transition duration-300"
        >
          Search
        </button>
      </div>*/}

      {/* Loading or Error State */}
       {/* 
      {isLoading && (
        <div className="p-5 text-center text-[rgb(31,53,88)]">Loading...</div>
      )}
      {error && (
        <div className="text-red-500 p-5 text-center">{error.toString()}</div>
      )}
*/}
      {/* Blogs List */}
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            key={blog._id}
            className="shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105 hover:rotate-1 bg-antiquewhite"
          >
            <img
              src={blog.coverImg}
              alt={blog.title}
              className="h-48 w-full object-cover transition duration-300 hover:opacity-90"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-[rgb(31,53,88)]">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-sm">{blog.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
