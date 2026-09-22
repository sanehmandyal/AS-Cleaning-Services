import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const Footer = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Logo variant="light" size="normal" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2">
              Professional, reliable and eco-friendly cleaning solutions for homes,
              water tanks, and commercial properties. Clean Spaces. Healthy Lives.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              {[
                { icon: FaFacebookF, href: "#", label: "Facebook" },
                { icon: FaTwitter, href: "#", label: "Twitter" },
                { icon: FaInstagram, href: "#", label: "Instagram" },
                { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 hover:bg-primary hover:text-white flex items-center justify-center text-xs transition-colors"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-primary transition-colors">
                  Get a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Cleaning Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <Link to="/booking?service=deep-cleaning" className="hover:text-primary transition-colors">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link to="/booking?service=water-tank-cleaning" className="hover:text-primary transition-colors">
                  Water Tank Cleaning
                </Link>
              </li>
              <li>
                <Link to="/booking?service=home-cleaning" className="hover:text-primary transition-colors">
                  Home Cleaning
                </Link>
              </li>
              <li>
                <Link to="/booking?service=bathroom-cleaning" className="hover:text-primary transition-colors">
                  Bathroom Cleaning
                </Link>
              </li>
              <li>
                <Link to="/booking?service=kitchen-cleaning" className="hover:text-primary transition-colors">
                  Kitchen Degreasing
                </Link>
              </li>
              <li>
                <Link to="/booking?service=sofa-cleaning" className="hover:text-primary transition-colors">
                  Sofa & Upholstery
                </Link>
              </li>
              <li>
                <Link to="/booking?service=floor-cleaning" className="hover:text-primary transition-colors">
                  Floor Machine Buffing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact & Dispatch
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary shrink-0" />
                <a href="tel:06280016815" className="hover:text-white font-semibold transition-colors">
                  062800 16815
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#16A34A] shrink-0 text-base" />
                <a
                  href="https://wa.me/916280016815"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Booking: 062800 16815
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-0.5 shrink-0" />
                <span>Local Dispatch & Neighborhood Cleaning Hub</span>
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-primary shrink-0" />
                <span>24/7 Availability & Emergency Dispatch</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} AS Cleaning Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="text-slate-400 font-medium">Clean Spaces • Healthy Lives</p>
            {isAuthenticated && isAdmin ? (
              <Link
                to="/admin"
                className="text-primary hover:text-sky-300 font-semibold transition-colors inline-flex items-center gap-1 border-l border-slate-800 pl-4"
                title="Admin Management Console"
              >
                ⚡ Admin Console
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-slate-500 hover:text-sky-400 transition-colors inline-flex items-center gap-1 border-l border-slate-800 pl-4"
                title="Admin Login Portal"
              >
                🔒 Admin Access
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
