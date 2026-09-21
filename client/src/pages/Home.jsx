import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCheck,
  FaStar,
  FaPhoneAlt,
  FaWhatsapp,
  FaArrowRight,
  FaShieldAlt,
  FaSearch,
  FaMoneyBillWave,
  FaSmile,
  FaBolt,
  FaClock,
  FaBroom,
  FaWater,
  FaHome,
  FaBath,
  FaUtensils,
  FaCouch,
  FaBuilding,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Hero from "../components/Hero";

// 2 Large Featured Services (Image 2)
const featuredServices = [
  {
    id: "deep-cleaning",
    tag: "MOST POPULAR",
    icon: FaBroom,
    title: "Deep Cleaning",
    description:
      "Thorough cleaning for homes and spaces that need detailed attention, from floors and surfaces to hard-to-reach areas, baseboards, and ceiling fixtures.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=85&w=900&auto=format&fit=crop",
    features: [
      "Complete sanitization of all high-touch switchboards & doors",
      "Deep grime elimination behind heavy cabinetry & appliances",
      "Under-furniture vacuuming and antibacterial surface buffing",
    ],
    ctaText: "Book Deep Cleaning",
    link: "/booking?service=deep-cleaning",
  },
  {
    id: "water-tank-cleaning",
    tag: "CUSTOMER FAVORITE",
    icon: FaWater,
    title: "Water Tank Cleaning",
    description:
      "Professional water tank cleaning to help remove dirt, sludge, bacterial colonies, and algae buildup to keep your drinking and household water purer.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=85&w=900&auto=format&fit=crop",
    features: [
      "High-pressure rotary de-sludging and sediment flushing",
      "Food-grade safe disinfectant scrub for inner walls",
      "Overhead and underground reservoir sanitation specialists",
    ],
    ctaText: "Book Water Tank Cleaning",
    link: "/booking?service=water-tank-cleaning",
  },
];

// 6 Additional Services (Image 3)
const standardServices = [
  {
    title: "Home Cleaning",
    tag: "Weekly / One-off",
    icon: FaHome,
    image:
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=700&auto=format&fit=crop",
    description:
      "Comprehensive recurring and one-off house sanitation including bedrooms, balconies, living rooms, and common family zones.",
    link: "/booking?service=home-cleaning",
  },
  {
    title: "Bathroom Cleaning",
    tag: "Limescale Removal",
    icon: FaBath,
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=700&auto=format&fit=crop",
    description:
      "Targeted hard-water scale removal, high-pressure grout scrubbing, mirror polishes, and medical-grade fixture disinfection.",
    link: "/booking?service=bathroom-cleaning",
  },
  {
    title: "Kitchen Cleaning",
    tag: "Full Degreasing",
    icon: FaUtensils,
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=700&auto=format&fit=crop",
    description:
      "Specialized degreasing for oil-stained chimney hoods, gas burners, exhaust fans, sink drains, and modular cabinet interiors.",
    link: "/booking?service=kitchen-cleaning",
  },
  {
    title: "Sofa Cleaning",
    tag: "Fabric & Leather",
    icon: FaCouch,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=700&auto=format&fit=crop",
    description:
      "Deep fabric shampooing, high-suction extraction vacuuming, allergen purging, and delicate fabric & leather upholstery protection.",
    link: "/booking?service=sofa-cleaning",
  },
  {
    title: "Floor Cleaning",
    tag: "Buffing & Scrubbing",
    icon: FaBroom,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=700&auto=format&fit=crop",
    description:
      "Industrial single-disc machine scrubbing, tile grout descaling, and high-gloss buffing for marble, granite, and vitrified tiles.",
    link: "/booking?service=floor-cleaning",
  },
  {
    title: "Property Cleaning",
    tag: "Move-in / Move-out",
    icon: FaBuilding,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=700&auto=format&fit=crop",
    description:
      "Full turnover sanitization for vacant properties, post-lease handovers, rental preparations, and move-in deep detailing.",
    link: "/booking?service=property-cleaning",
  },
];

// Why Choose Us (Image 4)
const whyChooseUsFeatures = [
  {
    icon: FaShieldAlt,
    title: "Professional & Reliable",
    description:
      "Dedicated cleaning team treating your property with utmost care and vetted responsibility. All specialists arrive in complete professional gear.",
  },
  {
    icon: FaSearch,
    title: "Thorough Cleaning",
    description:
      "Detailed scrubbing, hospital-grade sanitizing, and meticulous attention to neglected corners, baseboards, and deep grime that others miss.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Affordable Service",
    description:
      "Transparent, competitive rates with clear scope agreements and unmatched cleaning standards without hidden surprise fees.",
  },
  {
    icon: FaSmile,
    title: "Customer Satisfaction",
    description:
      "Quality guaranteed on every residential and commercial cleaning job. Our on-site supervisors inspect results before handover.",
  },
  {
    icon: FaBolt,
    title: "Quick Response",
    description:
      "Instant replies on call and WhatsApp so your urgent needs, water tank cleanings, or quick turnover emergencies are resolved immediately.",
  },
  {
    icon: FaClock,
    title: "Available 24 Hours",
    description:
      "Flexible round-the-clock scheduling to seamlessly suit your busy work routines, weekend shifts, and emergency domestic water requirements.",
  },
];

// Authentic Client Feedback (Image 5)
const googleReviews = [
  {
    initials: "VH",
    initialBg: "bg-sky-100 text-sky-800",
    name: "Verified Homeowner",
    role: "Water Tank Cleaning",
    rating: 5,
    text: "Excellent job. I had them clean my water tank, and they cleaned it very thoroughly. I would recommend their service.",
  },
  {
    initials: "SC",
    initialBg: "bg-emerald-100 text-emerald-800",
    name: "Satisfied Client",
    role: "Water Tank Cleaning & Care",
    rating: 5,
    text: "Nice work water tank clean and service very low prices",
  },
  {
    initials: "LC",
    initialBg: "bg-indigo-100 text-indigo-800",
    name: "Local Customer",
    role: "Full Deep Cleaning",
    rating: 5,
    text: "Very good service man and perfect work",
  },
];

const Home = () => {
  useEffect(() => {
    document.title = "AS Cleaning Services | Clean Spaces • Healthy Lives";
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TAILORED CARE STANDARDS - 2 FEATURED SERVICES (Image 2) */}
      <section id="services" className="py-16 sm:py-24 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              TAILORED CARE STANDARDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Cleaning Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Professional cleaning solutions meticulously calibrated for residential sanctuaries, domestic water storage, and commercial properties.
            </p>
          </div>

          {/* 2 Big Featured Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with badges */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=900";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-primary border border-sky-200 shadow-sm">
                        {service.tag}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 flex items-center justify-center text-sm shadow-md">
                      <service.icon />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Bullet Checklist */}
                    <ul className="space-y-3">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <span className="text-[#16A34A] mt-0.5 shrink-0 text-sm">
                            <FaCheck />
                          </span>
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="p-6 sm:p-8 pt-0">
                  <Link
                    to={service.link}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all hover:scale-[1.01]"
                  >
                    <span>{service.ctaText}</span>
                    <FaArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3. 6 SERVICE GRID (Image 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {standardServices.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Top */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=700";
                      }}
                    />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm text-primary flex items-center justify-center text-sm shadow-md">
                      <svc.icon />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {svc.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </div>

                {/* Footer Tag & Inquire Link */}
                <div className="px-5 sm:px-6 pb-5 pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-primary bg-sky-50 px-2.5 py-1 rounded-md">
                    {svc.tag}
                  </span>
                  <Link
                    to={svc.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-primary transition-colors"
                  >
                    <span>Inquire</span>
                    <FaArrowRight size={10} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE AS HOME CLEANING SERVICES (Image 4) */}
      <section id="why-choose-us" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              THE AS DIFFERENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Choose AS Home Cleaning Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Built on punctuality, rigorous training standards, and reliable domestic care you can trust with your keys.
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-slate-50/50 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-primary flex items-center justify-center text-lg mb-4">
                  <item.icon />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. WHAT OUR CUSTOMERS SAY (REVIEWS) (Image 5) */}
      <section id="reviews" className="py-16 sm:py-24 bg-slate-50/70 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with 5.0 Rating Card */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full mb-3 border border-emerald-200">
                <FaShieldAlt /> 100% AUTHENTIC CLIENT FEEDBACK
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                What Our Customers Say
              </h2>
            </div>

            {/* Google Rating Box */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 flex items-center gap-4 w-fit">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                5.0
              </span>
              <div>
                <div className="flex items-center text-amber-400 text-sm mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Based on 13 Google Reviews
                </span>
              </div>
            </div>
          </div>

          {/* 3 Google Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {googleReviews.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-amber-400 text-xs">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <FaStar key={idx} />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Google Review
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{rev.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div
                    className={`w-9 h-9 rounded-full ${rev.initialBg} font-bold text-xs flex items-center justify-center shrink-0`}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See All Google Reviews CTA Button */}
          <div className="text-center mt-10">
            <a
              href="https://www.google.com/search?q=AS+Cleaning+Services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-slate-300 shadow-sm transition-all hover:scale-[1.02]"
            >
              <FaExternalLinkAlt size={12} className="text-slate-400" />
              <span>See All 13 Google Reviews</span>
            </a>
          </div>

        </div>
      </section>

      {/* 6. CERTIFIED EXCELLENCE & LOCAL COVERAGE SECTION (Image 5 Bottom) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
                CERTIFIED EXCELLENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Trusted Local Cleaning Specialists Dedicated to Absolute Precision
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-4 leading-relaxed">
                Whether you need immediate water tank sediment extraction, deep residential turnover detailing, or regular housekeeping, our vetted team arrives fully equipped with commercial-grade machinery and safe cleansers.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="tel:06280016815"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  <FaPhoneAlt size={13} />
                  <span>Call 062800 16815</span>
                </a>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-deep text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Book Service Now</span>
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Right Dark Card: Local Coverage */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

                <div className="inline-flex items-center gap-2 bg-slate-800/80 text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-slate-700">
                  <FaMapMarkerAlt size={12} />
                  <span>Local Neighborhood Coverage</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-3">
                  Professional Cleaning Services Near You
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Serving residential homes, multi-story apartments, commercial complexes, and societies. Fast dispatch teams ready 24/7.
                </p>

                <div className="space-y-3 border-t border-slate-800 pt-6">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-medium text-slate-400">Direct Helpline</span>
                    <span className="font-bold text-white">062800 16815</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-medium text-slate-400">Service Hours</span>
                    <span className="font-bold text-emerald-400">24/7 Priority Response</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-medium text-slate-400">Response Time</span>
                    <span className="font-bold text-sky-400">Within 30–60 Mins</span>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20need%20cleaning%20services%20near%20me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md"
                  >
                    <FaWhatsapp size={16} />
                    <span>WhatsApp Direct Booking</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
