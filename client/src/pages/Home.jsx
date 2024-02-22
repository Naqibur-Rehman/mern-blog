import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  return (
    <div className="">
      <div className="px-3 p-28 flex flex-col gap-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog!</h1>
        <p className="text-sm sm:text-base text-gray-500 ">
          Here you&apos;ll find variety of articles on different topics. Blog
          can be on web development, technical stuffs. Oh! by the way I love
          animes, so you can find some articles on anime also.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm font-bold text-teal-500 hover:underline"
        >
          View all pots
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-400 text-black">
        <CallToAction />
      </div>

      <div className="p-3 py-7 flex flex-col gap-8 max-w-6xl justify-center items-center mx-auto">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-xs sm:text-sm text-center font-bold text-teal-500 hover:underline"
            >
              View all pots
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
