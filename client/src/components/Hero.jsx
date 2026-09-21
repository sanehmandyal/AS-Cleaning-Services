import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLeaf, FaCheckCircle } from "react-icons/fa";

const trustItems = [
  {
    icon: FaShieldAlt,
    label: "Trained & Verified Staff",
    sub: "Background Checked",
  },
  {
    icon: FaLeaf,
    label: "Eco-Friendly Products",
    sub: "Safe for your family & pets",
  },
  {
    icon: FaCheckCircle,
    label: "100% Satisfaction",
    sub: "We ensure quality",
  },
];

const Hero = () => {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      {/* High-Resolution Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=2000&auto=format&fit=crop"
          alt="Professional cleaner in living room"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          loading="eager"
        />
        {/* Rich cinematic navy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container-x pt-20 pb-28 sm:pt-28 sm:pb-36 lg:pt-36 lg:pb-44">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 px-3.5 py-1.5 rounded-full mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-sky-300 font-semibold text-xs sm:text-sm tracking-wide uppercase">
              Professional Cleaning Services
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight"
          >
            Sparkling Spaces
            <br />
            for a Healthier You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            AS Cleaning Services offers reliable, affordable and high-quality
            cleaning solutions for homes, offices and commercial spaces.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/booking" className="btn-primary-lg shadow-lg hover:shadow-xl">
              Book a Service
            </Link>
            <Link to="/services" className="btn-outline-lg">
              Our Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trust Badges Strip (3-card layout) */}
      <div className="relative z-20 container-x -mt-12 sm:-mt-16 pb-12">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-2 sm:p-3">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 sm:p-6 transition-all hover:bg-sky-50/50 rounded-xl"
            >
              <span className="w-12 h-12 rounded-full bg-sky-50 text-primary flex items-center justify-center text-xl shrink-0 shadow-sm">
                <item.icon />
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {item.label}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
