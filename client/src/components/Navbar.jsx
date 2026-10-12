import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaWhatsapp,
  FaUserShield,
  FaSignOutAlt,
  FaTachometerAlt,
  FaArrowRight,
  FaChevronDown,
  FaBroom,
  FaWater,
  FaHome,
  FaBath,
  FaUtensils,
  FaCouch,
  FaBuilding,
  FaShieldAlt,
  FaCameraRetro,
  FaCalculator,
  FaStar,
  FaQuestionCircle,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { serviceApi } from "../services/serviceApi";
import { locationsList } from "../data/locationsData";
import Logo from "./Logo";

// 8 Verified Services for Dropdown
const serviceDropdownItems = [
  {
    slug: "deep-cleaning",
    label: "Deep Cleaning",
    desc: "Complete intensive sanitization & grime reset",
    icon: FaBroom,
    tag: "Intensive",
  },
  {
    slug: "water-tank-cleaning",
    label: "Water Tank Cleaning",
    desc: "5-stage rotary jet & food-grade scrub",
    icon: FaWater,
    tag: "Popular",
  },
  {
    slug: "home-cleaning",
    label: "Home & Villa",
    desc: "Complete residential dust & living care",
    icon: FaHome,
    tag: "Eco-Safe",
  },
  {
    slug: "bathroom-cleaning",
    label: "Bathroom Cleaning",
    desc: "Hard-water scale removal & tile grout polish",
    icon: FaBath,
    tag: "Descaling",
  },
  {
    slug: "kitchen-cleaning",
    label: "Kitchen Degreasing",
    desc: "Chimney filter, stove & cabinet detailing",
    icon: FaUtensils,
    tag: "Degreasing",
  },
  {
    slug: "sofa-cleaning",
    label: "Sofa & Upholstery",
    desc: "Deep foam shampooing & dust extraction",
    icon: FaCouch,
    tag: "Fabric Care",
  },
  {
    slug: "floor-cleaning",
    label: "Floor Machine Buffing",
    desc: "Single-disc rotary scrub for tiles & marble",
    icon: FaBroom,
    tag: "High Gloss",
  },
  {
    slug: "property-cleaning",
    label: "Property Cleaning",
    desc: "Move-in / move-out turnover handover",
    icon: FaBuilding,
    tag: "Turnover",
  },
];

// Interactive Features & Resources Dropdown
const featureDropdownItems = [
  {
    to: "/#process",
    label: "5-Stage Water Tank Process",
    desc: "Scientific sterilization methodology",
    icon: FaShieldAlt,
  },
  {
    to: "/#transformations",
    label: "Before & After Showcase",
    desc: "Real verified property cleaning results",
    icon: FaCameraRetro,
  },
  {
    to: "/#estimator",
    label: "Instant Cost Estimator",
    desc: "Interactive pricing & scope calculator",
    icon: FaCalculator,
  },
  {
    to: "/#why-choose-us",
    label: "Why Choose AS Cleaning",
    desc: "Police-checked staff & eco standards",
    icon: FaCheckCircle,
  },
  {
    to: "/#reviews",
    label: "Customer Reviews",
    desc: "5.0-star ratings & local testimonials",
    icon: FaStar,
  },
  {
    to: "/#faqs",
    label: "Frequently Asked Questions",
    desc: "Immediate answers to common queries",
    icon: FaQuestionCircle,
  },
];

const Navbar = () => {
  const [servicesList, setServicesList] = useState(serviceDropdownItems);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  const servicesTimeoutRef = useRef(null);
  const featuresTimeoutRef = useRef(null);
  const locationsTimeoutRef = useRef(null);

  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    serviceApi
      .getAll()
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          const iconLookup = {
            FaBroom,
            FaWater,
            FaHome,
            FaBath,
            FaUtensils,
            FaCouch,
            FaBuilding,
          };
          const mapped = res.data.data.map((s) => {
            const fallback =
              serviceDropdownItems.find(
                (f) =>
                  f.slug === s.slug ||
                  f.slug === s._id ||
                  f.label?.toLowerCase() === s.title?.toLowerCase()
              ) || {};
            const IconComp =
              iconLookup[s.icon] ||
              (FaIcons && FaIcons[s.icon]) ||
              fallback.icon ||
              FaBroom;
            return {
              slug: s.slug || s._id,
              label: s.title,
              desc:
                s.shortDescription ||
                fallback.desc ||
                "Specialized professional cleaning service",
              icon: IconComp,
              tag: fallback.tag || (s.duration ? s.duration : "Available"),
            };
          });
          setServicesList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setServicesDropdownOpen(false);
    setFeaturesDropdownOpen(false);
    setLocationsDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleNavClick = (to) => {
    setOpen(false);
    setServicesDropdownOpen(false);
    setFeaturesDropdownOpen(false);
    setLocationsDropdownOpen(false);

    if (to.startsWith("/#")) {
      const targetId = to.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Hover handlers for Services
  const handleServicesMouseEnter = () => {
    clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };
  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  // Hover handlers for Features
  const handleFeaturesMouseEnter = () => {
    clearTimeout(featuresTimeoutRef.current);
    setFeaturesDropdownOpen(true);
  };
  const handleFeaturesMouseLeave = () => {
    featuresTimeoutRef.current = setTimeout(() => {
      setFeaturesDropdownOpen(false);
    }, 150);
  };

  // Hover handlers for Locations
  const handleLocationsMouseEnter = () => {
    clearTimeout(locationsTimeoutRef.current);
    setLocationsDropdownOpen(true);
  };
  const handleLocationsMouseLeave = () => {
    locationsTimeoutRef.current = setTimeout(() => {
      setLocationsDropdownOpen(false);
    }, 150);
  };

  const isServicesActive =
    location.pathname.startsWith("/services") || location.pathname === "/services";

  const isLocationsActive =
    location.pathname.startsWith("/locations") ||
    location.pathname.startsWith("/location") ||
    location.pathname.startsWith("/city");

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
          scrolled ? "border-slate-200/90 shadow-sm" : "border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 lg:gap-4">
            {/* Brand Logo */}
            <div className="shrink-0 flex items-center">
              <Logo size="normal" />
            </div>

            {/* Desktop Navigation Links (Centered with Dropdowns) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-50/90 px-3 py-1.5 rounded-full border border-slate-200/70 shadow-xs relative">
              {/* Home */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`
                }
              >
                Home
              </NavLink>

              {/* Services Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isServicesActive || servicesDropdownOpen
                      ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>Services</span>
                  <FaChevronDown
                    size={9}
                    className={`transition-transform duration-200 ${
                      servicesDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50"
                    >
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          All Dedicated Services
                        </span>
                        <Link
                          to="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1"
                        >
                          View Services Overview <FaArrowRight size={10} />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {servicesList.map((item) => (
                          <Link
                            key={item.slug}
                            to={`/services/${item.slug}`}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <span className="w-8 h-8 rounded-lg bg-sky-50 text-primary flex items-center justify-center text-xs shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <item.icon />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                                  {item.label}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 leading-tight truncate mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-4 -mb-4 p-3 rounded-b-2xl flex items-center justify-between text-xs text-slate-600">
                        <span className="font-medium text-[11px]">
                          Need custom commercial or residential cleaning?
                        </span>
                        <Link
                          to="/booking"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="font-bold text-primary hover:underline text-[11px]"
                        >
                          Instant Free Quote →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Locations Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleLocationsMouseEnter}
                onMouseLeave={handleLocationsMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setLocationsDropdownOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isLocationsActive || locationsDropdownOpen
                      ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`}
                  aria-expanded={locationsDropdownOpen}
                >
                  <FaMapMarkerAlt size={10} className="text-primary" />
                  <span>Locations</span>
                  <FaChevronDown
                    size={9}
                    className={`transition-transform duration-200 ${
                      locationsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {locationsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50"
                    >
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Service Cities & Towns
                        </span>
                        <Link
                          to="/locations"
                          onClick={() => setLocationsDropdownOpen(false)}
                          className="text-xs font-bold text-primary hover:text-primary-deep flex items-center gap-1"
                        >
                          All Locations <FaArrowRight size={10} />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {locationsList.slice(0, 8).map((loc) => (
                          <Link
                            key={loc.slug}
                            to={`/locations/${loc.slug}`}
                            onClick={() => setLocationsDropdownOpen(false)}
                            className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <span className="w-7 h-7 rounded-lg bg-sky-50 text-primary flex items-center justify-center text-xs shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <FaMapMarkerAlt size={11} />
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                                {loc.name}
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight truncate">
                                {loc.state}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-4 -mb-4 p-3 rounded-b-2xl flex items-center justify-between text-xs text-slate-600">
                        <span className="font-medium text-[11px]">
                          Doorstep service across Punjab, HP & Tricity
                        </span>
                        <Link
                          to="/locations"
                          onClick={() => setLocationsDropdownOpen(false)}
                          className="font-bold text-primary hover:underline text-[11px]"
                        >
                          View Coverage Map →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Features & Tools Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleFeaturesMouseEnter}
                onMouseLeave={handleFeaturesMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setFeaturesDropdownOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    featuresDropdownOpen
                      ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`}
                  aria-expanded={featuresDropdownOpen}
                >
                  <span>Features</span>
                  <FaChevronDown
                    size={9}
                    className={`transition-transform duration-200 ${
                      featuresDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {featuresDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50"
                    >
                      <div className="pb-2 mb-1 border-b border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                          Interactive Tools & Standards
                        </span>
                      </div>

                      <div className="space-y-1">
                        {featureDropdownItems.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.to}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavClick(item.to);
                            }}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <span className="w-7 h-7 rounded-lg bg-sky-50 text-primary flex items-center justify-center text-xs shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <item.icon />
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                                {item.label}
                              </div>
                              <p className="text-[10px] text-slate-500 leading-tight truncate">
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About */}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`
                }
              >
                About
              </NavLink>

              {/* Pricing */}
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`
                }
              >
                Pricing
              </NavLink>

              {/* Contact */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                      : "text-slate-600 hover:text-slate-950 hover:bg-white"
                  }`
                }
              >
                Contact
              </NavLink>
            </nav>

            {/* Desktop Right Action Bar */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              {/* Call Dispatch Button */}
              <a
                href="tel:06280016815"
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg shadow-xs transition-all hover:scale-[1.02]"
                title="Call Dispatch: 062800 16815"
              >
                <FaPhoneAlt size={11} className="text-sky-400" />
                <span>062800 16815</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg shadow-xs transition-all hover:scale-[1.02]"
              >
                <FaWhatsapp size={14} />
                <span>WhatsApp</span>
              </a>

              {/* Free Quote CTA */}
              <Link
                to="/booking"
                className="btn-primary text-xs !py-2.5 !px-4 shadow-xs"
              >
                Get a Quote
              </Link>

              {/* Admin Profile Dropdown (if logged in) */}
              {isAuthenticated && isAdmin && (
                <div className="relative ml-1">
                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs hover:ring-2 ring-primary ring-offset-2 transition-all"
                    title="Admin Menu"
                  >
                    <FaUserShield size={14} />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 animate-fadeUp z-50">
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Administrator
                        </p>
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-primary"
                      >
                        <FaTachometerAlt className="text-slate-400" />
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-left px-3.5 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <FaSignOutAlt className="text-red-400" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile / Tablet Action Bar */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:06280016815"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-xs"
                aria-label="Call Dispatch"
                title="Call 062800 16815"
              >
                <FaPhoneAlt size={12} className="text-sky-400" />
              </a>
              <a
                href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors shadow-xs"
                aria-label="WhatsApp Us"
                title="WhatsApp Us"
              >
                <FaWhatsapp size={15} />
              </a>
              <button
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:text-primary transition-colors text-base"
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Portaled to document.body) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div className="fixed inset-0 z-[99999] lg:hidden">
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />

                {/* Sliding Drawer Panel */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 260 }}
                  className="fixed right-0 top-0 bottom-0 h-full w-[88vw] max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                      <Logo size="small" showTagline={false} />
                      <button
                        onClick={() => setOpen(false)}
                        className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
                        aria-label="Close menu"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>

                    {/* Mobile Nav Links */}
                    <div className="flex flex-col gap-1">
                      {/* Home */}
                      <NavLink
                        to="/"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `text-sm font-semibold py-2.5 px-3.5 rounded-lg transition-colors flex items-center justify-between ${
                            isActive
                              ? "bg-sky-50 text-primary font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`
                        }
                      >
                        <span>Home</span>
                        <FaArrowRight size={10} className="text-slate-300" />
                      </NavLink>

                      {/* Services Accordion */}
                      <div className="rounded-lg overflow-hidden border border-slate-100">
                        <button
                          type="button"
                          onClick={() => setMobileServicesOpen((prev) => !prev)}
                          className={`w-full text-sm font-semibold py-2.5 px-3.5 flex items-center justify-between transition-colors ${
                            isServicesActive || mobileServicesOpen
                              ? "bg-sky-50/70 text-primary font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>Services (8)</span>
                          </div>
                          <FaChevronDown
                            size={11}
                            className={`transition-transform duration-200 text-slate-400 ${
                              mobileServicesOpen ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        {mobileServicesOpen && (
                          <div className="bg-slate-50/70 p-2 space-y-1 border-t border-slate-100">
                            {servicesList.map((item) => (
                              <Link
                                key={item.slug}
                                to={`/services/${item.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white hover:text-primary transition-colors"
                              >
                                <span className="w-6 h-6 rounded bg-sky-100/60 text-primary flex items-center justify-center text-[10px] shrink-0">
                                  <item.icon />
                                </span>
                                <span className="truncate">{item.label}</span>
                              </Link>
                            ))}
                            <Link
                              to="/services"
                              onClick={() => setOpen(false)}
                              className="block text-center text-xs font-bold text-primary py-2 hover:underline border-t border-slate-200/60 mt-1"
                            >
                              View All Services Overview →
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Locations Accordion */}
                      <div className="rounded-lg overflow-hidden border border-slate-100">
                        <button
                          type="button"
                          onClick={() => setMobileLocationsOpen((prev) => !prev)}
                          className={`w-full text-sm font-semibold py-2.5 px-3.5 flex items-center justify-between transition-colors ${
                            isLocationsActive || mobileLocationsOpen
                              ? "bg-sky-50/70 text-primary font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-primary text-xs" />
                            <span>Locations ({locationsList.length})</span>
                          </div>
                          <FaChevronDown
                            size={11}
                            className={`transition-transform duration-200 text-slate-400 ${
                              mobileLocationsOpen ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        {mobileLocationsOpen && (
                          <div className="bg-slate-50/70 p-2 space-y-1 border-t border-slate-100">
                            {locationsList.map((item) => (
                              <Link
                                key={item.slug}
                                to={`/locations/${item.slug}`}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white hover:text-primary transition-colors"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded bg-sky-100/60 text-primary flex items-center justify-center text-[10px] shrink-0">
                                    <FaMapMarkerAlt size={9} />
                                  </span>
                                  <span>{item.name}</span>
                                </span>
                                <span className="text-[10px] text-slate-400 font-normal">
                                  {item.state}
                                </span>
                              </Link>
                            ))}
                            <Link
                              to="/locations"
                              onClick={() => setOpen(false)}
                              className="block text-center text-xs font-bold text-primary py-2 hover:underline border-t border-slate-200/60 mt-1"
                            >
                              Explore All Service Locations →
                            </Link>
                          </div>
                        )}
                      </div>

                      {/* Features Accordion */}
                      <div className="rounded-lg overflow-hidden border border-slate-100">
                        <button
                          type="button"
                          onClick={() => setMobileFeaturesOpen((prev) => !prev)}
                          className={`w-full text-sm font-semibold py-2.5 px-3.5 flex items-center justify-between transition-colors ${
                            mobileFeaturesOpen
                              ? "bg-sky-50/70 text-primary font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>Features & Tools</span>
                          <FaChevronDown
                            size={11}
                            className={`transition-transform duration-200 text-slate-400 ${
                              mobileFeaturesOpen ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        {mobileFeaturesOpen && (
                          <div className="bg-slate-50/70 p-2 space-y-1 border-t border-slate-100">
                            {featureDropdownItems.map((item, idx) => (
                              <a
                                key={idx}
                                href={item.to}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavClick(item.to);
                                }}
                                className="flex items-center gap-2.5 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white hover:text-primary transition-colors"
                              >
                                <span className="w-6 h-6 rounded bg-sky-100/60 text-primary flex items-center justify-center text-[10px] shrink-0">
                                  <item.icon />
                                </span>
                                <span className="truncate">{item.label}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* About */}
                      <NavLink
                        to="/about"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `text-sm font-semibold py-2.5 px-3.5 rounded-lg transition-colors flex items-center justify-between ${
                            isActive
                              ? "bg-sky-50 text-primary font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`
                        }
                      >
                        <span>About</span>
                        <FaArrowRight size={10} className="text-slate-300" />
                      </NavLink>

                      {/* Pricing */}
                      <NavLink
                        to="/pricing"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `text-sm font-semibold py-2.5 px-3.5 rounded-lg transition-colors flex items-center justify-between ${
                            isActive
                              ? "bg-sky-50 text-primary font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`
                        }
                      >
                        <span>Pricing</span>
                        <FaArrowRight size={10} className="text-slate-300" />
                      </NavLink>

                      {/* Contact */}
                      <NavLink
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `text-sm font-semibold py-2.5 px-3.5 rounded-lg transition-colors flex items-center justify-between ${
                            isActive
                              ? "bg-sky-50 text-primary font-bold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`
                        }
                      >
                        <span>Contact</span>
                        <FaArrowRight size={10} className="text-slate-300" />
                      </NavLink>
                    </div>
                  </div>

                  {/* Mobile Footer CTAs */}
                  <div className="p-5 sm:p-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5 bg-slate-50/60 mt-auto">
                    <a
                      href="tel:06280016815"
                      className="flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-2.5 rounded-lg text-sm shadow-xs"
                    >
                      <FaPhoneAlt size={12} className="text-sky-400" /> Call: 062800 16815
                    </a>
                    <a
                      href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#16A34A] text-white font-semibold py-2.5 rounded-lg text-sm shadow-xs"
                    >
                      <FaWhatsapp size={15} /> WhatsApp Us
                    </a>
                    <Link
                      to="/booking"
                      onClick={() => setOpen(false)}
                      className="btn-primary w-full text-center text-sm !py-2.5 shadow-xs"
                    >
                      Get a Free Quote
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Navbar;
