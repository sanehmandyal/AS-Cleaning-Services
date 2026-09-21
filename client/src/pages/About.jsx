import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "100%", label: "Satisfaction Guarantee" },
  { value: "24/7", label: "Customer Support" },
];

const values = [
  "Trained, background-checked cleaning professionals",
  "Eco-friendly, family and pet-safe cleaning products",
  "Transparent pricing with no hidden fees",
  "Flexible scheduling that works around your life",
  "100% satisfaction guarantee on every visit",
];

const fallbackAboutImg = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200";

const About = () => {
  useEffect(() => {
    document.title = "About Us | AS Cleaning Services";
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Top Banner with Background Image */}
      <section className="relative bg-slate-900 py-18 sm:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop"
            alt="About us background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/90" />
        </div>

        <div className="container-x relative z-10 text-center max-w-2xl mx-auto px-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-2">
            About Our Company
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 tracking-tight">
            About AS Cleaning Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Committed to providing cleaner, healthier living and working environments for every client.
          </p>
        </div>
      </section>

      {/* Main Story & Image Split Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-5 leading-tight">
              A trusted name in professional cleaning
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
              AS Cleaning Services is a trusted name in professional cleaning,
              dedicated to delivering high-quality, reliable and affordable cleaning
              solutions for homes, offices and commercial spaces. Our mission is to
              create cleaner, healthier and happier environments for our clients.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Every member of our team is thoroughly trained, background-checked, and
              equipped with top-tier eco-friendly products to deliver a spotless clean
              every single time.
            </p>
            <ul className="space-y-3 mb-8">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
            <Link to="/services" className="btn-primary">
              Learn More About Us <FaArrowRight size={12} />
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-slate-100"
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"
              alt="AS Cleaning Services office and workspace"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackAboutImg;
              }}
              className="w-full h-72 sm:h-96 lg:h-[440px] object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-14 bg-slate-900 text-white border-y border-slate-800">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-400 mb-1">
                {s.value}
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-300">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission / Vision / Promise */}
      <section className="py-16 sm:py-24 bg-slate-50/60">
        <div className="container-x grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="card p-6 sm:p-8 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To deliver reliable, high-quality cleaning services that make homes and workplaces
              healthier and more comfortable.
            </p>
          </div>
          <div className="card p-6 sm:p-8 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To become the most trusted and recommended cleaning service company in every community we serve.
            </p>
          </div>
          <div className="card p-6 sm:p-8 hover:shadow-md transition-all">
            <h3 className="font-bold text-lg text-slate-900 mb-2">Our Promise</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Consistent, professional, eco-friendly cleaning backed by our 100% satisfaction guarantee.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
