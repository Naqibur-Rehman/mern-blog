import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import Modal from "./Modal";

// eslint-disable-next-line react/prop-types
const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      setCommentError(null);
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          postId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setPostComments((prev) => [data, ...prev]);
        setCommentError(null);
      }
    } catch (error) {
      console.log(error);
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setPostComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setPostComments(
          postComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.numberOfLikes,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditComment = async (comment, editedContent) => {
    try {
      setPostComments(
        postComments.map((c) =>
          c._id === comment._id ? { ...c, content: editedContent } : c
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/deleteComment/${commentToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
          const data = await res.json();
          setShowModal(false)
        setPostComments(
          postComments.filter((comment) => comment._id !== commentToDelete)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto w-full">
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="w-7 h-7 rounded-full object-cover"
            src={currentUser.profilePicture}
            alt={currentUser.username}
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm flex gap-1 my-5">
          Sign In to comment.
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={submitHandler}
          className="p-3 border border-teal-500 rounded-md"
        >
          <textarea
            placeholder="write a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 rounded-md text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 ring-teal-500"
          ></textarea>
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-sm">
              {200 - comment.length} characters remaining
            </p>
            <div className="p-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <button
                type="submit"
                className="py-1 px-4 bg-white dark:bg-gray-900 dark:text-white text-black rounded-md hover:text-white hover:bg-gradient-to-r from-purple-500 to-blue-500"
              >
                Submit
              </button>
            </div>
          </div>
          {commentError && (
            <span className="text-sm font-semibold py-2 px-3 mt-5 rounded-md block text-red-600 bg-red-300">
              * {commentError}
            </span>
          )}
        </form>
      )}
      {postComments.length === 0 ? (
        <p className="my-5 text-sm text-center">No Comments Yet!</p>
      ) : (
        <div>
          <div className="flex items-center gap-1 my-5 px-3 text-sm">
            <p>Comments</p>
            <div className="border border-gray-500 px-2 py-0.5 rounded-sm">
              <p>{postComments.length}</p>
            </div>
          </div>
          {postComments &&
            postComments.map((comment) => (
              <Comment
                key={comment?._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEditComment}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
          {showModal && (
            <Modal
              message="this comment"
              showModal={setShowModal}
              deleteFunction={handleDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
