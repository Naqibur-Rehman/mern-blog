import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Spinner from "./Spinner";

const DashPosts = () => {
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          setLoading(false);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser.isAdmin, currentUser._id]);

  const handleShowMore = async () => {
    const starIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${starIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto my-4 shadow-md sm:rounded-lg md:mx-auto scrollbar scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500">
      {currentUser?.isAdmin && userPosts?.length > 0 ? (
        <>
          <table className="table-auto w-full text-left text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Date Updated</th>
                <th className="px-6 py-3">Post Image</th>
                <th className="px-6 py-3">Post Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Delete</th>
                <th className="px-6 py-3">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {userPosts.map((post) => (
                <tr
                  key={post._id}
                  className="bg-white  hover:bg-gray-50 dark:hover:bg-gray-600 dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/post/${post.slug}`}>
                      <div className="flex w-24">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="object-cover bg-gray-500"
                        />
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 w-72 text-wrap">
                    <Link
                      className="text-gray-900 dark:text-white font-semibold"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{post.category}</td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="text-red-500 font-semibold hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      className="text-teal-500 hover:underline cursor-pointer"
                      to={`/update-post/${post._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full py-5 text-sm text-teal-500 self-center"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
      {showModal && (
        <Modal
          showModal={setShowModal}
          message={"this post"}
          deleteFunction={handleDeletePost}
        />
      )}
    </div>
  );
};

export default DashPosts;
