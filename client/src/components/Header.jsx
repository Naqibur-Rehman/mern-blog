import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const path = useLocation().pathname;
  const [toggleNav, setToggleNav] = useState(false);

  const handleToggleNav = () => {
    setToggleNav(!toggleNav);
  };

  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "About", link: "/about" },
    { id: 3, text: "Projects", link: "/projects" },
  ];

  return (
    <header className="px-6 py-4 border-b-2">
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
          <div className=" items-center px-2 py-2 border rounded-lg bg-slate-100 hidden lg:inline-flex">
            <input
              className="bg-slate-100 outline-none"
              type="text"
              placeholder="search"
            />
            <AiOutlineSearch className="text-slate-600" />
          </div>
        </form>

        <button className="px-4 py-3 rounded-lg text-gray-700 bg-gray-100 lg:hidden">
          <AiOutlineSearch />
        </button>

        <div className="flex gap-2 items-center md:order-2">
          <button className="px-4 py-3 rounded-lg text-gray-700 bg-gray-100 hidden sm:inline-flex">
            <FaMoon />
          </button>
          <Link to="sign-in">
            <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white ">
              Sign In
            </button>
          </Link>
          <button
            onClick={handleToggleNav}
            className="px-4 py-1.5 rounded-lg  md:hidden"
          >
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
                className={`mx-2 px-4 py-1.5 rounded-xl cursor-pointer hover:bg-indigo-500 hover:text-white ${path === item.link ? "bg-indigo-700 text-white" : ""}`}
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
                className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-indigo-500 hover:text-white ${path === item.link ? "bg-indigo-700 text-white" : ""}`}
              >
                <Link to={item.link} key={item.id} className="mx-2 px-4 py-1.5">
                  {item.text}
                </Link>
              </div>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
