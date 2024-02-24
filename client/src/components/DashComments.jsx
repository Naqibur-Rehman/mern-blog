import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { server } from "../utils/server";

const DashComments = () => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${server}/api/comment/getComments`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setLoading(false);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser.isAdmin, currentUser._id]);

  const handleShowMore = async () => {
    const starIndex = comments.length;
    try {
      const res = await fetch(
        `${server}/api/comment/getcomments?startIndex=${starIndex}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${server}/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
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
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className="table-auto w-full text-left text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Date Updated</th>
                <th className="p-4">Comment Content</th>
                <th className="p-4">Number of Likes</th>
                <th className="p-4">PostId</th>
                <th className="p-4">UserId</th>
                <th className="px-6 py-4">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="bg-white  hover:bg-gray-50 dark:hover:bg-gray-600 dark:border-gray-700 dark:bg-gray-800"
                >
                  <td className="px-6 py-4">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">{comment.content}</td>
                  <td className="p-4">{comment.numberOfLikes}</td>
                  <td className="p-4">{comment.postId}</td>
                  <td className="p-4">{comment.userId}</td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="text-red-500 font-semibold hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
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
        <p>No users found!</p>
      )}
      {showModal && (
        <Modal
          showModal={setShowModal}
          message={"this comment"}
          deleteFunction={handleDeleteComment}
        />
      )}
    </div>
  );
};

export default DashComments;
