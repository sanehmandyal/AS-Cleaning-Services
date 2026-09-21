import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaArrowLeft } from "react-icons/fa";
import { blogApi } from "../services/blogApi";
import { Spinner, ErrorState } from "../components/UIState";

const fallbackImg = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    blogApi
      .getOne(slug)
      .then((res) => {
        setPost(res.data.data);
        document.title = `${res.data.data.title} | AS Cleaning Services Blog`;
      })
      .catch(() => setError("This blog post could not be found."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner full />;
  if (error || !post) return <ErrorState message={error} />;

  return (
    <div>
      <section className="relative h-72 sm:h-96 bg-slate-900 overflow-hidden">
        <img
          src={post.image || fallbackImg}
          alt={post.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg;
          }}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-x pb-8">
          <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
            {post.category || "Cleaning Tips"}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-white">
        <div className="container-x max-w-3xl">
          <div className="flex items-center gap-6 text-xs sm:text-sm text-slate-500 mb-8 pb-5 border-b border-slate-100">
            <span className="flex items-center gap-2">
              <FaUser className="text-primary" /> {post.author || "AS Cleaning Staff"}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              {new Date(post.publishedDate || post.createdAt || Date.now()).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
            {post.content}
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              <FaArrowLeft /> Back to Blog
            </Link>
            <Link to="/booking" className="btn-primary !py-2 text-xs">
              Book a Cleaning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
