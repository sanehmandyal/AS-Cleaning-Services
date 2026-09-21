import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaPhoneAlt,
  FaWhatsapp,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaPumpSoap,
} from "react-icons/fa";

const trustBadges = [
  "Professional Service",
  "Affordable Pricing",
  "Quality Work",
  "24/7 Availability",
];

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-slate-50/60 via-white to-white pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* 1. Rating Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-6 w-fit"
            >
              <div className="flex items-center text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                5.0 Google Rating
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs sm:text-sm font-medium text-slate-500">
                13 Verified Reviews
              </span>
            </motion.div>

            {/* 2. Main Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.12] tracking-tight"
            >
              Professional Home Cleaning Services{" "}
              <span className="text-[#0284C7]">You Can Trust</span>
            </motion.h1>

            {/* 3. Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Reliable cleaning services for homes, water tanks and properties. Quality work, professional service and complete customer satisfaction across every single square metre.
            </motion.p>

            {/* 4. Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              {/* Call Now Button */}
              <a
                href="tel:06280016815"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <FaPhoneAlt size={13} />
                <span>Call Now: 062800 16815</span>
              </a>

              {/* Get a Free Quote Button */}
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold px-5 py-3.5 rounded-xl border border-slate-300/80 shadow-sm hover:border-slate-400 transition-all hover:scale-[1.02]"
              >
                <span>Get a Free Quote</span>
                <FaArrowRight size={12} className="text-slate-500" />
              </Link>

              {/* WhatsApp Us Button */}
              <a
                href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-sm font-bold px-5 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <FaWhatsapp size={16} />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* 5. 4 Trust Badges Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#16A34A] shrink-0 text-sm" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">
                    {badge}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Hero Column: Photo Card with floating badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-md lg:max-w-none"
            >
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=1200&auto=format&fit=crop"
                  alt="Professional AS Cleaning specialist cleaning shelves in uniform"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200";
                  }}
                />

                {/* Subtle Inner Gradient for badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Card: Trained Specialists */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-primary flex items-center justify-center text-lg shrink-0">
                    <FaPumpSoap />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Trained Specialists
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-tight mt-0.5">
                      Hospital-Grade Disinfection & Safe Eco Cleansers
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Top-Right Glass Badge: 100% Verified */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -top-3 right-4 sm:-top-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl py-2.5 px-4 shadow-xl border border-slate-100/80 flex items-center gap-2.5 z-20"
              >
                <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-xs">
                  <FaShieldAlt />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900 leading-none">
                    100% Verified
                  </span>
                  <span className="block text-[10px] font-medium text-slate-500 mt-0.5 leading-none">
                    Background Checked
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
