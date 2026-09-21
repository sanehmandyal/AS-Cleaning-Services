import React from "react";
import { motion } from "framer-motion";
import {
  FaWater,
  FaSprayCan,
  FaShieldAlt,
  FaSun,
  FaCheckDouble,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const stages = [
  {
    step: "01",
    title: "Dewatering & Deep De-Sludging",
    icon: FaWater,
    desc: "Automated high-power submersible dewatering pump clears out stagnant water and bottom-settled mud sediment in minutes.",
    badge: "Stage 1",
  },
  {
    step: "02",
    title: "150-Bar Rotary High-Pressure Scrub",
    icon: FaSprayCan,
    desc: "Rotary pressure jet spray strips off algae, stubborn biological calcification, fungal spores, and scale from walls & ceiling.",
    badge: "Stage 2",
  },
  {
    step: "03",
    title: "Vacuum Slurry Extraction",
    icon: FaCheckDouble,
    desc: "Industrial heavy-duty slurry suction machine evacuates all dirty residual wash water and contaminants leaving zero debris.",
    badge: "Stage 3",
  },
  {
    step: "04",
    title: "Food-Grade Anti-Bacterial Scrub",
    icon: FaShieldAlt,
    desc: "Manual deep scrub using non-toxic, eco-friendly, food-safe antibacterial disinfectants approved for domestic drinking storage.",
    badge: "Stage 4",
  },
  {
    step: "05",
    title: "UV Sterilization & Quality Handover",
    icon: FaSun,
    desc: "Final reservoir sterilization eliminating 99.9% microscopic pathogens, complete wall dry inspection, and supervisor handover.",
    badge: "Stage 5",
  },
];

const WaterTankProcess = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <FaShieldAlt /> 100% SCIENTIFIC SANITATION STANDARDS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our 5-Stage Water Tank Cleaning Process
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            We follow an uncompromising 5-step protocol to transform neglected, algae-infested water reservoirs into pure, drinking-safe storage systems.
          </p>
        </div>

        {/* 5 Process Cards Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stages.map((stg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Step badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-primary bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-100">
                    {stg.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white group-hover:bg-primary text-slate-700 group-hover:text-white flex items-center justify-center text-sm shadow-sm transition-colors">
                    <stg.icon />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {stg.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stg.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                <span>Certified Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Strip */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-1">
              Need Your Domestic or Overhead Tank Cleaned Today?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Same-day active dispatch available across residential sectors and commercial buildings.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:06280016815"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
            >
              <FaPhoneAlt size={11} className="text-primary" /> Call 062800 16815
            </a>
            <a
              href="https://wa.me/916280016815?text=Hello%20AS%20Cleaning,%20I%20want%20to%20book%20a%20Water%20Tank%20Cleaning%20service"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
            >
              <FaWhatsapp size={14} /> WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WaterTankProcess;
