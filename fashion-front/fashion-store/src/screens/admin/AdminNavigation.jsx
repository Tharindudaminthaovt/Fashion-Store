import React from "react";
import { NavLink } from "react-router-dom";
import AdminImg from "../../assets/admin.png";
import { useLogoutUserMutation } from "../../reducers/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/auth/authSlice";




const AdminNavigation = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <div className="space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between border-r border-[#363636]">
      <div>
        <div className="mb-5 flex flex-col items-center">
          <img
            src={AdminImg}
            alt="Admin"
            className="w-24 h-24 rounded-full mb-3"
          />
          <p className="text-lg font-semibold text-[rgb(31,53,88)]">Admin</p>
        </div>
        <hr />
        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-[rgb(31,53,88)] font-bold hover:text-blue-600 transition duration-300"
                  : "text-black hover:text-[rgb(31,53,88)] transition duration-300"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-new-post"
              className={({ isActive }) =>
                isActive
                  ? "text-[rgb(31,53,88)] font-bold hover:text-blue-600 transition duration-300"
                  : "text-black hover:text-[rgb(31,53,88)] transition duration-300"
              }
            >
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-items"
              className={({ isActive }) =>
                isActive
                  ? "text-[rgb(31,53,88)] font-bold hover:text-blue-600 transition duration-300"
                  : "text-black hover:text-[rgb(31,53,88)] transition duration-300"
              }
            >
              Manage Items
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive
                  ? "text-[rgb(31,53,88)] font-bold hover:text-blue-600 transition duration-300"
                  : "text-black hover:text-[rgb(31,53,88)] transition duration-300"
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="w-full text-white bg-red-500 font-medium px-5 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
