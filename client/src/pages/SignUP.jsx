import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col p-3 gap-5 max-w-3xl mx-auto md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-whit">
            <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Naqeebs&apos;s
            </span>
            Blog
          </Link>
          <p className="mt-5 font-semibold text-sm">
            Welcome to Naqeeb&apos;s Blog. Sign Up using your email and google
            account to like and comment blogs.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="p-2 mt-1 w-full bg-gray-100 outline-teal-400 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="name@email.com"
                className="mt-1 p-2 w-full bg-gray-100 outline-teal-400 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                id="password"
                type="text"
                placeholder="Password"
                className="p-2 mt-1 w-full bg-gray-100 outline-teal-400 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:bg-gradient-to-l text-white"
            >
              Sign Up
            </button>
            <div className="p-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <button className="h-5/6 p-1 w-full bg-white  rounded-md hover:bg-gradient-to-r from-purple-600 to-pink-600 hover:text-white">
                Google Sign In
              </button>
            </div>
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <p>Have an account?</p>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
