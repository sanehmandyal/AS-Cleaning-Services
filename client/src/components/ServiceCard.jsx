import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const fallbackImg = "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800";

const ServiceCard = ({ service, index = 0 }) => {
  const Icon = FaIcons[service.icon] || FaIcons.FaBroom;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="card-hover overflow-hidden flex flex-col justify-between group"
    >
      <div>
        <Link
          to={`/services/${service.slug || service._id}`}
          className="relative block h-48 sm:h-52 overflow-hidden bg-slate-100"
          title={`View details for ${service.title}`}
        >
          <img
            src={service.image || fallbackImg}
            alt={`${service.title} - AS Cleaning Services`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImg;
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-8 h-8 rounded-lg bg-sky-50 text-primary flex items-center justify-center text-sm shrink-0">
              <Icon />
            </span>
            <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-primary transition-colors">
              <Link to={`/services/${service.slug || service._id}`}>
                {service.title}
              </Link>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {service.shortDescription || service.description}
          </p>
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-6 pt-1">
        <Link
          to={`/services/${service.slug || service._id}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-deep group-hover:gap-2.5 transition-all"
        >
          Learn More <FaArrowRight size={11} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
