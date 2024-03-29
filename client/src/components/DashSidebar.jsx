/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { server } from "../utils/server";

const DashSidebar = ({ closeToggle }) => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch(`${server}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-50 dark:bg-gray-800">
      <aside className="min-w-64" aria-label="Sidebar">
        <div className="px-3 py-4 bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {currentUser.isAdmin && (
              <li>
                <Link onClick={handleCloseSidebar} to="/dashboard?tab=dash">
                  <div
                    href="#"
                    className={`flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      tab === "dash" || !tab
                        ? "bg-gray-100 dark:bg-gray-700 dark:text-white"
                        : ""
                    }`}
                  >
                    <HiChartPie
                      className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                        tab === "dash" ? "dark:text-white" : ""
                      }`}
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Dashboard
                    </span>
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link onClick={handleCloseSidebar} to="/dashboard?tab=profile">
                <div
                  className={`flex items-center p-2 text-gray-900 cursor-pointer rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    tab === "profile"
                      ? "bg-gray-100 dark:bg-gray-700 dark:text-white"
                      : ""
                  }`}
                >
                  <HiUser
                    className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                      tab === "profile" ? "dark:text-white" : ""
                    }`}
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap cursor-pointer">
                    Profile
                  </span>
                  <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-300 rounded-full dark:bg-gray-900 dark:text-gray-300">
                    {currentUser.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </Link>
            </li>
            {currentUser.isAdmin && (
              <li>
                <Link onClick={handleCloseSidebar} to="/dashboard?tab=posts">
                  <div
                    href="#"
                    className={`flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      tab === "posts"
                        ? "bg-gray-100 dark:bg-gray-700 dark:text-white"
                        : ""
                    }`}
                  >
                    <HiDocumentText
                      className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                        tab === "posts" ? "dark:text-white" : ""
                      }`}
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">Posts</span>
                  </div>
                </Link>
              </li>
            )}
            {currentUser.isAdmin && (
              <li>
                <Link onClick={handleCloseSidebar} to="/dashboard?tab=users">
                  <div
                    href="#"
                    className={`flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      tab === "users"
                        ? "bg-gray-100 dark:bg-gray-700 dark:text-white"
                        : ""
                    }`}
                  >
                    <HiOutlineUserGroup
                      className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                        tab === "users" ? "dark:text-white" : ""
                      }`}
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                  </div>
                </Link>
              </li>
            )}
            {currentUser.isAdmin && (
              <li>
                <Link onClick={handleCloseSidebar} to="/dashboard?tab=comments">
                  <div
                    href="#"
                    className={`flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                      tab === "comments"
                        ? "bg-gray-100 dark:bg-gray-700 dark:text-white"
                        : ""
                    }`}
                  >
                    <HiAnnotation
                      className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                        tab === "comments" ? "dark:text-white" : ""
                      }`}
                    />
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Comments
                    </span>
                  </div>
                </Link>
              </li>
            )}
            <li>
              <div
                onClick={handleSignOut}
                className="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white group"
              >
                <HiArrowSmRight className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3 cursor-pointer">Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default DashSidebar;
