import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2.5 items-end pointer-events-auto">
      {/* Call Floating Dial Button */}
      <a
        href="tel:06280016815"
        className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-full shadow-2xl border border-slate-700 transition-all hover:scale-105 active:scale-95 group"
        title="Call Dispatch: 062800 16815"
        aria-label="Call Dispatch"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <FaPhoneAlt size={13} className="text-sky-400" />
        <span className="hidden sm:inline text-xs font-bold">062800 16815</span>
      </a>

      {/* WhatsApp Floating Chat Button */}
      <a
        href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning%20Services,%20I%20would%20like%20to%20inquire%20about%20your%20cleaning%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-3.5 sm:py-3 sm:px-4 rounded-full shadow-2xl border border-emerald-400 transition-all hover:scale-105 active:scale-95 group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={18} />
        <span className="text-xs font-bold">WhatsApp Us</span>
      </a>
    </div>
  );
};

export default FloatingContact;
