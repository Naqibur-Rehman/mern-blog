import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import CallToAction from "../components/CallToAction";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { postSlug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
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
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
    </main>
  );
}
