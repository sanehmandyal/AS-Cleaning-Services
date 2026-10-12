import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { blogApi } from "../services/blogApi";
import { Spinner, ErrorState } from "../components/UIState";
import SEOHead from "../components/SEOHead";
import { buildBreadcrumbSchema } from "../utils/seoSchema";

const fallbackBlogs = [
  {
    _id: "b1",
    slug: "5-tips-to-keep-your-home-clean-between-visits",
    title: "5 Tips to Keep Your Home Clean Between Visits",
    category: "Cleaning Tips",
    excerpt: "Simple daily habits that keep your home looking fresh and tidy between professional visits.",
    content:
      "Maintaining a clean home between professional visits doesn't have to be difficult. Start with a nightly 10-minute tidy-up where the entire family resets common rooms. Wipe down kitchen counters and stovetops immediately after every cooking session to prevent grease buildup. Keep a caddy of microfiber cloths and vinegar-based spray in each bathroom for quick 2-minute sink touch-ups. Lastly, run a high-efficiency particulate air (HEPA) vacuum across high-traffic carpets and rugs twice a week to keep dust mites and outdoor allergens from settling deep into upholstery.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200",
    author: "AS Cleaning Team",
    publishedDate: new Date(),
  },
  {
    _id: "b2",
    slug: "the-benefits-of-eco-friendly-cleaning-products",
    title: "The Benefits of Eco-Friendly Cleaning Products",
    category: "Sustainability",
    excerpt: "Why switching to plant-based green cleaning solutions is safer for your family and pets.",
    content:
      "Traditional household cleansers often contain volatile organic compounds (VOCs), harsh chlorine bleaches, and synthetic fragrances that aggravate respiratory conditions and trigger pet allergies. At AS Cleaning Services, we utilize certified plant-derived, biodegradable surfactants and food-grade mineral descalers. These solutions deliver hospital-grade germ kill rates without releasing toxic fumes into your closed indoor air. They are gentle on expensive Italian marble, delicate tile grout, and hardwood finishes, ensuring your home remains both thoroughly sanitized and safely chemical-free.",
    image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=1200",
    author: "AS Cleaning Team",
    publishedDate: new Date(),
  },
  {
    _id: "b3",
    slug: "how-often-should-you-deep-clean-your-home",
    title: "How Often Should You Deep Clean Your Home?",
    category: "Home Care",
    excerpt: "A complete guide on the optimal deep-cleaning frequency for every room and lifestyle.",
    content:
      "While routine sweeping and weekly surface dusting maintain basic order, microscopic dust, grease, and moisture demand periodic deep intervention. For typical households in Zirakpur and Mohali, we recommend an intensive deep clean every 3 to 6 months. High-humidity zones like bathrooms require bi-monthly descaling to eliminate lime deposits from groundwater, while rooftop and underground water storage reservoirs must be drained and sterilized every 6 months to prevent microbial slime. Before festivals or rental tenant turnovers, an exhaustive move-in clean restores high hygiene standards.",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200",
    author: "AS Cleaning Team",
    publishedDate: new Date(),
  },
];

const fallbackImg = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    blogApi
      .getOne(slug)
      .then((res) => {
        if (res.data?.data) {
          setPost(res.data.data);
        } else {
          fallbackOrError();
        }
      })
      .catch(() => {
        fallbackOrError();
      })
      .finally(() => setLoading(false));

    function fallbackOrError() {
      const match = fallbackBlogs.find(
        (b) => b.slug === slug || b._id === slug
      );
      if (match) {
        setPost(match);
      } else {
        setError("This blog post could not be found.");
      }
    }
  }, [slug]);

  if (loading) return <Spinner full />;
  if (error || !post) {
    return (
      <div className="py-24 container-x max-w-xl text-center">
        <ErrorState message={error || "Blog post not found."} />
        <Link to="/blog" className="btn-primary mt-6 inline-flex">
          Back to Cleaning Blog
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug || post._id}` },
  ];

  return (
    <div>
      <SEOHead
        title={post.title}
        description={post.excerpt || post.content?.slice(0, 160)}
        canonicalPath={`/blog/${post.slug || post._id}`}
        ogImage={post.image || fallbackImg}
        ogType="article"
        schema={buildBreadcrumbSchema(breadcrumbs)}
      />

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
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-300 mb-3"
          >
            <Link to="/blog" className="hover:text-white">
              Blog
            </Link>
            <FaChevronRight size={8} className="text-slate-500" />
            <span className="text-sky-300 font-medium truncate max-w-xs">
              {post.category || "Cleaning"}
            </span>
          </nav>

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
              {post.publishedDate
                ? new Date(post.publishedDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Recent"}
            </span>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-5 text-sm sm:text-base">
            <p className="font-semibold text-slate-900 text-base sm:text-lg">
              {post.excerpt}
            </p>
            <p>{post.content}</p>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary-deep"
            >
              <FaArrowLeft size={11} /> Back to Blog
            </Link>
            <Link to="/booking" className="btn-primary text-xs !py-2.5 !px-4">
              Book a Cleaning
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
