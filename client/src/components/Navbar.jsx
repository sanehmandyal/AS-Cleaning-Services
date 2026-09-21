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
  FaArrowRight,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/#why-choose-us", label: "Why Us" },
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
        scrolled ? "border-slate-200/90 shadow-sm" : "border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 lg:gap-4">
          {/* Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Logo size="normal" />
          </div>

          {/* Desktop Navigation Links (Centered) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-50/90 px-3 py-1.5 rounded-full border border-slate-200/70 shadow-xs">
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
                  className="text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-950 hover:bg-white transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-xs xl:text-sm font-semibold px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-white text-primary shadow-xs font-bold border border-slate-200/80"
                        : "text-slate-600 hover:text-slate-950 hover:bg-white"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
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

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[85vw] max-w-xs bg-white shadow-2xl p-5 sm:p-6 flex flex-col justify-between animate-fadeUp overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                <Logo size="small" showTagline={false} />
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="Close menu"
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-1">
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
                      className="text-sm font-semibold py-2.5 px-3.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <FaArrowRight size={10} className="text-slate-300" />
                    </a>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `text-sm font-semibold py-2.5 px-3.5 rounded-lg transition-colors flex items-center justify-between ${
                          isActive
                            ? "bg-sky-50 text-primary font-bold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`
                      }
                    >
                      <span>{link.label}</span>
                      <FaArrowRight size={10} className="text-slate-300" />
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 mt-6">
              <a
                href="tel:06280016815"
                className="flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-2.5 rounded-lg text-sm shadow-xs"
              >
                <FaPhoneAlt size={12} className="text-sky-400" /> Call: 062800 16815
              </a>
              <a
                href="https://wa.me/916280016815"
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
