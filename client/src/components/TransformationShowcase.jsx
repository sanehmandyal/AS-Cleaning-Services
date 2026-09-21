import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaPhoneAlt, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const transformations = [
  {
    id: "tank",
    title: "Water Tank Cleaning",
    tagline: "Heavy Sludge & Algae Elimination",
    image: "/images/transformations/water-tank.jpg",
    beforeText: "Dark mud, heavy bacterial sludge & contaminated tank walls",
    afterText: "100% sterilized, food-grade disinfected, crystal clear pure water",
    serviceLink: "/booking?service=water-tank-cleaning",
    time: "Takes ~60-90 Mins",
    highlight: "150-Bar Rotary Pressure Flush",
  },
  {
    id: "kitchen",
    title: "Kitchen Degreasing",
    tagline: "Oil-Stained Chimney & Stove Stripping",
    image: "/images/transformations/kitchen.jpg",
    beforeText: "Thick sticky grease, oil residue, and burnt stovetop grime",
    afterText: "Factory-finish gleam, degreased chimney filters & sparkling stainless steel",
    serviceLink: "/booking?service=kitchen-cleaning",
    time: "Takes ~2-3 Hours",
    highlight: "Non-Corrosive Industrial Degreasers",
  },
  {
    id: "bathroom",
    title: "Bathroom Descaling",
    tagline: "Hard-Water Scale & Grout Whitening",
    image: "/images/transformations/bathroom.jpg",
    beforeText: "Foggy limescale, calcium-stained shower glass & dark tile grout",
    afterText: "Ultra-clear spotless glass, bleached white grout & polished fixtures",
    serviceLink: "/booking?service=bathroom-cleaning",
    time: "Takes ~1-2 Hours",
    highlight: "Hospital-Grade Anti-Microbial Cleanse",
  },
  {
    id: "sofa",
    title: "Sofa & Upholstery",
    tagline: "Deep Shampoo Extraction & Stain Removal",
    image: "/images/transformations/sofa.jpg",
    beforeText: "Deep coffee stains, dust mite accumulation & faded fabric",
    afterText: "Restored fabric color, allergen-free deep extraction & quick dry",
    serviceLink: "/booking?service=sofa-cleaning",
    time: "Takes ~60-90 Mins",
    highlight: "High-Suction Extraction Vacuuming",
  },
];

const TransformationShowcase = () => {
  const [activeTab, setActiveTab] = useState("tank");
  const activeItem = transformations.find((t) => t.id === activeTab) || transformations[0];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <span>REAL RESULTS • ZERO GIMMICKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            See The Real Transformation
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Real before & after results from actual client properties. Inspect the uncompromising standards our certified cleaning crews deliver.
          </p>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {transformations.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-primary text-white shadow-lg shadow-sky-500/25 scale-[1.03]"
                    : "bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Transformation Visual Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Side-by-side Transformation Image Card */}
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-black aspect-[16/9]">
                  <img
                    src={activeItem.image}
                    alt={`${activeItem.title} Before and After Transformation`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="bg-slate-950/80 backdrop-blur-md text-sky-400 border border-sky-400/30 text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {activeItem.highlight}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Details & Booking Action */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                    {activeItem.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                    {activeItem.title}
                  </h3>

                  {/* Before vs After Cards */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="bg-red-500/20 text-red-400 text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0 mt-0.5">
                        BEFORE
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {activeItem.beforeText}
                      </p>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 flex items-start gap-3">
                      <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded shrink-0 mt-0.5">
                        AFTER
                      </span>
                      <p className="text-xs sm:text-sm text-emerald-300 font-medium leading-relaxed">
                        {activeItem.afterText}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Pill */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                    <FaCheckCircle className="text-emerald-400" />
                    <span>Average Service Duration: <strong className="text-white">{activeItem.time}</strong></span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 border-t border-slate-800">
                  <a
                    href="tel:06280016815"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <FaPhoneAlt size={11} className="text-primary" />
                    <span>Call: 062800 16815</span>
                  </a>

                  <a
                    href={`https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20saw%20your%20${encodeURIComponent(activeItem.title)}%20transformation%20and%20want%20a%20quote`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <FaWhatsapp size={15} />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TransformationShowcase;
