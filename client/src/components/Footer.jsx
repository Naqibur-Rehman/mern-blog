import { Link } from "react-router-dom";
import {
  BsTwitter,
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsInstagram,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="px-6 bg-gray-300 bottom-0 left-0 z-20 w-full border border-t-8 border-teal-500 rounded-lg">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between md:flex">
          <div className="mt-6">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg font-semibold dark:text-white sm:text-xl"
            >
              <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Naqeebs&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
                About
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to="/about" className="hover:underline">
                    Naqeeb&apos;s Blog
                  </Link>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/in/naqibur-rehman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
                Follow
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/Naqibur-Rehman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/in/naqibur-rehman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase">
                Follow
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="py-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">&copy; Naqeeb 2024</p>
          <div className="flex gap-5 text-gray-500">
            <a href="">
              <BsLinkedin />
            </a>
            <a href="">
              <BsTwitter />
            </a>
            <a href="">
              <BsGithub />
            </a>
            <a href="">
              <BsInstagram />
            </a>
            <a href="">
              <BsFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
