/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment?.userId}`);
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
        </div>
      </div>
    </div>
  );
};

export default Comment;
