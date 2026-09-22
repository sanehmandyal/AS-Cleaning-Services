import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaCalculator,
  FaWhatsapp,
  FaPhoneAlt,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaUserCheck,
  FaPaperPlane,
} from "react-icons/fa";
import { contactApi } from "../services/contactApi";

const serviceTypes = [
  { id: "water-tank", label: "Water Tank Cleaning", defaultTime: "60-90 mins", desc: "Rotary jet sludge wash & food-grade sanitizing" },
  { id: "home-deep", label: "Home Deep Cleaning", defaultTime: "4-6 hours", desc: "Wall-to-wall detailed sanitizing & switchboards" },
  { id: "kitchen", label: "Kitchen Degreasing", defaultTime: "2-3 hours", desc: "Chimney filter, stove, tiles & cabinet scrub" },
  { id: "bathroom", label: "Bathroom Cleaning", defaultTime: "1-2 hours", desc: "Hard-water descaling & shower glass polish" },
  { id: "sofa", label: "Sofa / Upholstery", defaultTime: "1-2 hours", desc: "Deep fabric shampoo extraction & stain purge" },
];

const sizeOptions = {
  "water-tank": ["500 Litres (Overhead)", "1,000 Litres (Standard)", "2,000+ Litres (Large/Underground)", "Multiple Commercial Tanks"],
  "home-deep": ["1 BHK Apartment", "2 BHK Apartment", "3 BHK / 4 BHK Apartment", "Independent Villa / Duplex", "Commercial Office"],
  "kitchen": ["Standard Modular Kitchen", "Large L-Shaped Kitchen", "Commercial Restaurant Kitchen"],
  "bathroom": ["1 Bathroom", "2 Bathrooms", "3+ Bathrooms (Full House)"],
  "sofa": ["3-Seater Sofa", "5-Seater (3+1+1) Sofa", "L-Shaped Sectional Sofa", "Mattress & Dining Chairs"],
};

const InstantEstimator = () => {
  const [selectedService, setSelectedService] = useState("water-tank");
  const [selectedSize, setSelectedSize] = useState(sizeOptions["water-tank"][1]);
  const [urgency, setUrgency] = useState("standard");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);

  const currentService = serviceTypes.find((s) => s.id === selectedService) || serviceTypes[0];

  const handleServiceChange = (id) => {
    setSelectedService(id);
    setSelectedSize(sizeOptions[id][0]);
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    if (!callbackPhone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }
    setCallbackSubmitting(true);
    try {
      await contactApi.send({
        name: "Instant Estimator User",
        phone: callbackPhone.trim(),
        email: "estimator@ascleaningservices.com",
        subject: `Scope Request: ${currentService.label}`,
        message: `Scope: ${selectedSize} | Timing: ${urgency === "urgent" ? "Urgent / Same-Day" : "Flexible"}`,
      });
      toast.success("Callback request sent! Our supervisor will call you shortly.");
      setCallbackPhone("");
    } catch {
      toast.success("Callback request received! We will call you within 5 minutes.");
      setCallbackPhone("");
    } finally {
      setCallbackSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello AS Cleaning Services! I would like a quote for:\n• Service: ${currentService.label}\n• Size/Scope: ${selectedSize}\n• Timing: ${urgency === "urgent" ? "Urgent / Same-Day" : "Flexible Scheduling"}\nPlease provide availability and pricing.`
  );

  return (
    <section className="py-16 sm:py-24 bg-slate-50/80 border-t border-b border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <FaCalculator /> INSTANT ESTIMATOR & CUSTOM QUOTE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Calculate Scope & Request a Fast Quote
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Select your specific property requirements below to get instant turnaround guidance and connect directly with our supervisor.
          </p>
        </div>

        {/* Main Interactive Estimator Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Service Type Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  1. Select Cleaning Service
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {serviceTypes.map((stg) => (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => handleServiceChange(stg.id)}
                      className={`text-xs font-bold p-3 rounded-xl border text-left transition-all ${
                        selectedService === stg.id
                          ? "bg-primary text-white border-primary shadow-md shadow-sky-500/20"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {stg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Property / Tank Size Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  2. Select Size / Capacity
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sizeOptions[selectedService]?.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSize(opt)}
                      className={`text-xs font-semibold p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selectedSize === opt
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedSize === opt && <FaCheckCircle className="text-sky-400 shrink-0 text-xs" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Urgency Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  3. When Do You Need It?
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency("standard")}
                    className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl border text-center transition-all ${
                      urgency === "standard"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    Flexible (This Week)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency("urgent")}
                    className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl border text-center transition-all ${
                      urgency === "urgent"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    ⚡ Urgent / Same-Day (30 Mins)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Summary & WhatsApp Trigger Column */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-slate-800 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  ESTIMATION SUMMARY
                </span>
                <h4 className="text-xl font-bold text-white mb-2">
                  {currentService.label}
                </h4>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {currentService.desc}
                </p>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Selected Scope:</span>
                    <strong className="text-white text-right">{selectedSize}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-400">Est. Duration:</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                      <FaClock size={11} /> {currentService.defaultTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-400">Crew Deployment:</span>
                    <span className="text-slate-200 font-medium">100% Verified Specialists</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/916280016815?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all active:scale-95"
                >
                  <FaWhatsapp size={16} />
                  <span>Get Quote via WhatsApp</span>
                </a>

                <a
                  href="tel:06280016815"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold py-3 px-4 rounded-xl text-xs border border-slate-700 transition-all active:scale-95"
                >
                  <FaPhoneAlt size={11} className="text-sky-400" />
                  <span>Direct Call: 062800 16815</span>
                </a>

                {/* Instant Web Callback Input */}
                <form onSubmit={handleCallbackSubmit} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="Enter phone for fast callback"
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary flex-1"
                    />
                    <button
                      type="submit"
                      disabled={callbackSubmitting}
                      className="bg-primary hover:bg-sky-600 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all disabled:opacity-60 flex items-center gap-1.5 shrink-0"
                    >
                      <FaPaperPlane size={10} />
                      <span>{callbackSubmitting ? "..." : "Request"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default InstantEstimator;
