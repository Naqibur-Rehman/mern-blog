import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { server } from "../utils/server";

const Header = () => {
  const path = useLocation().pathname;
  const loaction = useLocation();
  const navigate = useNavigate();

  const [toggleNav, setToggleNav] = useState(false);
  const [toggleDropdpown, setToggleDropdpown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(loaction.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleToggleNav = () => {
    setToggleNav(!toggleNav);
  };

  const handleToggleDropdown = () => {
    setToggleDropdpown(!toggleDropdpown);
  };

  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "About", link: "/about" },
    { id: 3, text: "Projects", link: "/projects" },
  ];

  const handleSignOut = async () => {
    setToggleDropdpown(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <header className="px-2 sm:pl-6 md:px-6 py-3 dark:bg-gray-800 border-b-2 dark:border-gray-700">
      <div className="">
        <div className="flex flex-row justify-between items-center">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm font-semibold sm:text-xl"
          >
            <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Naqeebs&apos;s
            </span>
            Blog
          </Link>

          <form onSubmit={handleSubmit}>
            <div className="items-center relative active:ring ring-teal-500 border dark:border-0 rounded-lg bg-slate-100 hidden dark:bg-gray-600 lg:inline-flex">
              <input
                className="bg-slate-100 block w-full p-2 pe-10 rounded-lg  dark:bg-gray-600 outline-none focus:ring-2 ring-teal-500"
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AiOutlineSearch className="mx-4 absolute right-0" />
            </div>
          </form>

          <Link
            to={"/search"}
            className="px-2 py-2 sm:px-4 sm:py-3 mx-auto outline outline-1 rounded-3xl lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-900"
          >
            <AiOutlineSearch />
          </Link>

          <div className="flex gap-2 items-center md:order-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="px-4 py-3 rounded-3xl outline outline-1 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-900 hidden sm:inline-flex"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
            {currentUser ? (
              <div>
                <div className="flex">
                  <button
                    id="dropdownDefaultButton"
                    onClick={handleToggleDropdown}
                    className="inline-flex items-center"
                    type="button"
                  >
                    <img
                      className="rounded-3xl h-10"
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                    />
                  </button>
                </div>
                {toggleDropdpown && (
                  <div
                    id="dropdown"
                    className="dark:bg-[rgb(16,23,42)] absolute z-10 right-0 py-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-48"
                  >
                    <div className="pb-2 px-4">
                      <p className="text-sm block">@{currentUser.username}</p>
                      <h1 className="text-sm font-medium truncate">
                        {currentUser.email}
                      </h1>
                    </div>
                    <ul
                      className="text-sm divide-y divide-gray-100"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li onClick={() => setToggleDropdpown(false)}>
                        <Link
                          to="/dashboard/?tab=profile"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Profile
                        </Link>
                      </li>
                      <li onClick={handleSignOut}>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="sign-in">
                <div className="p-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                  <button className="h-5/6 px-4 py-1 w-full bg-white dark:bg-slate-900 text-nowrap text-sm sm:text-xl  rounded-md hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white">
                    Sign In
                  </button>
                </div>
              </Link>
            )}

            <button
              onClick={handleToggleNav}
              className="rounded-lg md:hidden dark:text-white"
            >
              {toggleNav ? (
                <AiOutlineClose size={20} />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
          </div>

          <div className="">
            {/* Desktop Navigation */}
            <ul className="hidden gap-1 text-sm md:flex items-center">
              {navItems.map((item) => (
                <Link
                  id={path}
                  to={item.link}
                  key={item.id}
                  className={`px-4 py-2 rounded-xl cursor-pointer hover:bg-indigo-500 hover:text-white ${
                    path === item.link ? "bg-indigo-700 text-white" : ""
                  }`}
                >
                  {item.text}
                </Link>
              ))}
              {currentUser?.isAdmin && (
                <div
                  className={`p-0.5 border-b rounded-xl dark:border-gray-600 cursor-pointer bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:text-white ${
                    path === "/create-post" ? "bg-gradient-to-r text-white" : ""
                  }`}
                >
                  <Link
                    to={"/create-post"}
                    className={`py-1 px-2 rounded-xl flex items-center justify-center  bg-gray-50 dark:bg-gray-800 hover:bg-gradient-to-r ${
                      path === "/create-post"
                        ? "bg-gradient-to-r text-white"
                        : ""
                    } `}
                  >
                    <MdPostAdd size={24} className="me-2" />
                    New Post
                  </Link>
                </div>
              )}
            </ul>
          </div>
        </div>

        {/* Mobile Navigation */}
        {toggleNav && (
          <div className="flex flex-col text-sm border-t dark:border-gray-700 text-center w-full mt-6 md:hidden">
            <ul className="">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`px-4 py-2 border-b dark:border-gray-600 cursor-pointer hover:bg-indigo-500 hover:text-white ${
                    path === item.link ? "bg-indigo-700 text-white" : ""
                  }`}
                >
                  <Link to={item.link} key={item.id} className="block">
                    {item.text}
                  </Link>
                </div>
              ))}
              {currentUser?.isAdmin && (
                <div
                  className={`p-0.5 border-b dark:border-gray-600 cursor-pointer bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:text-white ${
                    path === "/create-post" ? "bg-gradient-to-r text-white" : ""
                  }`}
                >
                  <Link
                    to={"/create-post"}
                    className={`py-1.5 flex items-center justify-center  bg-gray-50 dark:bg-gray-800 hover:bg-gradient-to-r ${
                      path === "/create-post"
                        ? "bg-gradient-to-r text-white"
                        : ""
                    } `}
                  >
                    <MdPostAdd size={24} className="me-2" />
                    New Post
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
