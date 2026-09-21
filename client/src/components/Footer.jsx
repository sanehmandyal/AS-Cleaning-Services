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
} from "react-icons/fa";
import Logo from "./Logo";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-x py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Logo variant="light" size="normal" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2">
              Professional, reliable and eco-friendly cleaning solutions for homes,
              offices and commercial properties. Clean Spaces. Healthy Lives.
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
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Cleaning Tips & Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Support
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
                <Link to="/services/residential-cleaning" className="hover:text-primary transition-colors">
                  Residential Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-cleaning" className="hover:text-primary transition-colors">
                  Commercial Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/deep-cleaning" className="hover:text-primary transition-colors">
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/move-in-move-out-cleaning" className="hover:text-primary transition-colors">
                  Move In / Move Out Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/post-construction-cleaning" className="hover:text-primary transition-colors">
                  Post Construction Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/custom-cleaning" className="hover:text-primary transition-colors">
                  Custom Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-0.5 shrink-0" />
                <span>221B Cleanway Street, Suite 4, Springfield, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary shrink-0" />
                <a href="tel:+15550123456" className="hover:text-white transition-colors">
                  +1 (555) 012-3456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary shrink-0" />
                <a href="mailto:hello@ascleaningservices.com" className="hover:text-white transition-colors">
                  hello@ascleaningservices.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-primary shrink-0" />
                <span>Mon - Sat: 7:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} AS Cleaning Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="text-slate-400 font-medium">Clean Spaces • Healthy Lives</p>
            <Link
              to="/login"
              className="text-slate-500 hover:text-sky-400 transition-colors inline-flex items-center gap-1 border-l border-slate-800 pl-4"
              title="Admin Login Portal"
            >
              🔒 Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
