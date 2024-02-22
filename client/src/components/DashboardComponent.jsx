import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardComponent = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto w-full">
      <div className="flex flex-wrap gap-4 justify-center w-full">
        <div className="p-3 flex flex-col gap-4 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white p-3 rounded-full text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>
        <div className="p-3 flex flex-col gap-4 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-lime-600 text-white p-3 rounded-full text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>
        <div className="p-3 flex flex-col gap-4 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 uppercase">Total Comments</h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white p-3 rounded-full text-5xl shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <p className="text-gray-500">Last Month</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="p-2 flex flex-col w-full md:w-auto dark:bg-slate-800 shadow-md rounded-md">
          <div className="p-3 flex justify-between items-center tex-sm font-semibold">
            <h1 className="">Recent Users</h1>
            <button className="p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md">
              <Link
                className="block px-4 py-1 rounded-md bg-white dark:bg-slate-900 text-black dark:text-white hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500"
                to="/dashboard?tab=users"
              >
                See All
              </Link>
            </button>
          </div>
          <table className="table-auto w-full text-left text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">User Image</th>
                <th className="px-6 py-3">Username</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {users &&
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4">
                      <div className="flex w-10 h-10">
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="object-cover rounded-full bg-gray-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.username}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="p-2 flex flex-col w-full md:w-auto dark:bg-slate-800 shadow-md rounded-md">
          <div className="p-3 flex justify-between items-center tex-sm font-semibold">
            <h1 className="">Recent Comments</h1>
            <button className="p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md">
              <Link
                className="block px-4 py-1 rounded-md bg-white dark:bg-slate-900 text-black dark:text-white hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500"
                to="/dashboard?tab=comments"
              >
                See All
              </Link>
            </button>
          </div>
          <table className="table-auto w-full text-left text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Comment Content</th>
                <th className="px-6 py-3">Likes</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {comments &&
                comments.map((comment) => (
                  <tr key={comment._id}>
                    <td className="px-6 py-4 max-w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </td>
                    <td className="px-6 py-4">{comment.numberOfLikes}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="p-2 flex flex-col w-full md:w-auto dark:bg-slate-800 shadow-md rounded-md">
          <div className="p-3 flex justify-between items-center tex-sm font-semibold">
            <h1 className="">Recent Posts</h1>
            <button className="p-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md">
              <Link
                className="block px-4 py-1 rounded-md bg-white dark:bg-slate-900 text-black dark:text-white hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500"
                to="/dashboard?tab=posts"
              >
                See All
              </Link>
            </button>
          </div>
          <table className="table-auto w-full text-left text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Post Image</th>
                <th className="px-6 py-3">Post Title</th>
                <th className="px-6 py-3">Post Category</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {posts &&
                posts.map((post) => (
                  <tr key={post._id}>
                    <td className="px-6 py-4">
                      <div className="w-20">
                        <img
                          src={post.image}
                          alt={"post cover"}
                          className="w-full rounded-md object-cover bg-gray-500"
                        />
                      </div>
                    </td>
                        <td className="px-6 py-4 max-w-96"><p className="line-clamp-2">
                        
                            {post.title}
                        </p>
                        </td>
                    <td className="px-6 py-4 w-5">{post.category}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
