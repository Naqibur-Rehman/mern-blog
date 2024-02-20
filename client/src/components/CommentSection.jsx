import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

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
        setCommentError(null);
      }
    } catch (error) {
      console.log(error);
      setCommentError(error.message);
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
    </div>
  );
};

export default CommentSection;
