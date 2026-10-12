import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:flex-col sm:items-end sm:gap-2.5 pointer-events-auto">
      {/* Call Floating Dial Button */}
      <a
        href="tel:06280016815"
        className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white w-11 h-11 sm:w-auto sm:h-11 sm:px-4 rounded-full shadow-xl border border-sky-400/40 transition-all hover:scale-105 active:scale-95 group shrink-0"
        title="Call 24/7 Helpline: 062800 16815"
        aria-label="Call 24/7 Helpline: 062800 16815"
      >
        <FaPhoneAlt size={14} className="text-white shrink-0" />
        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span>062800 16815</span>
        </span>
      </a>

      {/* WhatsApp Floating Chat Button */}
      <a
        href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20cleaning%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white h-11 px-4 rounded-full shadow-xl border border-emerald-400/40 transition-all hover:scale-105 active:scale-95 group shrink-0"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={19} className="shrink-0" />
        <span className="text-xs font-bold whitespace-nowrap">WhatsApp Us</span>
      </a>
    </div>
  );
};

export default FloatingContact;
