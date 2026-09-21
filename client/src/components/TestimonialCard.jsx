import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial, index = 0 }) => {
  const initials = (testimonial.name || "Happy Client")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-hover p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-sky-100 shrink-0"
              loading="lazy"
            />
          ) : (
            <span className="w-12 h-12 rounded-full bg-sky-50 text-primary font-bold flex items-center justify-center text-sm border-2 border-sky-100 shrink-0">
              {initials}
            </span>
          )}
          <div>
            <h4 className="font-semibold text-sm text-slate-900 leading-tight">
              {testimonial.name}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {testimonial.role || "Verified Customer"}
            </p>
            <div className="flex text-amber-400 mt-1 gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={12}
                  className={i < (testimonial.rating || 5) ? "fill-current" : "text-slate-200"}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed italic">
          "{testimonial.message}"
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
