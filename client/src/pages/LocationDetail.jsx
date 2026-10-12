import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaCalendarAlt,
  FaCheckCircle,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaArrowRight,
  FaBroom,
  FaWater,
  FaChevronDown,
  FaTools,
  FaBuilding,
} from "react-icons/fa";
import { locationsList, getLocationBySlug } from "../data/locationsData";
import { serviceApi } from "../services/serviceApi";
import ServiceCard from "../components/ServiceCard";
import SEOHead from "../components/SEOHead";
import {
  buildCityLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "../utils/seoSchema";

const LocationDetail = () => {
  const { slug } = useParams();
  const locationData = getLocationBySlug(slug);

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    serviceApi
      .getAll()
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setServices(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch live services:", err);
      })
      .finally(() => {
        setLoadingServices(false);
      });
  }, [slug]);

  if (!locationData) {
    return <Navigate to="/locations" replace />;
  }

  const {
    name,
    state,
    region,
    tagline,
    headline,
    subheadline,
    metaTitle,
    metaDescription,
    heroImage,
    dispatchTime,
    phone,
    rating,
    reviewsCount,
    coverageAreas,
    challengesSolved,
    faqs,
    mapQuery,
  } = locationData;

  const whatsappMessage = encodeURIComponent(
    `Hello AS Cleaning Services, I would like to inquire about professional cleaning services in ${name} (${state}).`
  );
  const whatsappUrl = `https://wa.me/916280016815?text=${whatsappMessage}`;
  const bookingUrl = `/booking?city=${encodeURIComponent(name)}`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Locations", url: "/locations" },
    { name: name, url: `/locations/${locationData.slug}` },
  ];

  const schemas = [
    buildCityLocalBusinessSchema(locationData),
    buildBreadcrumbSchema(breadcrumbs),
    buildFaqSchema(faqs),
  ].filter(Boolean);

  // Other cities for quick navigation
  const otherLocations = locationsList.filter((loc) => loc.slug !== locationData.slug);

  return (
    <>
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={`https://as-cleaning-services.vercel.app/locations/${locationData.slug}`}
        structuredData={schemas}
        keywords={`cleaning services in ${name}, home cleaning ${name}, water tank cleaning ${name}, deep cleaning ${name}, bathroom cleaning ${name}, sofa cleaning ${name}, ${state} cleaning services`}
      />

      <div className="bg-slate-50 min-h-screen">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 text-white pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
          {/* Subtle decorative background circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/locations" className="hover:text-white transition-colors">
                Locations
              </Link>
              <span>/</span>
              <span className="text-sky-300 font-semibold">{name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 backdrop-blur-xs">
                  <FaMapMarkerAlt className="text-sky-400" />
                  <span>
                    Service Hub: {name}, {state} ({region})
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  {headline}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 font-medium mb-3">
                  {tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8 max-w-2xl">
                  {subheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                  <a
                    href="tel:06280016815"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-sky-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
                  >
                    <FaPhoneAlt size={14} />
                    <span>Call 062800 16815</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-600/30 transition-all active:scale-95"
                  >
                    <FaWhatsapp size={17} />
                    <span>WhatsApp Inquiry</span>
                  </a>

                  <Link
                    to={bookingUrl}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base px-5 py-3.5 rounded-xl transition-all"
                  >
                    <FaCalendarAlt size={13} />
                    <span>Book in {name}</span>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800 text-left">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-sky-400 shrink-0 text-sm" />
                    <div>
                      <p className="text-xs font-bold text-white">Speed</p>
                      <p className="text-[11px] text-slate-400">{dispatchTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-sky-400 shrink-0 text-sm" />
                    <div>
                      <p className="text-xs font-bold text-white">Verified Crew</p>
                      <p className="text-[11px] text-slate-400">Police Checked</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-amber-400 shrink-0 text-sm" />
                    <div>
                      <p className="text-xs font-bold text-white">{rating} ★ Rating</p>
                      <p className="text-[11px] text-slate-400">{reviewsCount} Reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-400 shrink-0 text-sm" />
                    <div>
                      <p className="text-xs font-bold text-white">100% Guarantee</p>
                      <p className="text-[11px] text-slate-400">Quality Checked</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image Banner Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 aspect-[4/3] bg-slate-800 group">
                  <img
                    src={heroImage}
                    alt={`Cleaning Services in ${name} - AS Cleaning Services`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    <div className="inline-flex items-center gap-2 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 w-max">
                      📍 {name} Mobile Cleaning Unit
                    </div>
                    <p className="text-white font-bold text-base sm:text-lg">
                      Doorstep Service Anywhere in {name}
                    </p>
                    <p className="text-slate-300 text-xs mt-1">
                      Equipped with rotary scrubbers, steam cleaners & food-grade water tank jets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES OFFERED IN THIS CITY */}
        <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              VERIFIED CLEANING SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Professional Cleaning Services in {name}
            </h2>
            <p className="text-xs sm:text-base text-slate-600 mt-3">
              Explore our full range of residential and commercial cleaning services available in{" "}
              {name}, {state}.
            </p>
          </div>

          {loadingServices ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 animate-pulse h-72"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service._id || service.slug || index} service={service} index={index} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              to={bookingUrl}
              className="inline-flex items-center gap-2 bg-primary hover:bg-sky-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
            >
              <span>Book Any Service in {name}</span>
              <FaArrowRight size={12} />
            </Link>
          </div>
        </section>

        {/* LOCAL CHALLENGES SOLVED */}
        <section className="py-14 sm:py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
                  TAILORED FOR {name.toUpperCase()}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                  Why AS Cleaning Services is Trusted in {name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Cleaning requirements in {name} differ based on local water mineral hardness, seasonal humidity, dust levels, and architecture. Our experienced crews carry tailored chemical formulations and machinery specifically suited for the local conditions in {name}.
                </p>

                <div className="space-y-3.5">
                  {challengesSolved.map((challenge, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <FaCheckCircle className="text-primary mt-0.5 shrink-0 text-sm" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {challenge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                    <div>
                      <h3 className="font-bold text-lg text-white">5-Stage Water Tank Cleaning</h3>
                      <p className="text-xs text-slate-400">Certified hygiene process in {name}</p>
                    </div>
                    <span className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
                      <FaWater size={18} />
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        1
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          Mechanized Sludge Dewatering
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400">
                          Rapid evacuation of all dirty water, sediment, and silt.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        2
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          High-Pressure Rotary Jet Wash
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400">
                          Dislodges calcified limescale, algae, and biofilm from walls and ceiling.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        3
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          Vacuum Sludge Extraction
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400">
                          Industrial wet vacuuming to leave the tank bed spotless and dry.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        4
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          Food-Grade Antibacterial Scrub
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400">
                          Safe chemical-free antimicrobial wipe that prevents fungal regrowth.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        5
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          Microbial Sanitization & Odor Reset
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400">
                          Leaves your drinking water reservoir 100% hygienic and ready to fill.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Available in {name} today</span>
                    <a
                      href="tel:06280016815"
                      className="text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
                    >
                      <span>Book Tank Clean</span>
                      <FaArrowRight size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEIGHBORHOODS & AREAS COVERED */}
        <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              NEIGHBORHOOD COVERAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Key Areas & Localities Served in {name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Our mobile cleaning units service all residential societies, commercial sectors, and suburban neighborhoods in {name}:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
            {coverageAreas.map((area, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 bg-white border border-slate-200/90 text-slate-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-xl shadow-2xs hover:border-primary hover:text-primary transition-colors"
              >
                <FaMapMarkerAlt className="text-primary text-[10px]" />
                <span>{area}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don't see your specific sector or colony? We cover all surrounding addresses within a 25 km radius of {name}. Call{" "}
            <a href="tel:06280016815" className="font-bold text-primary hover:underline">
              062800 16815
            </a>{" "}
            for instant confirmation.
          </p>
        </section>

        {/* GOOGLE MAP & DIRECT CONTACT */}
        <section className="py-12 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block">
                  LOCAL DISPATCH HUB
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Fast Cleaning Dispatch Across {name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our professional cleaners are dispatched with fully equipped vans carrying heavy-duty rotary scrubbers, pressure washers, and sanitizing chemicals directly to your doorstep in {name}.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="w-8 h-8 rounded-lg bg-sky-50 text-primary flex items-center justify-center shrink-0">
                      <FaPhoneAlt size={12} />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">24/7 Helpline</p>
                      <a href="tel:06280016815" className="font-bold text-slate-900 hover:text-primary">
                        062800 16815
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <FaWhatsapp size={15} />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">WhatsApp Direct</p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-900 hover:text-emerald-600"
                      >
                        Chat with {name} Manager
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                      <FaClock size={12} />
                    </span>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Operating Hours</p>
                      <p className="font-semibold text-slate-900">7 Days a Week • 8:00 AM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md h-72 sm:h-80 bg-slate-100">
                  <iframe
                    title={`AS Cleaning Services Map - ${name}`}
                    src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL FAQS */}
        <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cleaning FAQs for {name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Common questions answered for residents and business owners in {name}.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`text-slate-400 text-xs shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* OTHER LOCATIONS STRIP */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              Explore AS Cleaning Services in Other Locations
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              We provide professional cleaning across Punjab, Himachal Pradesh & Tricity:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {otherLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-primary text-slate-200 hover:text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
                >
                  <FaMapMarkerAlt size={10} className="text-sky-400" />
                  <span>{loc.name}</span>
                </Link>
              ))}
              <Link
                to="/locations"
                className="inline-flex items-center gap-1.5 bg-sky-500/20 hover:bg-sky-500 text-sky-300 hover:text-white border border-sky-400/30 text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                <span>All Locations →</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LocationDetail;
