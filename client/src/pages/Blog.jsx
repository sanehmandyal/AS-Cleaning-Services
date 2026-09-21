import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCalendarAlt, FaUser } from "react-icons/fa";
import { blogApi } from "../services/blogApi";
import { EmptyState, ErrorState } from "../components/UIState";

const defaultBlogs = [
  {
    _id: "b1",
    slug: "5-tips-to-keep-your-home-clean-between-visits",
    title: "5 Tips to Keep Your Home Clean Between Visits",
    category: "Cleaning Tips",
    excerpt: "Simple daily habits that keep your home looking fresh and tidy between professional visits.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",
    author: "AS Cleaning Team",
    publishedDate: new Date(),
  },
  {
    _id: "b2",
    slug: "the-benefits-of-eco-friendly-cleaning-products",
    title: "The Benefits of Eco-Friendly Cleaning Products",
    category: "Sustainability",
    excerpt: "Why switching to plant-based green cleaning solutions is safer for your family and pets.",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=800",
    author: "AS Cleaning Team",
    publishedDate: new Date(),
  },
  {
    _id: "b3",
    slug: "how-often-should-you-deep-clean-your-home",
    title: "How Often Should You Deep Clean Your Home?",
    category: "Home Care",
    excerpt: "A complete guide on the optimal deep-cleaning frequency for every room and lifestyle.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800",
    author: "AS Cleaning Team",
    publishedDate: new Date(),
  },
];

const fallbackImg = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800";

const SkeletonBlog = () => (
  <div className="card overflow-hidden animate-pulse">
    <div className="h-48 bg-slate-100" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-slate-100 rounded w-2/3" />
      <div className="h-3 bg-slate-100 rounded w-full" />
    </div>
  </div>
);

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Cleaning Tips & Blog | AS Cleaning Services";
    blogApi
      .getAll()
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setBlogs(res.data.data);
        } else {
          setBlogs(defaultBlogs);
        }
      })
      .catch(() => setBlogs(defaultBlogs))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header Banner */}
      <section className="relative bg-gradient-to-b from-sky-50/80 via-white to-white py-16 sm:py-20 border-b border-slate-100">
        <div className="container-x text-center max-w-2xl mx-auto px-4">
          <p className="section-label mb-2 text-primary font-bold">Cleaning Tips & Insights</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Our Cleaning Blog
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Practical advice, room-by-room maintenance guides, and eco-friendly tips from our expert team.
          </p>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-x">
          {error && <ErrorState message={error} />}
          {!error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => <SkeletonBlog key={i} />)
                : blogs.map((post) => (
                    <article
                      key={post._id}
                      className="card-hover overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        <Link to={`/blog/${post.slug}`} className="block relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                          <img
                            src={post.image || fallbackImg}
                            alt={post.title}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = fallbackImg;
                            }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-primary text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                            {post.category || "Tips"}
                          </div>
                        </Link>
                        <div className="p-5 sm:p-6">
                          <h2 className="font-display font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <FaCalendarAlt size={10} />
                          {new Date(post.publishedDate || post.createdAt || Date.now()).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-deep transition-all"
                        >
                          Read More <FaArrowRight size={10} />
                        </Link>
                      </div>
                    </article>
                  ))}
            </div>
          )}
          {!loading && !error && blogs.length === 0 && (
            <EmptyState title="No blog posts yet" subtitle="Check back soon for cleaning tips and updates." />
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
