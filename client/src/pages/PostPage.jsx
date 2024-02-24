import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { server } from "../utils/server";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState(null);

  const { postSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${server}/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        } else {
          setLoading(false);
          setError(true);
          return;
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`${server}/api/post/getPosts?limit=3`);
        if (res.ok) {
          const data = await res.json();
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Spinner />{" "}
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col mx-auto min-h-screen max-w-6xl">
      <h1 className="mt-10 p-3 text-center text-3xl lg:text-4xl font-serif max-w-3xl mx-auto">
        {post?.title}
      </h1>
      <Link
        to={`/search?category=${post?.category}`}
        className="self-center mt-5"
      >
        <button className="px-2 py-0.5 text-xs font-semibold border rounded-full hover:text-teal-500 bg-gray-100 dark:bg-gray-700">
          {post?.category}
        </button>
      </Link>
      <div className="mt-10 p-3">
        <img
          src={post?.image}
          alt={post?.title}
          className="max-h-[500px] w-full object-cover"
        />
        <div className="flex justify-between py-3 text-xs border-b border-slate-500">
          <span>{post && new Date(post?.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {(post?.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
      </div>
      <div
        className="p-3 mx-auto max-w-3xl post-content"
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full p-3 bg-amber-100 dark:bg-slate-400 text-black">
        <CallToAction />
      </div>
      <CommentSection postId={post?._id} />

      <div className="mb-5 flex flex-col justify-center items-center">
        <h1 className="mt-5 text-xl">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
