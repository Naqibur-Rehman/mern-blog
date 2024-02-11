import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleDropdpown, setToggleDropdpown] = useState(false);

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

  return (
    <header className="px-2 sm:pl-6 md:px-6 py-4 border-b-2">
      <div className="">
        <div className="flex flex-row justify-between items-center">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm font-semibold dark:text-white sm:text-xl"
          >
            <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Naqeebs&apos;s
            </span>
            Blog
          </Link>

          <form>
            <div className="items-center px-2 py-2 border rounded-lg bg-slate-100 hidden lg:inline-flex">
              <input
                className="bg-slate-100 outline-none"
                type="text"
                placeholder="search"
              />
              <AiOutlineSearch className="text-slate-600" />
            </div>
          </form>

          <button className="px-4 py-3 mx-auto rounded-lg text-gray-700 bg-gray-100 lg:hidden">
            <AiOutlineSearch />
          </button>

          <div className="flex gap-2 items-center md:order-2">
            <button className="px-4 py-3 rounded-lg text-gray-700 bg-gray-100 hidden sm:inline-flex">
              <FaMoon />
            </button>
            {currentUser ? (
              <div>
                <div className="flex">
                  <button
                    id="dropdownDefaultButton"
                    onClick={handleToggleDropdown}
                    className="text-white inline-flex items-center"
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
                    className="absolute z-10 right-0 py-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-48"
                  >
                    <div className="pb-2 px-4">
                      <p className="text-sm block">@{currentUser.username}</p>
                      <h1 className="text-sm font-medium truncate">
                        {currentUser.email}
                      </h1>
                    </div>
                    <ul
                      className="text-sm divide-y divide-gray-100 text-gray-700 dark:text-gray-20"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <Link
                          to="/dashboard/?tab=profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 "
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
                  <button className="h-5/6 px-4 py-1 w-full bg-white text-nowrap text-sm sm:text-xl  rounded-md hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white">
                    Sign In
                  </button>
                </div>
              </Link>
            )}

            <button onClick={handleToggleNav} className="rounded-lg md:hidden">
              {toggleNav ? (
                <AiOutlineClose size={20} />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
          </div>

          <div>
            {/* Desktop Navigation */}
            <ul className="hidden md:flex">
              {navItems.map((item) => (
                <Link
                  id={path}
                  to={item.link}
                  key={item.id}
                  className={`mx-2 px-4 py-1.5 rounded-xl cursor-pointer hover:bg-indigo-500 hover:text-white ${
                    path === item.link ? "bg-indigo-700 text-white" : ""
                  }`}
                >
                  {item.text}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Navigation */}
        {toggleNav && (
          <div className="flex flex-col text-center w-full mt-6 md:hidden">
            <ul>
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-500 hover:text-white ${
                    path === item.link ? "bg-indigo-700 text-white" : ""
                  }`}
                >
                  <Link
                    to={item.link}
                    key={item.id}
                    className="mx-2 px-4 py-1.5"
                  >
                    {item.text}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
