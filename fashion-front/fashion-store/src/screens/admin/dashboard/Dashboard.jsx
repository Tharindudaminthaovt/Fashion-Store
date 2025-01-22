/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { useFetchBlogsQuery } from "../../../reducers/blogs/blogsApi";
import { useGetUserQuery } from "../../../reducers/auth/authApi";
import { useGetCommentsQuery } from "../../../reducers/comments/commentsApi";
import BlogsChart from "./BlogsChart";


const Dashboard = () => {
  const [query, setQuery] = useState({ search: "", category: "" });
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  const { data: users = [] } = useGetUserQuery();
  const { data: comments = [] } = useGetCommentsQuery();
  const { user } = useSelector((state) => state.auth);

  // Calculate the number of "admin" role
  const adminCount = users.filter((user) => user.role === "admin").length;

  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="space-y-6">
        <div className="bg-[rgb(31,53,88)] p-5 rounded-md text-white">
          <h1 className="text-3xl font-semibold">Hi, {user.username}!</h1>
          <p className="text-lg">Welcome to the admin dashboard</p>
          <p className="mt-2 text-sm">
            Here you can manage your blog posts, users, and other administrative
            tasks.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row justify-between gap-8 pt-8">
          {/* Total Users Card */}
          <div className="bg-[#363636] py-6 w-full rounded-lg shadow-lg space-y-1 flex flex-col items-center hover:bg-[rgb(31,53,88)] transition duration-300 ease-in-out transform hover:scale-105">
            <FiUsers className="size-8 text-white hover:text-yellow-300" />
            <p className="text-white">{users.length} Users</p>
          </div>

          {/* Total Blogs Card */}
          <div className="bg-[#363636] py-6 w-full rounded-lg shadow-lg space-y-1 flex flex-col items-center hover:bg-[rgb(31,53,88)] transition duration-300 ease-in-out transform hover:scale-105">
            <FaBlog className="size-8 text-white hover:text-red-300" />
            <p className="text-white">{blogs.length} Blogs</p>
          </div>

          {/* Admins Card */}
          <div className="bg-[#363636] py-6 w-full rounded-lg shadow-lg space-y-1 flex flex-col items-center hover:bg-[rgb(31,53,88)] transition duration-300 ease-in-out transform hover:scale-105">
            <RiAdminLine className="size-8 text-white hover:text-lime-300" />
            <p className="text-white">
              {adminCount} Admin{adminCount !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Comments Card */}
          <div className="bg-[#363636] py-6 w-full rounded-lg shadow-lg space-y-1 flex flex-col items-center hover:bg-[rgb(31,53,88)] transition duration-300 ease-in-out transform hover:scale-105">
            <FaRegComment className="size-8 text-white hover:text-orange-300" />
            <p className="text-white">{comments.totalComments} Comments</p>
          </div>
        </div>

        {/* Graph Chart */}
        <div className="pt-5 pb-5">
          <BlogsChart blogs={blogs} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;