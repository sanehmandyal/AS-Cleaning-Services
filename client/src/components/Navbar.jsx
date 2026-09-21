import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
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

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-200 border-b ${
        scrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
      }`}
    >
      <nav className="container-x flex items-center justify-between h-16 sm:h-20">
        {/* Brand Logo */}
        <Logo size="normal" />

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-slate-600 hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated && isAdmin ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800 hover:text-primary bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-md transition-colors"
              >
                <FaUserShield className="text-primary text-sm" />
                <span>Admin ({user?.name?.split(" ")[0] || "Staff"})</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-card border border-slate-100 py-1.5 animate-fadeUp z-50">
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Administrator</p>
                    <p className="text-xs font-semibold text-slate-800 truncate">{user?.email}</p>
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
          ) : null}

          <Link to="/booking" className="btn-primary !px-5 !py-2 text-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-slate-700 hover:text-primary transition-colors text-xl"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
        >
          <FaBars />
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 flex flex-col justify-between animate-fadeUp"
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
              <div className="flex flex-col gap-2.5">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                        isActive
                          ? "bg-sky-50 text-primary font-semibold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              {isAuthenticated && isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="btn-secondary w-full text-xs"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : null}

              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="btn-primary w-full text-sm"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
