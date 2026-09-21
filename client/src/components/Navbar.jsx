import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaPhoneAlt,
  FaWhatsapp,
  FaUserShield,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/#why-choose-us", label: "Why Choose Us" },
  { to: "/#reviews", label: "Reviews" },
  { to: "/#faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleNavClick = (to) => {
    setOpen(false);
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

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-200 border-b ${
        scrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo size="normal" />
          </div>

          {/* Center Navigation Links (Pill Style) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60">
            {navLinks.map((link) => {
              const isHash = link.to.startsWith("/#");
              const isActive = !isHash && location.pathname === link.to;

              return isHash ? (
                <a
                  key={link.to}
                  href={link.to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.to);
                  }}
                  className="text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-white transition-all"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs lg:text-sm font-medium px-3.5 py-1.5 rounded-full transition-all ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm font-semibold border border-slate-200/60"
                        : "text-slate-600 hover:text-slate-950 hover:bg-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Phone Dispatch Info */}
            <div className="text-right hidden lg:block mr-1">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Dispatch & Booking
              </span>
              <a
                href="tel:06280016815"
                className="text-sm font-bold text-slate-900 hover:text-primary transition-colors"
              >
                062800 16815
              </a>
            </div>

            {/* Call Now Button */}
            <a
              href="tel:06280016815"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.02]"
            >
              <FaPhoneAlt size={12} />
              <span>Call Now</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all hover:scale-[1.02]"
            >
              <FaWhatsapp size={15} />
              <span>WhatsApp</span>
            </a>

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

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="tel:06280016815"
              className="p-2.5 rounded-lg bg-slate-900 text-white text-sm"
              aria-label="Call Dispatch"
            >
              <FaPhoneAlt size={13} />
            </a>
            <a
              href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#16A34A] text-white text-sm"
              aria-label="WhatsApp Us"
            >
              <FaWhatsapp size={16} />
            </a>
            <button
              className="p-2.5 text-slate-800 hover:text-primary transition-colors text-xl ml-1"
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl p-6 flex flex-col justify-between animate-fadeUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5">
                <Logo size="small" showTagline={false} />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md"
                  aria-label="Close menu"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isHash = link.to.startsWith("/#");
                  const isActive = !isHash && location.pathname === link.to;

                  return isHash ? (
                    <a
                      key={link.to}
                      href={link.to}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.to);
                      }}
                      className="text-sm font-medium py-2.5 px-3.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `text-sm font-medium py-2.5 px-3.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-sky-50 text-primary font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="tel:06280016815"
                className="flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-3 rounded-lg text-sm"
              >
                <FaPhoneAlt size={12} /> Call: 062800 16815
              </a>
              <a
                href="https://wa.me/916280016815"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#16A34A] text-white font-semibold py-3 rounded-lg text-sm"
              >
                <FaWhatsapp size={16} /> WhatsApp Us
              </a>
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="btn-primary w-full text-center text-sm !py-2.5"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
