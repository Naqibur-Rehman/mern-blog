import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const loacation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "",
      });
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        } else {
          setLoading(false);
          return;
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };

    fetchPosts();
  }, [loacation.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    try {
      const numberOfPosts = posts.length;
      const startIndex = numberOfPosts;
      const urlParams = new URLSearchParams(loacation.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (res.ok) {
        const data = await res.json();
        setPosts([...posts, ...data.posts]);

        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="p-7 md:min-h-full border-b md:border-r border-gray-200 dark:border-gray-600">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 h-full">
          <div className="flex gap-2 items-center">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Search Term:{" "}
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="p-2 ml-4 flex-1 rounded-md bg-slate-100 dark:bg-gray-600 outline-none focus:ring-2 ring-teal-500"
            />
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="sort" className="whitespace-nowrap font-semibold">
              Sort:{" "}
            </label>
            <select
              className="p-2 ml-4 flex-1 rounded-md bg-slate-100 dark:bg-gray-600 outline-none focus:ring-2 ring-teal-500"
              id="sort"
              onChange={handleChange}
              value={sidebarData.sort}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <label htmlFor="sort" className="whitespace-nowrap font-semibold">
              Category:{" "}
            </label>
            <select
              className="p-2 ml-4 flex-1 rounded-md bg-slate-100 dark:bg-gray-600 outline-none focus:ring-2 ring-teal-500"
              id="category"
              value={sidebarData.category}
              onChange={handleChange}
            >
              <option value="uncategorised">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">ReactJS</option>
              <option value="nextjs">NextJS</option>
              <option value="anime">Anime</option>
            </select>
          </div>
          <button
            type="submit"
            className="p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md"
          >
            <span className="block px-4 py-1.5 rounded-md bg-white dark:bg-slate-900 text-black dark:text-white hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500">
              Apply Filters
            </span>
          </button>
        </form>
      </div>
      <div className="w-full mx-auto">
        <h1 className="p-3 mt-5 text-3xl font-semibold sm:border-b border-gray-200 dark:border-gray-600">
          Post Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4 justify-center">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <div className="flex justify-center items-center h-full w-full">
              <Spinner />
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline w-full"
            >
              Show More{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
