import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaCalendarAlt,
  FaStar,
  FaArrowRight,
  FaSearch,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";
import { locationsList } from "../data/locationsData";
import SEOHead from "../components/SEOHead";
import { buildBreadcrumbSchema } from "../utils/seoSchema";

const Locations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Service Locations | AS Cleaning Services";
  }, []);

  const filteredLocations = locationsList.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.coverageAreas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesState =
      selectedState === "all" ||
      (selectedState === "punjab" && loc.state === "Punjab") ||
      (selectedState === "himachal" && loc.state === "Himachal Pradesh") ||
      (selectedState === "tricity" &&
        (loc.region === "Tricity" || loc.state === "Chandigarh (UT)" || loc.state === "Haryana"));

    return matchesSearch && matchesState;
  });

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
  ];

  return (
    <>
      <SEOHead
        title="Service Areas & Locations | AS Cleaning Services (Ludhiana, Punjab, Amb, Una & More)"
        description="Discover all service locations covered by AS Cleaning Services. Professional deep cleaning and water tank sanitization in Ludhiana, Punjab, Amb, Una, Chandigarh, Mohali, Zirakpur. Call 062800 16815."
        canonicalUrl="https://as-cleaning-services.vercel.app/locations"
        structuredData={[buildBreadcrumbSchema(breadcrumbs)]}
        keywords="cleaning services ludhiana, cleaning services punjab, cleaning services amb, cleaning services una, cleaning services mohali, cleaning services zirakpur, cleaning services chandigarh"
      />

      <div className="bg-slate-50 min-h-screen">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 backdrop-blur-xs">
              <FaMapMarkerAlt className="text-sky-400" />
              <span>Expanding Coverage Across Punjab, Himachal & Tricity</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Our Service Locations
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              AS Cleaning Services provides doorstep residential and commercial deep cleaning, water tank sanitization, and upholstery care across major cities and regional towns.
            </p>

            {/* Search Bar & Filter Buttons */}
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-4">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search city, sector, or colony (e.g. Ludhiana, Amb, Una, Model Town...)"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* State Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedState("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedState === "all"
                      ? "bg-primary text-white shadow-xs"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  All Regions ({locationsList.length})
                </button>
                <button
                  onClick={() => setSelectedState("punjab")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedState === "punjab"
                      ? "bg-primary text-white shadow-xs"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Punjab (Ludhiana & State)
                </button>
                <button
                  onClick={() => setSelectedState("himachal")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedState === "himachal"
                      ? "bg-primary text-white shadow-xs"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Himachal Pradesh (Amb & Una)
                </button>
                <button
                  onClick={() => setSelectedState("tricity")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedState === "tricity"
                      ? "bg-primary text-white shadow-xs"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Tricity (Chandigarh, Mohali, Zirakpur)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATIONS GRID */}
        <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <FaMapMarkerAlt className="mx-auto text-3xl text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No locations found</h3>
              <p className="text-xs text-slate-500 mb-4">
                We couldn't find a location matching "{searchTerm}".
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedState("all");
                }}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredLocations.map((loc, idx) => (
                <motion.div
                  key={loc.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-card hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={loc.heroImage}
                        alt={`Cleaning Services in ${loc.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block">
                            {loc.state} • {loc.region}
                          </span>
                          <h2 className="text-xl font-black text-white">{loc.name}</h2>
                        </div>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                        <FaStar className="text-amber-400 text-[10px]" />
                        <span>{loc.rating}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      <p className="text-xs font-semibold text-primary mb-1">{loc.tagline}</p>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {loc.subheadline}
                      </p>

                      {/* Key coverage tags */}
                      <div className="mb-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                          Popular Neighborhoods:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {loc.coverageAreas.slice(0, 4).map((area, aIdx) => (
                            <span
                              key={aIdx}
                              className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-medium"
                            >
                              {area}
                            </span>
                          ))}
                          {loc.coverageAreas.length > 4 && (
                            <span className="text-[11px] bg-sky-50 text-primary px-2 py-0.5 rounded-md font-semibold">
                              +{loc.coverageAreas.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTAs */}
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/locations/${loc.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary-deep transition-colors"
                    >
                      <span>Explore {loc.name}</span>
                      <FaArrowRight size={10} />
                    </Link>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/916280016815?text=${encodeURIComponent(
                          `Hello, I would like to book cleaning services in ${loc.name}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center text-sm transition-colors"
                        title={`WhatsApp chat for ${loc.name}`}
                      >
                        <FaWhatsapp />
                      </a>
                      <a
                        href="tel:06280016815"
                        className="w-8 h-8 rounded-lg bg-sky-50 text-primary hover:bg-primary hover:text-white flex items-center justify-center text-xs transition-colors"
                        title="Call Helpline"
                      >
                        <FaPhoneAlt />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* 24/7 HELPLINE BANNER */}
        <section className="bg-slate-900 text-white py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">
                CENTRAL DISPATCH DESK
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                Need Fast Doorstep Cleaning in Any Town or Sector?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Call our 24/7 hotline directly or book your cleaning slot online with instant confirmation.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:06280016815"
                className="inline-flex items-center gap-2 bg-primary hover:bg-sky-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
              >
                <FaPhoneAlt size={12} />
                <span>062800 16815</span>
              </a>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm px-5 py-3 rounded-xl transition-all"
              >
                <FaCalendarAlt size={12} />
                <span>Book Service Online</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Locations;
