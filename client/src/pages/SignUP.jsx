import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { server } from "../utils/server";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All the fields are required!");
    } else {
      setErrorMessage(null);
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`${server}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col  p-3 gap-5 max-w-3xl mx-auto md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1 text-center md:text-left">
          <Link to="/" className="text-4xl font-bold">
            <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Naqeebs&apos;s
            </span>
            Blog
          </Link>
          <p className="mt-5 font-semibold text-sm">
            Welcome to Naqeeb&apos;s Blog.You can Sign Up with your email and
            password or google account.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="p-2 mt-1 w-full bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:border-teal-400 rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@email.com"
                className="mt-1 p-2 w-full bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:border-teal-400 rounded-lg"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="p-2 mt-1 w-full bg-gray-100 dark:bg-gray-600 focus:outline-none focus:ring focus:border-teal-400 rounded-lg"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-l text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    aria-hidden="true"
                    className=" mx-auto h-6 self-center text-white animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <p>Have an account?</p>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <div className="p-2 mt-2 rounded-lg bg-red-200">
              <p className="text-red-900 text-sm">* {errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
