import React from "react";
import Hero from "./Hero";
import Blogs from "../Blogs";

const BlogsHome = () => {
  return (
    <div className="bg-white text-primary container mx-auto mt-8 p-8">
      <Hero />
      <Blogs />
    </div>
  );
};

export default BlogsHome;
