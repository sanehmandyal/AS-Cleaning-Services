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
    <section className="relative bg-gradient-to-b from-slate-50/60 via-white to-white pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* 1. Rating Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-4 sm:mb-6 w-fit bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-full"
            >
              <div className="flex items-center text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800">
                5.0 Rating
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
              className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.15] tracking-tight break-words"
            >
              Professional Home Cleaning Services{" "}
              <span className="text-[#0284C7]">You Can Trust</span>
            </motion.h1>

            {/* 3. Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-slate-600 text-sm sm:text-lg leading-relaxed max-w-xl"
            >
              Reliable cleaning services for homes, water tanks and properties. Quality work, professional service and complete customer satisfaction across every single square metre.
            </motion.p>

            {/* 4. Action Buttons (Stacked on mobile, inline on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4"
            >
              {/* Call Now Button */}
              <a
                href="tel:06280016815"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <FaPhoneAlt size={12} />
                <span>Call: 062800 16815</span>
              </a>

              {/* Get a Free Quote Button */}
              <Link
                to="/booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all active:scale-95"
              >
                <span>Get a Free Quote</span>
                <FaArrowRight size={11} className="text-slate-500" />
              </Link>

              {/* WhatsApp Us Button */}
              <a
                href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-bold px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <FaWhatsapp size={15} />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* 5. 4 Trust Badges Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4"
            >
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
                  <FaCheckCircle className="text-[#16A34A] shrink-0 text-xs sm:text-sm" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
                    {badge}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Hero Column: Photo Card with floating badges */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-md lg:max-w-none"
            >
              {/* Main Photo Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-slate-100 aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=1200&auto=format&fit=crop"
                  alt="Professional AS Cleaning specialist cleaning shelves in uniform"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1200";
                  }}
                />

                {/* Subtle Inner Gradient for badge contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Card: Trained Specialists */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-white/60 flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-sky-50 text-primary flex items-center justify-center text-sm sm:text-lg shrink-0">
                    <FaPumpSoap />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Trained Specialists
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 leading-tight mt-0.5">
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
                className="absolute -top-2 right-2 sm:-top-3 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl py-1.5 px-3 sm:py-2 sm:px-4 shadow-xl border border-slate-100/80 flex items-center gap-2 z-20"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-[10px] sm:text-xs">
                  <FaShieldAlt />
                </div>
                <div>
                  <span className="block text-[11px] sm:text-xs font-bold text-slate-900 leading-none">
                    100% Verified
                  </span>
                  <span className="block text-[9px] sm:text-[10px] font-medium text-slate-500 mt-0.5 leading-none">
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
