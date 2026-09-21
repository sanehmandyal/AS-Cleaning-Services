import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaCalendarAlt,
  FaTag,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import { SkeletonCard } from "../components/UIState";
import { serviceApi } from "../services/serviceApi";
import { testimonialApi } from "../services/testimonialApi";

// Default fallback services matching the mockup
const defaultServices = [
  {
    _id: "1",
    title: "Residential Cleaning",
    slug: "residential-cleaning",
    shortDescription: "Keep your home fresh, clean and healthy.",
    icon: "FaHome",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800",
  },
  {
    _id: "2",
    title: "Commercial Cleaning",
    slug: "commercial-cleaning",
    shortDescription: "Professional cleaning for your business space.",
    icon: "FaBuilding",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
  },
  {
    _id: "3",
    title: "Deep Cleaning",
    slug: "deep-cleaning",
    shortDescription: "A complete clean for a healthier environment.",
    icon: "FaSprayCan",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=800",
  },
  {
    _id: "4",
    title: "Move In/Move Out Cleaning",
    slug: "move-in-move-out-cleaning",
    shortDescription: "Specialized cleaning for smooth transitions.",
    icon: "FaTruckMoving",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
  },
];

const whyChooseUsList = [
  {
    icon: FaUserCheck,
    title: "Experienced Team",
    desc: "Skilled & trustworthy staff",
  },
  {
    icon: FaCalendarAlt,
    title: "Flexible Scheduling",
    desc: "Work at your convenience",
  },
  {
    icon: FaTag,
    title: "Affordable Pricing",
    desc: "Quality service at best rates",
  },
  {
    icon: FaLeaf,
    title: "Eco-Friendly Approach",
    desc: "Safe & sustainable products",
  },
];

const defaultTestimonials = [
  {
    _id: "t1",
    name: "Priya Sharma",
    role: "Homeowner",
    rating: 5,
    message: "AS Cleaning Services did an amazing job! My home has never looked so clean. Highly recommended!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
  },
  {
    _id: "t2",
    name: "Rahul Mehta",
    role: "Office Manager",
    rating: 5,
    message: "Professional, punctual and very thorough. Great service! They transformed our entire workspace.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
  },
  {
    _id: "t3",
    name: "Neha Verma",
    role: "Client",
    rating: 5,
    message: "Excellent team and eco-friendly products. Will definitely book again! Very happy with the results.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
  },
];

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    document.title = "AS Cleaning Services | Clean Spaces • Healthy Lives";
    serviceApi
      .getAll()
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setServices(res.data.data.slice(0, 4));
        } else {
          setServices(defaultServices);
        }
      })
      .catch(() => setServices(defaultServices))
      .finally(() => setLoadingServices(false));

    testimonialApi
      .getAll()
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setTestimonials(res.data.data.slice(0, 3));
        } else {
          setTestimonials(defaultTestimonials);
        }
      })
      .catch(() => setTestimonials(defaultTestimonials));
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* 1. Hero with Trust Bar */}
      <Hero />

      {/* 2. Our Services Section */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="container-x">
          <div className="mb-10 text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our Services
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-1">
              We offer a wide range of cleaning services to meet your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingServices
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : services.map((service, i) => (
                  <ServiceCard key={service._id} service={service} index={i} />
                ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-secondary text-sm !px-6 !py-3">
              View All Services <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us? Section with Subtle High-Res Background Image */}
      <section className="relative py-16 sm:py-24 bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
            alt="Pristine interior"
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/90" />
        </div>

        <div className="container-x relative z-10">
          <div className="mb-12 text-left max-w-2xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
              The AS Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Why Choose Us?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              We go beyond cleaning. We create healthier, happier spaces for you and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center border border-slate-700/60 shadow-lg hover:border-sky-500/50 hover:bg-slate-800 transition-all duration-300 group"
              >
                <span className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-2xl mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                  <item.icon />
                </span>
                <h3 className="font-bold text-white text-base sm:text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ready for a Cleaner Space? CTA Banner with background cleaning imagery */}
      <section className="relative py-20 sm:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=85&w=2000&auto=format&fit=crop"
            alt="Cleaning backdrop"
            className="w-full h-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/95" />
        </div>

        <div className="container-x relative z-10 text-center max-w-2xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Ready for a Cleaner Space?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base mb-8 leading-relaxed max-w-xl mx-auto">
            Book your cleaning service today and experience the difference of a professional, spotless touch!
          </p>
          <Link to="/booking" className="btn-primary-lg !px-8 !py-3.5 text-sm sm:text-base shadow-xl">
            Book Now
          </Link>
        </div>
      </section>

      {/* 5. What Our Clients Say (Testimonials) with Subtle Light Texture */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50/70 via-white to-white relative">
        <div className="container-x">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">
              Customer Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Trusted by hundreds of happy customers across the city.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t._id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
