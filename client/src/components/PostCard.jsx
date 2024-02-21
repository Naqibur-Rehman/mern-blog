/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PostCard = ({ post }) => {
  return (
    <div className="group relative w-full h-[360px] overflow-hidden border border-teal-500 hover:border-2 rounded-lg sm:w-[340px] transition-all">
      <Link to={`/post/${post?.slug}`}>
        <div className="">
          <img
            src={post?.image}
            alt="post cover"
            className="w-full h-[260px] object-cover group-hover:h-[200px] transition-all duration-300 z-20"
          />
        </div>
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
        <span className="text-sm italic">{post.category}</span>
        <Link
          to={`/post/${post?.slug}`}
          className="group-hover:bottom-0 absolute bottom-[-200px] right-0 left-0 z-10 border border-teal-500 text-teal-500 hover:text-white text-center hover:bg-teal-500 rounded-md !rounded-tl-none py-2 m-3"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
