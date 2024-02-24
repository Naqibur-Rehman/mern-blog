/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { server } from "../utils/server";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.content);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${server}/api/user/${comment?.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment?.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `${server}/api/comment/editComment/${comment._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editedContent }),
        }
      );
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-4 flex border-b dark:border-gray-600 text-sm">
      <div className="w-10 h-10 flex-shrink-0 mr-3">
        <img
          src={user?.profilePicture}
          alt={user?.username}
          className="bg-gray-200 rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="text-xs flex items-center mb-1">
          <span className=" font-bold mr-1 truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500">
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <div>
            <textarea
              placeholder="write a comment..."
              maxLength="200"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 mb-2 rounded-md text-sm text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 ring-teal-500"
            ></textarea>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-1.5 rounded-md text-white bg-gradient-to-r hover:bg-gradient-to-b from-purple-500 to-blue-500"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-0.5 rounded-md text-white bg-gradient-to-r from-purple-500 to-blue-500"
              >
                <span className="block px-5 py-1 rounded-md bg-white dark:bg-slate-900 text-black dark:text-white hover:text-white hover:bg-gradient-to-r from-purple-500 to-blue-500">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 pb-2">
              {comment?.content}
            </p>
            <div className="flex gap-2  items-center text-xs pt-2 border-t dark:border-gray-700 max-w-fit">
              <button
                type="button"
                onClick={() => onLike(comment?._id)}
                className={`text-sm text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp />
              </button>
              <p className="text-gray-400">
                {comment?.numberOfLikes > 0 &&
                  comment?.numberOfLikes +
                    " " +
                    (comment?.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
