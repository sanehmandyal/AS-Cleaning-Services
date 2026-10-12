import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Call Floating Dial Button (Positioned over WhatsApp) */}
      <a
        href="tel:06280016815"
        className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white w-12 h-12 rounded-full shadow-2xl border border-sky-400/40 transition-all hover:scale-110 active:scale-95 group shrink-0"
        title="Call 24/7 Helpline: 062800 16815"
        aria-label="Call 24/7 Helpline: 062800 16815"
      >
        <FaPhoneAlt size={16} className="text-white shrink-0 group-hover:rotate-12 transition-transform" />
      </a>

      {/* WhatsApp Floating Chat Button */}
      <a
        href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20cleaning%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white h-12 px-4.5 rounded-full shadow-2xl border border-emerald-400/40 transition-all hover:scale-105 active:scale-95 group shrink-0"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={20} className="shrink-0" />
        <span className="text-xs sm:text-sm font-bold whitespace-nowrap">WhatsApp Us</span>
      </a>
    </div>
  );
};

export default FloatingContact;
